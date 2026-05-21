import { readonly, ref, type Ref } from 'vue'
import { createInjectionState } from '@vueuse/core'
import { useDialogState } from '@/composables/useDialogState'
import type { User } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

const [useProvideUsers, useUsers] = createInjectionState(() => {
  const { open, setOpen } = useDialogState<UsersDialogType>(null)
  const currentRow = ref<User | null>(null)

  function setCurrentRow(row: User | null) {
    currentRow.value = row
  }

  return {
    open,
    setOpen,
    currentRow: readonly(currentRow) as Readonly<Ref<User | null>>,
    setCurrentRow,
  }
})

export { useProvideUsers }

export function useUsersContext() {
  const usersContext = useUsers()

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersProvider>')
  }

  return usersContext
}
