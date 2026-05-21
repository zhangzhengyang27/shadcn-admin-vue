import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { setupAuthGuards } from './guards/auth.guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/App.vue'),
    children: [
      ...authRoutes,
      ...dashboardRoutes,
      ...errorRoutes,
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/features/errors/not-found.vue'),
        meta: {
          title: 'Page Not Found',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

setupAuthGuards(router)

export default router

import { authRoutes } from './routes/auth.routes'
import { dashboardRoutes } from './routes/dashboard.routes'
import { errorRoutes } from './routes/error.routes'
