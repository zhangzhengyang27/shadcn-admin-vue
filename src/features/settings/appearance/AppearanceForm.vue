<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-vue-next'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const { mode, setMode } = useTheme()

const appearanceModes = [
  { value: 'light' as const, label: 'Light', icon: SunIcon },
  { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
  { value: 'system' as const, label: 'System', icon: MonitorIcon },
]

function handleModeChange(value: 'light' | 'dark' | 'system') {
  setMode(value)
  toast.success(`Switched to ${value} mode`)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Appearance</h3>
    <p class="text-sm text-muted-foreground">
      Customize the look and theme of the application.
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
