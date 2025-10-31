<template>
    <footer class="bg-dark text-white mt-5">
        <div class="container py-5">
            <div class="row">
                <div class="col-md-4 mb-4 mb-md-0">
                    <h5 class="fw-bold mb-3">
                        <i class="bi bi-shop"></i> Shop Monolit
                    </h5>
                    <p class="text-muted">
                        {{ t('footerDescription') }}
                    </p>
                </div>
                
                <div class="col-md-2 mb-4 mb-md-0">
                    <h6 class="fw-bold mb-3">{{ t('menu') }}</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <router-link to="/" class="text-white-50 text-decoration-none">{{ t('home') }}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link to="/products" class="text-white-50 text-decoration-none">{{ t('products') }}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link to="/about" class="text-white-50 text-decoration-none">{{ t('about') }}</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link to="/contact" class="text-white-50 text-decoration-none">{{ t('contact') }}</router-link>
                        </li>
                    </ul>
                </div>
                
                <div class="col-md-3 mb-4 mb-md-0">
                    <h6 class="fw-bold mb-3">{{ t('contact') }}</h6>
                    <ul class="list-unstyled text-white-50">
                        <li class="mb-2">
                            <i class="bi bi-geo-alt"></i> {{ t('tbilisiGeorgia') }}
                        </li>
                        <li class="mb-2">
                            <i class="bi bi-telephone"></i> +995 555 123 456
                        </li>
                        <li class="mb-2">
                            <i class="bi bi-envelope"></i> info@shopmonolit.ge
                        </li>
                    </ul>
                </div>
                
                <div class="col-md-3">
                    <h6 class="fw-bold mb-3">{{ t('followUs') }}</h6>
                    <div class="d-flex gap-3">
                        <a href="#" class="text-white-50">
                            <i class="bi bi-facebook fs-4"></i>
                        </a>
                        <a href="#" class="text-white-50">
                            <i class="bi bi-instagram fs-4"></i>
                        </a>
                        <a href="#" class="text-white-50">
                            <i class="bi bi-twitter fs-4"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <hr class="my-4 bg-secondary">
            
            <div class="row">
                <div class="col-md-12 text-center text-white-50">
                    <p class="mb-0">&copy; {{ currentYear }} Shop Monolit. {{ t('allRightsReserved') }}.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { useI18n } from '../../composables/useI18n';

export default {
    name: 'Footer',
    setup() {
        const { t } = useI18n();
        const currentYear = new Date().getFullYear();
        return {
            t,
            currentYear
        };
    }
}
</script>

<style scoped>
.text-white-50 {
    color: rgba(255, 255, 255, 0.6) !important;
}

.text-white-50:hover {
    color: rgba(255, 255, 255, 0.9) !important;
}

a {
    transition: color 0.3s;
}
</style>

