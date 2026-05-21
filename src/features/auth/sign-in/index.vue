<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">登录</CardTitle>
        <CardDescription>
          欢迎回来！请在下方输入您的凭据以访问您的账户。
          <router-link
            to="/sign-up"
            class="text-nowrap underline underline-offset-4 hover:text-primary"
          >
            注册
          </router-link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm :redirect-to="redirect" />
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  </AuthLayout>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../AuthLayout.vue'
import UserAuthForm from './components/UserAuthForm.vue'

const props = defineProps<{
  redirect?: string
}>()

const redirect = props.redirect
</script>
