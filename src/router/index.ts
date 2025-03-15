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
          path: 'gestion',
          children: [
            {
              path: 'ammunition',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.AMMUNITION_NEW,
                  component: () => import('../views/ammunition/AdminAmmunitionFormView.vue')
                },
                {
                  path: 'list/:category',
                  name: RouterEnum.AMMUNITION_LIST,
                  props: true,
                  component: () => import('../views/ammunition/AdminAmmunitionListView.vue')
                },
                {
                  path: 'detail/:id',
                  name: RouterEnum.AMMUNITION_DETAIL,
                  props: true,
                  component: () => import('../views/ammunition/AdminAmmunitionDetailView.vue')
                },
                {
                  path: 'edit/:id',
                  name: RouterEnum.AMMUNITION_EDIT,
                  props: true,
                  component: () => import('../views/ammunition/AdminAmmunitionFormView.vue')
                }
              ]
            },
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
                  path: 'new',
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
                  path: 'new',
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
            },
            {
              path: 'weapon',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.WEAPON_NEW,
                  component: () => import('../views/weapon/AdminWeaponFormView.vue')
                },
                {
                  path: 'list/:type/:category',
                  name: RouterEnum.WEAPON_LIST,
                  props: true,
                  component: () => import('../views/weapon/AdminWeaponListView.vue')
                },
                {
                  path: 'detail/:type/:id',
                  name: RouterEnum.WEAPON_DETAIL,
                  props: true,
                  component: () => import('../views/weapon/AdminWeaponView.vue')
                },
                {
                  path: 'edit/:type/:id',
                  name: RouterEnum.WEAPON_EDIT,
                  props: true,
                  component: () => import('../views/weapon/AdminWeaponEditView.vue')
                }
              ]
            },
            {
              path: 'factory',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.FACTORY_NEW,
                  component: () => import('../views/factory/FactoryFormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.FACTORY_LIST,
                  component: () => import('../views/factory/FactoriesListView.vue')
                }
              ]
            },
            {
              path: 'color',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.COLOR_NEW,
                  component: () => import('../views/color/ColorFormView.vue')
                }
              ]
            },
            {
              path: 'material',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.MATERIAL_NEW,
                  component: () => import('../views/material/MaterialFormView.vue')
                }
              ]
            },
            {
              path: 'headType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.HEAD_TYPE_NEW,
                  component: () => import('../views/ammunition/AdminAmmunitionHeadTypeFormView.vue')
                }
              ]
            },
            {
              path: 'bodyType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.BODY_TYPE_NEW,
                  component: () => import('../views/ammunition/AdminAmmunitionBodyTypeFormView.vue')
                }
              ]
            },
            {
              path: 'weaponType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.WEAPON_TYPE_NEW,
                  component: () => import('../views/weapon/AdminWeaponTypeFormView.vue')
                }
              ]
            },
            {
              path: 'caliber',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.CALIBER_NEW,
                  component: () => import('../views/caliber/CaliberFormView.vue')
                }
              ]
            },
            {
              path: 'threaded-size',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.THREADED_SIZE_NEW,
                  component: () => import('../views/threaded-size/ThreadedSizeFormView.vue')
                }
              ]
            },
            {
              path: 'optic-collar',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.OPTIC_COLLAR_NEW,
                  component: () => import('../views/optic/AdminOpticCollarFormView.vue')
                },
                {
                  path: 'edit/:id',
                  props: true,
                  name: RouterEnum.OPTIC_COLLAR_EDIT,
                  component: () => import('../views/optic/AdminOpticCollarFormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.OPTIC_COLLAR_LIST,
                  component: () => import('../views/optic/AdminOpticCollarListView.vue')
                },
                {
                  path: 'detail/:id',
                  props: true,
                  name: RouterEnum.OPTIC_COLLAR_DETAIL,
                  component: () => import('../views/optic/AdminOpticCollarDetailView.vue')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
