<template>
  <div class="flex h-full flex-col">
    <Header class="border-b">
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <div class="flex flex-1 items-center justify-center">
      <div class="text-center max-w-md mx-auto px-4">
        <!-- Animated Icon -->
        <div class="relative mx-auto mb-8">
          <div class="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <Rocket :size="40" class="text-primary animate-bounce" />
          </div>
          <div class="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold tracking-tight mb-3">敬请期待！</h1>

        <!-- Description -->
        <p class="text-muted-foreground mb-8">我们正在努力为您打造更好的体验。</p>

        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-muted-foreground">开发进度</span>
            <span class="font-medium">78%</span>
          </div>
          <div class="h-2 bg-muted rounded-full">
            <div class="h-full bg-primary rounded-full" style="width: 78%"></div>
          </div>
        </div>

        <!-- Notify Me Button -->
        <Button variant="outline" class="mb-6">
          <Bell :size="16" class="me-2" />通知我
        </Button>

        <!-- Back to Dashboard -->
        <div>
          <Button variant="ghost" as-child>
            <router-link to="/">
              <ArrowLeft :size="16" class="me-2" />返回仪表盘
            </router-link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rocket, Bell, ArrowLeft } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import { Button } from '@/components/ui/button'
</script>
