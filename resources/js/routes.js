import Home from './components/views/Home.vue';
import Login from './components/views/Login.vue';
import Register from './components/views/Register.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
];