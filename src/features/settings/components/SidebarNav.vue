<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const route = useRoute()

const sidebarNavItems = [
  { title: 'Profile', href: '/settings' },
  { title: 'Account', href: '/settings/account' },
  { title: 'Appearance', href: '/settings/appearance' },
  { title: 'Notifications', href: '/settings/notifications' },
  { title: 'Display', href: '/settings/display' },
]

const currentPath = computed(() => route.path)
</script>

<template>
  <div>
    <div class="p-1 md:hidden">
      <div class="flex flex-col gap-1">
        <RouterLink
          v-for="item in sidebarNavItems"
          :key="item.href"
          :to="item.href"
          :class="cn(
            'flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            currentPath === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
          )"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </div>

    <ScrollArea class="hidden max-h-[calc(100vh-8rem)] md:block">
      <div class="flex flex-col gap-1 p-1">
        <RouterLink
          v-for="item in sidebarNavItems"
          :key="item.href"
          :to="item.href"
          :class="cn(
            'flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            currentPath === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
          )"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </ScrollArea>
  </div>
</template>
