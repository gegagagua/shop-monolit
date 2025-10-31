<template>
    <header>
        <!-- Top Bar -->
        <div class="bg-primary text-white py-2">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <small><i class="bi bi-truck"></i> უფასო მიწოდება 150₾-ზე მეტ შეკვეთებზე</small>
                    </div>
                    <div class="col-md-6 text-end">
                        <router-link to="/login" class="text-white text-decoration-none me-3" v-if="!isLoggedIn">
                            <i class="bi bi-box-arrow-in-right"></i> შესვლა
                        </router-link>
                        <router-link to="/register" class="text-white text-decoration-none me-3" v-if="!isLoggedIn">
                            <i class="bi bi-person-plus"></i> რეგისტრაცია
                        </router-link>
                        <span v-if="isLoggedIn" class="text-white me-3">
                            <i class="bi bi-person"></i> {{ userName }}
                        </span>
                        <button v-if="isLoggedIn" @click="logout" class="btn btn-sm btn-outline-light">
                            გასვლა
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div class="container">
                <router-link to="/" class="navbar-brand fw-bold fs-3 text-primary">
                    <i class="bi bi-tools"></i> Shop Monolit
                </router-link>
                
                <!-- Search Bar -->
                <div class="flex-grow-1 mx-4 d-none d-lg-block">
                    <form @submit.prevent="handleSearch" class="d-flex">
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            class="form-control" 
                            placeholder="მოსაძებნად მიუთითეთ პროდუქტის სახელი..."
                        >
                        <button type="submit" class="btn btn-primary ms-2">
                            <i class="bi bi-search"></i>
                        </button>
                    </form>
                </div>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <!-- Mobile Search -->
                    <div class="d-lg-none mb-3">
                        <form @submit.prevent="handleSearch" class="d-flex">
                            <input 
                                v-model="searchQuery" 
                                type="text" 
                                class="form-control" 
                                placeholder="ძიება..."
                            >
                            <button type="submit" class="btn btn-primary ms-2">
                                <i class="bi bi-search"></i>
                            </button>
                        </form>
                    </div>

                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" active-class="active">მთავარი</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/products" class="nav-link" active-class="active">პროდუქცია</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link" active-class="active">ჩვენ შესახებ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/contact" class="nav-link" active-class="active">კონტაქტი</router-link>
                        </li>
                    </ul>
                    
                    <div class="d-flex align-items-center">
                        <router-link to="/cart" class="btn btn-outline-primary position-relative me-2">
                            <i class="bi bi-cart3"></i> კალათა
                            <span v-if="cartItemCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ cartItemCount }}
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Header',
    setup() {
        const router = useRouter();
        const isLoggedIn = ref(false);
        const userName = ref('');
        const cartItemCount = ref(0);
        const searchQuery = ref('');

        // Load cart count from localStorage
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cartItemCount.value = cart.reduce((sum, item) => sum + item.quantity, 0);
        };

        // Check if user is logged in
        const checkAuth = () => {
            const user = localStorage.getItem('user');
            if (user) {
                isLoggedIn.value = true;
                userName.value = JSON.parse(user).name || 'მომხმარებელი';
            }
        };

        const logout = () => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            isLoggedIn.value = false;
            userName.value = '';
            router.push('/');
        };

        const handleSearch = () => {
            if (searchQuery.value.trim()) {
                router.push({ path: '/products', query: { search: searchQuery.value } });
            }
        };

        const handleCartUpdate = () => {
            updateCartCount();
        };

        onMounted(() => {
            checkAuth();
            updateCartCount();
            
            // Listen for cart updates
            window.addEventListener('cartUpdated', handleCartUpdate);
        });

        // Cleanup event listener on unmount
        onUnmounted(() => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        });

        // Update cart count when route changes (but only once)
        let lastRoutePath = '';
        router.afterEach((to) => {
            if (to.path !== lastRoutePath) {
                lastRoutePath = to.path;
                updateCartCount();
            }
        });

        return {
            isLoggedIn,
            userName,
            cartItemCount,
            searchQuery,
            logout,
            handleSearch
        };
    }
}
</script>

<style scoped>
.navbar-brand {
    color: #0d6efd !important;
}

.nav-link {
    font-weight: 500;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #0d6efd !important;
}

.nav-link.active {
    color: #0d6efd !important;
    font-weight: 600;
}

.navbar {
    border-bottom: 2px solid #f0f0f0;
}

.sticky-top {
    z-index: 1020;
}

</style>
