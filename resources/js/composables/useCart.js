import { ref, computed } from 'vue';

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

export function useCart() {
    const addToCart = (product) => {
        const existingItem = cart.value.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.value.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCart();
        dispatchCartUpdate();
    };

    const removeFromCart = (productId) => {
        cart.value = cart.value.filter(item => item.id !== productId);
        saveCart();
        dispatchCartUpdate();
    };

    const updateQuantity = (productId, quantity) => {
        const item = cart.value.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = quantity;
                saveCart();
                dispatchCartUpdate();
            }
        }
    };

    const clearCart = () => {
        cart.value = [];
        saveCart();
        dispatchCartUpdate();
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    };

    const dispatchCartUpdate = () => {
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const cartItemCount = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const cartTotal = computed(() => {
        return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal
    };
}

