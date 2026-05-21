<template>
  <div>
    <Header>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <Main fixed>
      <!-- Hero -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight mb-2">帮助中心</h1>
        <p class="text-muted-foreground max-w-2xl">查找答案、获取帮助和联系支持团队。</p>
      </div>

      <!-- Search -->
      <div class="mb-8 max-w-xl">
        <div class="relative">
          <SearchIcon :size="18" class="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索帮助文章..." class="h-11 ps-10" v-model="searchQuery" />
        </div>
      </div>

      <Separator class="my-6" />

      <!-- Categories Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="category in categories"
          :key="category.title"
          class="group cursor-pointer hover:shadow-md hover:border-primary/50"
          @click="handleCategoryClick(category)"
        >
          <CardHeader>
            <div class="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <component :is="category.icon" :size="24" />
            </div>
            <CardTitle>{{ category.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{{ category.description }}</CardDescription>
          </CardContent>
        </Card>
      </div>

      <!-- Contact Support -->
      <div class="mt-12 rounded-lg border bg-card p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold mb-1">没找到您需要的答案？</h2>
            <p class="text-sm text-muted-foreground">平均响应时间：24小时内</p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline">
              <MessageCircle :size="16" class="me-2" />在线客服
            </Button>
            <Button><Ticket :size="16" class="me-2" />提交工单</Button>
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sonner'
import {
  BookOpen,
  MessageCircle,
  FileQuestion,
  Shield,
  Video,
  CreditCard,
  Search as SearchIcon,
  Ticket,
} from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer/ConfigDrawer.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const searchQuery = ref('')

const categories = [
  {
    title: '入门指南',
    description: '了解如何开始使用平台，包括账户设置和新手指南',
    icon: BookOpen,
  },
  {
    title: '常见问题',
    description: '查看最常被问及的问题和答案，快速解决您的疑问',
    icon: FileQuestion,
  },
  {
    title: '账户与账单',
    description: '管理您的订阅、支付方式和账单信息',
    icon: CreditCard,
  },
  {
    title: '视频教程',
    description: '观看详细的功能使用教程和演示',
    icon: Video,
  },
  {
    title: '社区论坛',
    description: '与其他用户交流经验并分享最佳实践',
    icon: MessageCircle,
  },
  {
    title: '安全与隐私',
    description: '了解我们如何保护您的数据和安全措施',
    icon: Shield,
  },
]

const handleCategoryClick = (category: typeof categories[0]) => {
  toast.info(`正在打开"${category.title}"分类`)
}
</script>
