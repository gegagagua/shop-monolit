<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="card shadow-lg">
                    <div class="card-body p-5">
                        <h2 class="text-center mb-4">{{ t('register') }}</h2>
                        
                        <form @submit.prevent="handleRegister">
                            <div class="mb-3">
                                <label for="name" class="form-label">{{ t('name') }}</label>
                                <input v-model="form.name" type="text" class="form-control" id="name" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">{{ t('email') }}</label>
                                <input v-model="form.email" type="email" class="form-control" id="email" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="phone" class="form-label">{{ t('phone') }}</label>
                                <input v-model="form.phone" type="tel" class="form-control" id="phone" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">{{ t('password') }}</label>
                                <input v-model="form.password" type="password" class="form-control" id="password" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="passwordConfirm" class="form-label">{{ t('passwordConfirm') }}</label>
                                <input v-model="form.passwordConfirm" type="password" class="form-control" id="passwordConfirm" required>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input v-model="form.agree" type="checkbox" class="form-check-input" id="agree" required>
                                <label class="form-check-label" for="agree">
                                    {{ t('agreeTerms') }} <a href="#">{{ t('terms') }}</a>
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100 btn-lg mb-3">
                                <i class="bi bi-person-plus"></i> {{ t('register') }}
                            </button>
                        </form>
                        
                        <div class="text-center">
                            <p class="mb-0">
                                {{ t('haveAccount') }} 
                                <router-link to="/login" class="text-primary">{{ t('login') }}</router-link>
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
    name: 'Register',
    setup() {
        const router = useRouter();
        const { t } = useI18n();
        const form = ref({
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirm: '',
            agree: false
        });

        const handleRegister = () => {
            if (form.value.password !== form.value.passwordConfirm) {
                alert(t('passwordsNotMatch'));
                return;
            }

            // Mock registration - in real app, this would call an API
            const user = {
                id: 1,
                name: form.value.name,
                email: form.value.email,
                phone: form.value.phone
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', 'mock-token-123');
            
            alert(t('successRegister'));
            router.push('/');
            window.location.reload(); // Reload to update header
        };

        return {
            t,
            form,
            handleRegister
        };
    }
}
</script>

