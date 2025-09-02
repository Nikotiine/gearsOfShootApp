import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RouterEnum } from '@/enum/router.enum'
import { WeaponEnum } from '@/enum/weapon.enum'

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
      component: () => import('../views/admin/AdminLayout.vue'),

      children: [
        {
          path: '',
          name: RouterEnum.ADMIN_DASHBOARD,
          component: () => import('../views/admin/AdminDashboardView.vue')
        },
        {
          path: 'gestion',
          meta: { navbar: true },
          children: [
            {
              path: 'ammunition',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.AMMUNITION_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'list/:category',
                  name: RouterEnum.AMMUNITION_LIST,
                  props: true,
                  component: () => import('../views/shared/TableWithPropsView.vue')
                },
                {
                  path: 'detail/:id',
                  name: RouterEnum.AMMUNITION_DETAIL,
                  props: true,
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: 'edit/:id',
                  name: RouterEnum.AMMUNITION_EDIT,
                  props: true,
                  component: () => import('../views/shared/FormView.vue')
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
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: 'list/:category',
                  name: RouterEnum.MAGAZINE_LIST,
                  props: true,
                  component: () => import('../views/shared/TableWithPropsView.vue')
                },
                {
                  path: 'new',
                  name: RouterEnum.MAGAZINE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'edit/:id',
                  name: RouterEnum.MAGAZINE_EDIT,
                  props: true,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'optic',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.OPTIC_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.OPTIC_LIST,
                  component: () => import('../views/shared/TableView.vue')
                },
                {
                  path: 'detail/:id',
                  props: true,
                  name: RouterEnum.OPTIC_DETAIL,
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: 'edit/:id',
                  props: true,
                  name: RouterEnum.OPTIC_EDIT,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'weapon',
              children: [
                {
                  path: 'new/' + WeaponEnum.RIFFLE,
                  name: RouterEnum.RIFFLE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'new/' + WeaponEnum.HAND_GUN,
                  name: RouterEnum.HANDGUN_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: `list/${WeaponEnum.RIFFLE}/:category`,
                  name: RouterEnum.RIFFLE_LIST,
                  props: true,
                  component: () => import('../views/shared/TableWithPropsView.vue')
                },
                {
                  path: `list/${WeaponEnum.HAND_GUN}/:category`,
                  name: RouterEnum.HANDGUN_LIST,
                  props: true,
                  component: () => import('../views/shared/TableWithPropsView.vue')
                },
                {
                  path: `detail/${WeaponEnum.HAND_GUN}/:id`,
                  name: RouterEnum.HANDGUN_DETAIL,
                  props: true,
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: `detail/${WeaponEnum.RIFFLE}/:id`,
                  name: RouterEnum.RIFFLE_DETAIL,
                  props: true,
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: `edit/${WeaponEnum.RIFFLE}/:id`,
                  name: RouterEnum.RIFFLE_EDIT,
                  props: true,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: `edit/${WeaponEnum.HAND_GUN}/:id`,
                  name: RouterEnum.HANDGUN_EDIT,
                  props: true,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'factory',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.FACTORY_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.FACTORY_LIST,
                  component: () => import('../views/shared/TableView.vue')
                },
                {
                  path: 'edit/:id',
                  props: true,
                  name: RouterEnum.FACTORY_EDIT,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'color',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.COLOR_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'material',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.MATERIAL_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'headType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.HEAD_TYPE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'bodyType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.BODY_TYPE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'weaponType',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.WEAPON_TYPE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'caliber',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.CALIBER_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'threaded-size',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.THREADED_SIZE_NEW,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            },
            {
              path: 'optic-collar',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.OPTIC_COLLAR_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'edit/:id',
                  props: true,
                  name: RouterEnum.OPTIC_COLLAR_EDIT,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.OPTIC_COLLAR_LIST,
                  component: () => import('../views/shared/TableView.vue')
                },
                {
                  path: 'detail/:id',
                  props: true,
                  name: RouterEnum.OPTIC_COLLAR_DETAIL,
                  component: () => import('../views/shared/DetailView.vue')
                }
              ]
            },
            {
              path: 'rds',
              children: [
                {
                  path: 'new',
                  name: RouterEnum.RDS_NEW,
                  component: () => import('../views/shared/FormView.vue')
                },
                {
                  path: 'list',
                  name: RouterEnum.RDS_LIST,
                  component: () => import('../views/shared/TableView.vue')
                },
                {
                  path: 'detail/:id',
                  name: RouterEnum.RDS_DETAIL,
                  props: true,
                  component: () => import('../views/shared/DetailView.vue')
                },
                {
                  path: 'edit/:id',
                  name: RouterEnum.RDS_EDIT,
                  props: true,
                  component: () => import('../views/shared/FormView.vue')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      children: [
        {
          path: '404',
          name: RouterEnum.NOTFOUND_404,
          props: true,
          component: () => import('@/views/error/ErrorNotFoundView.vue')
        }
      ]
    }
  ]
})

export default router
