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
    username: z.string().min(2, { message: 'Username must be at least 2 characters.' }).max(30, { message: 'Username cannot exceed 30 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    bio: z.string().max(160, { message: 'Bio cannot exceed 160 characters.' }).optional(),
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
  toast.success('Profile updated!')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Profile</h3>
    <p class="text-sm text-muted-foreground">
      Manage your profile information.
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter username" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" v-bind="componentField" />
        </FormControl>
        <FormDescription>Your email address is used for login and notifications.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us about yourself" v-bind="componentField" />
        </FormControl>
        <FormDescription>Briefly describe yourself, max 160 characters.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit">Save changes</Button>
      <Button type="button" variant="outline" @click="resetForm()">Reset</Button>
    </div>
  </form>
</template>
