import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Home from '../components/Home.vue';
import Products from '../components/Products.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Cart from '../components/Cart.vue';
import Checkout from '../components/Checkout.vue';
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import AdminProducts from '../components/admin/AdminProducts.vue';
import AdminCategories from '../components/admin/AdminCategories.vue';
import AdminLogin from '../components/admin/AdminLogin.vue';

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
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/products',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/categories',
        name: 'AdminCategories',
        component: AdminCategories,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        try {
            const response = await axios.get('/api/auth/check');
            if (response.data.authenticated) {
                next();
            } else {
                next('/admin/login');
            }
        } catch (error) {
            next('/admin/login');
        }
    } else {
        next();
    }
});

export default router;

