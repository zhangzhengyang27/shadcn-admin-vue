<template>
  <div
    class="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-120 sm:p-8">
        <div class="mb-4 flex items-center justify-center">
          <Logo class="me-2" />
          <h1 class="text-xl font-medium">Shadcn Admin</h1>
        </div>
      </div>
      <div class="mx-auto flex w-full max-w-sm flex-col justify-center space-y-2">
        <div class="flex flex-col space-y-2 text-start">
          <h2 class="text-lg font-semibold tracking-tight">登录</h2>
          <p class="text-sm text-muted-foreground">
            在下方输入您的邮箱和密码以登录
            <br class="max-sm:hidden" />
            您的账户。还没有账户？
            <router-link
              to="/sign-up"
              class="text-nowrap underline underline-offset-4 hover:text-primary"
            >
              注册
            </router-link>
          </p>
        </div>
        <UserAuthForm />
        <p class="px-8 text-center text-sm text-muted-foreground">
          点击登录即表示您同意我们的
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            服务条款
          </a>
          和
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            隐私政策
          </a>
          。
        </p>
      </div>
    </div>

    <div
      class="relative h-full overflow-hidden bg-muted max-lg:hidden [&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none"
    >
      <img
        :src="dashboardLight"
        class="dark:hidden"
        width="1024"
        height="1151"
        alt="Shadcn-Admin"
      />
      <img
        :src="dashboardDark"
        class="hidden dark:block"
        width="1024"
        height="1138"
        alt="Shadcn-Admin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.vue'
import UserAuthForm from '../sign-in/components/UserAuthForm.vue'
import dashboardLight from './assets/dashboard-light.png'
import dashboardDark from './assets/dashboard-dark.png'
</script>
