<template>
  <ContentSection title="显示" desc="调整显示设置以适应您的工作流程。">
    <Form
      v-slot="{ handleSubmit }"
      :validation-schema="displayFormSchema"
      :initial-values="{ items: ['recents', 'home'] }"
    >
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="items">
          <FormItem>
            <div class="mb-4">
              <FormLabel class="text-base">侧边栏</FormLabel>
              <FormDescription>选择在侧边栏中显示的项目。</FormDescription>
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

        <Button type="submit">更新显示</Button>
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
  { id: 'recents', label: '最近' },
  { id: 'home', label: '主页' },
  { id: 'applications', label: '应用' },
  { id: 'desktop', label: '桌面' },
  { id: 'downloads', label: '下载' },
  { id: 'documents', label: '文档' },
] as const

const displayFormSchema = toTypedSchema(
  z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: '您必须至少选择一个项目。',
    }),
  })
)

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
