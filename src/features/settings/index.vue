<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Search from '@/components/search.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer/ConfigDrawer.vue'
import SidebarNav from './components/SidebarNav.vue'
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
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
        <p class="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Separator class="my-4 lg:my-6" />

      <div class="flex flex-col gap-16 lg:flex-row lg:gap-12">
        <aside class="w-full lg:w-1/5">
          <SidebarNav />
        </aside>
        <div class="flex-1 max-w-2xl">
          <div class="space-y-6">
            <RouterView />
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>