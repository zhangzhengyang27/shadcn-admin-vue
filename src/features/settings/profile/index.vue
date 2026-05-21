<template>
  <ContentSection title="Profile" desc="This is how others will see you on the site.">
    <Form
      v-slot="{ handleSubmit }"
      :validation-schema="profileFormSchema"
      :initial-values="{
        bio: 'I own a computer.',
        urls: [
          { value: 'https://shadcn.com' },
          { value: 'http://twitter.com/shadcn' },
        ],
      }"
    >
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="username" v-slot="{ field }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="field" />
            </FormControl>
            <FormDescription>
              This is your public display name. It can be your real name or a pseudonym. You can only change it once every 30 days.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email" v-slot="{ field }">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Select :model-value="field.value" @update:model-value="field.onChange">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage verified email addresses in your
              <RouterLink to="/">email settings</RouterLink>.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="bio" v-slot="{ field }">
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us a little bit about yourself" class="resize-none" v-bind="field" />
            </FormControl>
            <FormDescription>
              You can <span>@mention</span> other users and organizations to link to them.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <div>
          <FormField
            v-for="(_urlField, index) in urlFields"
            :key="`urls.${index}.value`"
            :name="`urls.${index}.value`"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel :class="[index !== 0 && 'sr-only']">URLs</FormLabel>
              <FormDescription :class="[index !== 0 && 'sr-only']">
                Add your website, blog, or social media profiles.
              </FormDescription>
              <FormControl :class="[index !== 0 && 'mt-1.5']">
                <Input v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="button" variant="outline" size="sm" class="mt-2" @click="addUrl">
            Add URL
          </Button>
        </div>

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  </ContentSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useFieldArray } from 'vee-validate'
import ContentSection from '../components/ContentSection.vue'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, 'Name must be at least 2 characters.')
      .max(30, 'Name must not exceed 30 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    bio: z.string().max(160).min(4),
    urls: z.array(z.object({ value: z.string().url('Please enter a valid URL.') })).optional(),
  })
)

const { fields, push } = useFieldArray('urls')

const urlFields = ref(fields.value || [])

const addUrl = () => {
  push({ value: '' })
}

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
