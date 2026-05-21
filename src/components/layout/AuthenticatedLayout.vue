<script setup lang="ts">
import { RouterView } from 'vue-router'
import { cn } from '@/lib/utils'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { provideSearch } from '@/composables/useSearch'
import AppSidebar from './AppSidebar.vue'
import CommandMenu from '@/components/command-menu.vue'

interface Props {
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: true
})

provideSearch()
</script>

<template>
  <SidebarProvider :default-open="defaultOpen">
    <AppSidebar />
    <SidebarInset
      :class="cn(
        '@container/content',
        'has-data-[layout=fixed]:h-svh',
        'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
      )"
    >
      <CommandMenu />
      <slot>
        <RouterView />
      </slot>
    </SidebarInset>
  </SidebarProvider>
</template>
