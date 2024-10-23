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
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminDashboardView.vue'),
      children: [
        {
          path: 'gestion/add/weapon/:category',
          name: 'weaponForm',
          props: true,
          component: () => import('../views/admin/AdminWeaponFormView.vue')
        },
        {
          path: 'gestion/list/weapon/:category',
          props: true,
          name: 'weaponList',
          component: () => import('../views/admin/AdminWeaponListView.vue')
        },
        {
          path: 'gestion/add/ammunition/:category',
          name: 'ammunitionForm',
          props: true,
          component: () => import('../views/admin/AdminAmmunitionFormView.vue')
        },
        {
          path: 'gestion/list/ammunition/:category',
          props: true,
          name: 'ammunitionList',
          component: () => import('../views/admin/AdminAmmunitionListView.vue')
        },
        {
          path: 'gestion/add/factory/:type',
          name: 'factoryForm',
          props: true,
          component: () => import('../views/factory/FactoryFormView.vue')
        }
      ]
    }
  ]
})

export default router
