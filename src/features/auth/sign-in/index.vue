<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please enter your credentials below to access your account.
          <router-link
            to="/sign-up"
            class="text-nowrap underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </router-link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm :redirect-to="redirect" />
      </CardContent>
      <CardFooter>
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking sign in, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
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
import UserAuthForm from './components/UserAuthForm.vue'

const props = defineProps<{
  redirect?: string
}>()

const redirect = props.redirect
</script>
