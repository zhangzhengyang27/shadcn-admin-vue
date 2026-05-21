<script setup lang="ts">
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import UsersDialogs from './components/UsersDialogs.vue'
import UsersPrimaryButtons from './components/UsersPrimaryButtons.vue'
import { useProvideUsers } from './components/users-provider'
import UsersTable from './components/UsersTable.vue'
import { users } from './data/users'

useProvideUsers()
</script>

<template>
  <div>
    <Header fixed>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <Main class="flex flex-1 flex-col gap-4 sm:gap-6">
      <div class="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">用户列表</h2>
          <p class="text-muted-foreground">
            在此管理您的用户及其角色。
          </p>
        </div>
        <UsersPrimaryButtons />
      </div>
      <UsersTable :data="users" />
    </Main>

    <UsersDialogs />
  </div>
</template>
