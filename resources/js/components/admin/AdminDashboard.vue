<template>
    <div class="admin-dashboard">
        <div class="container py-4">
            <h1 class="mb-4">Admin Dashboard</h1>
            
            <div class="row mb-4">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Products</h5>
                            <h2>{{ productsCount }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Categories</h5>
                            <h2>{{ categoriesCount }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-grid gap-2 d-md-flex">
                <router-link to="/admin/products" class="btn btn-primary me-md-2">
                    Manage Products
                </router-link>
                <router-link to="/admin/categories" class="btn btn-secondary">
                    Manage Categories
                </router-link>
                <button class="btn btn-outline-secondary" @click="logout()">
                    Logout
                </button>
                <router-link to="/" class="btn btn-outline-secondary ms-2">
                    Back to Shop
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'AdminDashboard',
    setup() {
        const productsCount = ref(0);
        const categoriesCount = ref(0);

        const loadStats = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/categories')
                ]);
                productsCount.value = productsRes.data.length;
                categoriesCount.value = categoriesRes.data.length;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        };

        const logout = async () => {
            try {
                await axios.post('/api/auth/logout');
                window.location.href = '/admin/login';
            } catch (error) {
                console.error('Error logging out:', error);
                window.location.href = '/admin/login';
            }
        };

        onMounted(() => {
            loadStats();
        });

        return {
            productsCount,
            categoriesCount,
            logout
        };
    }
};
</script>

<style scoped>
.admin-dashboard {
    min-height: 100vh;
    background-color: #f8f9fa;
}

.card {
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>

