<template>
  <form :class="cn('grid gap-2', $attrs.class)" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>邮箱</FormLabel>
        <FormControl>
          <Input placeholder="name@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-2" :disabled="isLoading">
      继续
      <ArrowRight v-if="!isLoading" class="ms-2" />
      <Loader2 v-else class="animate-spin" />
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toast } from 'sonner'
import { ArrowRight, Loader2 } from 'lucide-vue-next'
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

const router = useRouter()
const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, '请输入您的邮箱地址。')
      .email('请输入有效的邮箱地址。'),
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: { email: '' },
})

const onSubmit = handleSubmit((values) => {
  isLoading.value = true

  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: '正在发送邮件...',
      success: () => {
        isLoading.value = false
        resetForm()
        router.push('/otp')
        return `邮件已发送至 ${values.email}`
      },
      error: '错误',
    }
  )
})
</script>
