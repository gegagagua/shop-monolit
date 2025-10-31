<template>
    <div class="admin-login">
        <div class="container">
            <div class="row justify-content-center align-items-center min-vh-100">
                <div class="col-md-5">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <h2 class="card-title text-center mb-4">Admin Login</h2>
                            
                            <form @submit.prevent="handleLogin">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        id="email"
                                        v-model="form.email" 
                                        required
                                        :disabled="loading"
                                    >
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        id="password"
                                        v-model="form.password" 
                                        required
                                        :disabled="loading"
                                    >
                                </div>
                                <div class="mb-3 form-check">
                                    <input 
                                        type="checkbox" 
                                        class="form-check-input" 
                                        id="remember"
                                        v-model="form.remember"
                                    >
                                    <label class="form-check-label" for="remember">
                                        Remember me
                                    </label>
                                </div>
                                <div v-if="error" class="alert alert-danger" role="alert">
                                    {{ error }}
                                </div>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary w-100"
                                    :disabled="loading"
                                >
                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                    {{ loading ? 'Logging in...' : 'Login' }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'AdminLogin',
    setup() {
        const router = useRouter();
        const loading = ref(false);
        const error = ref('');
        const form = ref({
            email: '',
            password: '',
            remember: false
        });

        const handleLogin = async () => {
            loading.value = true;
            error.value = '';

            try {
                const response = await axios.post('/api/auth/login', form.value);
                
                if (response.data.message === 'Login successful') {
                    router.push('/admin');
                }
            } catch (err) {
                if (err.response?.data?.message) {
                    error.value = err.response.data.message;
                } else if (err.response?.data?.errors?.email) {
                    error.value = err.response.data.errors.email[0];
                } else {
                    error.value = 'Login failed. Please check your credentials.';
                }
            } finally {
                loading.value = false;
            }
        };

        return {
            form,
            loading,
            error,
            handleLogin
        };
    }
};
</script>

<style scoped>
.admin-login {
    background-color: #f8f9fa;
    min-height: 100vh;
}
</style>

