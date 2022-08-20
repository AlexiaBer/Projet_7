import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue') //le render quand un user visite la route
  },
  {
    path: '/login', //le chemin, l'url de la route
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/user-login.vue') //le render quand un user visite la route
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
