<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4 sm:min-w-sm">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">忘记密码</CardTitle>
        <CardDescription>
          在下方输入您的邮箱地址，我们将向您发送重置密码的说明。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter>
        <p class="mx-auto px-8 text-center text-sm text-balance text-muted-foreground">
          没有账户？
          <router-link
            to="/sign-up"
            class="underline underline-offset-4 hover:text-primary"
          >
            注册
          </router-link>
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
import ForgotPasswordForm from './components/ForgotPasswordForm.vue'
</script>
