<script setup lang="ts">
import { ref } from 'vue'
import { Check, RotateCcw } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTheme } from '@/composables/useTheme'
import { useLayout } from '@/composables/useLayout'

const open = ref(false)

const { theme, setTheme, resetTheme } = useTheme()
const { sidebarType, setSidebarType, layoutMode, setLayoutMode } = useLayout()

const handleReset = () => {
  resetTheme()
  setSidebarType('inset')
  setLayoutMode('default')
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline" size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2" />
        </svg>
      </Button>
    </SheetTrigger>
    <SheetContent class="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Theme Settings</SheetTitle>
        <SheetDescription>Adjust the appearance and layout to suit your preferences.</SheetDescription>
      </SheetHeader>

      <div class="mt-6 space-y-8">
        <!-- Theme -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold">Theme</h3>
            <RotateCcw :size="14" class="cursor-pointer text-muted-foreground hover:text-foreground" @click="resetTheme" />
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                theme === 'system' ? 'border-primary' : 'border-muted'
              )"
              @click="setTheme('system')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="4" fill="#f1f5f9" />
                <rect x="8" y="8" width="24" height="64" rx="4" fill="#e2e8f0" />
                <circle cx="20" cy="18" r="5" fill="#cbd5e1" />
                <rect x="14" y="28" width="12" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="14" y="35" width="12" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="14" y="42" width="12" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="40" y="10" width="72" height="8" rx="2" fill="#e2e8f0" />
                <rect x="40" y="24" width="40" height="6" rx="2" fill="#e2e8f0" />
                <rect x="40" y="36" width="72" height="34" rx="4" fill="#e2e8f0" />
                <circle cx="96" cy="56" r="10" fill="#cbd5e1" />
              </svg>
              <span class="text-xs font-medium">System</span>
              <div
                v-if="theme === 'system'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                theme === 'light' ? 'border-primary' : 'border-muted'
              )"
              @click="setTheme('light')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
                <rect x="8" y="8" width="24" height="64" rx="4" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1" />
                <circle cx="20" cy="18" r="5" fill="#e2e8f0" />
                <rect x="14" y="28" width="12" height="3" rx="1.5" fill="#e2e8f0" />
                <rect x="14" y="35" width="12" height="3" rx="1.5" fill="#e2e8f0" />
                <rect x="14" y="42" width="12" height="3" rx="1.5" fill="#e2e8f0" />
                <rect x="40" y="10" width="72" height="8" rx="2" fill="#f1f5f9" />
                <rect x="40" y="24" width="40" height="6" rx="2" fill="#f1f5f9" />
                <rect x="40" y="36" width="72" height="34" rx="4" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
                <circle cx="96" cy="56" r="10" fill="#e2e8f0" />
              </svg>
              <span class="text-xs font-medium">Light</span>
              <div
                v-if="theme === 'light'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                theme === 'dark' ? 'border-primary' : 'border-muted'
              )"
              @click="setTheme('dark')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="4" fill="#0f172a" />
                <rect x="8" y="8" width="24" height="64" rx="4" fill="#1e293b" />
                <circle cx="20" cy="18" r="5" fill="#334155" />
                <rect x="14" y="28" width="12" height="3" rx="1.5" fill="#334155" />
                <rect x="14" y="35" width="12" height="3" rx="1.5" fill="#334155" />
                <rect x="14" y="42" width="12" height="3" rx="1.5" fill="#334155" />
                <rect x="40" y="10" width="72" height="8" rx="2" fill="#1e293b" />
                <rect x="40" y="24" width="40" height="6" rx="2" fill="#1e293b" />
                <rect x="40" y="36" width="72" height="34" rx="4" fill="#1e293b" />
                <circle cx="96" cy="56" r="10" fill="#334155" />
              </svg>
              <span class="text-xs font-medium">Dark</span>
              <div
                v-if="theme === 'dark'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold">Sidebar</h3>
          <div class="grid grid-cols-3 gap-3">
            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                sidebarType === 'inset' ? 'border-primary' : 'border-muted'
              )"
              @click="setSidebarType('inset')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                <rect x="8" y="8" width="30" height="64" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
                <circle cx="23" cy="20" r="5" fill="#334155" />
                <rect x="15" y="32" width="16" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="15" y="39" width="16" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="15" y="46" width="16" height="3" rx="1.5" fill="#94a3b8" />
                <rect x="44" y="10" width="68" height="58" rx="4" fill="#f1f5f9" />
                <rect x="52" y="18" width="36" height="5" rx="2" fill="#e2e8f0" />
                <rect x="52" y="28" width="52" height="28" rx="4" fill="#e2e8f0" />
              </svg>
              <span class="text-xs font-medium">Inset</span>
              <div
                v-if="sidebarType === 'inset'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                sidebarType === 'floating' ? 'border-primary' : 'border-muted'
              )"
              @click="setSidebarType('floating')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" />
                <rect x="10" y="8" width="26" height="64" rx="6" fill="#64748b" />
                <circle cx="23" cy="20" r="4" fill="#ffffff" opacity="0.7" />
                <rect x="16" y="30" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.5" />
                <rect x="16" y="36" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.5" />
                <rect x="16" y="42" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.5" />
                <rect x="44" y="10" width="66" height="58" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="52" y="18" width="36" height="5" rx="2" fill="#f1f5f9" />
                <rect x="52" y="28" width="50" height="28" rx="4" fill="#f1f5f9" />
              </svg>
              <span class="text-xs font-medium">Floating</span>
              <div
                v-if="sidebarType === 'floating'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                sidebarType === 'default' ? 'border-primary' : 'border-muted'
              )"
              @click="setSidebarType('default')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" />
                <rect x="0" y="0" width="32" height="80" fill="#f1f5f9" />
                <circle cx="16" cy="18" r="4.5" fill="#94a3b8" />
                <rect x="8" y="30" width="16" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="8" y="38" width="16" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="8" y="46" width="16" height="3" rx="1.5" fill="#cbd5e1" />
                <rect x="40" y="10" width="72" height="60" rx="4" fill="#ffffff" />
              </svg>
              <span class="text-xs font-medium">Sidebar</span>
              <div
                v-if="sidebarType === 'default'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>
          </div>
        </div>

        <!-- Layout -->
        <div class="space-y-3">
          <h3 class="text-sm font-semibold">Layout</h3>
          <div class="grid grid-cols-3 gap-3">
            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                layoutMode === 'default' ? 'border-primary' : 'border-muted'
              )"
              @click="setLayoutMode('default')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                <rect x="8" y="8" width="24" height="64" rx="4" fill="#334155" />
                <circle cx="20" cy="17" r="4" fill="#ffffff" opacity="0.8" />
                <rect x="13" y="27" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.4" />
                <rect x="13" y="33" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.4" />
                <rect x="13" y="39" width="14" height="2.5" rx="1.25" fill="#ffffff" opacity="0.4" />
                <rect x="38" y="8" width="74" height="10" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="44" y="11" width="24" height="4" rx="2" fill="#e2e8f0" />
                <rect x="38" y="24" width="74" height="48" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="46" y="32" width="30" height="4" rx="2" fill="#f1f5f9" />
                <rect x="46" y="41" width="58" height="22" rx="4" fill="#f1f5f9" />
                <circle cx="98" cy="59" r="7" fill="#e2e8f0" />
                <rect x="82" y="54" width="8" height="2" rx="1" fill="#e2e8f0" />
                <rect x="82" y="59" width="8" height="2" rx="1" fill="#e2e8f0" />
              </svg>
              <span class="text-xs font-medium">Default</span>
              <div
                v-if="layoutMode === 'default'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                layoutMode === 'compact' ? 'border-primary' : 'border-muted'
              )"
              @click="setLayoutMode('compact')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                <rect x="6" y="8" width="16" height="64" rx="4" fill="#94a3b8" />
                <circle cx="14" cy="17" r="3.5" fill="#ffffff" opacity="0.8" />
                <rect x="9" y="26" width="10" height="2" rx="1" fill="#ffffff" opacity="0.4" />
                <rect x="9" y="31" width="10" height="2" rx="1" fill="#ffffff" opacity="0.4" />
                <rect x="9" y="36" width="10" height="2" rx="1" fill="#ffffff" opacity="0.4" />
                <rect x="28" y="8" width="86" height="10" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="34" y="11" width="24" height="4" rx="2" fill="#e2e8f0" />
                <rect x="28" y="24" width="86" height="48" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="36" y="32" width="30" height="4" rx="2" fill="#f1f5f9" />
                <rect x="36" y="41" width="70" height="22" rx="4" fill="#f1f5f9" />
                <circle cx="100" cy="56" r="7" fill="#e2e8f0" />
                <rect x="84" y="51" width="8" height="2" rx="1" fill="#e2e8f0" />
                <rect x="84" y="56" width="8" height="2" rx="1" fill="#e2e8f0" />
              </svg>
              <span class="text-xs font-medium">Compact</span>
              <div
                v-if="layoutMode === 'compact'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>

            <button
              type="button"
              :class="cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-3 transition-colors hover:bg-accent',
                layoutMode === 'full' ? 'border-primary' : 'border-muted'
              )"
              @click="setLayoutMode('full')"
            >
              <svg viewBox="0 0 120 80" class="mb-2 h-16 w-full overflow-hidden rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="80" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
                <rect x="8" y="8" width="104" height="10" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="14" y="11" width="24" height="4" rx="2" fill="#e2e8f0" />
                <rect x="8" y="24" width="104" height="48" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <rect x="16" y="32" width="30" height="4" rx="2" fill="#f1f5f9" />
                <rect x="16" y="41" width="88" height="22" rx="4" fill="#f1f5f9" />
                <circle cx="102" cy="53" r="7" fill="#e2e8f0" />
                <rect x="84" y="48" width="10" height="2" rx="1" fill="#e2e8f0" />
                <rect x="84" y="54" width="10" height="2" rx="1" fill="#e2e8f0" />
              </svg>
              <span class="text-xs font-medium">Full layout</span>
              <div
                v-if="layoutMode === 'full'"
                :class="cn('absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground')"
              >
                <Check :size="12" />
              </div>
            </button>
          </div>
        </div>

        <!-- Reset Button -->
        <Button variant="destructive" class="w-full" @click="handleReset">
          Reset
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
