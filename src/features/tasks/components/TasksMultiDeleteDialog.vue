<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { AlertTriangle } from 'lucide-vue-next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ConfirmDialog from '@/components/confirm-dialog.vue'

interface Props {
  open: boolean
  table: Table<unknown>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const CONFIRM_WORD = 'DELETE'
const value = ref('')
const selectedCount = computed(() => props.table.getFilteredSelectedRowModel().rows.length)
const confirmPlaceholder = `输入"${CONFIRM_WORD}"以确认`

function handleDelete() {
  if (value.value.trim() !== CONFIRM_WORD) {
    toast.error(`请输入"${CONFIRM_WORD}"以确认。`)
    return
  }

  emit('update:open', false)

  const selectedRows = props.table.getFilteredSelectedRowModel().rows

  toast.promise(sleep(2000), {
    loading: '正在删除任务...',
    success: () => {
      value.value = ''
      props.table.resetRowSelection()
      return `已删除 ${selectedRows.length} 个任务`
    },
    error: '删除失败',
  })
}
</script>

<template>
  <ConfirmDialog
    :open="open"
    @update:open="(val) => { emit('update:open', val) }"
    form="tasks-multi-delete-form"
    :disabled="value.trim() !== CONFIRM_WORD"
    destructive
  >
    <template #title>
      <span class="text-destructive">
        <AlertTriangle
          class="me-1 inline-block stroke-destructive"
          :size="18"
        />
        删除 {{ selectedCount }} 个任务
      </span>
    </template>
    <template #desc>
      <form
        id="tasks-multi-delete-form"
        @submit.prevent="handleDelete()"
        class="space-y-4"
      >
        <p class="mb-2">
          您确定要删除选中的任务吗？<br />
          此操作无法撤销。
        </p>

        <Label class="my-4 flex flex-col items-start gap-1.5">
          <span>输入"{{ CONFIRM_WORD }}"确认：</span>
          <Input
            v-model="value"
            :placeholder="confirmPlaceholder"
            autofocus
          />
        </Label>

        <Alert variant="destructive">
          <AlertTitle>警告！</AlertTitle>
          <AlertDescription>
            请谨慎操作，此操作无法撤销。
          </AlertDescription>
        </Alert>
      </form>
    </template>
    <template #confirmText>删除</template>
  </ConfirmDialog>
</template>
