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
  table: Table<any>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const CONFIRM_WORD = 'DELETE'
const value = ref('')
const confirmPlaceholder = `Enter "${CONFIRM_WORD}" to confirm`

const selectedCount = computed(() => props.table.getFilteredSelectedRowModel().rows.length)

function handleDelete() {
  if (value.value.trim() !== CONFIRM_WORD) {
    toast.error(`Please enter "${CONFIRM_WORD}" to confirm.`)
    return
  }

  emit('update:open', false)

  const selectedRows = props.table.getFilteredSelectedRowModel().rows

  toast.promise(sleep(2000), {
    loading: 'Deleting users...',
    success: () => {
      value.value = ''
      return `${selectedRows.length} user(s) deleted`
    },
    error: 'Error',
  })
}
</script>

<template>
  <ConfirmDialog
    :open="open"
    @update:open="(val) => { emit('update:open', val) }"
    form="users-multi-delete-form"
    :disabled="value.trim() !== CONFIRM_WORD"
  >
    <template #title>
      <span class="text-destructive">
        <AlertTriangle
          class="me-1 inline-block stroke-destructive"
          :size="18"
        />
        Delete {{ selectedCount }} Users
      </span>
    </template>
    <template #desc>
      <form
        id="users-multi-delete-form"
        @submit.prevent="handleDelete()"
        class="space-y-4"
      >
        <p class="mb-2">
          Are you sure you want to delete the selected users? <br />
          This action cannot be undone.
        </p>

        <Label class="my-4 flex flex-col items-start gap-1.5">
          <span>Enter "{{ CONFIRM_WORD }}" to confirm:</span>
          <Input
            v-model="value"
            :placeholder="confirmPlaceholder"
            autofocus
          />
        </Label>

        <Alert variant="destructive">
          <AlertTitle>警告！</AlertTitle>
          <AlertDescription>
            请谨慎操作。此操作无法撤销。
          </AlertDescription>
        </Alert>
      </form>
    </template>
    <template #confirmText>删除</template>
  </ConfirmDialog>
</template>
