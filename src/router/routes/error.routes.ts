import type { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/errors',
    component: () => import('@/components/layout/AuthenticatedLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'unauthorized',
        name: 'unauthorized',
        component: () => import('@/features/errors/unauthorized.vue'),
        meta: {
          title: 'Unauthorized',
        },
      },
      {
        path: 'forbidden',
        name: 'forbidden',
        component: () => import('@/features/errors/forbidden.vue'),
        meta: {
          title: 'Forbidden',
        },
      },
      {
        path: 'not-found',
        name: 'not-found-error',
        component: () => import('@/features/errors/not-found-error.vue'),
        meta: {
          title: 'Not Found',
        },
      },
      {
        path: 'internal-server-error',
        name: 'server-error',
        component: () => import('@/features/errors/server-error.vue'),
        meta: {
          title: 'Server Error',
        },
      },
      {
        path: 'maintenance-error',
        name: 'maintenance',
        component: () => import('@/features/errors/maintenance.vue'),
        meta: {
          title: 'Maintenance',
        },
      },
    ],
  },
]
