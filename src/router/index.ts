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
        // Weapon
        {
          path: 'gestion/add/weapon',
          name: 'weaponAddForm',
          component: () => import('../views/weapon/AdminWeaponFormView.vue')
        },
        {
          path: 'gestion/list/weapon/:type/:category',
          props: true,
          name: 'weaponList',
          component: () => import('../views/weapon/AdminWeaponListView.vue')
        },
        {
          path: 'gestion/detail/weapon/:type/:id',
          props: true,
          name: 'weaponDetail',
          component: () => import('../views/weapon/WeaponView.vue')
        },
        {
          path: 'gestion/edit/weapon/:type/:id',
          name: 'weaponEditForm',
          props: true,
          component: () => import('../views/weapon/AdminWeaponEditView.vue')
        },
        // Ammunition
        {
          path: 'gestion/add/ammunition',
          name: 'ammunitionAddForm',
          component: () => import('../views/ammunition/AdminAmmunitionFormView.vue')
        },
        {
          path: 'gestion/list/ammunition/:category',
          props: true,
          name: 'ammunitionList',
          component: () => import('../views/ammunition/AdminAmmunitionListView.vue')
        },
        {
          path: 'gestion/detail/ammunition/:id',
          name: 'ammunitionDetail',
          props: true,
          component: () => import('../views/ammunition/AdminAmmunitionDetailView.vue')
        },
        {
          path: 'gestion/edit/ammunition/:id',
          name: 'ammunitionEditForm',
          props: true,
          component: () => import('../views/ammunition/AdminAmmunitionFormView.vue')
        },
        // Magazine
        {
          path: 'gestion/detail/magazine/:id',
          props: true,
          name: 'magazineDetail',
          component: () => import('../views/magazine/MagazineDetailView.vue')
        },
        {
          path: 'gestion/list/magazine/:category',
          props: true,
          name: 'magazineList',
          component: () => import('../views/magazine/MagazineListView.vue')
        },
        {
          path: 'gestion/add/magazine',
          name: 'mgazineAddForm',
          component: () => import('../views/magazine/AdminWeaponMagazineFormView.vue')
        },
        {
          path: 'gestion/edit/magazine/:id',
          name: 'magazineEditForm',
          props: true,
          component: () => import('../views/magazine/AdminWeaponMagazineFormView.vue')
        },
        // Optic
        {
          path: 'gestion/add/optic',
          name: 'opticAddForm',
          component: () => import('../views/optic/AdminOpticFormView.vue')
        },
        {
          path: 'gestion/add/factory',
          name: 'factoryAddForm',
          component: () => import('../views/factory/FactoryFormView.vue')
        },
        {
          path: 'gestion/add/color',
          name: 'colorAddForm',
          component: () => import('../views/color/ColorFormView.vue')
        },
        {
          path: 'gestion/add/material',
          name: 'materialAddForm',
          component: () => import('../views/material/MaterialFormView.vue')
        },
        {
          path: 'gestion/add/headType',
          name: 'headTypeAddForm',
          component: () => import('../views/ammunition/AdminAmmunitionHeadTypeFormView.vue')
        },
        {
          path: 'gestion/add/bodyType',
          name: 'bodyTypeAddForm',
          component: () => import('../views/ammunition/AdminAmmunitionBodyTypeFormView.vue')
        },
        {
          path: 'gestion/add/weaponType',
          name: 'weaponTypeAddForm',
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
          name: 'caliberAddForm',
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
