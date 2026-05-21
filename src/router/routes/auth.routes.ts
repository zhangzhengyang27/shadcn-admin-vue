import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/features/auth/sign-in/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
    },
    props: (route) => ({
      redirect: route.query.redirect as string | undefined,
    }),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/features/auth/sign-up/index.vue'),
    meta: {
      title: '注册',
      requiresAuth: false,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/features/auth/forgot-password/index.vue'),
    meta: {
      title: '忘记密码',
      requiresAuth: false,
    },
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('@/features/auth/otp/index.vue'),
    meta: {
      title: '验证码',
      requiresAuth: false,
    },
  },
  {
    path: '/sign-in-2',
    name: 'sign-in-2',
    component: () => import('@/features/auth/sign-in-2/index.vue'),
    meta: {
      title: '登录 - 样式二',
      requiresAuth: false,
    },
  },
]
