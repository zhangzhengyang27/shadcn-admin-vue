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
        showSubmittedData(row, 'The following task has been deleted:')
      })
    }
  }, 500)
}

function handleUpdateDrawerClose() {
  setOpen('update')
  window.setTimeout(() => {
    setCurrentRow(null)
  }, 500)
}

function handleDeleteDrawerClose() {
  setOpen('delete')
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
      @update:open="() => setOpen('create')"
    />

    <TasksImportDialog
      key="tasks-import"
      :open="isImportOpen"
      @update:open="() => setOpen('import')"
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
        :title="`Delete this task: ${currentRow.id}?`"
      >
        <template #desc>
          <div>
            You are about to delete ID <strong>{{ currentRow.id }}</strong>. <br />
            This action cannot be undone.
          </div>
        </template>
        <template #confirmText>Delete</template>
      </ConfirmDialog>
    </template>
  </div>
</template>
