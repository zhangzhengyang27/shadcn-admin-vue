<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
// import AppTitle from './AppTitle.vue'
import { sidebarData } from './data/sidebar-data'
import NavGroup from './NavGroup.vue'
import TeamSwitcher from './TeamSwitcher.vue'

const { collapsible, variant } = useLayout()
</script>

<template>
  <Sidebar :collapsible="collapsible" :variant="variant">
    <SidebarHeader>
      <TeamSwitcher :teams="sidebarData.teams" />

      <!-- Replace <TeamSwitch /> with the following <AppTitle />
         if you want to use the normal app title instead of TeamSwitch dropdown -->
      <!-- <AppTitle /> -->
    </SidebarHeader>
    <SidebarContent>
      <NavGroup
        v-for="group in sidebarData.navGroups"
        :key="group.title"
        :title="group.title"
        :items="group.items"
      />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
