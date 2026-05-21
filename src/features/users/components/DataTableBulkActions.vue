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

const props = defineProps<Props>()

const showDeleteConfirm = ref(false)

function handleBulkStatusChange(status: 'active' | 'inactive') {
  const selectedRows = (props.table as any).getFilteredSelectedRowModel().rows
  const selectedUsers = selectedRows.map((row: any) => row.original as User)
  ;(props.table as any).resetRowSelection()
  toast.promise(sleep(2000), {
    loading: `${status === 'active' ? '正在激活' : '正在停用'}用户...`,
    success: () => {
      return `已${status === 'active' ? '激活' : '停用'} ${selectedUsers.length} 个用户`
    },
    error: `${status === 'active' ? '激活' : '停用'}用户时出错`,
  })
}

function handleBulkInvite() {
  const selectedRows = (props.table as any).getFilteredSelectedRowModel().rows
  const selectedUsers = selectedRows.map((row: any) => row.original as User)
  ;(props.table as any).resetRowSelection()
  toast.promise(sleep(2000), {
    loading: '正在邀请用户...',
    success: () => {
      return `已邀请 ${selectedUsers.length} 个用户`
    },
    error: '邀请用户时出错',
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
            aria-label="邀请选中的用户"
            title="邀请选中的用户"
          >
            <Mail />
            <span class="sr-only">邀请选中的用户</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>邀请选中的用户</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkStatusChange('active')"
            class="size-8"
            aria-label="激活选中的用户"
            title="激活选中的用户"
          >
            <UserCheck />
            <span class="sr-only">激活选中的用户</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>激活选中的用户</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkStatusChange('inactive')"
            class="size-8"
            aria-label="停用选中的用户"
            title="停用选中的用户"
          >
            <UserX />
            <span class="sr-only">停用选中的用户</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>停用选中的用户</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="destructive"
            size="icon"
            @click="showDeleteConfirm = true"
            class="size-8"
            aria-label="删除选中的用户"
            title="删除选中的用户"
          >
            <Trash2 />
            <span class="sr-only">删除选中的用户</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>删除选中的用户</p>
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
