<template>
  <AuthLayout>
    <Card class="max-w-sm gap-4">
      <CardHeader>
        <CardTitle class="text-lg tracking-tight">Sign Up</CardTitle>
        <CardDescription>
          Create an account to get started with our services.
          <br />
          Already have an account?
          <router-link
            to="/sign-in"
            class="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </router-link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p class="px-8 text-center text-sm text-muted-foreground">
          By creating an account, you agree to our
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
import SignUpForm from './components/SignUpForm.vue'
</script>
