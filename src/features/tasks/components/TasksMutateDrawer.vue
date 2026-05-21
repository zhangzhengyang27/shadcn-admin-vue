<script setup lang="ts">
import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { AcceptableValue } from 'reka-ui'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import SelectDropdown from '@/components/select-dropdown.vue'
import type { Task } from '../data/schema'

const formSchema = z.object({
  title: z.string().min(1, '请输入标题。'),
  status: z.string().min(1, '状态不能为空。'),
  label: z.string().min(1, '标签不能为空。'),
  priority: z.string().min(1, '优先级不能为空。'),
})
type TaskForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  currentRow?: Task
}

const props = withDefaults(defineProps<Props>(), {
  currentRow: undefined,
})
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isUpdate = computed(() => !!props.currentRow)

const form = useForm<TaskForm>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: props.currentRow ?? {
    title: '',
    status: '',
    label: '',
    priority: '',
  },
})

function onSubmit(values: TaskForm) {
  emit('update:open', false)
  form.resetForm()
  showSubmittedData(values)
}

const statusOptions = [
  { label: 'In Progress', value: 'in progress' },
  { label: 'Backlog', value: 'backlog' },
  { label: 'Todo', value: 'todo' },
  { label: 'Canceled', value: 'canceled' },
  { label: 'Done', value: 'done' },
]
</script>

<template>
  <Sheet :open="open" @update:open="(v) => { emit('update:open', v); form.resetForm() }">
    <SheetContent class="flex flex-col">
      <SheetHeader class="text-start">
        <SheetTitle>{{ isUpdate ? '编辑' : '创建' }}任务</SheetTitle>
        <SheetDescription>
          {{ isUpdate ? '在此更新任务信息。' : '在此创建新任务。' }}
          完成后点击保存。
        </SheetDescription>
      </SheetHeader>
      <Form>
        <form
          id="tasks-form"
          @submit.prevent="form.handleSubmit(onSubmit)()"
          class="flex-1 space-y-6 overflow-y-auto px-4"
        >
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="输入任务标题" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>状态</FormLabel>
              <SelectDropdown
                :default-value="componentField.modelValue ?? ''"
                @value-change="(val: string) => { form.setFieldValue('status', val) }"
                placeholder="选择状态"
                :items="statusOptions"
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="label">
            <FormItem class="relative">
              <FormLabel>标签</FormLabel>
              <FormControl>
                <RadioGroup
                  :model-value="componentField.modelValue ?? ''"
                  @update:model-value="(val: AcceptableValue) => { form.setFieldValue('label', String(val ?? '')) }"
                  class="flex flex-col space-y-1"
                >
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="documentation" />
                    </FormControl>
                    <FormLabel class="font-normal">文档</FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="feature" />
                    </FormControl>
                    <FormLabel class="font-normal">功能</FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="bug" />
                    </FormControl>
                    <FormLabel class="font-normal">缺陷</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="priority">
            <FormItem class="relative">
              <FormLabel>优先级</FormLabel>
              <FormControl>
                <RadioGroup
                  :model-value="componentField.modelValue ?? ''"
                  @update:model-value="(val: AcceptableValue) => { form.setFieldValue('priority', String(val ?? '')) }"
                  class="flex flex-col space-y-1"
                >
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel class="font-normal">高</FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel class="font-normal">中</FormLabel>
                  </FormItem>
                  <FormItem class="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel class="font-normal">低</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </Form>
      <SheetFooter class="gap-2">
        <SheetClose as-child>
          <Button variant="outline">关闭</Button>
        </SheetClose>
        <Button type="submit" form="tasks-form">
          保存更改
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
