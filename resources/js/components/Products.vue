<template>
    <div class="container py-4">
        <div class="row">
            <!-- Sidebar Filters -->
            <div class="col-lg-3 mb-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="bi bi-funnel"></i> ფილტრები</h5>
                    </div>
                    <div class="card-body">
                        <!-- Search -->
                        <div class="mb-4">
                            <label class="form-label fw-semibold">ძიება</label>
                            <input v-model="filters.search" type="text" class="form-control" placeholder="პროდუქტის სახელი...">
                        </div>

                        <!-- Categories List -->
                        <div class="mb-4">
                            <label class="form-label fw-semibold mb-3">კატეგორიები</label>
                            <div class="list-group list-group-flush">
                                <a 
                                    v-for="cat in categoriesList" 
                                    :key="cat"
                                    href="#" 
                                    class="list-group-item list-group-item-action d-flex align-items-center"
                                    :class="{ active: filters.category === cat }"
                                    @click.prevent="selectCategory(cat)"
                                >
                                    <i :class="getCategoryIcon(cat)" class="me-2"></i>
                                    {{ cat }}
                                </a>
                            </div>
                        </div>

                        <!-- Price Range -->
                        <div class="mb-4">
                            <label class="form-label fw-semibold">ფასის დიაპაზონი</label>
                            <div class="row g-2">
                                <div class="col-6">
                                    <input v-model.number="filters.minPrice" type="number" class="form-control form-control-sm" placeholder="მინ" min="0">
                                </div>
                                <div class="col-6">
                                    <input v-model.number="filters.maxPrice" type="number" class="form-control form-control-sm" placeholder="მაქს" min="0">
                                </div>
                            </div>
                        </div>

                        <!-- Reset Filters -->
                        <button @click="resetFilters" class="btn btn-outline-secondary w-100">
                            <i class="bi bi-arrow-clockwise"></i> ფილტრების გასუფთავება
                        </button>
                    </div>
                </div>
            </div>

            <!-- Products Grid -->
            <div class="col-lg-9">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>პროდუქცია</h2>
                    <span class="text-muted">ნაპოვნია: {{ filteredProducts.length }} პროდუქტი</span>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">იტვირთება...</span>
                    </div>
                </div>

                <!-- Products Grid -->
                <div v-else class="row g-4 mb-4">
                    <div v-for="product in paginatedProducts" :key="product.id" class="col-lg-4 col-md-6">
                        <div class="card h-100 shadow-sm product-card border-0">
                            <div class="position-relative">
                                <img :src="product.image" class="card-img-top" :alt="product.name" 
                                     style="height: 250px; object-fit: cover;"
                                     @error="handleImageError($event)">
                            </div>
                            <div class="card-body d-flex flex-column p-3">
                                <h6 class="card-title mb-2" style="min-height: 48px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                    {{ product.name }}
                                </h6>
                                <p class="text-muted small mb-2">{{ product.category }}</p>
                                <div class="mb-2">
                                    <span class="text-warning">
                                        <i v-for="n in 5" :key="n" :class="n <= product.rating ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                                    </span>
                                    <small class="text-muted ms-2">({{ product.sales }})</small>
                                </div>
                                <div class="mt-auto">
                                    <p class="fs-5 fw-bold text-primary mb-2">{{ product.price }}₾</p>
                                    <button @click="addToCart(product)" class="btn btn-primary w-100">
                                        <i class="bi bi-cart-plus"></i> კალათაში
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <nav v-if="totalPages > 1" aria-label="Products pagination">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">წინა</a>
                        </li>
                        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">შემდეგი</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';

