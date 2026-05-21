<script setup lang="ts">
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import TasksDialogs from './components/TasksDialogs.vue'
import TasksPrimaryButtons from './components/TasksPrimaryButtons.vue'
import { useProvideTasks } from './components/tasks-provider'
import TasksTable from './components/TasksTable.vue'
import { tasks } from './data/tasks'

useProvideTasks()
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
          <h2 class="text-2xl font-bold tracking-tight">任务</h2>
          <p class="text-muted-foreground">
            这是您本月的任务列表！
          </p>
        </div>
        <TasksPrimaryButtons />
      </div>
      <TasksTable :data="tasks" />
    </Main>

    <TasksDialogs />
  </div>
</template>
