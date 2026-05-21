import { readonly, ref, type Ref } from 'vue'
import { createInjectionState } from '@vueuse/core'
import { useDialogState } from '@/composables/useDialogState'
import type { Task } from '../data/schema'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

const [useProvideTasks, useTasks] = createInjectionState(() => {
  const { open, setOpen } = useDialogState<TasksDialogType>(null)
  const currentRow = ref<Task | null>(null)

  function setCurrentRow(row: Task | null) {
    currentRow.value = row
  }

  return {
    open,
    setOpen,
    currentRow: readonly(currentRow) as Readonly<Ref<Task | null>>,
    setCurrentRow,
  }
})

export { useProvideTasks }

export function useTasksContext() {
  const tasksContext = useTasks()

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksProvider>')
  }

  return tasksContext
}
