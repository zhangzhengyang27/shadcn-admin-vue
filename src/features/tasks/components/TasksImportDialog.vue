<script setup lang="ts">
import { reactive } from 'vue'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
  open: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const form = reactive({ file: undefined as FileList | undefined })

function onSubmit() {
  if (form.file && form.file[0]) {
    const fileDetails = {
      name: form.file[0].name,
      size: form.file[0].size,
      type: form.file[0].type,
    }
    showSubmittedData(fileDetails, '您已导入以下文件：')
  }
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => { emit('update:open', val) }">
    <DialogContent class="gap-2 sm:max-w-sm">
      <DialogHeader class="text-start">
        <DialogTitle>导入任务</DialogTitle>
        <DialogDescription>
          从 CSV 文件快速导入任务。
        </DialogDescription>
      </DialogHeader>
      <Form>
        <form id="task-import-form" @submit.prevent="onSubmit" class="space-y-4">
          <FormField name="file">
            <FormItem class="my-2">
              <FormLabel>文件</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="text/csv"
                  @change="(e: Event) => { form.file = (e.target as HTMLInputElement).files ?? undefined }"
                  class="h-8 py-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </Form>
      <DialogFooter class="gap-2">
        <DialogClose as-child>
          <Button variant="outline">关闭</Button>
        </DialogClose>
        <Button type="submit" form="task-import-form">
          导入
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
