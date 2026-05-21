import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/layout/AuthenticatedLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/features/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/features/tasks/index.vue'),
        meta: {
          title: 'Tasks',
        },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/features/users/index.vue'),
        meta: {
          title: 'Users',
        },
      },
      {
        path: 'apps',
        name: 'apps',
        component: () => import('@/features/apps/index.vue'),
        meta: {
          title: 'Apps',
        },
      },
      {
        path: 'chats',
        name: 'chats',
        component: () => import('@/features/chats/index.vue'),
        meta: {
          title: 'Chats',
        },
      },
      {
        path: 'settings',
        component: () => import('@/features/settings/index.vue'),
        meta: {
          title: 'Settings',
        },
        children: [
          {
            path: '',
            name: 'settings-profile',
            component: () => import('@/features/settings/profile/index.vue'),
            meta: {
              title: 'Profile',
            },
          },
          {
            path: 'account',
            name: 'settings-account',
            component: () => import('@/features/settings/account/index.vue'),
            meta: {
              title: 'Account',
            },
          },
          {
            path: 'appearance',
            name: 'settings-appearance',
            component: () => import('@/features/settings/appearance/index.vue'),
            meta: {
              title: 'Appearance',
            },
          },
          {
            path: 'display',
            name: 'settings-display',
            component: () => import('@/features/settings/display/index.vue'),
            meta: {
              title: 'Display',
            },
          },
          {
            path: 'notifications',
            name: 'settings-notifications',
            component: () => import('@/features/settings/notifications/index.vue'),
            meta: {
              title: 'Notifications',
            },
          },
        ],
      },
      {
        path: 'help-center',
        name: 'help-center',
        component: () => import('@/features/help-center/index.vue'),
        meta: {
          title: 'Help Center',
        },
      },
      {
        path: 'coming-soon',
        name: 'coming-soon',
        component: () => import('@/features/coming-soon/index.vue'),
        meta: {
          title: 'Coming Soon',
        },
      },
    ],
  },
]
