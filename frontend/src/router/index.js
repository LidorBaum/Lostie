import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/useUser'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tag/:id',
    name: 'TagScan',
    component: () => import('../views/TagScan.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresLogged: true 
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  const store = useUserStore()
  const requiresLogged = to.matched.some(record => record.meta.requiresLogged)
  if(requiresLogged && !store.loggedUser) next({name: 'Home'})
  else next()
})

export default router
