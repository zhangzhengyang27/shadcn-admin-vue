<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

const { setOpenMobile, toggleSidebar } = useSidebar()

const toggleSidebarAndCloseMobile = () => {
  toggleSidebar()
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size='lg'
        class='gap-0 py-0 hover:bg-transparent active:bg-transparent'
        as-child
      >
        <div>
          <RouterLink
            to='/'
            @click="setOpenMobile(false)"
            class='grid flex-1 text-start text-sm leading-tight'
          >
            <span class='truncate font-bold'>Shadcn-Admin</span>
            <span class='truncate text-xs'>Vite + ShadcnUI</span>
          </RouterLink>
          <Button
            data-sidebar='trigger'
            data-slot='sidebar-trigger'
            variant='ghost'
            size='icon'
            :class="cn('aspect-square size-8 max-md:scale-125', $attrs.class)"
            @click="toggleSidebarAndCloseMobile"
          >
            <X class='md:hidden' />
            <Menu class='max-md:hidden' />
            <span class='sr-only'>Toggle Sidebar</span>
          </Button>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>