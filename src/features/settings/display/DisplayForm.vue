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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const displayFormSchema = toTypedSchema(
  z.object({
    items: z.string().min(1, { message: 'Please select items per page.' }),
    density: z.string().min(1, { message: 'Please select density.' }),
    cursor: z.boolean().default(false).optional(),
    sidebar: z.boolean().default(false).optional(),
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: '10',
    density: 'default',
    cursor: true,
    sidebar: false,
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('Display settings updated!')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Display</h3>
    <p class="text-sm text-muted-foreground">
      Customize display settings for items.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="items">
      <FormItem>
        <FormLabel>Items per page</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select items" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>Number of items to display per page.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="density">
      <FormItem>
        <FormLabel>Density</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select density" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="comfortable">Comfortable</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>Display density for lists and tables.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="cursor" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Cursor blink</FormLabel>
          <FormDescription>Enable cursor blink effect.</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="sidebar" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Sidebar</FormLabel>
          <FormDescription>Show items in the sidebar.</FormDescription>
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
