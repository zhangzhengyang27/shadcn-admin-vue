<template>
  <AuthLayout>
    <Card class="max-w-md gap-4">
      <CardHeader>
        <CardTitle class="text-base tracking-tight">One-Time Password</CardTitle>
        <CardDescription>Enter the verification code we sent to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm />
      </CardContent>
      <CardFooter>
        <p class="px-8 text-center text-sm text-muted-foreground">
          Haven't received it?
          <router-link
            to="/sign-in"
            class="underline underline-offset-4 hover:text-primary"
          >
            Resend a new code.
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
import OtpForm from './components/OtpForm.vue'
</script>
