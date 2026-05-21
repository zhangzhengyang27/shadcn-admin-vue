<template>
  <div class="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>流量概览</CardTitle>
        <CardDescription>每周点击量和独立访客数</CardDescription>
      </CardHeader>
      <CardContent class="px-6">
        <AnalyticsChart />
      </CardContent>
    </Card>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Clicks -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">总点击量</CardTitle>
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
            <path d="M3 3v18h18" />
            <path d="M7 15l4-4 4 4 4-6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">1,248</div>
          <p class="text-xs text-muted-foreground">较上周 +12.4%</p>
        </CardContent>
      </Card>

      <!-- Unique Visitors -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">独立访客</CardTitle>
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
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">832</div>
          <p class="text-xs text-muted-foreground">较上周 +5.8%</p>
        </CardContent>
      </Card>

      <!-- Bounce Rate -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">跳出率</CardTitle>
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
            <path d="M3 12h6l3 6 3-6h6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">42%</div>
          <p class="text-xs text-muted-foreground">较上周 -3.2%</p>
        </CardContent>
      </Card>

      <!-- Avg. Session -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">平均会话时长</CardTitle>
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">3m 24s</div>
          <p class="text-xs text-muted-foreground">较上周 +18s</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
      <Card class="col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle>来源渠道</CardTitle>
          <CardDescription>主要流量来源</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleBarList
            :items="sourceItems"
            bar-class="bg-primary"
            :value-formatter="(n: number) => `${n}`"
          />
        </CardContent>
      </Card>

      <Card class="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>设备类型</CardTitle>
          <CardDescription>用户访问方式</CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleBarList
            :items="deviceItems"
            bar-class="bg-muted-foreground"
            :value-formatter="(n: number) => `${n}%`"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AnalyticsChart from './analytics-chart.vue'
import SimpleBarList from './SimpleBarList.vue'

const sourceItems = [
  { name: 'Direct', value: 512 },
  { name: 'Product Hunt', value: 238 },
  { name: 'Twitter', value: 174 },
  { name: 'Blog', value: 104 },
]

const deviceItems = [
  { name: 'Desktop', value: 74 },
  { name: 'Mobile', value: 22 },
  { name: 'Tablet', value: 4 },
]
</script>
