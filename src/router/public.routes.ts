import type { RouteRecordRaw } from 'vue-router'
import { publicWeaponRoutes } from '@/router/public/public-weapon.route'
import { publicOpticRoute } from '@/router/public/public-optic.route'
import { publicAmmunitionRoute } from '@/router/public/public-ammunition.route'
import { publicRdsRoute } from '@/router/public/public-rds.route'
import { publicMagazineRoute } from '@/router/public/public-magazine.route'
import { publicOpticCollarRoute } from '@/router/public/public-optic-collar.route'

export const publicRoutes: RouteRecordRaw = {
  path: '/tir-sportif',
  meta: { admin: false },
  component: () => import('@/views/public/PublicLayout.vue'),
  children: [
    publicWeaponRoutes,
    publicOpticRoute,
    publicAmmunitionRoute,
    publicRdsRoute,
    publicMagazineRoute,
    publicOpticCollarRoute
  ]
}
