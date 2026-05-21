<template>
  <ContentSection title="Account" desc="Manage your account settings.">
    <Form v-slot="{ handleSubmit }">
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="name" v-slot="{ field }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" v-bind="field" />
            </FormControl>
            <FormDescription>This will be displayed on your profile and in emails.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="dob" v-slot="{ field }">
          <FormItem class="flex flex-col">
            <FormLabel>Date of Birth</FormLabel>
            <DatePicker :selected="field.value" @update:selected="field.onChange" />
            <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="language" v-slot="{ field }">
          <FormItem class="flex flex-col">
            <FormLabel>Language</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    :class="[
                      'w-[200px] justify-between',
                      !field.value && 'text-muted-foreground',
                    ]"
                  >
                    {{
                      field.value
                        ? languages.find((l) => l.value === field.value)?.label
                        : 'Select language'
                    }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        v-for="language in languages"
                        :key="language.value"
                        :value="language.label"
                        @select="field.onChange(language.value)"
                      >
                        <CheckIcon
                          :class="[
                            'mr-2 h-4 w-4',
                            language.value === field.value ? 'opacity-100' : 'opacity-0',
                          ]"
                        />
                        {{ language.label }}
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  </ContentSection>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import ContentSection from '../components/ContentSection.vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import DatePicker from '@/components/date-picker/DatePicker.vue'

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, 'Please enter your name.')
      .min(2, 'Name must be at least 2 characters.')
      .max(30, 'Name cannot exceed 30 characters.'),
    dob: z.date(),
    language: z.string({ message: 'Please select a language.' }),
  })
)

void accountFormSchema // used by vee-validate Form component via :validation-schema

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
