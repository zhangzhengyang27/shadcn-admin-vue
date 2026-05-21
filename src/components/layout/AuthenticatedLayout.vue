<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { provideSearch } from '@/composables/useSearch'
import AppSidebar from './AppSidebar.vue'
// import SkipToMain from '@/components/skip-to-main.vue'

interface Props {
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: true
})

const defaultOpen = computed(() => {
  return props.defaultOpen !== false && getCookie('sidebar_state') !== 'false'
})

provideSearch()
</script>

<template>
  <SidebarProvider :default-open="defaultOpen">
    <!-- <SkipToMain /> -->
    <AppSidebar />
    <SidebarInset
      :class="cn(
        // Set content container, so we can use container queries
        '@container/content',

        // If layout is fixed, set the height
        // to 100svh to prevent overflow
        'has-data-[layout=fixed]:h-svh',

        // If layout is fixed and sidebar is inset,
        // set the height to 100svh - spacing (total margins) to prevent overflow
        'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
      )"
    >
      <slot>
        <RouterView />
      </slot>
    </SidebarInset>
  </SidebarProvider>
</template>
