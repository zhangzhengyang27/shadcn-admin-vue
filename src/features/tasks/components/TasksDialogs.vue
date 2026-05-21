<script setup lang="ts">
import { computed } from 'vue'
import ConfirmDialog from '@/components/confirm-dialog.vue'
import TasksImportDialog from './TasksImportDialog.vue'
import TasksMutateDrawer from './TasksMutateDrawer.vue'
import { useTasksContext } from './tasks-provider'

const { open, setOpen, currentRow, setCurrentRow } = useTasksContext()

const isCreateOpen = computed(() => open.value === 'create')
const isImportOpen = computed(() => open.value === 'import')
const isUpdateOpen = computed(() => open.value === 'update')
const isDeleteOpen = computed(() => open.value === 'delete')

function handleDeleteConfirm() {
  const row = currentRow.value
  setOpen(null)
  window.setTimeout(() => {
    setCurrentRow(null)
    if (row) {
      import('@/lib/show-submitted-data').then(({ showSubmittedData }) => {
        showSubmittedData(row, '以下任务已被删除：')
      })
    }
  }, 500)
}

function handleUpdateDrawerClose() {
  setOpen(null)
  window.setTimeout(() => {
    setCurrentRow(null)
  }, 500)
}

function handleDeleteDrawerClose() {
  setOpen(null)
  window.setTimeout(() => {
    setCurrentRow(null)
  }, 500)
}
</script>

<template>
  <div>
    <TasksMutateDrawer
      key="task-create"
      :open="isCreateOpen"
      @update:open="() => setOpen(null)"
    />

    <TasksImportDialog
      key="tasks-import"
      :open="isImportOpen"
      @update:open="() => setOpen(null)"
    />

    <template v-if="currentRow">
      <TasksMutateDrawer
        :key="`task-update-${currentRow.id}`"
        :open="isUpdateOpen"
        :current-row="currentRow"
        @update:open="handleUpdateDrawerClose"
      />

      <ConfirmDialog
        key="task-delete"
        destructive
        :open="isDeleteOpen"
        @update:open="handleDeleteDrawerClose"
        :handle-confirm="handleDeleteConfirm"
        class="max-w-md"
        :title="`删除此任务：${currentRow.id} ？`"
      >
        <template #desc>
          <div>
            您即将删除 ID 为 <strong>{{ currentRow.id }}</strong>。 <br />
            此操作无法撤销。
          </div>
        </template>
        <template #confirmText>删除</template>
      </ConfirmDialog>
    </template>
  </div>
</template>
