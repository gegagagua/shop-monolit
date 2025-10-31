<template>
    <div class="admin-products">
        <div class="container py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>Manage Products</h1>
                <div>
                    <button class="btn btn-primary" @click="openModal()">Add Product</button>
                    <router-link to="/admin" class="btn btn-outline-secondary ms-2">Back to Dashboard</router-link>
                    <button class="btn btn-outline-danger ms-2" @click="logout()">Logout</button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category?.name || 'N/A' }}</td>
                            <td>{{ product.price }} ₾</td>
                            <td>
                                <span class="badge" :class="product.featured ? 'bg-success' : 'bg-secondary'">
                                    {{ product.featured ? 'Yes' : 'No' }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-primary me-2" @click="openModal(product)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Product Modal -->
            <div class="modal fade" :class="{ show: showModal, 'd-block': showModal }" tabindex="-1" v-if="showModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h5>
                            <button type="button" class="btn-close" @click="closeModal()"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="saveProduct()">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" v-model="form.name" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" v-model="form.description"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Price</label>
                                    <input type="number" step="0.01" class="form-control" v-model="form.price" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Category</label>
                                    <select class="form-select" v-model="form.category_id" required>
                                        <option value="">Select Category</option>
                                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                            {{ cat.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Image URL</label>
                                    <input type="url" class="form-control" v-model="form.image">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Rating</label>
                                    <input type="number" min="0" max="5" class="form-control" v-model="form.rating">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Sales</label>
                                    <input type="number" min="0" class="form-control" v-model="form.sales">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="form.featured">
                                        <label class="form-check-label">Featured</label>
                                    </div>
                                </div>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" class="btn btn-secondary" @click="closeModal()">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade" :class="{ show: showModal }" v-if="showModal" @click="closeModal()"></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'AdminProducts',
    setup() {
        const products = ref([]);
        const categories = ref([]);
        const showModal = ref(false);
        const editingProduct = ref(null);
        const form = ref({
            name: '',
            description: '',
            price: 0,
            category_id: '',
            image: '',
            rating: 0,
            sales: 0,
            featured: false
        });

        const loadProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                products.value = response.data;
            } catch (error) {
                console.error('Error loading products:', error);
                alert('Error loading products');
            }
        };

        const loadCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                categories.value = response.data;
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };

        const openModal = (product = null) => {
            editingProduct.value = product;
            if (product) {
                form.value = {
                    name: product.name,
                    description: product.description || '',
                    price: product.price,
                    category_id: product.category_id,
                    image: product.image || '',
                    rating: product.rating || 0,
                    sales: product.sales || 0,
                    featured: product.featured || false
                };
            } else {
                form.value = {
                    name: '',
                    description: '',
                    price: 0,
                    category_id: '',
                    image: '',
                    rating: 0,
                    sales: 0,
                    featured: false
                };
            }
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
            editingProduct.value = null;
        };

        const saveProduct = async () => {
            try {
                if (editingProduct.value) {
                    await axios.put(`/api/products/${editingProduct.value.id}`, form.value);
                } else {
                    await axios.post('/api/products', form.value);
                }
                await loadProducts();
                closeModal();
            } catch (error) {
                console.error('Error saving product:', error);
                alert('Error saving product');
            }
        };

        const deleteProduct = async (id) => {
            if (!confirm('Are you sure you want to delete this product?')) {
                return;
            }
            try {
                await axios.delete(`/api/products/${id}`);
                await loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error deleting product');
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
            loadProducts();
            loadCategories();
        });

        return {
            products,
            categories,
            showModal,
            editingProduct,
            form,
            openModal,
            closeModal,
            saveProduct,
            deleteProduct,
            logout
        };
    }
};
</script>

<style scoped>
.admin-products {
    min-height: 100vh;
    background-color: #f8f9fa;
}
</style>

