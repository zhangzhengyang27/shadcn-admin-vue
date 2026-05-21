<script setup lang="ts">
import { ref } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-vue-next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import DataTableBulkActionsToolbar from '@/components/data-table/DataTableBulkActions.vue'
import type { User } from '../data/schema'
import UsersMultiDeleteDialog from './UsersMultiDeleteDialog.vue'

interface Props {
  table: Table<User>
}

defineProps<Props>()

const showDeleteConfirm = ref(false)

function handleBulkStatusChange(status: 'active' | 'inactive') {
  const selectedRows = []
  toast.promise(sleep(2000), {
    loading: `${status === 'active' ? 'Activating' : 'Deactivating'} users...`,
    success: () => {
      return `${selectedRows.length} users ${status === 'active' ? 'activated' : 'deactivated'}`
    },
    error: `Error ${status === 'active' ? 'activating' : 'deactivating'} users`,
  })
}

function handleBulkInvite() {
  const selectedRows = []
  toast.promise(sleep(2000), {
    loading: 'Inviting users...',
    success: () => {
      return `${selectedRows.length} users invited`
    },
    error: 'Error inviting users',
  })
}
</script>

<template>
  <div>
    <DataTableBulkActionsToolbar :table="table" entity-name="user">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkInvite()"
            class="size-8"
            aria-label="Invite selected users"
            title="Invite selected users"
          >
            <Mail />
            <span class="sr-only">Invite selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Invite selected users</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkStatusChange('active')"
            class="size-8"
            aria-label="Activate selected users"
            title="Activate selected users"
          >
            <UserCheck />
            <span class="sr-only">Activate selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Activate selected users</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkStatusChange('inactive')"
            class="size-8"
            aria-label="Deactivate selected users"
            title="Deactivate selected users"
          >
            <UserX />
            <span class="sr-only">Deactivate selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Deactivate selected users</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="destructive"
            size="icon"
            @click="showDeleteConfirm = true"
            class="size-8"
            aria-label="Delete selected users"
            title="Delete selected users"
          >
            <Trash2 />
            <span class="sr-only">Delete selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete selected users</p>
        </TooltipContent>
      </Tooltip>
    </DataTableBulkActionsToolbar>

    <UsersMultiDeleteDialog
      :open="showDeleteConfirm"
      @update:open="(val: boolean) => { showDeleteConfirm = val }"
      :table="table"
    />
  </div>
</template>
