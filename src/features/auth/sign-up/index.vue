<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">注册</CardTitle>
        <CardDescription>
          创建账户以开始使用我们的服务。
          <br />
          已有账户？
          <router-link
            to="/sign-in"
            class="underline underline-offset-4 hover:text-primary"
          >
            登录
          </router-link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p class="px-8 text-center text-sm text-muted-foreground">
          创建账户即表示您同意我们的
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
import SignUpForm from './components/SignUpForm.vue'
</script>
