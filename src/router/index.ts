import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { errorRoutes } from '@/router/error.routes'
import { adminRoutes } from '@/router/admin.routes'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { publicRoutes } from '@/router/public.routes'
import { breadcrumbGuard } from '@/router/guards/breadcrumb.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PublicRouterEnum.HOME,
      component: HomeView
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    publicRoutes,
    adminRoutes,
    errorRoutes
  ]
})
breadcrumbGuard(router)
export default router
