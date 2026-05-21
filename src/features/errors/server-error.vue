<template>
  <div>
    <Header fixed>
      <div class="flex flex-1 items-center justify-between">
        <h1 class="text-lg font-semibold">服务器错误</h1>
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
        <h1 class="text-[7rem] leading-tight font-bold">500</h1>
        <span class="font-medium">抱歉！出错了 :')</span>
        <p class="text-center text-muted-foreground">
          很抱歉给您带来不便。<br />
          请稍后重试。
        </p>
        <div class="mt-6 flex gap-4">
          <Button variant="outline" @click="goBack">返回</Button>
          <Button @click="goHome">返回首页</Button>
        </div>
      </div>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>
