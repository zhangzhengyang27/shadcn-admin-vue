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
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

const notificationsFormSchema = toTypedSchema(
  z.object({
    type: z.array(z.string()).default([]).optional(),
    communication: z.boolean().default(false).optional(),
    marketing: z.boolean().default(false).optional(),
    social: z.boolean().default(false).optional(),
    security: z.boolean().default(false).optional(),
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {
    communication: true,
    marketing: false,
    social: true,
    security: true,
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('通知设置已更新！')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">通知</h3>
    <p class="text-sm text-muted-foreground">
      配置您接收通知的方式。
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ value, handleChange }" name="communication" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>通讯邮件</FormLabel>
          <FormDescription>接收关于产品更新和公告的邮件。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="marketing" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>营销邮件</FormLabel>
          <FormDescription>接收关于新功能和优惠的邮件。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="social" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>社交通知</FormLabel>
          <FormDescription>接收关于社交互动的通知。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="security" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>安全通知</FormLabel>
          <FormDescription>接收关于安全事件的通知。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit">保存更改</Button>
      <Button type="button" variant="outline" @click="resetForm()">重置</Button>
    </div>
  </form>
</template>