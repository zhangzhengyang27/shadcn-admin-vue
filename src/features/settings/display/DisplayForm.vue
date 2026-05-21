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
    items: z.string().min(1, { message: '请选择每页显示数量。' }),
    density: z.string().min(1, { message: '请选择密度。' }),
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
  toast.success('显示设置已更新！')
  console.log(values)
})
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">显示设置</h3>
    <p class="text-sm text-muted-foreground">
      自定义项目的显示设置。
    </p>
  </div>
  <Separator />
  <form @submit="onSubmit" class="space-y-8">
    <FormField v-slot="{ componentField }" name="items">
      <FormItem>
        <FormLabel>每页显示数量</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="选择数量" />
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
        <FormDescription>每页显示的项目数量。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="density">
      <FormItem>
        <FormLabel>密度</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="选择密度" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="default">默认</SelectItem>
            <SelectItem value="comfortable">舒适</SelectItem>
            <SelectItem value="compact">紧凑</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>列表和表格的显示密度。</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="cursor" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>光标闪烁</FormLabel>
          <FormDescription>启用光标闪烁效果。</FormDescription>
        </div>
        <FormControl>
          <Switch :model-value="value" @update:model-value="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="sidebar" type="checkbox">
      <FormItem class="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div class="space-y-0.5">
          <FormLabel>侧边栏</FormLabel>
          <FormDescription>在侧边栏中显示项目。</FormDescription>
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