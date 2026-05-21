<script setup lang="ts">
import { computed } from 'vue'
import UsersActionDialog from './UsersActionDialog.vue'
import UsersDeleteDialog from './UsersDeleteDialog.vue'
import UsersInviteDialog from './UsersInviteDialog.vue'
import { useUsersContext } from './users-provider'

const { open, setOpen, currentRow, setCurrentRow } = useUsersContext()

const isAddOpen = computed(() => open.value === 'add')
const isInviteOpen = computed(() => open.value === 'invite')
const isEditOpen = computed(() => open.value === 'edit')
const isDeleteOpen = computed(() => open.value === 'delete')

function handleEditDrawerClose() {
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
    <UsersActionDialog
      key="user-add"
      :open="isAddOpen"
      @update:open="() => setOpen(null)"
    />

    <UsersInviteDialog
      key="user-invite"
      :open="isInviteOpen"
      @update:open="() => setOpen(null)"
    />

    <template v-if="currentRow">
      <UsersActionDialog
        :key="`user-edit-${currentRow.id}`"
        :open="isEditOpen"
        :current-row="currentRow"
        @update:open="handleEditDrawerClose"
      />

      <UsersDeleteDialog
        :key="`user-delete-${currentRow.id}`"
        :open="isDeleteOpen"
        :current-row="currentRow"
        @update:open="handleDeleteDrawerClose"
      />
    </template>
  </div>
</template>
