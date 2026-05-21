<template>
  <div>
    <FormField
      v-for="(_urlField, index) in urlFields"
      :key="`urls.${index}.value`"
      :name="`urls.${index}.value`"
      v-slot="{ field }"
    >
      <FormItem>
        <FormLabel :class="[index !== 0 && 'sr-only']">链接</FormLabel>
        <FormDescription :class="[index !== 0 && 'sr-only']">添加您的网站、博客或社交媒体资料链接。</FormDescription>
        <FormControl :class="[index !== 0 && 'mt-1.5']">
          <Input v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="button" variant="outline" size="sm" class="mt-2" @click="addUrl">添加链接</Button>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate'
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

const { fields, push } = useFieldArray('urls')

const urlFields = fields

const addUrl = () => {
  push({ value: '' })
}
</script>
