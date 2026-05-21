<template>
  <div>
    <!-- Top Heading -->
    <Header>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <!-- Content -->
    <Main fixed>
      <!-- Title -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold tracking-tight">App Integrations</h2>
        <p class="text-muted-foreground">
          Here's a list of your apps for the integration!
        </p>
      </div>

      <!-- Search & Filter -->
      <div class="mb-6 flex items-center gap-4">
        <div class="relative flex-1 max-w-md">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            class="pl-9 h-10"
            v-model="searchQuery"
          />
        </div>
        <Select v-model="appType">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="All Apps" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Apps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- App Grid -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="app in filteredApps"
          :key="app.name"
          class="hover:border-primary/50 hover:shadow-md transition-all"
        >
          <CardContent class="pt-6">
            <div class="flex items-center gap-4">
              <!-- Icon (Square rounded) -->
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <component :is="app.logo" class="h-6 w-6 text-primary" />
              </div>
              <!-- Name & Description -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold">{{ app.name }}</h3>
                <p class="text-sm text-muted-foreground truncate">{{ app.desc }}</p>
              </div>
              <!-- Button -->
              <Button
                :variant="app.connected ? 'default' : 'outline'"
                class="shrink-0"
                @click="handleConnect(app.name)"
              >
                <Loader2 v-if="connectingApp === app.name" class="mr-2 h-4 w-4 animate-spin" />
                {{ app.connected ? 'Connected' : 'Connect' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredApps.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <Package :size="28" class="text-muted-foreground" />
        </div>
        <p class="mb-1 text-lg font-medium">No apps found</p>
        <p class="text-sm text-muted-foreground">Try adjusting your search</p>
      </div>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Loader2, Package, Search as SearchIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer.vue'
import { apps } from './data/apps'

type AppType = 'all'

const searchQuery = ref('')
const appType = ref<AppType>('all')
const connectingApp = ref<string | null>(null)

const filteredApps = computed(() => {
  let result = [...apps]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.desc.toLowerCase().includes(query)
    )
  }

  return result
})

function handleConnect(appName: string) {
  connectingApp.value = appName
  setTimeout(() => {
    connectingApp.value = null
  }, 2000)
}
</script>
