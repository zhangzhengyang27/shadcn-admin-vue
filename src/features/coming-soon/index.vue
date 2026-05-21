<template>
  <div class="h-svh flex flex-col">
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
          <!-- Pulsing rings -->
          <div class="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold tracking-tight mb-3">Coming Soon!</h1>

        <!-- Description -->
        <p class="text-muted-foreground mb-8 leading-relaxed">
          We're working hard to bring you a better experience.<br />
          New features are on the way, stay tuned!
        </p>

        <!-- Progress indicator -->
        <div class="mb-8">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-muted-foreground">Development Progress</span>
            <span class="font-medium">78%</span>
          </div>
          <div class="h-2 bg-muted rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full transition-all duration-500" style="width: 78%"></div>
          </div>
        </div>

        <!-- Features Preview -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="rounded-lg border bg-card p-3">
            <Sparkles :size="20" class="text-primary mx-auto mb-1" />
            <p class="text-xs text-muted-foreground">New Features</p>
          </div>
          <div class="rounded-lg border bg-card p-3">
            <Zap :size="20" class="text-primary mx-auto mb-1" />
            <p class="text-xs text-muted-foreground">Performance</p>
          </div>
          <div class="rounded-lg border bg-card p-3">
            <Shield :size="20" class="text-primary mx-auto mb-1" />
            <p class="text-xs text-muted-foreground">Security</p>
          </div>
        </div>

        <!-- Notify Me Button -->
        <Button variant="outline" class="mb-6">
          <Bell :size="16" class="me-2" />
          Notify Me
        </Button>

        <!-- Back to Dashboard -->
        <div>
          <Button variant="ghost" as-child>
            <router-link to="/">
              <ArrowLeft :size="16" class="me-2" />
              Back to Dashboard
            </router-link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rocket, Sparkles, Zap, Shield, Bell, ArrowLeft } from 'lucide-vue-next'
import Header from '@/components/layout/Header.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import { Button } from '@/components/ui/button'
</script>
