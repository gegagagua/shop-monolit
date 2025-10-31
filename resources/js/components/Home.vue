<template>
    <div>
        <!-- Hero Slider -->
        <div id="heroSlider" class="carousel slide mb-5" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#heroSlider" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="carousel-slide" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 500px; display: flex; align-items: center; justify-content: center;">
                        <div class="text-white text-center px-4">
                            <h1 class="display-3 fw-bold mb-4">შემოდით მაღაზიაში</h1>
                            <p class="lead fs-4 mb-4">თქვენი სანდო პარტნიორი ხარისხიანი ხელსაწყოებისთვის</p>
                            <router-link to="/products" class="btn btn-light btn-lg px-5">
                                <i class="bi bi-arrow-right"></i> პროდუქციის ნახვა
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="carousel-slide" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 500px; display: flex; align-items: center; justify-content: center;">
                        <div class="text-white text-center px-4">
                            <h1 class="display-3 fw-bold mb-4">სპეციალური შეთავაზებები</h1>
                            <p class="lead fs-4 mb-4">დიდი ფასდაკლებები ყველა პროდუქტზე</p>
                            <router-link to="/products" class="btn btn-light btn-lg px-5">
                                <i class="bi bi-tag"></i> შეთავაზებების ნახვა
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="carousel-slide" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 500px; display: flex; align-items: center; justify-content: center;">
                        <div class="text-white text-center px-4">
                            <h1 class="display-3 fw-bold mb-4">გაწეული მიწოდება</h1>
                            <p class="lead fs-4 mb-4">უფასო მიწოდება 150₾-ზე მეტ შეკვეთებზე</p>
                            <router-link to="/products" class="btn btn-light btn-lg px-5">
                                <i class="bi bi-truck"></i> დაწყება
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#heroSlider" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#heroSlider" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>

        <div class="container my-5">
            <!-- Categories Section -->
            <section class="mb-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">კატეგორიები</h2>
                    <router-link to="/products" class="text-decoration-none">ყველას ნახვა <i class="bi bi-arrow-right"></i></router-link>
                </div>
                <div class="row g-4">
                    <div v-for="(category, index) in displayCategories" :key="category" class="col-lg-2 col-md-3 col-sm-4 col-6">
                        <div class="card h-100 shadow-sm category-card border-0" @click="goToCategory(category)">
                            <div class="card-body text-center p-4">
                                <div class="category-icon mb-3">
                                    <i :class="getCategoryIcon(category)" class="fs-1 text-primary"></i>
                                </div>
                                <h6 class="card-title mb-0 fw-semibold">{{ category }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Featured Products -->
            <section class="mb-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">რეკომენდებული პროდუქტები</h2>
                    <router-link to="/products" class="text-decoration-none">ყველას ნახვა <i class="bi bi-arrow-right"></i></router-link>
                </div>
                <div class="row g-4">
                    <div v-for="product in featuredProducts" :key="product.id" class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card h-100 shadow-sm product-card border-0">
                            <div class="position-relative">
                                <img :src="product.image" class="card-img-top" :alt="product.name" 
                                     style="height: 250px; object-fit: cover;" 
                                     @error="handleImageError($event)">
                                <span v-if="product.featured" class="badge bg-danger position-absolute top-0 end-0 m-2">
                                    <i class="bi bi-star-fill"></i> რეკომენდებული
                                </span>
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
            </section>

            <!-- Top Selling Products -->
            <section class="mb-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">ტოპ გაყიდვები</h2>
                    <router-link to="/products" class="text-decoration-none">ყველას ნახვა <i class="bi bi-arrow-right"></i></router-link>
                </div>
                <div class="row g-4">
                    <div v-for="product in topProducts" :key="product.id" class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card h-100 shadow-sm product-card border-0">
                            <div class="position-relative">
                                <img :src="product.image" class="card-img-top" :alt="product.name" 
                                     style="height: 250px; object-fit: cover;"
                                     @error="handleImageError($event)">
                                <span class="badge bg-success position-absolute top-0 start-0 m-2">
                                    <i class="bi bi-trophy-fill"></i> ტოპ გაყიდვა
                                </span>
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
                                    <small class="text-muted ms-2">გაყიდული: {{ product.sales }}</small>
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
            </section>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';

export default {
    name: 'Home',
    setup() {
        const router = useRouter();
        const { categoriesList, getFeaturedProducts, getTopSellingProducts } = useProducts();
        const { addToCart: addToCartItem } = useCart();

        const categories = ref(categoriesList.value.filter(c => c !== 'ყველა'));
        const displayCategories = ref(categories.value.slice(0, 6)); // Show first 6 categories
        const featuredProducts = ref([]);
        const topProducts = ref([]);

        const getCategoryIcon = (category) => {
            const icons = {
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

        const loadProducts = () => {
            featuredProducts.value = getFeaturedProducts().slice(0, 4);
            topProducts.value = getTopSellingProducts(4);
        };

        const goToCategory = (category) => {
            router.push({ path: '/products', query: { category } });
        };

        const addToCart = (product) => {
            addToCartItem(product);
            // Show toast notification
            alert(`${product.name} დაემატა კალათაში!`);
        };

        const handleImageError = (event) => {
            // Fallback to placeholder if image fails to load (only set once to avoid loops)
            if (!event.target.dataset.fallbackSet) {
                event.target.dataset.fallbackSet = 'true';
                event.target.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(event.target.alt || 'Product')}`;
            }
        };

        onMounted(() => {
            loadProducts();
        });

        return {
            categories,
            displayCategories,
            featuredProducts,
            topProducts,
            getCategoryIcon,
            goToCategory,
            addToCart,
            handleImageError
        };
    }
}
</script>

<style scoped>
.category-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef !important;
}

.category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
    border-color: #0d6efd !important;
}

.category-icon {
    transition: transform 0.3s;
}

.category-card:hover .category-icon {
    transform: scale(1.1);
}

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

.carousel-slide {
    background-size: cover;
    background-position: center;
}
</style>
