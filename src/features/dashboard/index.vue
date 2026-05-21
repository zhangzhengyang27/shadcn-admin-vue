<template>
  <div>
    <!-- Top Heading -->
    <Header>
      <div class="flex flex-1 items-center justify-between">
        <TopNav :links="topNav" />
        <div class="flex items-center gap-2">
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </div>
    </Header>

    <!-- Main Content -->
    <Main>
      <div class="mb-2 flex items-center justify-between space-y-2">
        <h1 class="text-2xl font-bold tracking-tight">仪表盘</h1>
        <Button>下载</Button>
      </div>

      <Tabs orientation="vertical" default-value="overview" class="space-y-4">
        <div class="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
            <TabsTrigger value="reports" disabled>报告</TabsTrigger>
            <TabsTrigger value="notifications" disabled>通知</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" class="space-y-4">
          <!-- Stats Cards -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Total Revenue -->
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  总收入
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">$45,231.89</div>
                <p class="text-xs text-muted-foreground">较上月 +20.1%</p>
              </CardContent>
            </Card>

            <!-- Subscriptions -->
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  订阅数
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">+2350</div>
                <p class="text-xs text-muted-foreground">较上月 +180.1%</p>
              </CardContent>
            </Card>

            <!-- Sales -->
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">销售额</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">+12,234</div>
                <p class="text-xs text-muted-foreground">较上月 +19%</p>
              </CardContent>
            </Card>

            <!-- Active Now -->
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  当前在线
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">+573</div>
                <p class="text-xs text-muted-foreground">过去一小时 +201</p>
              </CardContent>
            </Card>
          </div>

          <!-- Charts Grid -->
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card class="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>概览</CardTitle>
              </CardHeader>
              <CardContent class="ps-2">
                <Overview />
              </CardContent>
            </Card>

            <Card class="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>最近销售</CardTitle>
                <CardDescription>本月共完成 265 笔销售。</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" class="space-y-4">
          <Analytics />
        </TabsContent>
      </Tabs>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import TopNav from '@/components/layout/TopNav.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import Overview from './components/overview.vue'
import Analytics from './components/analytics.vue'
import RecentSales from './components/recent-sales.vue'

const topNav = [
  {
    title: '概览',
    href: '/dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: '客户',
    href: '/dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: '产品',
    href: '/dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: '设置',
    href: '/dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
</script>
