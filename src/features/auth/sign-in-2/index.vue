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
          <h2 class="text-lg font-semibold tracking-tight">Sign In</h2>
          <p class="text-sm text-muted-foreground">
            Enter your email and password below to sign in
            <br class="max-sm:hidden" />
            to your account. Don't have an account?
            <router-link
              to="/sign-up"
              class="text-nowrap underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </router-link>
          </p>
        </div>
        <UserAuthForm />
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
      </div>
    </div>

    <div
      class="relative h-full overflow-hidden bg-muted max-lg:hidden flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/10" />
      <div class="relative z-10 text-center space-y-4 px-8">
        <h2 class="text-2xl font-bold tracking-tight">Manage your business</h2>
        <p class="text-muted-foreground">
          A modern admin panel to help you efficiently manage your team and projects.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.vue'
import UserAuthForm from '../sign-in/components/UserAuthForm.vue'
</script>