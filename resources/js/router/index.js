import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Products from '../components/Products.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Cart from '../components/Cart.vue';
import Checkout from '../components/Checkout.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/products',
        name: 'Products',
        component: Products
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

