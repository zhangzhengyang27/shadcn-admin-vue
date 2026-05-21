<script setup lang="ts">
import { ref, computed } from 'vue'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import { apps } from './data/apps'

type AppType = 'all' | 'connected' | 'notConnected'
type SortType = 'asc' | 'desc'

const appText = new Map<AppType, string>([
  ['all', '全部应用'],
  ['connected', '已连接'],
  ['notConnected', '未连接'],
])

const searchTerm = ref('')
const appType = ref<AppType>('all')
const sort = ref<SortType>('asc')

const filteredApps = computed(() => {
  let result = [...apps]
  
  // 排序
  if (sort.value === 'asc') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    result.sort((a, b) => b.name.localeCompare(a.name))
  }
  
  // 筛选
  result = result.filter((app) => {
    if (appType.value === 'connected') return app.connected
    if (appType.value === 'notConnected') return !app.connected
    return true
  })
  
  // 搜索
  result = result.filter((app) => 
    app.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
  
  return result
})
</script>

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
      <div>
        <h1 class="text-2xl font-bold tracking-tight">应用集成</h1>
        <p class="text-muted-foreground">
          以下是您的应用集成列表！
        </p>
      </div>
      <div class="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div class="flex flex-col gap-4 sm:my-4 sm:flex-row">
          <Input
            placeholder="筛选应用..."
            class="h-9 w-40 lg:w-62.5"
            v-model="searchTerm"
          />
          <Select v-model="appType">
            <SelectTrigger class="w-36">
              <SelectValue>{{ appText.get(appType) }}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部应用</SelectItem>
              <SelectItem value="connected">已连接</SelectItem>
              <SelectItem value="notConnected">未连接</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select v-model="sort">
          <SelectTrigger class="w-16">
            <SelectValue>
              <SlidersHorizontal :size="18" />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="asc">
              <div class="flex items-center gap-4">
                <ArrowUpAZ :size="16" />
                <span>升序</span>
              </div>
            </SelectItem>
            <SelectItem value="desc">
              <div class="flex items-center gap-4">
                <ArrowDownAZ :size="16" />
                <span>降序</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator class="shadow-sm" />
      <ul class="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="app in filteredApps"
          :key="app.name"
          class="rounded-lg border p-4 hover:shadow-md"
        >
          <div class="mb-8 flex items-center justify-between">
            <div class="flex size-10 items-center justify-center rounded-lg bg-muted p-2">
              <component :is="app.logo" class="size-5" />
            </div>
            <Button
              variant="outline"
              size="sm"
              :class="
                app.connected
                  ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900'
                  : ''
              "
            >
              {{ app.connected ? '已连接' : '连接' }}
            </Button>
          </div>
          <div>
            <h2 class="mb-1 font-semibold">{{ app.name }}</h2>
            <p class="line-clamp-2 text-gray-500">{{ app.desc }}</p>
          </div>
        </li>
      </ul>
    </Main>
  </div>
</template>
