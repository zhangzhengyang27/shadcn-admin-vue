<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4 sm:min-w-sm">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address below and we'll send you instructions to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter>
        <p class="mx-auto px-8 text-center text-sm text-balance text-muted-foreground">
          Don't have an account?
          <router-link
            to="/sign-up"
            class="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </router-link>
          .
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
