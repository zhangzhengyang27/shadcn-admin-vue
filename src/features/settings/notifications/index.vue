<template>
  <ContentSection title="通知" desc="配置您接收通知的方式。">
    <Form
      v-slot="{ handleSubmit }"
      :validation-schema="notificationsFormSchema"
      :initial-values="{
        type: 'mentions',
        communication_emails: false,
        marketing_emails: false,
        social_emails: true,
        security_emails: true,
      }"
    >
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="type" v-slot="{ field }">
          <FormItem class="relative space-y-3">
            <FormLabel>通知我关于...</FormLabel>
            <FormControl>
              <RadioGroup
                :model-value="field.value"
                @update:model-value="field.onChange"
                class="flex flex-col gap-2"
              >
                <FormItem class="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="all" />
                  </FormControl>
                  <FormLabel class="font-normal">所有新消息</FormLabel>
                </FormItem>
                <FormItem class="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel class="font-normal">私信和提及</FormLabel>
                </FormItem>
                <FormItem class="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel class="font-normal">不接收任何通知</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="relative">
          <h3 class="mb-4 text-lg font-medium">邮件通知</h3>
          <div class="space-y-4">
            <FormField name="communication_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">通信邮件</FormLabel>
                  <FormDescription>接收有关账户活动的邮件。</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="marketing_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">营销邮件</FormLabel>
                  <FormDescription>接收有关新产品、功能等的邮件。</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="social_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">社交邮件</FormLabel>
                  <FormDescription>接收有关好友请求和关注的邮件。</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="security_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">安全邮件</FormLabel>
                  <FormDescription>接收有关账户活动和安全的邮件。</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    :checked="field.value"
                    @update:checked="field.onChange"
                    disabled
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <FormField name="mobile" v-slot="{ field }">
          <FormItem class="relative flex flex-row items-start">
            <FormControl>
              <Checkbox :checked="field.value" @update:checked="field.onChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>为移动设备使用不同设置</FormLabel>
              <FormDescription>
                您可以在
                <RouterLink
                  to="/settings"
                  class="underline decoration-dashed underline-offset-4 hover:decoration-solid"
                >
                  移动设置
                </RouterLink>
                页面管理移动通知。
              </FormDescription>
            </div>
          </FormItem>
        </FormField>

        <Button type="submit">更新通知</Button>
      </form>
    </Form>
  </ContentSection>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import ContentSection from '../components/ContentSection.vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

const notificationsFormSchema = toTypedSchema(
  z.object({
    type: z.enum(['all', 'mentions', 'none']),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
  })
)

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
