<script setup lang="ts">
import { computed, ref } from 'vue'
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

const open = ref(false)

function handleOpenChange(value: boolean) {
  open.value = value
}

const navItems = computed(() => {
  return sidebarData.navGroups.flatMap((group) => group.items)
})

function runCommand(command: () => void) {
  open.value = false
  command()
}

function handleLogout() {
  authStore.logout()
  router.push('/sign-in')
}

// Register keyboard shortcut
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    open.value = !open.value
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <CommandDialog :open="open" @update:open="handleOpenChange">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
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
      <CommandGroup heading="Settings">
        <CommandItem
          value="Profile"
          @select="runCommand(() => router.push('/settings'))"
        >
          <UserIcon class="me-2 size-4" />
          Profile
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Billing"
          @select="runCommand(() => router.push('/settings'))"
        >
          <CreditCardIcon class="me-2 size-4" />
          Billing
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Settings"
          @select="runCommand(() => router.push('/settings'))"
        >
          <SettingsIcon class="me-2 size-4" />
          Settings
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Theme">
        <CommandItem
          value="Toggle Theme"
          @select="runCommand(() => toggleTheme())"
        >
          <SunIcon v-if="isDark" class="me-2 size-4" />
          <MoonIcon v-else class="me-2 size-4" />
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Help">
        <CommandItem
          value="Help Center"
          @select="runCommand(() => router.push('/help-center'))"
        >
          <HelpCircleIcon class="me-2 size-4" />
          Help Center
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Account">
        <CommandItem value="Log out" @select="runCommand(() => handleLogout())">
          <LogOutIcon class="me-2 size-4" />
          Log out
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
