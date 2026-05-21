<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ConfirmDialog from '@/components/confirm-dialog.vue'
import type { User } from '../data/schema'

interface Props {
  open: boolean
  currentRow: User
}

defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const value = ref('')

function handleDelete() {
  emit('update:open', false)
  showSubmittedData({ username: value.value }, '以下用户已被删除：')
}
</script>

<template>
  <ConfirmDialog
    :open="open"
    @update:open="(val) => { emit('update:open', val) }"
    form="users-delete-form"
    :disabled="value.trim() !== currentRow.username"
  >
    <template #title>
      <span class="text-destructive">
        <AlertTriangle
          class="me-1 inline-block stroke-destructive"
          :size="18"
        />
        删除用户
      </span>
    </template>
    <template #desc>
      <form
        id="users-delete-form"
        @submit.prevent="handleDelete()"
        class="space-y-4"
      >
        <p class="mb-2">
          您确定要删除 <span class="font-bold">{{ currentRow.username }}</span>?
          <br />
          此操作将永久删除角色为 <span class="font-bold">{{ currentRow.role.toUpperCase() }}</span> 的用户，此操作无法撤销。
        </p>

        <Label class="my-2">
          用户名：
          <Input
            v-model="value"
            placeholder="输入用户名以确认删除。"
            autofocus
          />
        </Label>

        <Alert variant="destructive">
          <AlertTitle>警告！</AlertTitle>
          <AlertDescription>
            请谨慎操作，此操作不可撤销。
          </AlertDescription>
        </Alert>
      </form>
    </template>
    <template #confirmText>删除</template>
  </ConfirmDialog>
</template>
