<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Search from '@/components/search.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer/ConfigDrawer.vue'
import SidebarNav from './components/SidebarNav.vue'

const sidebarNavItems = [
  { title: '个人资料', href: '/settings', icon: 'UserCog' },
  { title: '账户', href: '/settings/account', icon: 'Wrench' },
  { title: '外观', href: '/settings/appearance', icon: 'Palette' },
  { title: '通知', href: '/settings/notifications', icon: 'Bell' },
  { title: '显示', href: '/settings/display', icon: 'Monitor' },
]
</script>

<template>
  <div>
    <Header>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <Main fixed>
      <div class="space-y-0.5">
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">设置</h1>
        <p class="text-muted-foreground">在此管理您的账户和应用设置。</p>
      </div>

      <Separator class="my-4 lg:my-6" />

      <div class="flex flex-1 flex-col gap-6 overflow-hidden lg:flex-row lg:gap-10">
        <aside class="w-full shrink-0 lg:w-44">
          <SidebarNav :items="sidebarNavItems" />
        </aside>

        <Separator orientation="vertical" class="hidden lg:block" />

        <div class="flex-1 overflow-y-auto pb-8">
          <RouterView v-slot="{ Component }">
            <component :is="Component" />
          </RouterView>
        </div>
      </div>
    </Main>
  </div>
</template>
