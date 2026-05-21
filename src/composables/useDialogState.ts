import { ref } from 'vue'

export function useDialogState<T = boolean>(initialValue: T | null = false as T) {
  const open = ref(initialValue) as Ref<T | null>

  const setOpen = (value: T | null) => {
    open.value = value
  }

  const close = () => {
    open.value = false as T
  }

  const toggle = () => {
    if (typeof open.value === 'boolean') {
      open.value = !open.value as unknown as T
    }
  }

  return {
    open,
    setOpen,
    close,
    toggle,
  }
}

type Ref<T> = {
  value: T
}
