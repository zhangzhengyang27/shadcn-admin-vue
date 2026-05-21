<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-vue-next'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const { mode, setMode } = useTheme()

const appearanceModes = [
  { value: 'light' as const, label: '浅色', icon: SunIcon },
  { value: 'dark' as const, label: '深色', icon: MoonIcon },
  { value: 'system' as const, label: '系统', icon: MonitorIcon },
]

function handleModeChange(value: 'light' | 'dark' | 'system') {
  setMode(value)
  toast.success(`已切换到${value === 'light' ? '浅色' : value === 'dark' ? '深色' : '系统'}模式`)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">外观</h3>
    <p class="text-sm text-muted-foreground">
      自定义应用的外观和主题。
    </p>
  </div>
  <Separator />
  <div class="space-y-6">
    <div>
      <h4 class="mb-4 text-sm font-medium">主题模式</h4>
      <div class="grid grid-cols-3 gap-4">
        <Button
          v-for="m in appearanceModes"
          :key="m.value"
          variant="outline"
          :class="cn('h-auto py-4 flex flex-col gap-2', mode === m.value && 'border-primary')"
          @click="handleModeChange(m.value)"
        >
          <component :is="m.icon" class="size-5" />
          {{ m.label }}
        </Button>
      </div>
    </div>
  </div>
</template>
