<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { AcceptableValue } from 'reka-ui'
import {
  UserCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
} from 'lucide-vue-next'

const iconMap: Record<string, any> = {
  UserCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
}

const props = defineProps<{
  items: {
    href: string
    title: string
    icon: string
  }[]
  className?: string
}>()

const route = useRoute()
const router = useRouter()

const currentPath = computed(() => route.path)
const selectValue = ref(currentPath.value || '/settings')

const handleSelect = (value: AcceptableValue) => {
  selectValue.value = value as string
  router.push(value as string)
}
</script>

<template>
  <div>
    <!-- Mobile Dropdown -->
    <div class="p-1 md:hidden">
      <Select :model-value="selectValue" @update:model-value="handleSelect">
        <SelectTrigger class="h-12 sm:w-48">
          <SelectValue placeholder="主题" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="item in items" :key="item.href" :value="item.href">
            <div class="flex gap-x-4 px-2 py-1">
              <span class="scale-125">
                <component :is="iconMap[item.icon]" :size="18" />
              </span>
              <span class="text-md">{{ item.title }}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Desktop Sidebar -->
    <ScrollArea orientation="horizontal" type="always" class="hidden w-full min-w-40 bg-background px-1 py-2 md:block">
      <nav
        :class="
          cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            props.className
          )
        "
      >
        <RouterLink
          v-for="item in items"
          :key="item.href"
          :to="item.href"
          :class="
            cn(
              Button.variant?.({ variant: 'ghost' }) || '',
              currentPath === item.href
                ? 'bg-muted hover:bg-accent'
                : 'hover:bg-accent hover:underline',
              'justify-start'
            )
          "
        >
          <span class="me-2">
            <component :is="iconMap[item.icon]" :size="18" />
          </span>
          {{ item.title }}
        </RouterLink>
      </nav>
    </ScrollArea>
  </div>
</template>
