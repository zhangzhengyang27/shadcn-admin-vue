<template>
  <form :class="cn('grid gap-3', $attrs.class)" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>邮箱</FormLabel>
        <FormControl>
          <Input placeholder="name@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>密码</FormLabel>
        <FormControl>
          <PasswordInput placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword">
      <FormItem>
        <FormLabel>确认密码</FormLabel>
        <FormControl>
          <PasswordInput placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-2" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="animate-spin" />
      <UserPlus v-else />
      创建账户
    </Button>

    <div class="relative my-2">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          或使用以下方式注册
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
        .min(1, '请输入您的邮箱地址。')
        .email('请输入有效的邮箱地址。'),
      password: z
        .string()
        .min(1, '请输入您的密码。')
        .min(7, '密码至少需要7个字符。'),
      confirmPassword: z.string().min(1, '请确认您的密码。'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '两次输入的密码不一致。',
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
      loading: '正在创建账户...',
      success: () => {
        isLoading.value = false
        return `${values.email} 账户创建成功。`
      },
      error: '错误',
    }
  )
})
</script>
