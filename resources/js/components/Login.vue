<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card shadow-lg">
                    <div class="card-body p-5">
                        <h2 class="text-center mb-4">{{ t('login') }}</h2>
                        
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="email" class="form-label">{{ t('email') }}</label>
                                <input v-model="form.email" type="email" class="form-control" id="email" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">{{ t('password') }}</label>
                                <input v-model="form.password" type="password" class="form-control" id="password" required>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input v-model="form.remember" type="checkbox" class="form-check-input" id="remember">
                                <label class="form-check-label" for="remember">
                                    {{ t('remember') }}
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100 btn-lg mb-3">
                                <i class="bi bi-box-arrow-in-right"></i> {{ t('login') }}
                            </button>
                        </form>
                        
                        <div class="text-center">
                            <p class="mb-0">
                                {{ t('noAccount') }} 
                                <router-link to="/register" class="text-primary">{{ t('register') }}</router-link>
                            </p>
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
import { useI18n } from '../composables/useI18n';

export default {
    name: 'Login',
    setup() {
        const router = useRouter();
        const { t } = useI18n();
        const form = ref({
            email: '',
            password: '',
            remember: false
        });

        const handleLogin = () => {
            // Mock login - in real app, this would call an API
            const user = {
                id: 1,
                name: t('user'),
                email: form.value.email
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', 'mock-token-123');
            
            alert(t('successLogin'));
            router.push('/');
            window.location.reload(); // Reload to update header
        };

        return {
            t,
            form,
            handleLogin
        };
    }
}
</script>

