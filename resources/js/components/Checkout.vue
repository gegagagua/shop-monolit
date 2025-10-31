<template>
    <div class="container py-5">
        <h1 class="mb-4">{{ t('checkout') }}</h1>
        
        <div v-if="cart.length === 0" class="alert alert-warning">
            {{ t('emptyCart') }}. <router-link to="/products">{{ t('backToProducts') }}</router-link>
        </div>

        <div v-else class="row">
            <div class="col-lg-8">
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">{{ t('deliveryInfo') }}</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleCheckout">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">{{ t('firstName') }} *</label>
                                    <input v-model="form.firstName" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">{{ t('lastName') }} *</label>
                                    <input v-model="form.lastName" type="text" class="form-control" required>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">{{ t('email') }} *</label>
                                <input v-model="form.email" type="email" class="form-control" required>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">{{ t('phone') }} *</label>
                                <input v-model="form.phone" type="tel" class="form-control" required>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">{{ t('address') }} *</label>
                                <input v-model="form.address" type="text" class="form-control" required>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">{{ t('city') }} *</label>
                                    <input v-model="form.city" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">{{ t('postalCode') }}</label>
                                    <input v-model="form.postalCode" type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">{{ t('comment') }}</label>
                                <textarea v-model="form.comment" class="form-control" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">{{ t('paymentMethod') }}</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check mb-3">
                            <input v-model="paymentMethod" class="form-check-input" type="radio" value="card" id="card">
                            <label class="form-check-label" for="card">
                                <i class="bi bi-credit-card"></i> {{ t('bankCard') }}
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input v-model="paymentMethod" class="form-check-input" type="radio" value="cash" id="cash">
                            <label class="form-check-label" for="cash">
                                <i class="bi bi-cash"></i> {{ t('cashOnDelivery') }}
                            </label>
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
                        <div v-for="item in cart" :key="item.id" class="d-flex justify-content-between mb-2 pb-2 border-bottom">
                            <div>
                                <small class="fw-bold">{{ item.name }}</small>
                                <br>
                                <small class="text-muted">x{{ item.quantity }}</small>
                            </div>
                            <small class="fw-bold">{{ (item.price * item.quantity).toFixed(2) }}₾</small>
                        </div>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ t('subtotal') }}:</span>
                            <span class="fw-bold">{{ cartTotal.toFixed(2) }}₾</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ t('delivery') }}:</span>
                            <span class="fw-bold">{{ deliveryPrice > 0 ? deliveryPrice.toFixed(2) + '₾' : t('free') }}</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="fs-5 fw-bold">{{ t('total') }}:</span>
                            <span class="fs-5 fw-bold text-primary">{{ (cartTotal + deliveryPrice).toFixed(2) }}₾</span>
                        </div>
                        
                        <button @click="handleCheckout" class="btn btn-primary btn-lg w-100" :disabled="!paymentMethod">
                            <i class="bi bi-check-circle"></i> {{ t('confirmOrder') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { useI18n } from '../composables/useI18n';

export default {
    name: 'Checkout',
    setup() {
        const router = useRouter();
        const { t } = useI18n();
        const { cart, cartTotal, clearCart } = useCart();
        
        const paymentMethod = ref('');
        const form = ref({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            comment: ''
        });

        const deliveryPrice = computed(() => {
            return cartTotal.value >= 100 ? 0 : 10;
        });

        const handleCheckout = () => {
            if (!paymentMethod.value) {
                alert(t('selectPaymentMethod'));
                return;
            }

            // In a real app, this would send data to backend
            alert(t('orderSuccess') + Math.floor(Math.random() * 10000));
            
            clearCart();
            router.push('/');
        };

        return {
            t,
            cart,
            cartTotal,
            deliveryPrice,
            paymentMethod,
            form,
            handleCheckout
        };
    }
}
</script>

