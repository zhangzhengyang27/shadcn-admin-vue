import { ref, inject, provide, onMounted, onUnmounted, type InjectionKey } from 'vue'

interface SearchContextType {
  open: ReturnType<typeof ref<boolean>>
  setOpen: (value: boolean) => void
}

const SEARCH_KEY: InjectionKey<SearchContextType> = Symbol('useSearch')

export function provideSearch() {
  const open = ref(false)

  const setOpen = (value: boolean) => {
    open.value = value
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      open.value = !open.value
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })

  provide(SEARCH_KEY, { open, setOpen })

  return { open, setOpen }
}

export function useSearch(): SearchContextType {
  const context = inject(SEARCH_KEY)

  if (!context) {
    throw new Error('useSearch has to be used within SearchProvider (provideSearch)')
  }

  return context
}
