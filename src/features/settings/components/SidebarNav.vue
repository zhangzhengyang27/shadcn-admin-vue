<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
    <div class="hidden w-full min-w-40 bg-background px-1 py-2 md:block">
      <nav
        :class="
          cn(
            'flex flex-col gap-1',
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
                ? 'bg-muted font-semibold'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
              'justify-start h-auto py-2 px-3'
            )
          "
        >
          <span class="mr-3 shrink-0">
            <component :is="iconMap[item.icon]" :size="18" />
          </span>
          {{ item.title }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
