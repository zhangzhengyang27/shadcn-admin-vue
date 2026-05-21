<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, { message: '用户名至少需要2个字符。' }).max(30, { message: '用户名不能超过30个字符。' }),
    email: z.string().email({ message: '请输入有效的邮箱地址。' }),
    bio: z.string().max(160, { message: '简介不能超过160个字符。' }).optional(),
    urls: z.array(z.string()).optional(),
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    username: '',
    email: '',
    bio: '',
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('个人资料已更新！')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">个人资料</h3>
    <p class="text-sm text-muted-foreground">
      管理您的个人信息。
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>用户名</FormLabel>
        <FormControl>
          <Input placeholder="输入用户名" v-bind="componentField" />
        </FormControl>
        <FormDescription>这是您的公开显示名称。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>邮箱</FormLabel>
        <FormControl>
          <Input type="email" placeholder="输入邮箱" v-bind="componentField" />
        </FormControl>
        <FormDescription>您的邮箱地址用于登录和接收通知。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>简介</FormLabel>
        <FormControl>
          <Textarea placeholder="介绍一下您自己" v-bind="componentField" />
        </FormControl>
        <FormDescription>简要描述一下自己，最多160个字符。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit">保存更改</Button>
      <Button type="button" variant="outline" @click="resetForm()">重置</Button>
    </div>
  </form>
</template>