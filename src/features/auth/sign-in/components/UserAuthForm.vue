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

    <FormField v-slot="{ componentField }" name="password" class="relative">
      <FormItem>
        <FormLabel>密码</FormLabel>
        <FormControl>
          <PasswordInput placeholder="********" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <router-link
          to="/forgot-password"
          class="absolute inset-e-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75"
        >
          忘记密码？
        </router-link>
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-2" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="animate-spin" />
      <LogIn v-else />
      登录
    </Button>

    <div class="relative my-2">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          或使用以下方式登录
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
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, LogIn } from 'lucide-vue-next'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { useAuthStore } from '@/stores/auth'
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

const props = defineProps<{
  redirectTo?: string
}>()

const router = useRouter()
const isLoading = ref(false)
const auth = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, '请输入您的邮箱地址。')
      .email('请输入有效的邮箱地址。'),
    password: z
      .string()
      .min(1, '请输入您的密码。')
      .min(7, '密码至少需要7个字符。'),
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit((values) => {
  isLoading.value = true

  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: '正在登录...',
      success: () => {
        isLoading.value = false

        const mockUser = {
          accountNo: 'ACC001',
          email: values.email,
          role: ['user'],
          exp: Date.now() + 24 * 60 * 60 * 1000,
        }

        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        const targetPath = props.redirectTo || '/'
        router.replace(targetPath)

        return `欢迎回来，${values.email}！`
      },
      error: '错误',
    }
  )
})
</script>