export default {
    name: 'Products',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { categoriesList, filterProducts } = useProducts();
        const { addToCart: addToCartItem } = useCart();

        const loading = ref(false);
        const currentPage = ref(1);
        const itemsPerPage = ref(9);

        const filters = ref({
            search: route.query.search || '',
            category: route.query.category || 'ყველა',
            minPrice: null,
            maxPrice: null
        });

        const filteredProducts = computed(() => {
            return filterProducts(filters.value);
        });

        const totalPages = computed(() => {
            return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
        });

        const paginatedProducts = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredProducts.value.slice(start, end);
        });

        const visiblePages = computed(() => {
            const pages = [];
            const maxVisible = 5;
            let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
            let end = Math.min(totalPages.value, start + maxVisible - 1);
            
            if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        });

        const selectCategory = (category) => {
            if (filters.value.category !== category) {
                filters.value.category = category;
                currentPage.value = 1;
                // Update URL without navigation
                router.replace({ query: { ...route.query, category } });
            }
        };

        const resetFilters = () => {
            filters.value = {
                search: '',
                category: 'ყველა',
                minPrice: null,
                maxPrice: null
            };
            currentPage.value = 1;
            router.replace({ query: {} });
        };

        const getCategoryIcon = (category) => {
            const icons = {
                'ყველა': 'bi-grid',
                'ელექტრო ხელსაწყოები': 'bi-tools',
                'ხელის ხელსაწყოები': 'bi-hammer',
                'ბენზინის ხელსაწყოები': 'bi-fuel-pump',
                'უსადენო ხელსაწყოები': 'bi-battery-charging',
                'პნევმატური ხელსაწყოები': 'bi-wind',
                'სანათები': 'bi-lightbulb',
                'საზომი და სანიშნი ხელსაწყოები': 'bi-ruler',
                'უსაფრთხოება და სპეცტანსაცმელი': 'bi-shield-check',
                'წყლის ტუმბოები': 'bi-droplet',
                'ბაღის ინსტრუმენები': 'bi-flower1',
                'ამწევი დანადგარები': 'bi-arrow-up-circle',
                'კომპოზიტური WPC პანელები': 'bi-grid',
                'მანქანის აღჭურვილობა': 'bi-car-front',
                'აქსესუარები და სახარჯი მასალები': 'bi-box-seam',
                'ხელსაწყოების შესანახი': 'bi-box',
                'სხვადასხვა': 'bi-grid-3x3'
            };
            return icons[category] || 'bi-grid';
        };

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        const addToCart = (product) => {
            addToCartItem(product);
            alert(`${product.name} დაემატა კალათაში!`);
        };

        const handleImageError = (event) => {
            // Fallback to placeholder if image fails to load (only set once to avoid loops)
            if (!event.target.dataset.fallbackSet) {
                event.target.dataset.fallbackSet = 'true';
                event.target.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(event.target.alt || 'Product')}`;
            }
        };

        // Watch for filter changes and reset to page 1 (with debounce to avoid loops)
        let filterWatchTimeout = null;
        watch(filters, () => {
            if (filterWatchTimeout) {
                clearTimeout(filterWatchTimeout);
            }
            filterWatchTimeout = setTimeout(() => {
                currentPage.value = 1;
                filterWatchTimeout = null;
            }, 100);
        }, { deep: true });

        onMounted(() => {
            if (route.query.category) {
                filters.value.category = route.query.category;
            }
            if (route.query.search) {
                filters.value.search = route.query.search;
            }
        });

        return {
            loading,
            filters,
            categoriesList,
            filteredProducts,
            paginatedProducts,
            currentPage,
            totalPages,
            visiblePages,
            selectCategory,
            resetFilters,
            goToPage,
            addToCart,
            handleImageError,
            getCategoryIcon
        };
    }
}
</script>

<style scoped>
.product-card {
    transition: all 0.3s ease;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.product-card img {
    transition: transform 0.3s;
}

.product-card:hover img {
    transform: scale(1.05);
}

.page-link {
    cursor: pointer;
}

.list-group-item {
    border: none;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e9ecef;
    cursor: pointer;
    transition: all 0.2s;
}

.list-group-item:last-child {
    border-bottom: none;
}

.list-group-item:hover {
    background-color: #f8f9fa;
    padding-left: 0.5rem;
}

.list-group-item.active {
    background-color: #0d6efd;
    color: white;
    border-color: #0d6efd;
}

.list-group-item.active i {
    color: white;
}
</style>

