import { ref, computed } from 'vue'

type SidebarType = 'default' | 'floating' | 'inset'
type LayoutMode = 'compact' | 'full'
type SidebarCollapsible = 'none' | 'icon' | 'offcanvas'
type SidebarVariant = 'sidebar' | 'inset' | 'floating'

export function useLayout() {
  const sidebarType = ref<SidebarType>('default')
  const layoutMode = ref<LayoutMode>('full')
  const sidebarOpen = ref(true)

  const isCompact = computed(() => layoutMode.value === 'compact')

  const collapsible = computed(() => {
    if (layoutMode.value === 'compact') return 'icon' as SidebarCollapsible
    return 'none' as SidebarCollapsible
  })

  const variant = computed<SidebarVariant>(() => {
    switch (sidebarType.value) {
      case 'floating':
        return 'floating'
      case 'inset':
        return 'inset'
      default:
        return 'sidebar'
    }
  })

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setSidebarType = (type: SidebarType) => {
    sidebarType.value = type
  }

  const setLayoutMode = (mode: LayoutMode) => {
    layoutMode.value = mode
  }

  return {
    sidebarType,
    layoutMode,
    sidebarOpen,
    isCompact,
    collapsible,
    variant,
    toggleSidebar,
    setSidebarType,
    setLayoutMode,
  }
}
