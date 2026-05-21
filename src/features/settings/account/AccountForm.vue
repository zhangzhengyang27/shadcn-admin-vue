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
    name: z.string().min(2, '姓名至少需要2个字符。').max(30, '姓名不能超过30个字符。'),
    dob: z.string().min(1, '请选择一个日期。'),
    language: z.string().min(1, '请选择一种语言。'),
    timeZone: z.string().min(1, '请选择一个时区。'),
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
  toast.success('账户设置已更新！')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">账户</h3>
    <p class="text-sm text-muted-foreground">
      更新您的账户设置，完成后点击保存。
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>姓名</FormLabel>
        <FormControl>
          <Input type="text" placeholder="您的姓名" v-bind="componentField" />
        </FormControl>
        <FormDescription>这是您的公开显示名称。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="dob">
      <FormItem>
        <FormLabel>出生日期</FormLabel>
        <FormControl>
          <Input type="date" v-bind="componentField" />
        </FormControl>
        <FormDescription>您的出生日期用于身份验证。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="language">
      <FormItem>
        <FormLabel>语言</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="选择语言" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="lang in languages" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>这是界面使用的语言。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="timeZone">
      <FormItem>
        <FormLabel>时区</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="选择时区" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="tz in timeZones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>这是您所在的本地时区。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="marketing" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>营销邮件</FormLabel>
          <FormDescription>接收关于新功能和更新的邮件。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit">保存更改</Button>
      <Button type="button" variant="outline" @click="resetForm()">重置</Button>
    </div>
  </form>
</template>