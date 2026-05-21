<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
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

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please upload a file.',
    })
    .refine(
      (files) => ['text/csv'].includes(files?.[0]?.type),
      '请上传CSV格式的文件。',
    ),
})

type ImportForm = z.infer<typeof formSchema>

const form = useForm<ImportForm>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: { file: undefined as FileList | undefined },
})

function onSubmit(values: ImportForm) {
  const file = values.file

  if (file && file[0]) {
    const fileDetails = {
      name: file[0].name,
      size: file[0].size,
      type: file[0].type,
    }
    showSubmittedData(fileDetails, '您已导入以下文件：')
  }
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => { emit('update:open', val); form.resetForm() }">
    <DialogContent class="gap-2 sm:max-w-sm">
      <DialogHeader class="text-start">
        <DialogTitle>导入任务</DialogTitle>
        <DialogDescription>
          从 CSV 文件快速导入任务。
        </DialogDescription>
      </DialogHeader>
      <Form>
        <form id="task-import-form" @submit.prevent="form.handleSubmit(onSubmit)()" class="space-y-4">
          <FormField v-slot="{ componentField: _cf }" name="file">
            <FormItem class="my-2">
              <FormLabel>文件</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="text/csv"
                  @change="(e: Event) => { form.setFieldValue('file', (e.target as HTMLInputElement).files ?? undefined as any) }"
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
