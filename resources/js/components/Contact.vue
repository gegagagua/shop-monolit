<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="text-center mb-5">{{ t('contactUs') }}</h1>
                
                <div class="row g-4 mb-5">
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-geo-alt-fill fs-1 text-primary mb-3"></i>
                            <h5>{{ t('addressLabel') }}</h5>
                            <p class="text-muted mb-0">{{ t('tbilisiGeorgia') }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-telephone-fill fs-1 text-primary mb-3"></i>
                            <h5>{{ t('phoneLabel') }}</h5>
                            <p class="text-muted mb-0">+995 555 123 456</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-light rounded">
                            <i class="bi bi-envelope-fill fs-1 text-primary mb-3"></i>
                            <h5>{{ t('emailLabel') }}</h5>
                            <p class="text-muted mb-0">info@shopmonolit.ge</p>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body p-4">
                        <h3 class="mb-4">{{ t('sendMessage') }}</h3>
                        <form @submit.prevent="submitForm">
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
                                <input v-model="form.phone" type="tel" class="form-control" id="phone">
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">{{ t('message') }}</label>
                                <textarea v-model="form.message" class="form-control" id="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg w-100">
                                <i class="bi bi-send"></i> {{ t('send') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';

export default {
    name: 'Contact',
    setup() {
        const { t } = useI18n();
        const form = ref({
            name: '',
            email: '',
            phone: '',
            message: ''
        });

        const submitForm = () => {
            // Here you would typically send the form data to a backend
            alert(t('messageSent'));
            form.value = {
                name: '',
                email: '',
                phone: '',
                message: ''
            };
        };

        return {
            t,
            form,
            submitForm
        };
    }
}
</script>

