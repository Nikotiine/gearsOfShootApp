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
          path: 'gestion/add/weapon',
          name: 'weaponForm',
          component: () => import('../views/admin/AdminWeaponFormView.vue')
        },
        {
          path: 'gestion/list/weapon/:category',
          props: true,
          name: 'weaponList',
          component: () => import('../views/admin/AdminWeaponListView.vue')
        },
        {
          path: 'gestion/add/ammunition',
          name: 'ammunitionForm',

          component: () => import('../views/admin/AdminAmmunitionFormView.vue')
        },
        {
          path: 'gestion/list/ammunition/:category',
          props: true,
          name: 'ammunitionList',
          component: () => import('../views/admin/AdminAmmunitionListView.vue')
        },
        {
          path: 'gestion/add/factory',
          name: 'factoryForm',
          component: () => import('../views/factory/FactoryFormView.vue')
        },
        {
          path: 'gestion/add/headType',
          name: 'headTypeForm',
          component: () => import('../views/admin/AdminAmmunitionHeadTypeFormView.vue')
        },
        {
          path: 'gestion/add/bodyType',
          name: 'bodyTypeForm',
          component: () => import('../views/admin/AdminAmmunitionBodyTypeFormView.vue')
        },
        {
          path: 'gestion/add/weaponType',
          name: 'weaponTypeForm',
          component: () => import('../views/admin/AdminWeaponTypeFormView.vue')
        },
        {
          path: 'gestion/list/factories',
          props: true,
          name: 'factoriesList',
          component: () => import('../views/factory/FactoriesListView.vue')
        },
        {
          path: 'gestion/add/caliber',
          name: 'caliberTypeForm',
          component: () => import('../views/caliber/CaliberFormView.vue')
        }
      ]
    }
  ]
})

export default router
