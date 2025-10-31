<template>
    <div class="container py-5">
        <h1 class="mb-4">{{ t('cart') }}</h1>
        
        <div v-if="cart.length === 0" class="text-center py-5">
            <i class="bi bi-cart-x fs-1 text-muted mb-3"></i>
            <h3>{{ t('emptyCart') }}</h3>
            <p class="text-muted mb-4">{{ t('addProducts') }}</p>
            <router-link to="/products" class="btn btn-primary btn-lg">
                <i class="bi bi-arrow-left"></i> {{ t('backToProducts') }}
            </router-link>
        </div>

        <div v-else class="row">
            <div class="col-lg-8">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div v-for="item in cart" :key="item.id" class="d-flex align-items-center border-bottom pb-3 mb-3">
                            <img :src="item.image" :alt="item.name" class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
                            
                            <div class="flex-grow-1">
                                <h5 class="mb-1">{{ item.name }}</h5>
                                <p class="text-muted mb-2">{{ item.category }}</p>
                                <p class="fw-bold text-primary mb-0">{{ item.price }}₾</p>
                            </div>
                            
                            <div class="d-flex align-items-center me-3">
                                <button @click="updateQuantity(item.id, item.quantity - 1)" class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-dash"></i>
                                </button>
                                <span class="mx-3 fw-bold">{{ item.quantity }}</span>
                                <button @click="updateQuantity(item.id, item.quantity + 1)" class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                            
                            <div class="text-end me-3">
                                <p class="fw-bold fs-5 mb-0">{{ (item.price * item.quantity).toFixed(2) }}₾</p>
                            </div>
                            
                            <button @click="removeFromCart(item.id)" class="btn btn-sm btn-outline-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">{{ t('orderSummary') }}</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3">
                            <span>{{ t('subtotal') }}:</span>
                            <span class="fw-bold">{{ cartTotal.toFixed(2) }}₾</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>{{ t('delivery') }}:</span>
                            <span class="fw-bold">{{ deliveryPrice > 0 ? deliveryPrice.toFixed(2) + '₾' : t('free') }}</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="fs-5 fw-bold">{{ t('total') }}:</span>
                            <span class="fs-5 fw-bold text-primary">{{ (cartTotal + deliveryPrice).toFixed(2) }}₾</span>
                        </div>
                        
                        <router-link to="/checkout" class="btn btn-primary btn-lg w-100 mb-2">
                            <i class="bi bi-credit-card"></i> {{ t('checkout') }}
                        </router-link>
                        
                        <router-link to="/products" class="btn btn-outline-secondary w-100">
                            <i class="bi bi-arrow-left"></i> {{ t('continueShopping') }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useCart } from '../composables/useCart';
import { useI18n } from '../composables/useI18n';

export default {
    name: 'Cart',
    setup() {
        const { t } = useI18n();
        const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

        const deliveryPrice = computed(() => {
            return cartTotal.value >= 100 ? 0 : 10;
        });

        return {
            t,
            cart,
            updateQuantity,
            removeFromCart,
            cartTotal,
            deliveryPrice
        };
    }
}
</script>

<style scoped>
.img-thumbnail {
    border: 1px solid #dee2e6;
}
</style>

