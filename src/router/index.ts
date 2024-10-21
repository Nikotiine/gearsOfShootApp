import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tir/sportif/categorie/c',
      name: 'categoryCRiffle',
      component: () => import('../views/CategoryCRiffleView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/AdminDashboardView.vue'),
      children: [
        {
          path: 'gestion/categprie-c',
          name: 'gestionCatC',
          component: () => import('../views/AddWeaponView.vue')
        }
      ]
    }
  ]
})

export default router
