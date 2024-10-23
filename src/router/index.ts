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
          path: 'gestion/add/weapon/:category',
          name: 'weaponForm',
          props: true,
          component: () => import('../views/AdminWeaponFormView.vue')
        },
        {
          path: 'gestion/list/weapon/:category',
          props: true,
          name: 'weaponList',
          component: () => import('../views/AdminWeaponListView.vue')
        },
        {
          path: 'gestion/add/ammuntion/:category',
          name: 'ammunitionForm',
          props: true,
          component: () => import('../views/AdminAmmunitionFormView.vue')
        }
      ]
    }
  ]
})

export default router
