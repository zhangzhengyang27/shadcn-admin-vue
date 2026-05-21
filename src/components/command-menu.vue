<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useSearch } from '@/composables/useSearch'
import { sidebarData } from '@/components/layout/data/sidebar-data'
import { useAuthStore } from '@/stores/auth'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

const router = useRouter()
const authStore = useAuthStore()
const { isDark, toggleTheme } = useTheme()
const { open, setOpen } = useSearch()

function handleOpenChange(value: boolean) {
  setOpen(value)
}

const navItems = computed(() => {
  return sidebarData.navGroups.flatMap((group) => group.items)
})

function runCommand(command: () => void) {
  setOpen(false)
  command()
}

function handleLogout() {
  authStore.logout()
  router.push('/sign-in')
}
</script>

<template>
  <CommandDialog :open="open" @update:open="handleOpenChange">
    <CommandInput placeholder="输入命令或搜索..." />
    <CommandList>
      <CommandEmpty>未找到结果</CommandEmpty>
      <CommandGroup heading="导航">
        <CommandItem
          v-for="item in navItems"
          :key="item.title"
          :value="item.title"
          @select="runCommand(() => router.push(item.url as any))"
        >
          <component :is="item.icon" class="me-2 size-4" v-if="item.icon" />
          <span>{{ item.title }}</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="设置">
        <CommandItem
          value="个人资料"
          @select="runCommand(() => router.push('/settings'))"
        >
          <UserIcon class="me-2 size-4" />
          个人资料
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="账单"
          @select="runCommand(() => router.push('/settings'))"
        >
          <CreditCardIcon class="me-2 size-4" />
          账单
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="设置"
          @select="runCommand(() => router.push('/settings'))"
        >
          <SettingsIcon class="me-2 size-4" />
          设置
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="主题">
        <CommandItem
          value="切换主题"
          @select="runCommand(() => toggleTheme())"
        >
          <SunIcon v-if="isDark" class="me-2 size-4" />
          <MoonIcon v-else class="me-2 size-4" />
          {{ isDark ? '浅色模式' : '深色模式' }}
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="帮助">
        <CommandItem
          value="帮助中心"
          @select="runCommand(() => router.push('/help-center'))"
        >
          <HelpCircleIcon class="me-2 size-4" />
          帮助中心
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="账户">
        <CommandItem value="退出登录" @select="runCommand(() => handleLogout())">
          <LogOutIcon class="me-2 size-4" />
          退出登录
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>