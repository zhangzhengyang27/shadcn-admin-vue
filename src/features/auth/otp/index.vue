<template>
  <AuthLayout>
    <Card class="max-w-md gap-4">
      <CardHeader>
        <CardTitle class="text-base tracking-tight">一次性验证码</CardTitle>
        <CardDescription>输入我们发送到您邮箱的验证码。</CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm />
      </CardContent>
      <CardFooter>
        <p class="px-8 text-center text-sm text-muted-foreground">
          没有收到？
          <router-link
            to="/sign-in"
            class="underline underline-offset-4 hover:text-primary"
          >
            重新发送新验证码。
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
import OtpForm from './components/OtpForm.vue'
</script>
