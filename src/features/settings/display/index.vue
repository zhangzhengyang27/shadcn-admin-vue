<template>
  <ContentSection title="Display" desc="Adjust your display settings to fit your workflow.">
    <Form
      v-slot="{ handleSubmit }"
      :validation-schema="displayFormSchema"
      :initial-values="{ items: ['recents', 'home'] }"
    >
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="items">
          <FormItem>
            <div class="mb-4">
              <FormLabel class="text-base">Sidebar</FormLabel>
              <FormDescription>Select which items appear in the sidebar.</FormDescription>
            </div>

            <FormField
              v-for="item in items"
              :key="item.id"
              name="items"
              v-slot="{ field }"
            >
              <FormItem :key="item.id" class="flex flex-row items-start">
                <FormControl>
                  <Checkbox
                    :checked="field.value?.includes(item.id)"
                    @update:checked="(checked: boolean) => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(field.value?.filter((value: string) => value !== item.id))
                    }"
                  />
                </FormControl>
                <FormLabel class="font-normal">{{ item.label }}</FormLabel>
              </FormItem>
            </FormField>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">Update display</Button>
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

const items = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' },
] as const

const displayFormSchema = toTypedSchema(
  z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You must select at least one item.',
    }),
  })
)

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
