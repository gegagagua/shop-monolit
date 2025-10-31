<template>
    <div class="admin-categories">
        <div class="container py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>Manage Categories</h1>
                <div>
                    <button class="btn btn-primary" @click="openModal()">Add Category</button>
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
                            <th>Slug</th>
                            <th>Products Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categories" :key="category.id">
                            <td>{{ category.id }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.slug }}</td>
                            <td>{{ category.products_count || 0 }}</td>
                            <td>
                                <button class="btn btn-sm btn-primary me-2" @click="openModal(category)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteCategory(category.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Category Modal -->
            <div class="modal fade" :class="{ show: showModal, 'd-block': showModal }" tabindex="-1" v-if="showModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ editingCategory ? 'Edit Category' : 'Add Category' }}</h5>
                            <button type="button" class="btn-close" @click="closeModal()"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="saveCategory()">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" v-model="form.name" required>
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
    name: 'AdminCategories',
    setup() {
        const categories = ref([]);
        const showModal = ref(false);
        const editingCategory = ref(null);
        const form = ref({
            name: ''
        });

        const loadCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                categories.value = response.data;
            } catch (error) {
                console.error('Error loading categories:', error);
                alert('Error loading categories');
            }
        };

        const openModal = (category = null) => {
            editingCategory.value = category;
            if (category) {
                form.value = {
                    name: category.name
                };
            } else {
                form.value = {
                    name: ''
                };
            }
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
            editingCategory.value = null;
        };

        const saveCategory = async () => {
            try {
                if (editingCategory.value) {
                    await axios.put(`/api/categories/${editingCategory.value.id}`, form.value);
                } else {
                    await axios.post('/api/categories', form.value);
                }
                await loadCategories();
                closeModal();
            } catch (error) {
                console.error('Error saving category:', error);
                alert('Error saving category');
            }
        };

        const deleteCategory = async (id) => {
            if (!confirm('Are you sure you want to delete this category? This will also delete all products in this category.')) {
                return;
            }
            try {
                await axios.delete(`/api/categories/${id}`);
                await loadCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category');
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
            loadCategories();
        });

        return {
            categories,
            showModal,
            editingCategory,
            form,
            openModal,
            closeModal,
            saveCategory,
            deleteCategory,
            logout
        };
    }
};
</script>

<style scoped>
.admin-categories {
    min-height: 100vh;
    background-color: #f8f9fa;
}
</style>

