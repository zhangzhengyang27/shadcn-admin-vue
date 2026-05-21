<template>
  <ContentSection title="Notifications" desc="Configure how you receive notifications.">
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
            <FormLabel>Notify me about...</FormLabel>
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
                  <FormLabel class="font-normal">All new messages</FormLabel>
                </FormItem>
                <FormItem class="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel class="font-normal">Direct messages and mentions</FormLabel>
                </FormItem>
                <FormItem class="flex items-center">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel class="font-normal">Nothing</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="relative">
          <h3 class="mb-4 text-lg font-medium">Email notifications</h3>
          <div class="space-y-4">
            <FormField name="communication_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">Communication emails</FormLabel>
                  <FormDescription>Receive emails about your account activity.</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="marketing_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">Marketing emails</FormLabel>
                  <FormDescription>Receive emails about new products, features, and more.</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="social_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">Social emails</FormLabel>
                  <FormDescription>Receive emails about friend requests and follows.</FormDescription>
                </div>
                <FormControl>
                  <Switch :checked="field.value" @update:checked="field.onChange" />
                </FormControl>
              </FormItem>
            </FormField>

            <FormField name="security_emails" v-slot="{ field }">
              <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <FormLabel class="text-base">Security emails</FormLabel>
                  <FormDescription>Receive emails about your account activity and security.</FormDescription>
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
              <FormLabel>Use different settings for my mobile devices</FormLabel>
              <FormDescription>
                You can manage mobile notifications from the
                <RouterLink
                  to="/settings"
                  class="underline decoration-dashed underline-offset-4 hover:decoration-solid"
                >
                  Mobile Settings
                </RouterLink>
                page.
              </FormDescription>
            </div>
          </FormItem>
        </FormField>

        <Button type="submit">Update notifications</Button>
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
