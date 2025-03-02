import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RouterEnum } from '@/enum/router.enum'

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
          component: () => import('../views/weapon/AdminWeaponView.vue')
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
        {
          path: 'gestion',
          children: [
            {
              path: 'magazine',
              children: [
                {
                  path: 'detail/:id',
                  props: true,
                  name: RouterEnum.MAGAZINE_DETAIL,
                  component: () => import('../views/magazine/AdminMagazineDetailView.vue')
                },
                {
                  path: 'list/:category',
                  props: true,
                  name: RouterEnum.MAGAZINE_LIST,
                  component: () => import('../views/magazine/AdminMagazineListView.vue')
                },
                {
                  path: 'add',
                  name: RouterEnum.MAGAZINE_NEW,
                  component: () => import('../views/magazine/AdminWeaponMagazineFormView.vue')
                },
                {
                  path: 'edit/:id',
                  name: RouterEnum.MAGAZINE_EDIT,
                  props: true,
                  component: () => import('../views/magazine/AdminWeaponMagazineFormView.vue')
                }
              ]
            },
            {
              path: 'optic',
              children: [
                {
                  path: 'add',
                  name: RouterEnum.OPTIC_NEW,
                  component: () => import('../views/optic/AdminOpticFormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.OPTIC_LIST,
                  component: () => import('../views/optic/AdminOpticListView.vue')
                },
                {
                  path: 'detail/:id',
                  props: true,
                  name: RouterEnum.OPTIC_DETAIL,
                  component: () => import('../views/optic/AdminOpticDetailView.vue')
                },
                {
                  path: 'edit/:id',
                  props: true,
                  name: RouterEnum.OPTIC_EDIT,
                  component: () => import('../views/optic/AdminOpticFormView.vue')
                }
              ]
            }
          ]
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
