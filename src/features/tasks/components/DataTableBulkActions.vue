<script setup lang="ts">
import { ref } from 'vue'
import { type Table } from '@tanstack/vue-table'
import { Trash2, CircleArrowUp, ArrowUpDown, Download } from 'lucide-vue-next'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import DataTableBulkActionsToolbar from '@/components/data-table/DataTableBulkActions.vue'
import { priorities, statuses } from '../data/data'
import type { Task } from '../data/schema'
import TasksMultiDeleteDialog from './TasksMultiDeleteDialog.vue'

interface Props {
  table: Table<Task>
}

const props = defineProps<Props>()

const showDeleteConfirm = ref(false)

function handleBulkStatusChange(status: string) {
  const selectedRows = props.table.getFilteredSelectedRowModel().rows
  const selectedTasks = selectedRows.map((row) => row.original as Task)
  toast.promise(sleep(2000), {
    loading: '正在更新状态...',
    success: () => {
      props.table.resetRowSelection()
      return `已将 ${selectedTasks.length} 个任务的状态更新为"${status}"`
    },
    error: '更新状态失败',
  })
  props.table.resetRowSelection()
}

function handleBulkPriorityChange(priority: string) {
  const selectedRows = props.table.getFilteredSelectedRowModel().rows
  const selectedTasks = selectedRows.map((row) => row.original as Task)
  toast.promise(sleep(2000), {
    loading: '正在更新优先级...',
    success: () => {
      props.table.resetRowSelection()
      return `已将 ${selectedTasks.length} 个任务的优先级更新为"${priority}"`
    },
    error: '更新优先级失败',
  })
  props.table.resetRowSelection()
}

function handleBulkExport() {
  const selectedRows = props.table.getFilteredSelectedRowModel().rows
  const selectedTasks = selectedRows.map((row) => row.original as Task)
  toast.promise(sleep(2000), {
    loading: '正在导出任务...',
    success: () => {
      props.table.resetRowSelection()
      return `已导出 ${selectedTasks.length} 个任务到 CSV`
    },
    error: '导出失败',
  })
  props.table.resetRowSelection()
}
</script>

<template>
  <div>
    <DataTableBulkActionsToolbar :table="table as any" entity-name="task">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger as-child>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                class="size-8"
                aria-label="更新状态"
                title="更新状态"
              >
                <CircleArrowUp />
                <span class="sr-only">更新状态</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>更新状态</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent :side-offset="14">
          <DropdownMenuItem
            v-for="status in statuses"
            :key="status.value"
            :default-value="status.value"
            @click="handleBulkStatusChange(status.value)"
          >
            <component
              v-if="status.icon"
              :is="status.icon"
              class="size-4 text-muted-foreground"
            />
            {{ status.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger as-child>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                class="size-8"
                aria-label="更新优先级"
                title="更新优先级"
              >
                <ArrowUpDown />
                <span class="sr-only">更新优先级</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>更新优先级</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent :side-offset="14">
          <DropdownMenuItem
            v-for="priority in priorities"
            :key="priority.value"
            :default-value="priority.value"
            @click="handleBulkPriorityChange(priority.value)"
          >
            <component
              v-if="priority.icon"
              :is="priority.icon"
              class="size-4 text-muted-foreground"
            />
            {{ priority.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            @click="handleBulkExport()"
            class="size-8"
            aria-label="导出任务"
            title="导出任务"
          >
            <Download />
            <span class="sr-only">导出任务</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>导出任务</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="destructive"
            size="icon"
            @click="showDeleteConfirm = true"
            class="size-8"
            aria-label="删除所选任务"
            title="删除所选任务"
          >
            <Trash2 />
            <span class="sr-only">删除所选任务</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>删除所选任务</p>
        </TooltipContent>
      </Tooltip>
    </DataTableBulkActionsToolbar>

    <TasksMultiDeleteDialog
      :open="showDeleteConfirm"
      @update:open="(val: boolean) => { showDeleteConfirm = val }"
      :table="table as any"
    />
  </div>
</template>
