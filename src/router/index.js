import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue') //le render quand un user visite la route
  },
  {
    path: '/login', //le chemin, l'url de la route
    name: 'login',
    component: () => import('../views/Login.vue') //le render quand un user visite la route
  },
  {
    path: '/signup', //le chemin, l'url de la route
    name: 'signup',
    component: () => import('../components/Signup.vue') //le render quand un user visite la route
  },
  {
    path: '/newsfeed', //le chemin, l'url de la route
    name: 'newsfeed',
    component: () => import('../views/Newsfeed.vue') //le render quand un user visite la route
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
