<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="text-center mb-5">{{ t('aboutUs') }}</h1>
                
                <div class="card shadow-sm mb-4">
                    <div class="card-body p-5">
                        <h2 class="mb-4">{{ t('aboutTitle') }}</h2>
                        <p class="lead">
                            {{ t('aboutText1') }}
                        </p>
                        <p>
                            {{ t('aboutText2') }}
                        </p>
                        <p>
                            {{ t('aboutText3') }}
                        </p>
                    </div>
                </div>

                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-primary text-white rounded">
                            <i class="bi bi-award fs-1 mb-3"></i>
                            <h4>{{ t('quality') }}</h4>
                            <p class="mb-0">{{ t('qualityText') }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-success text-white rounded">
                            <i class="bi bi-truck fs-1 mb-3"></i>
                            <h4>{{ t('fastDeliveryTitle') }}</h4>
                            <p class="mb-0">{{ t('fastDeliveryText') }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="text-center p-4 bg-info text-white rounded">
                            <i class="bi bi-headset fs-1 mb-3"></i>
                            <h4>{{ t('support247') }}</h4>
                            <p class="mb-0">{{ t('supportText') }}</p>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body p-5">
                        <h3 class="mb-4">{{ t('whyShopMonolit') }}</h3>
                        <ul class="list-unstyled">
                            <li class="mb-3">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <strong>{{ t('wideRange') }}</strong> - {{ t('wideRangeText') }}
                            </li>
                            <li class="mb-3">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <strong>{{ t('bestPrices') }}</strong> - {{ t('bestPricesText') }}
                            </li>
                            <li class="mb-3">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <strong>{{ t('secureShopping') }}</strong> - {{ t('secureShoppingText') }}
                            </li>
                            <li class="mb-3">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <strong>{{ t('fastDeliveryAbout') }}</strong> - {{ t('fastDeliveryAboutText') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from '../composables/useI18n';

export default {
    name: 'About',
    setup() {
        const { t } = useI18n();
        return { t };
    }
}
</script>
