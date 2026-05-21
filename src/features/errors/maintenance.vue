<template>
  <div>
    <Header fixed>
      <div class="flex flex-1 items-center justify-between">
        <h1 class="text-lg font-semibold">维护中</h1>
        <div class="flex items-center gap-2">
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </div>
    </Header>

    <Main fluid>
      <div class="flex h-[calc(100svh-8rem)] w-full flex-col items-center justify-center gap-2">
        <h1 class="text-[7rem] leading-tight font-bold">503</h1>
        <span class="font-medium">网站正在维护中！</span>
        <p class="text-center text-muted-foreground">
          网站目前不可用。<br />
          我们很快会恢复上线。
        </p>
        <div class="mt-6 flex gap-4">
          <Button variant="outline">了解更多</Button>
        </div>
      </div>
    </Main>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
