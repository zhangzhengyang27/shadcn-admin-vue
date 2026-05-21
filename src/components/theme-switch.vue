<script setup lang="ts">
import { watch } from 'vue'
import { Check, Moon, Sun } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables/useTheme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const { theme, setTheme } = useTheme()

watch(theme, () => {
  const themeColor = theme.value === 'dark' ? '#020817' : '#fff'
  const metaThemeColor = document.querySelector("meta[name='theme-color']")
  if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
})
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="scale-95 rounded-full">
        <Sun class="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span class="sr-only">切换主题</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setTheme('light')">
        浅色模式
        <Check
          :size="14"
          :class="cn('ms-auto', theme !== 'light' && 'hidden')"
        />
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('dark')">
        深色模式
        <Check
          :size="14"
          :class="cn('ms-auto', theme !== 'dark' && 'hidden')"
        />
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('system')">
        跟随系统
        <Check
          :size="14"
          :class="cn('ms-auto', theme !== 'system' && 'hidden')"
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
