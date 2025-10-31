import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

createApp(App)
    .use(router)
    .mount('#app');
