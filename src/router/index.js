import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'signin',
    component: () => import('../views/Home.vue') //le render quand un user visite la route
  },
  {
    path: '/login', //le chemin, l'url de la route
    name: 'login',
    component: () => import('../views/Login.vue') //le render quand un user visite la route
  },
  {
    path: '/signin', //le chemin, l'url de la route
    name: 'signin',
    component: () => import('../views/Signin.vue') //le render quand un user visite la route
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
