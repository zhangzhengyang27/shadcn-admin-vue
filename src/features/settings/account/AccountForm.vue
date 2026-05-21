<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { languages, timeZones } from '../data'
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

const accountFormSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.').max(30, 'Name cannot exceed 30 characters.'),
    dob: z.string().min(1, 'Please select a date.'),
    language: z.string().min(1, 'Please select a language.'),
    timeZone: z.string().min(1, 'Please select a time zone.'),
    marketing: z.boolean().default(false).optional(),
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: accountFormSchema,
  initialValues: {
    name: '',
    dob: '',
    language: '',
    timeZone: '',
    marketing: true,
  },
})

const onSubmit = handleSubmit((values) => {
  toast.success('Account settings updated!')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Account</h3>
    <p class="text-sm text-muted-foreground">
      Update your account settings. Click save when finished.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Your name" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="dob">
      <FormItem>
        <FormLabel>Date of Birth</FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormDescription>Your date of birth is used for verification.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="language">
      <FormItem>
        <FormLabel>Language</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="lang in languages" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>This is the language for the interface.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="timeZone">
      <FormItem>
        <FormLabel>Time Zone</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="tz in timeZones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>This is your local time zone.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="marketing" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>Marketing emails</FormLabel>
          <FormDescription>Receive emails about new features and updates.</FormDescription>
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
