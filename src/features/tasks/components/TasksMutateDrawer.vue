<script setup lang="ts">
import { z } from 'zod'
import { reactive, watch } from 'vue'
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
  title: z.string().min(1, 'Please enter a title.'),
  status: z.string().min(1, 'Status cannot be empty.'),
  label: z.string().min(1, 'Label cannot be empty.'),
  priority: z.string().min(1, 'Priority cannot be empty.'),
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

const isUpdate = !!props.currentRow

const form = reactive<TaskForm>(
  props.currentRow ?? {
    title: '',
    status: '',
    label: '',
    priority: '',
  }
)

watch(
  () => props.currentRow,
  (newRow) => {
    if (newRow) {
      Object.assign(form, {
        title: newRow.title,
        status: newRow.status,
        label: newRow.label,
        priority: newRow.priority,
      })
    }
  },
  { immediate: true }
)

function onSubmit() {
  emit('update:open', false)
  Object.assign(form, {
    title: '',
    status: '',
    label: '',
    priority: '',
  })
  showSubmittedData(form)
}

const statusOptions = [
  { label: '进行中', value: 'in progress' },
  { label: '待办', value: 'backlog' },
  { label: '待处理', value: 'todo' },
  { label: '已取消', value: 'canceled' },
  { label: '已完成', value: 'done' },
]
</script>

<template>
  <Sheet :open="open" @update:open="(v) => { emit('update:open', v) }">
    <SheetContent class="flex flex-col">
      <SheetHeader class="text-start">
        <SheetTitle>{{ isUpdate ? '编辑任务' : '新建任务' }}</SheetTitle>
        <SheetDescription>
          {{ isUpdate ? '在此更新任务信息。' : '在此创建新任务。' }}
          完成后点击保存。
        </SheetDescription>
      </SheetHeader>
      <Form>
        <form
          id="tasks-form"
          @submit.prevent="onSubmit"
          class="flex-1 space-y-6 overflow-y-auto px-4"
        >
          <FormField name="title">
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input v-model="form.title" placeholder="输入任务标题" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="status">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <SelectDropdown
                :default-value="form.status"
                @value-change="(val: string) => { form.status = val }"
                placeholder="Select status"
                :items="statusOptions"
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="label">
            <FormItem class="relative">
              <FormLabel>标签</FormLabel>
              <FormControl>
                <RadioGroup
                  :model-value="form.label"
                  @update:model-value="(val: any) => { form.label = val ?? '' }"
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

          <FormField name="priority">
            <FormItem class="relative">
              <FormLabel>优先级</FormLabel>
              <FormControl>
                <RadioGroup
                  :model-value="form.priority"
                  @update:model-value="(val: any) => { form.priority = val ?? '' }"
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
          <Button variant="outline">取消</Button>
        </SheetClose>
        <Button type="submit" form="tasks-form">
          保存更改
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
