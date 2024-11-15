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
          component: () => import('../views/weapon/AdminWeaponFormView.vue')
        },
        {
          path: 'gestion/list/weapon/:category',
          props: true,
          name: 'weaponList',
          component: () => import('../views/weapon/AdminWeaponListView.vue')
        },
        {
          path: 'gestion/add/ammunition',
          name: 'ammunitionForm',

          component: () => import('../views/ammunition/AdminAmmunitionFormView.vue')
        },
        {
          path: 'gestion/list/ammunition/:category',
          props: true,
          name: 'ammunitionList',
          component: () => import('../views/ammunition/AdminAmmunitionListView.vue')
        },
        {
          path: 'gestion/add/factory',
          name: 'factoryForm',
          component: () => import('../views/factory/FactoryFormView.vue')
        },
        {
          path: 'gestion/add/optic',
          name: 'opticForm',
          component: () => import('../views/optic/AdminOpticFormView.vue')
        },
        {
          path: 'gestion/add/headType',
          name: 'headTypeForm',
          component: () => import('../views/ammunition/AdminAmmunitionHeadTypeFormView.vue')
        },
        {
          path: 'gestion/add/bodyType',
          name: 'bodyTypeForm',
          component: () => import('../views/ammunition/AdminAmmunitionBodyTypeFormView.vue')
        },
        {
          path: 'gestion/add/weaponType',
          name: 'weaponTypeForm',
          component: () => import('../views/weapon/AdminWeaponTypeFormView.vue')
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
        },
        {
          path: 'gestion/add/threaded-size',
          name: 'threadedSizeForm',
          component: () => import('../views/threaded-size/ThreadedSizeFormView.vue')
        }
      ]
    }
  ]
})

export default router
