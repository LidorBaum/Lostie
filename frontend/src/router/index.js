import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/useUser';
import { useNotificationStore } from '../store/useNotification';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/tag/manage/:id',
        name: 'TagManage',
        component: () => import('../views/TagManage.vue'),
        meta:{
            requiresAuth: true,
            requiresLogged: true
        }
    },
    {
        path: '/tag/:id',
        name: 'TagScan',
        component: () => import('../views/TagScan.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
          requiresLogged: true
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
        meta: {
          requiresLogged: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeResolve((to, from, next) => {
    const store = useUserStore();
    
    const requiresLogged = to.matched.some(
        record => record.meta.requiresLogged
    );
    const requiresAuth = to.matched.some(
        record => record.meta.requiresAuth
    );
    if (requiresLogged && !store.loggedUser){
        const notificationStore = useNotificationStore();
        notificationStore.newNotification(
            'warn',
            'Please login to view this page.'
        );
        next({ name: 'Home' });
    }
    if(requiresAuth && to.query.auth !== store.loggedUser?._id) {
        const notificationStore = useNotificationStore();
        notificationStore.newNotification(
            'warn',
            'You are not allowed to view this page.'
        );
        next({name: 'Home'}) 
    }
    else next();
});

export default router;
