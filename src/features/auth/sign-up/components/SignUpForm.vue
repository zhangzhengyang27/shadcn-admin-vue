<template>
  <form :class="cn('grid gap-3', $attrs.class)" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="name@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <PasswordInput placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <PasswordInput placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-2" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="animate-spin" />
      <UserPlus v-else />
      Create Account
    </Button>

    <div class="relative my-2">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="outline" type="button" :disabled="isLoading">
        <IconGithub class="h-4 w-4" /> GitHub
      </Button>
      <Button variant="outline" type="button" :disabled="isLoading">
        <IconFacebook class="h-4 w-4" /> Facebook
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, UserPlus } from 'lucide-vue-next'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import PasswordInput from '@/components/password-input.vue'

const isLoading = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      email: z
        .string()
        .min(1, 'Please enter your email address.')
        .email('Please enter a valid email address.'),
      password: z
        .string()
        .min(1, 'Please enter your password.')
        .min(7, 'Password must be at least 7 characters.'),
      confirmPassword: z.string().min(1, 'Please confirm your password.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit((values) => {
  isLoading.value = true

  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: 'Creating account...',
      success: () => {
        isLoading.value = false
        return `${values.email} account created successfully.`
      },
      error: 'Error',
    }
  )
})
</script>
