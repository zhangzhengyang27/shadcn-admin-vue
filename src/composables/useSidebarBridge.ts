import { ref } from 'vue'

const sidebarOpen = ref(true)

export function useSidebarBridge() {
  return {
    open: sidebarOpen,
    setOpen: (value: boolean) => {
      sidebarOpen.value = value
    },
  }
}
