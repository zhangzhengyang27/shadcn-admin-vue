<script setup lang="ts">
import { computed, ref } from 'vue'
import { CircleCheck, RotateCcw, Settings } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTheme } from '@/composables/useTheme'
import { useLayout } from '@/composables/useLayout'
import { useSidebarBridge } from '@/composables/useSidebarBridge'
import IconThemeSystem from '@/assets/custom/icon-theme-system.vue'
import IconThemeLight from '@/assets/custom/icon-theme-light.vue'
import IconThemeDark from '@/assets/custom/icon-theme-dark.vue'
import IconSidebarInset from '@/assets/custom/icon-sidebar-inset.vue'
import IconSidebarFloating from '@/assets/custom/icon-sidebar-floating.vue'
import IconSidebarSidebar from '@/assets/custom/icon-sidebar-sidebar.vue'
import IconLayoutDefault from '@/assets/custom/icon-layout-default.vue'
import IconLayoutCompact from '@/assets/custom/icon-layout-compact.vue'
import IconLayoutFull from '@/assets/custom/icon-layout-full.vue'

const open = ref(false)

const { defaultTheme, theme, setTheme, resetTheme } = useTheme()
const { defaultVariant, variant, setVariant, collapsible, setCollapsible, resetLayout } = useLayout()
const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebarBridge()

const handleReset = () => {
  resetTheme()
  resetLayout()
  setSidebarOpen(true)
}

const layoutState = computed(() => {
  if (sidebarOpen.value) return 'default'
  return collapsible.value === 'offcanvas' ? 'full' : 'compact'
})

function onLayoutChange(v: string) {
  if (v === 'default') {
    setSidebarOpen(true)
    setCollapsible('none')
  } else {
    setSidebarOpen(false)
    setCollapsible(v === 'full' ? 'offcanvas' : 'icon')
  }
}

const themeOptions = [
  { value: 'system', label: 'System', icon: IconThemeSystem },
  { value: 'light', label: 'Light', icon: IconThemeLight },
  { value: 'dark', label: 'Dark', icon: IconThemeDark },
] as const

const sidebarOptions = [
  { value: 'inset', label: 'Inset', icon: IconSidebarInset },
  { value: 'floating', label: 'Floating', icon: IconSidebarFloating },
  { value: 'sidebar', label: 'Sidebar', icon: IconSidebarSidebar },
] as const

const layoutOptions = [
  { value: 'default', label: 'Default', icon: IconLayoutDefault },
  { value: 'compact', label: 'Compact', icon: IconLayoutCompact },
  { value: 'full', label: 'Full layout', icon: IconLayoutFull },
] as const
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button size="icon" variant="ghost" class="rounded-full" aria-label="打开主题设置">
        <Settings class="size-4" />
      </Button>
    </SheetTrigger>
    <SheetContent class="flex flex-col" data-testid="config-drawer">
      <SheetHeader class="pb-0 text-start">
        <SheetTitle>Theme Settings</SheetTitle>
        <SheetDescription>Adjust the appearance and layout to suit your preferences.</SheetDescription>
      </SheetHeader>

      <div class="space-y-5 overflow-y-auto px-4 py-2">
        <!-- Theme -->
        <div>
          <div class="mb-1.5 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Theme
            <Button
              v-if="theme !== defaultTheme"
              type="button"
              size="icon"
              variant="secondary"
              class="size-4 rounded-full p-0"
              @click="setTheme(defaultTheme)"
            >
              <RotateCcw class="size-3" />
            </Button>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="item in themeOptions"
              :key="item.value"
              type="button"
              class="group flex cursor-pointer flex-col items-center gap-1 rounded-lg p-0 pb-1 outline-none transition duration-200 ease-in"
              @click="setTheme(item.value)"
            >
              <div
                class="relative w-full overflow-hidden rounded-lg border-2 transition duration-200"
                :class="[
                  theme === item.value
                    ? 'border-primary shadow-xl'
                    : 'border-border'
                ]"
                role="img"
                :aria-label="`${item.label} option preview`"
              >
                <component
                  :is="item.icon"
                  class="h-full w-full"
                  :class="theme !== item.value ? 'opacity-50' : undefined"
                />
                <CircleCheck
                  v-if="theme === item.value"
                  class="absolute right-0 top-0 size-5 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white"
                  aria-hidden="true"
                />
              </div>
              <span class="mt-1 text-xs">{{ item.label }}</span>
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="max-md:hidden">
          <div class="mb-1.5 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Sidebar
            <Button
              v-if="variant !== defaultVariant"
              type="button"
              size="icon"
              variant="secondary"
              class="size-4 rounded-full p-0"
              @click="setVariant(defaultVariant)"
            >
              <RotateCcw class="size-3" />
            </Button>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="item in sidebarOptions"
              :key="item.value"
              type="button"
              class="group flex cursor-pointer flex-col items-center gap-1 rounded-lg p-0 pb-1 outline-none transition duration-200 ease-in"
              @click="setVariant(item.value)"
            >
              <div
                class="relative w-full overflow-hidden rounded-lg border-2 bg-muted/40 transition duration-200"
                :class="[
                  variant === item.value
                    ? 'border-primary shadow-xl'
                    : 'border-border'
                ]"
                role="img"
                :aria-label="`${item.label} option preview`"
              >
                <component
                  :is="item.icon"
                  class="h-full w-full"
                  :class="
                    variant === item.value
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  "
                />
                <CircleCheck
                  v-if="variant === item.value"
                  class="absolute right-0 top-0 size-5 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white"
                  aria-hidden="true"
                />
              </div>
              <span class="mt-1 text-xs">{{ item.label }}</span>
            </button>
          </div>
        </div>

        <!-- Layout -->
        <div class="max-md:hidden">
          <div class="mb-1.5 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Layout
            <Button
              v-if="layoutState !== 'default'"
              type="button"
              size="icon"
              variant="secondary"
              class="size-4 rounded-full p-0"
              @click="onLayoutChange('default')"
            >
              <RotateCcw class="size-3" />
            </Button>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="item in layoutOptions"
              :key="item.value"
              type="button"
              class="group flex cursor-pointer flex-col items-center gap-1 rounded-lg p-0 pb-1 outline-none transition duration-200 ease-in"
              @click="onLayoutChange(item.value)"
            >
              <div
                class="relative w-full overflow-hidden rounded-lg border-2 bg-muted/40 transition duration-200"
                :class="[
                  layoutState === item.value
                    ? 'border-primary shadow-xl'
                    : 'border-border'
                ]"
                role="img"
                :aria-label="`${item.label} option preview`"
              >
                <component
                  :is="item.icon"
                  class="h-full w-full"
                  :class="
                    layoutState === item.value
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  "
                />
                <CircleCheck
                  v-if="layoutState === item.value"
                  class="absolute right-0 top-0 size-5 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white"
                  aria-hidden="true"
                />
              </div>
              <span class="mt-1 text-xs">{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <SheetFooter class="gap-2 pt-2">
        <Button variant="destructive" class="w-full" @click="handleReset">
          Reset
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
