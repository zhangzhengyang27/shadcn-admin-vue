import type { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'unauthorized',
    component: () => import('@/features/errors/unauthorized.vue'),
    meta: {
      title: 'Unauthorized',
      requiresAuth: false,
    },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/features/errors/forbidden.vue'),
    meta: {
      title: 'Forbidden',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: 'not-found-error',
    component: () => import('@/features/errors/not-found-error.vue'),
    meta: {
      title: 'Not Found',
      requiresAuth: false,
    },
  },
  {
    path: '/500',
    name: 'server-error',
    component: () => import('@/features/errors/server-error.vue'),
    meta: {
      title: 'Server Error',
      requiresAuth: false,
    },
  },
  {
    path: '/503',
    name: 'maintenance',
    component: () => import('@/features/errors/maintenance.vue'),
    meta: {
      title: 'Maintenance',
      requiresAuth: false,
    },
  },
]
