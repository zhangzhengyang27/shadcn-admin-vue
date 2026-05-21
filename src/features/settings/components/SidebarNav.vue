<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
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
    <nav :class="cn(
      'flex flex-col gap-0.5',
      props.className
    )
      ">
      <RouterLink v-for="item in items" :key="item.href" :to="item.href" :class="cn(
        'flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors',
        currentPath === item.href
          ? 'bg-muted font-medium text-foreground'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
      )
        ">
        <component :is="iconMap[item.icon]" :size="16" />
        {{ item.title }}
      </RouterLink>
    </nav>
  </div>
</template>