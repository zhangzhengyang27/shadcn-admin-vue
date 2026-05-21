<template>
  <ContentSection title="个人资料" desc="这是其他用户在网站上看到您的样子。">
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
            <FormLabel>用户名</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="field" />
            </FormControl>
            <FormDescription>这是您的公开显示名称，可以是真实姓名或昵称。每30天只能修改一次。</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email" v-slot="{ field }">
          <FormItem>
            <FormLabel>邮箱</FormLabel>
            <Select :model-value="field.value" @update:model-value="field.onChange">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="选择要显示的已验证邮箱" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>您可以在 <RouterLink to="/">邮箱设置</RouterLink> 中管理已验证的邮箱地址。</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="bio" v-slot="{ field }">
          <FormItem>
            <FormLabel>简介</FormLabel>
            <FormControl>
              <Textarea placeholder="简单介绍一下您自己" class="resize-none" v-bind="field" />
            </FormControl>
            <FormDescription>您可以 <span>@mention</span> 其他用户和组织以链接到他们。</FormDescription>
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

        <Button type="submit">更新资料</Button>
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
      .min(2, '用户名至少需要2个字符。')
      .max(30, '用户名不能超过30个字符。'),
    email: z.string().email('请输入有效的邮箱地址。'),
    bio: z.string().max(160).min(4),
    urls: z.array(z.object({ value: z.string().url('请输入有效的URL。') })).optional(),
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
