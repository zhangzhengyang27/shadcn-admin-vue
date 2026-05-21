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
  toast.success('Notification settings updated!')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Notifications</h3>
    <p class="text-sm text-muted-foreground">
      Configure how you receive notifications.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ value, handleChange }" name="communication" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Communication emails</FormLabel>
          <FormDescription>Receive emails about product updates and announcements.</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="marketing" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Marketing emails</FormLabel>
          <FormDescription>Receive emails about new features and offers.</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="social" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Social notifications</FormLabel>
          <FormDescription>Receive notifications about social interactions.</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="security" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Security notifications</FormLabel>
          <FormDescription>Receive notifications about security events.</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit">Save changes</Button>
      <Button type="button" variant="outline" @click="resetForm()">Reset</Button>
    </div>
  </form>
</template>
