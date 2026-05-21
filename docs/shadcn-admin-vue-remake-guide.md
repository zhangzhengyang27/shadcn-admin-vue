# Shadcn Admin Vue 页面改造详细指南

## ⚠️ 重要：UI 组件库选择

**本项目统一使用 `reka-ui` 作为底层 UI 组件库，不要使用 `radix-vue`。**

- `reka-ui` 是 shadcn/ui 官方推荐的 Vue 3 组件库
- 所有 UI 组件（DropdownMenu、Dialog、Avatar 等）都必须从 `@/components/ui/*` 导入
- 组件的 `index.ts` 文件负责从 `reka-ui` 导入并重新导出
- **禁止**在业务代码中直接从 `radix-vue` 或 `reka-ui` 导入组件

## 项目信息

- **项目路径**：`/Users/xiaoye/Desktop/AI/自研组件库/shadcn-admin-vue`
- **技术栈**：Vue 3 + Vite + Tailwind CSS + shadcn/ui + TypeScript
- **线上参考**：[https://shadcn-admin.netlify.app/](https://shadcn-admin.netlify.app/)
- **项目源码**：/Users/xiaoye/Desktop/AI/自研组件库/shadcn-admin-main
- **包管理器**：pnpm（不要使用 npm）

## 改造原则

1. **像素级还原**：每个页面必须与线上版本一模一样
2. **逐文件改造**：严格按照文件列表逐个修改，不要跳过任何文件
3. **样式优先**：布局、间距、颜色必须与线上版本一致
4. **功能完整**：交互逻辑也要完整实现
5. **响应式适配**：确保移动端和桌面端都正常显示

## 项目结构概览

```
shadcn-admin-vue/
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── assets/
│   │   └── logo.vue
│   ├── components/
│   │   ├── layout/          # 布局组件
│   │   ├── data-table/      # 数据表格组件
│   │   ├── ui/              # shadcn/ui 组件库
│   │   ├── search.vue
│   │   ├── theme-switch.vue
│   │   ├── config-drawer.vue
│   │   ├── profile-dropdown.vue
│   │   ├── command-menu.vue
│   │   ├── sign-out-dialog.vue
│   │   └── ...
│   ├── composables/         # 组合式函数
│   ├── features/
│   │   ├── dashboard/       # 仪表盘
│   │   ├── users/           # 用户管理
│   │   ├── tasks/           # 任务管理
│   │   ├── apps/            # 应用集成
│   │   ├── chats/           # 聊天
│   │   ├── settings/        # 设置
│   │   ├── help-center/     # 帮助中心
│   │   ├── coming-soon/     # 即将推出
│   │   ├── auth/            # 认证
│   │   └── errors/          # 错误页
│   ├── lib/
│   │   └── utils.ts
│   ├── router/
│   │   ├── index.ts
│   │   └── routes/
│   ├── stores/              # Pinia 状态管理
│   └── types/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 完整 .vue 文件列表（共 259 个）

### src/features 目录（60 个页面/组件）

#### 页面组件（index.vue）

```
src/features/help-center/index.vue
src/features/chats/index.vue
src/features/apps/index.vue
src/features/coming-soon/index.vue
src/features/settings/index.vue
src/features/users/index.vue
src/features/tasks/index.vue
src/features/dashboard/index.vue
src/features/errors/not-found.vue
src/features/errors/server-error.vue
src/features/errors/maintenance.vue
src/features/errors/unauthorized.vue
src/features/errors/forbidden.vue
src/features/errors/not-found-error.vue
src/features/errors/general-error.vue
```

#### 认证相关（auth）

```
src/features/auth/sign-in/index.vue
src/features/auth/sign-in/components/UserAuthForm.vue
src/features/auth/sign-in-2/index.vue
src/features/auth/sign-up/index.vue
src/features/auth/sign-up/components/SignUpForm.vue
src/features/auth/forgot-password/index.vue
src/features/auth/forgot-password/components/ForgotPasswordForm.vue
src/features/auth/otp/index.vue
src/features/auth/otp/components/OtpForm.vue
src/features/auth/AuthLayout.vue
```

#### 设置相关（settings）

```
src/features/settings/account/index.vue
src/features/settings/account/AccountForm.vue
src/features/settings/appearance/index.vue
src/features/settings/appearance/AppearanceForm.vue
src/features/settings/profile/index.vue
src/features/settings/profile/ProfileForm.vue
src/features/settings/notifications/index.vue
src/features/settings/notifications/NotificationsForm.vue
src/features/settings/display/index.vue
src/features/settings/display/DisplayForm.vue
src/features/settings/components/SidebarNav.vue
src/features/settings/components/ContentSection.vue
```

#### Dashboard 组件

```
src/features/dashboard/components/analytics.vue
src/features/dashboard/components/analytics-chart.vue
src/features/dashboard/components/overview.vue
src/features/dashboard/components/recent-sales.vue
src/features/dashboard/components/SimpleBarList.vue
```

#### Tasks 组件

```
src/features/tasks/components/TasksTable.vue
src/features/tasks/components/DataTableBulkActions.vue
src/features/tasks/components/DataTableRowActions.vue
src/features/tasks/components/TasksMutateDrawer.vue
src/features/tasks/components/TasksImportDialog.vue
src/features/tasks/components/TasksMultiDeleteDialog.vue
src/features/tasks/components/TasksPrimaryButtons.vue
src/features/tasks/components/TasksDialogs.vue
```

#### Users 组件

```
src/features/users/components/UsersTable.vue
src/features/users/components/DataTableBulkActions.vue
src/features/users/components/DataTableRowActions.vue
src/features/users/components/UsersInviteDialog.vue
src/features/users/components/UsersDeleteDialog.vue
src/features/users/components/UsersActionDialog.vue
src/features/users/components/UsersPrimaryButtons.vue
src/features/users/components/UsersDialogs.vue
src/features/users/components/UsersMultiDeleteDialog.vue
```

#### Chats 组件

```
src/features/chats/components/NewChat.vue
```

---

### src/components 目录

#### 布局组件

```
src/components/layout/AuthenticatedLayout.vue
src/components/layout/NavUser.vue
src/components/layout/AppTitle.vue
src/components/layout/TopNav.vue
src/components/layout/AppSidebar.vue
src/components/layout/Header.vue
src/components/layout/Main.vue
src/components/layout/NavGroup.vue
src/components/layout/TeamSwitcher.vue
```

#### Data Table 组件

```
src/components/data-table/DataTableBulkActions.vue
src/components/data-table/DataTableColumnHeader.vue
src/components/data-table/DataTableFacetedFilter.vue
src/components/data-table/DataTablePagination.vue
src/components/data-table/DataTableToolbar.vue
src/components/data-table/DataTableViewOptions.vue
```

#### UI 组件（sidebar）

```
src/components/ui/sidebar/Sidebar.vue
src/components/ui/sidebar/SidebarContent.vue
src/components/ui/sidebar/SidebarFooter.vue
src/components/ui/sidebar/SidebarGroup.vue
src/components/ui/sidebar/SidebarGroupAction.vue
src/components/ui/sidebar/SidebarGroupContent.vue
src/components/ui/sidebar/SidebarGroupLabel.vue
src/components/ui/sidebar/SidebarHeader.vue
src/components/ui/sidebar/SidebarInput.vue
src/components/ui/sidebar/SidebarInset.vue
src/components/ui/sidebar/SidebarMenu.vue
src/components/ui/sidebar/SidebarMenuAction.vue
src/components/ui/sidebar/SidebarMenuBadge.vue
src/components/ui/sidebar/SidebarMenuButton.vue
src/components/ui/sidebar/SidebarMenuButtonChild.vue
src/components/ui/sidebar/SidebarMenuItem.vue
src/components/ui/sidebar/SidebarMenuSkeleton.vue
src/components/ui/sidebar/SidebarMenuSub.vue
src/components/ui/sidebar/SidebarMenuSubButton.vue
src/components/ui/sidebar/SidebarMenuSubItem.vue
src/components/ui/sidebar/SidebarProvider.vue
src/components/ui/sidebar/SidebarRail.vue
src/components/ui/sidebar/SidebarSeparator.vue
src/components/ui/sidebar/SidebarTrigger.vue
```

#### UI 组件（input-otp）

```
src/components/ui/input-otp/InputOTPSlot.vue
src/components/ui/input-otp/InputOTPSeparator.vue
```

#### 其他组件

```
src/components/confirm-dialog.vue
src/components/profile-dropdown.vue
src/components/coming-soon.vue
src/components/learn-more.vue
src/components/skip-to-main.vue
src/components/sign-out-dialog.vue
src/components/command-menu.vue
src/components/config-drawer.vue
src/components/config-drawer/ConfigDrawer.vue
src/components/date-picker/DatePicker.vue
src/components/select-dropdown.vue
src/components/long-text.vue
src/components/theme-switch.vue
src/components/search.vue
```

---

## 逐页面改造指南

### 1. 仪表盘页面 (Dashboard)

#### index.vue 主体结构

```vue
<!-- 顶部 Header -->
<Header>
  <TopNav :links="topNav" class="me-auto" />
  <Search />
  <ThemeSwitch />
  <ConfigDrawer />
  <ProfileDropdown />
</Header>

<!-- Main 主内容区 -->
<Main>
  <!-- 标题行 -->
  <div class="mb-2 flex items-center justify-between space-y-2">
    <h1 class="text-2xl font-bold tracking-tight">仪表盘</h1>
    <Button>下载</Button>
  </div>

  <!-- Tabs -->
  <Tabs default-value="overview" class="space-y-4">
    <TabsList>
      <TabsTrigger value="overview">概览</TabsTrigger>
      <TabsTrigger value="analytics">分析</TabsTrigger>
      <TabsTrigger value="reports" disabled>报告</TabsTrigger>
      <TabsTrigger value="notifications" disabled>通知</TabsTrigger>
    </TabsList>

    <!-- 概览 Tab -->
    <TabsContent value="overview" class="space-y-4">
      <!-- 4个统计卡片 -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="stat in statsCards">
          <CardHeader>标题</CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground">{{ stat.change }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- 图表网格 -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card class="col-span-1 lg:col-span-4">
          <CardHeader><CardTitle>概览</CardTitle></CardHeader>
          <CardContent><Overview /></CardContent>
        </Card>
        <Card class="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>最近销售</CardTitle>
            <CardDescription>本月共完成 265 笔销售。</CardDescription>
          </CardHeader>
          <CardContent><RecentSales /></CardContent>
        </Card>
      </div>
    </TabsContent>

    <!-- 分析 Tab -->
    <TabsContent value="analytics"><Analytics /></TabsContent>
  </Tabs>
</Main>
```

**统计卡片数据**：

```typescript
const statsCards = [
  { title: '总收入', value: '$45,231.89', change: '较上月 +20.1%' },
  { title: '订阅数', value: '+2350', change: '较上月 +180.1%' },
  { title: '销售额', value: '+12,234', change: '较上月 +19%' },
  { title: '当前在线', value: '+573', change: '过去一小时 +201' },
]
```

#### overview.vue 概览图表

- 使用 vue-echarts 或 recharts
- 柱状图展示每月数据
- X轴：Jan-Dec，Y轴：金额（带$符号）
- 颜色：`hsl(var(--primary))`

#### analytics.vue 分析页面

```vue
<div class="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>流量概览</CardTitle>
      <CardDescription>每周点击量和独立访客数</CardDescription>
    </CardHeader>
    <CardContent><AnalyticsChart /></CardContent>
  </Card>

  <!-- 4个统计卡片 -->
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <Card v-for="stat in stats">...</Card>
  </div>

  <!-- 来源渠道 + 设备类型 -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
    <Card class="col-span-1 lg:col-span-4">
      <CardTitle>来源渠道</CardTitle>
      <SimpleBarList :items="sourceItems" />
    </Card>
    <Card class="col-span-1 lg:col-span-3">
      <CardTitle>设备类型</CardTitle>
      <SimpleBarList :items="deviceItems" />
    </Card>
  </div>
</div>
```

#### recent-sales.vue 最近销售

```vue
<div class="space-y-8">
  <div v-for="sale in sales" class="flex items-center gap-4">
    <Avatar class="h-9 w-9">
      <AvatarImage :src="sale.avatar" />
      <AvatarFallback>{{ sale.initials }}</AvatarFallback>
    </Avatar>
    <div class="flex flex-1 flex-wrap items-center justify-between">
      <div>
        <p class="text-sm font-medium">{{ sale.name }}</p>
        <p class="text-sm text-muted-foreground">{{ sale.email }}</p>
      </div>
      <div class="font-medium">+{{ sale.amount }}</div>
    </div>
  </div>
</div>
```

---

### 2. 应用集成页面 (Apps)

```vue
<Header>
  <Search class="me-auto" />
  <ThemeSwitch />
  <ConfigDrawer />
  <ProfileDropdown />
</Header>

<Main fixed>
  <!-- 标题行 -->
  <div class="mb-2 flex items-center justify-between space-y-2">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">应用集成</h2>
      <p class="text-muted-foreground">连接您的应用以增强工作流程</p>
    </div>
    <Button variant="outline">
      <RefreshCw class="me-2 h-4 w-4" />刷新
    </Button>
  </div>

  <Separator class="my-4" />

  <!-- 筛选区域 -->
  <div class="my-4 flex items-end justify-between">
    <div class="flex gap-4">
      <!-- 搜索框 -->
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <Input placeholder="搜索应用..." class="pl-9 w-[280px]" />
      </div>
      <!-- 类型筛选 -->
      <Select>
        <SelectTrigger class="w-40">
          <SelectValue>所有应用</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有应用</SelectItem>
          <SelectItem value="connected">已连接</SelectItem>
          <SelectItem value="notConnected">未连接</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <!-- 排序 -->
    <Select>
      <SelectTrigger><SlidersHorizontal /></SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="asc">名称升序</SelectItem>
        <SelectItem value="desc">名称降序</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <!-- 应用卡片网格 -->
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
    <Card v-for="app in filteredApps">
      <CardHeader class="flex flex-row items-center justify-between">
        <div class="flex size-11 items-center justify-center rounded-lg bg-muted text-xl">
          {{ app.logo }}
        </div>
        <Badge :variant="app.connected ? 'default' : 'secondary'">
          {{ app.connected ? '已连接' : '未连接' }}
        </Badge>
      </CardHeader>
      <CardContent>
        <h3 class="font-semibold">{{ app.name }}</h3>
        <p class="text-sm text-muted-foreground line-clamp-2">{{ app.desc }}</p>
      </CardContent>
      <CardFooter>
        <Button class="w-full" :variant="app.connected ? 'outline' : 'default'">
          {{ app.connected ? '管理连接' : '连接' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</Main>
```

---

### 3. 聊天页面 (Chats)

```vue
<!-- 全屏布局 -->
<div class="flex h-full overflow-hidden">
  <!-- 左侧 - 聊天列表 -->
  <div class="flex w-full flex-col border-e sm:w-72 lg:w-80">
    <!-- 头部 -->
    <div class="flex items-center justify-between border-b p-4">
      <div class="flex items-center gap-2">
        <MessagesSquare class="h-5 w-5 text-muted-foreground" />
        <h1 class="text-lg font-semibold">消息</h1>
      </div>
      <Button size="icon" variant="ghost">
        <PenSquare class="h-4 w-4" />
      </Button>
    </div>

    <!-- 搜索 -->
    <div class="border-b p-3">
      <Input placeholder="搜索消息..." v-model="search" />
    </div>

    <!-- 聊天列表 -->
    <ScrollArea class="flex-1">
      <div class="space-y-1 p-2">
        <button v-for="chatUsr in filteredChatList" class="flex w-full items-start gap-3">
          <Avatar class="size-10">
            <AvatarImage :src="chatUsr.profile" />
            <AvatarFallback>{{ getInitials(chatUsr.fullName) }}</AvatarFallback>
          </Avatar>
          <div class="flex-1 overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="font-medium">{{ chatUsr.fullName }}</span>
              <span class="text-xs text-muted-foreground">{{ formatTime(chatUsr.timestamp) }}</span>
            </div>
            <p class="truncate text-sm text-muted-foreground">{{ getLastMessage(chatUsr) }}</p>
          </div>
          <Badge v-if="chatUsr.unread">{{ chatUsr.unread }}</Badge>
        </button>
      </div>
    </ScrollArea>
  </div>

  <!-- 右侧 - 聊天窗口 -->
  <div v-if="selectedUser" class="flex flex-1 flex-col">
    <!-- 聊天头部 -->
    <div class="flex items-center justify-between border-b p-4">
      <div class="flex items-center gap-3">
        <Button size="icon" variant="ghost" class="sm:hidden">
          <ArrowLeft />
        </Button>
        <Avatar class="hidden sm:flex size-10">
          <AvatarImage :src="selectedUser.profile" />
          <AvatarFallback>{{ getInitials(selectedUser.fullName) }}</AvatarFallback>
        </Avatar>
        <div>
          <h2 class="font-semibold">{{ selectedUser.fullName }}</h2>
          <p class="text-xs text-muted-foreground">{{ selectedUser.title }}</p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <Button size="icon" variant="ghost" class="hidden sm:inline-flex">
          <Video class="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" class="hidden sm:inline-flex">
          <Phone class="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVertical class="h-4 w-4" />
        </Button>
      </div>
    </div>

    <!-- 消息区域 -->
    <ScrollArea class="flex-1 p-4">
      <div class="space-y-4">
        <!-- 日期分隔 -->
        <div class="flex items-center gap-2 py-2">
          <div class="h-px flex-1 bg-border"></div>
          <span class="text-xs text-muted-foreground">今天</span>
          <div class="h-px flex-1 bg-border"></div>
        </div>
        <!-- 消息 -->
        <div v-for="msg in messages" class="flex gap-2" :class="msg.sender === 'You' ? 'flex-row-reverse' : ''">
          <Avatar v-if="msg.sender !== 'You'" class="size-8 shrink-0">
            <AvatarImage :src="selectedUser.profile" />
            <AvatarFallback>{{ getInitials(selectedUser.fullName) }}</AvatarFallback>
          </Avatar>
          <div class="max-w-[75%] rounded-2xl px-4 py-2" :class="msg.sender === 'You' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'">
            <p class="text-sm">{{ msg.message }}</p>
            <span class="mt-1 block text-xs" :class="msg.sender === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground'">
              {{ formatTime(msg.timestamp) }}
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>

    <!-- 消息输入 -->
    <div class="border-t p-4">
      <form class="flex items-end gap-2" @submit.prevent="sendMessage">
        <Button type="button" size="icon" variant="ghost" class="hidden sm:inline-flex">
          <Paperclip class="h-4 w-4" />
        </Button>
        <Button type="button" size="icon" variant="ghost" class="hidden sm:inline-flex">
          <ImagePlus class="h-4 w-4" />
        </Button>
        <div class="flex flex-1 items-center gap-2 rounded-full border bg-background px-4 py-2">
          <input type="text" v-model="messageInput" placeholder="输入消息..." class="flex-1 bg-transparent focus:outline-none" />
        </div>
        <Button type="submit" size="icon" class="rounded-full">
          <Send class="h-4 w-4" />
        </Button>
      </form>
    </div>
  </div>

  <!-- 空状态 -->
  <div v-else class="hidden flex-1 items-center justify-center bg-background sm:flex">
    <div class="text-center">
      <MessagesSquare class="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
      <h2 class="text-lg font-semibold">您的消息</h2>
      <p class="text-sm text-muted-foreground">发送消息以开始聊天</p>
    </div>
  </div>
</div>
```

---

### 4. 用户管理页面 (Users)

```vue
<Header>
  <Search class="me-auto" />
  <ThemeSwitch />
  <ConfigDrawer />
  <ProfileDropdown />
</Header>

<Main class="flex flex-1 flex-col gap-4">
  <!-- 标题 -->
  <div class="flex flex-wrap items-end justify-between gap-2">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">用户列表</h2>
      <p class="text-muted-foreground">在此管理您的用户及其角色。</p>
    </div>
    <UsersPrimaryButtons />
  </div>

  <!-- 表格 -->
  <UsersTable :data="users" />
</Main>

<UsersDialogs />
```

#### UsersTable.vue

```vue
<Card>
  <DataTable :data="data" :columns="columns">
    <!-- 工具栏 -->
    <DataTableToolbar>
      <Input placeholder="筛选用户..." v-model="globalFilter" />
      <DataTableFacetedFilter :options="roleOptions" column="role" />
      <DataTableFacetedFilter :options="statusOptions" column="status" />
    </DataTableToolbar>

    <!-- 列 -->
    <DataTableColumnHeader column="name"-header="名称" />
    <DataTableColumnHeader column="role"-header="角色" />
    <DataTableColumnHeader column="status"-header="状态" />
    <DataTableColumnHeader column="createdAt"-header="创建日期" />

    <!-- 行操作 -->
    <DataTableRowActions>
      <DropdownMenuItem>查看详情</DropdownMenuItem>
      <DropdownMenuItem>编辑用户</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">删除用户</DropdownMenuItem>
    </DataTableRowActions>
  </DataTable>

  <!-- 分页 -->
  <DataTablePagination />
</Card>
```

**角色 Badge 颜色**：
- Admin: `variant="default"` 或蓝色
- Manager: `variant="secondary"` 或绿色
- Cashier: `variant="outline"` 或橙色

**状态 Badge 颜色**：
- Active: `variant="default"` 或绿色
- Suspended: `variant="destructive"` 或红色
- Invited: `variant="secondary"` 或灰色

---

### 5. 任务管理页面 (Tasks)

结构与 Users 页面类似，使用 Drawer 代替 Dialog：

```vue
<!-- TasksMutateDrawer.vue -->
<Drawer>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{{ isEditing ? '编辑任务' : '新建任务' }}</DrawerTitle>
      <DrawerDescription>填写任务信息</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <Form>
        <FormField name="title">标题</FormField>
        <FormField name="status">状态</FormField>
        <FormField name="priority">优先级</FormField>
        <FormField name="dueDate">截止日期</FormField>
      </Form>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline">取消</Button>
      <Button>{{ isEditing ? '保存' : '创建' }}</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

---

### 6. 设置页面 (Settings)

#### 主布局 index.vue

```vue
<Header>
  <Search class="me-auto" />
  <ThemeSwitch />
  <ConfigDrawer />
  <ProfileDropdown />
</Header>

<Main fixed>
  <div class="space-y-0.5">
    <h1 class="text-2xl font-bold tracking-tight md:text-3xl">设置</h1>
    <p class="text-muted-foreground">管理您的账户设置和偏好。</p>
  </div>

  <Separator class="my-4 lg:my-6" />

  <div class="flex flex-col gap-16 lg:flex-row lg:gap-12">
    <!-- 左侧导航 -->
    <aside class="w-full lg:w-1/5">
      <SidebarNav />
    </aside>

    <!-- 右侧内容 -->
    <div class="flex-1 max-w-2xl">
      <RouterView />
    </div>
  </div>
</Main>
```

#### SidebarNav.vue

```vue
<ScrollArea class="hidden max-h-[calc(100vh-8rem)] md:block">
  <div class="flex flex-col gap-1 p-1">
    <RouterLink
      v-for="item in sidebarNavItems"
      :to="item.href"
      :class="cn(
        'flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium',
        'hover:bg-accent hover:text-accent-foreground',
        currentPath === item.href && 'bg-accent text-accent-foreground'
      )"
    >
      {{ item.title }}
    </RouterLink>
  </div>
</ScrollArea>
```

#### ProfileForm.vue

```vue
<form @submit="onSubmit" class="space-y-8">
  <FormField name="username">
    <FormLabel>用户名</FormLabel>
    <FormControl><Input /></FormControl>
    <FormDescription>这是您的公开显示名称。</FormDescription>
    <FormMessage />
  </FormField>

  <FormField name="email">
    <FormLabel>邮箱</FormLabel>
    <FormControl><Input type="email" /></FormControl>
    <FormDescription>您的邮箱地址用于登录和通知。</FormDescription>
    <FormMessage />
  </FormField>

  <FormField name="bio">
    <FormLabel>简介</FormLabel>
    <FormControl><Textarea /></FormControl>
    <FormDescription>简短介绍一下自己，最多160个字符。</FormDescription>
    <FormMessage />
  </FormField>

  <div class="flex justify-start gap-2">
    <Button type="submit">保存更改</Button>
    <Button type="button" variant="outline">重置</Button>
  </div>
</form>
```

#### AppearanceForm.vue

```vue
<div class="space-y-6">
  <!-- 主题模式 -->
  <div>
    <h4 class="mb-4 text-sm font-medium">主题模式</h4>
    <div class="grid grid-cols-3 gap-4">
      <Button
        v-for="m in appearanceModes"
        :class="cn('h-auto py-4 flex flex-col gap-2', mode === m.value && 'border-primary')"
        @click="handleModeChange(m.value)"
      >
        <component :is="m.icon" class="size-5" />
        {{ m.label }}
      </Button>
    </div>
  </div>

  <!-- 主题颜色 -->
  <div>
    <h4 class="mb-4 text-sm font-medium">主题颜色</h4>
    <div class="grid grid-cols-3 gap-4 sm:grid-cols-5">
      <Button
        v-for="t in themes"
        :class="cn('h-auto py-4 flex flex-col gap-2', theme === t.name && 'border-primary')"
        @click="setTheme(t.name)"
      >
        <div class="flex gap-1">
          <div class="size-3 rounded-full" :style="{ backgroundColor: t.activeColor }" />
          <div class="size-3 rounded-full opacity-60" :style="{ backgroundColor: t.activeColor }" />
        </div>
        <span class="text-xs">{{ t.label }}</span>
      </Button>
    </div>
  </div>
</div>
```

---

### 7. 帮助中心页面 (Help Center)

```vue
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

  <!-- 搜索 -->
  <div class="mb-8 max-w-xl">
    <div class="relative">
      <SearchIcon class="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input placeholder="搜索帮助文章..." class="h-11 ps-10" />
    </div>
  </div>

  <Separator class="my-6" />

  <!-- 分类卡片 -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card v-for="category in categories" class="group cursor-pointer hover:shadow-md hover:border-primary/50">
      <CardHeader>
        <div class="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <component :is="category.icon" class="h-6 w-6" />
        </div>
        <CardTitle>{{ category.title }}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{{ category.description }}</CardDescription>
      </CardContent>
    </Card>
  </div>

  <!-- 联系支持 -->
  <div class="mt-12 rounded-lg border bg-card p-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold mb-1">没找到您需要的答案？</h2>
        <p class="text-sm text-muted-foreground">平均响应时间：24小时内</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline">
          <MessageCircle class="me-2 h-4 w-4" />在线客服
        </Button>
        <Button><Ticket class="me-2 h-4 w-4" />提交工单</Button>
      </div>
    </div>
  </div>
</Main>
```

---

### 8. 认证页面 (Auth)

#### sign-in/index.vue

```vue
<AuthLayout>
  <Card class="max-w-sm gap-4">
    <CardHeader>
      <CardTitle>登录</CardTitle>
      <CardDescription>
        欢迎回来！请在下方输入您的凭据。
        <router-link to="/sign-up" class="underline underline-offset-4 hover:text-primary">
          注册
        </router-link>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <UserAuthForm />
    </CardContent>
    <CardFooter>
      <p class="px-8 text-center text-sm text-muted-foreground">
        点击登录即表示您同意我们的
        <a href="/terms" class="underline">服务条款</a>和
        <a href="/privacy" class="underline">隐私政策</a>。
      </p>
    </CardFooter>
  </Card>
</AuthLayout>
```

#### UserAuthForm.vue

```vue
<form @submit="onSubmit" class="grid gap-3">
  <!-- 邮箱 -->
  <FormField name="email">
    <FormLabel>邮箱</FormLabel>
    <FormControl><Input placeholder="name@example.com" /></FormControl>
    <FormMessage />
  </FormField>

  <!-- 密码 -->
  <FormField name="password">
    <FormLabel>密码</FormLabel>
    <FormControl>
      <div class="relative">
        <PasswordInput placeholder="********" />
        <router-link to="/forgot-password" class="absolute end-0 top-0 text-sm text-muted-foreground hover:underline">
          忘记密码？
        </router-link>
      </div>
    </FormControl>
    <FormMessage />
  </FormField>

  <!-- 提交 -->
  <Button type="submit" class="mt-2" :disabled="isLoading">
    <Loader2 v-if="isLoading" class="animate-spin" />
    <LogIn v-else />
    登录
  </Button>

  <!-- 分隔线 -->
  <div class="relative my-2">
    <div class="absolute inset-0 flex items-center"><span class="w-full border-t" /></div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-background px-2 text-muted-foreground">或使用以下方式登录</span>
    </div>
  </div>

  <!-- 社交登录 -->
  <div class="grid grid-cols-2 gap-2">
    <Button variant="outline" type="button"><IconGithub class="h-4 w-4" /> GitHub</Button>
    <Button variant="outline" type="button"><IconFacebook class="h-4 w-4" /> Facebook</Button>
  </div>
</form>
```

#### sign-in-2/index.vue（双栏登录）

```vue
<div class="relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
  <!-- 左侧表单 -->
  <div class="lg:p-8">
    <div class="mx-auto flex w-full max-w-sm flex-col justify-center space-y-2">
      <div class="flex items-center justify-center">
        <Logo class="me-2" />
        <h1 class="text-xl font-medium">Shadcn Admin</h1>
      </div>
      <h2 class="text-lg font-semibold">登录</h2>
      <p class="text-sm text-muted-foreground">输入邮箱和密码登录</p>
      <UserAuthForm />
    </div>
  </div>

  <!-- 右侧背景 -->
  <div class="relative hidden h-full flex-col bg-muted lg:flex">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
    <div class="relative z-10 text-center">
      <h2 class="text-2xl font-bold">管理您的业务</h2>
      <p class="text-muted-foreground">一个现代化的管理面板</p>
    </div>
  </div>
</div>
```

---

### 9. 错误页面 (Errors)

```vue
<!-- 404 Not Found -->
<div class="h-svh">
  <div class="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
    <h1 class="text-[7rem] font-bold">404</h1>
    <span class="font-medium">抱歉！页面未找到！</span>
    <p class="text-center text-muted-foreground">您访问的页面不存在或可能已被移除。</p>
    <div class="mt-6 flex gap-4">
      <Button variant="outline" @click="goBack">返回</Button>
      <Button @click="goHome">返回首页</Button>
    </div>
  </div>
</div>
```

错误类型：
- **401 unauthorized**: 未授权访问
- **403 forbidden**: 禁止访问
- **404 not-found**: 页面未找到
- **500 general-error**: 服务器内部错误
- **503 maintenance**: 网站维护中

---

### 10. 即将推出页面 (Coming Soon)

```vue
<div class="flex h-full flex-col">
  <Header class="border-b">
    <Search class="me-auto" />
    <ThemeSwitch />
    <ConfigDrawer />
    <ProfileDropdown />
  </Header>

  <div class="flex flex-1 items-center justify-center">
    <div class="text-center max-w-md">
      <!-- 动画图标 -->
      <div class="relative mx-auto mb-8">
        <div class="flex size-20 items-center justify-center rounded-full bg-primary/10">
          <Rocket class="h-10 w-10 text-primary animate-bounce" />
        </div>
        <div class="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
      </div>

      <h1 class="text-4xl font-bold tracking-tight mb-3">敬请期待！</h1>
      <p class="text-muted-foreground mb-8">我们正在努力为您打造更好的体验。</p>

      <!-- 进度条 -->
      <div class="mb-8">
        <div class="flex items-center justify-between text-sm mb-2">
          <span class="text-muted-foreground">开发进度</span>
          <span class="font-medium">78%</span>
        </div>
        <div class="h-2 bg-muted rounded-full">
          <div class="h-full bg-primary rounded-full" style="width: 78%" />
        </div>
      </div>

      <Button variant="outline" class="mb-6">
        <Bell class="me-2 h-4 w-4" />通知我
      </Button>

      <div>
        <Button variant="ghost" as-child>
          <router-link to="/">
            <ArrowLeft class="me-2 h-4 w-4" />返回仪表盘
          </router-link>
        </Button>
      </div>
    </div>
  </div>
</div>
```

---

### 11. 布局组件

#### AppSidebar.vue

```vue
<Sidebar :collapsible="collapsible" :variant="variant">
  <SidebarHeader>
    <TeamSwitcher :teams="sidebarData.teams" />
  </SidebarHeader>
  <SidebarContent>
    <NavGroup
      v-for="group in sidebarData.navGroups"
      :key="group.title"
      :title="group.title"
      :items="group.items"
    />
  </SidebarContent>
  <SidebarFooter>
    <NavUser :user="sidebarData.user" />
  </SidebarFooter>
  <SidebarRail />
</Sidebar>
```

#### Header.vue

```vue
<header :class="cn('z-50 h-16', fixed && 'header-fixed', props.class)">
  <div class="relative flex h-full items-center gap-3 p-4 sm:gap-4">
    <SidebarTrigger variant="outline" class="max-md:scale-125" />
    <Separator orientation="vertical" class="h-6" />
    <slot />
  </div>
</header>
```

#### NavUser.vue

```vue
<SidebarMenu>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <SidebarMenuButton size="lg">
          <Avatar class="h-8 w-8 rounded-lg">
            <AvatarImage :src="user.avatar" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div class="grid flex-1 text-start text-sm">
            <span class="truncate font-semibold">{{ user.name }}</span>
            <span class="truncate text-xs">{{ user.email }}</span>
          </div>
          <ChevronsUpDown class="ms-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-(--radix-dropdown-menu-trigger-width) min-w-56">
        <!-- 升级 -->
        <DropdownMenuItem><Sparkles />升级到专业版</DropdownMenuItem>
        <DropdownMenuSeparator />
        <!-- 设置链接 -->
        <DropdownMenuItem as-child><RouterLink to="/settings/account"><BadgeCheck />账户</RouterLink></DropdownMenuItem>
        <DropdownMenuItem as-child><RouterLink to="/settings"><CreditCard />账单</RouterLink></DropdownMenuItem>
        <DropdownMenuItem as-child><RouterLink to="/settings/notifications"><Bell />通知</RouterLink></DropdownMenuItem>
        <DropdownMenuSeparator />
        <!-- 退出 -->
        <DropdownMenuItem variant="destructive"><LogOut />退出登录</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</SidebarMenu>
```

---

## 逐文件改造顺序

### 第一批：核心布局组件

1. `src/components/layout/AuthenticatedLayout.vue`
2. `src/components/layout/AppSidebar.vue`
3. `src/components/layout/Header.vue`
4. `src/components/layout/Main.vue`
5. `src/components/layout/NavUser.vue`
6. `src/components/layout/NavGroup.vue`
7. `src/components/layout/TopNav.vue`
8. `src/components/layout/TeamSwitcher.vue`

### 第二批：通用UI组件

9. `src/components/profile-dropdown.vue`
10. `src/components/search.vue`
11. `src/components/theme-switch.vue`
12. `src/components/config-drawer.vue`
13. `src/components/config-drawer/ConfigDrawer.vue`
14. `src/components/command-menu.vue`
15. `src/components/sign-out-dialog.vue`

### 第三批：Dashboard

16. `src/features/dashboard/index.vue`
17. `src/features/dashboard/components/overview.vue`
18. `src/features/dashboard/components/recent-sales.vue`
19. `src/features/dashboard/components/analytics.vue`
20. `src/features/dashboard/components/analytics-chart.vue`
21. `src/features/dashboard/components/SimpleBarList.vue`

### 第四批：Users

22. `src/features/users/index.vue`
23. `src/features/users/components/UsersTable.vue`
24. `src/features/users/components/UsersPrimaryButtons.vue`
25. `src/features/users/components/UsersDialogs.vue`
26. `src/features/users/components/UsersInviteDialog.vue`
27. `src/features/users/components/UsersDeleteDialog.vue`
28. `src/features/users/components/UsersActionDialog.vue`
29. `src/features/users/components/DataTableRowActions.vue`
30. `src/features/users/components/DataTableBulkActions.vue`

### 第五批：Tasks

31. `src/features/tasks/index.vue`
32. `src/features/tasks/components/TasksTable.vue`
33. `src/features/tasks/components/TasksPrimaryButtons.vue`
34. `src/features/tasks/components/TasksDialogs.vue`
35. `src/features/tasks/components/TasksMutateDrawer.vue`
36. `src/features/tasks/components/TasksImportDialog.vue`
37. `src/features/tasks/components/TasksMultiDeleteDialog.vue`
38. `src/features/tasks/components/DataTableRowActions.vue`
39. `src/features/tasks/components/DataTableBulkActions.vue`

### 第六批：Apps

40. `src/features/apps/index.vue`
41. `src/features/apps/data/apps.ts`

### 第七批：Chats

42. `src/features/chats/index.vue`
43. `src/features/chats/components/NewChat.vue`

### 第八批：Settings

44. `src/features/settings/index.vue`
45. `src/features/settings/components/SidebarNav.vue`
46. `src/features/settings/profile/index.vue`
47. `src/features/settings/profile/ProfileForm.vue`
48. `src/features/settings/account/index.vue`
49. `src/features/settings/account/AccountForm.vue`
50. `src/features/settings/appearance/index.vue`
51. `src/features/settings/appearance/AppearanceForm.vue`
52. `src/features/settings/notifications/index.vue`
53. `src/features/settings/notifications/NotificationsForm.vue`
54. `src/features/settings/display/index.vue`
55. `src/features/settings/display/DisplayForm.vue`

### 第九批：Help Center

56. `src/features/help-center/index.vue`

### 第十批：Coming Soon

57. `src/features/coming-soon/index.vue`

### 第十一批：Auth

58. `src/features/auth/AuthLayout.vue`
59. `src/features/auth/sign-in/index.vue`
60. `src/features/auth/sign-in/components/UserAuthForm.vue`
61. `src/features/auth/sign-in-2/index.vue`
62. `src/features/auth/sign-up/index.vue`
63. `src/features/auth/sign-up/components/SignUpForm.vue`
64. `src/features/auth/forgot-password/index.vue`
65. `src/features/auth/forgot-password/components/ForgotPasswordForm.vue`
66. `src/features/auth/otp/index.vue`
67. `src/features/auth/otp/components/OtpForm.vue`

### 第十二批：Errors

68. `src/features/errors/not-found.vue`
69. `src/features/errors/not-found-error.vue`
70. `src/features/errors/unauthorized.vue`
71. `src/features/errors/forbidden.vue`
72. `src/features/errors/general-error.vue`
73. `src/features/errors/maintenance.vue`
74. `src/features/errors/server-error.vue`

### 第十三批：Data Table 组件

75. `src/components/data-table/DataTableToolbar.vue`
76. `src/components/data-table/DataTablePagination.vue`
77. `src/components/data-table/DataTableViewOptions.vue`
78. `src/components/data-table/DataTableColumnHeader.vue`
79. `src/components/data-table/DataTableFacetedFilter.vue`
80. `src/components/data-table/DataTableBulkActions.vue`

---

## 质量验证检查清单

### 视觉对比

1. 打开本地开发服务器：`http://localhost:5173`
2. 打开线上版本：`https://shadcn-admin.netlify.app/`
3. 对比每个页面的：
   - 布局结构
   - 颜色（主色、背景、文字）
   - 字体大小和粗细
   - 间距（padding、margin）
   - 圆角（rounded-lg、rounded-xl 等）
   - 阴影（shadow-sm、shadow-md 等）
   - 动画效果（transition、animate）

### 功能测试

1. 点击所有按钮是否工作
2. 表单提交是否正常
3. 模态框/抽屉是否正常打开关闭
4. 分页是否工作
5. 筛选排序是否工作
6. 主题切换是否正常

### 响应式测试

- 桌面端（1920px+）
- 笔记本（1366px）
- 平板（768px）
- 手机（375px）

### 代码检查

```bash
# TypeScript 检查
pnpm vue-tsc --noEmit

# Lint 检查
pnpm lint

# 构建测试
pnpm build
```

---

## 常见问题处理

### Q1: 组件不存在？

检查 `src/components/ui` 目录，使用已有的 shadcn/ui 组件。如果确实需要新组件，需要先创建。

### Q2: 样式不一致？

使用浏览器开发者工具检查线上版本的 CSS 类名，确保使用正确的 Tailwind 类名。

### Q3: 图标找不到？

使用 `lucide-vue-next` 图标库。如果找不到，搜索相似图标或使用通用图标。

### Q4: 数据格式？

查看 `src/features/*/data` 目录下的数据文件，确保数据结构与组件使用匹配。

### Q5: 依赖问题？

使用 `pnpm install` 安装依赖，不要使用 npm（项目配置为 pnpm）。

### Q6: 开发服务器端口被占用？

默认端口是 5173，如果被占用会自动切换到其他端口（如 5174、5175）。

---

## 技术栈参考

### 依赖版本

```json
{
  "vue": "^3.5.34",
  "vite": "^8.0.12",
  "tailwindcss": "^4.3.0",
  "typescript": "~6.0.2",
  "lucide-vue-next": "^1.0.0",
  "reka-ui": "^2.9.7",
  "@tanstack/vue-table": "^8.21.3",
  "date-fns": "^4.2.1",
  "sonner": "^2.0.7",
  "zod": "^3.25.76",
  "vee-validate": "^4.15.1",
  "@vee-validate/zod": "^4.15.1"
}
```

---

## 🔧 问题修复记录

### 2026-05-22: DropdownMenu 无法关闭 & 移除 radix-vue

#### 问题描述

1. **下拉菜单无法关闭**：点击外部、点击触发器都无法关闭菜单
2. **aria-hidden 警告**：控制台出现 `Blocked aria-hidden on an element because its descendant retained focus` 警告
3. **混合库问题**：部分组件使用 `reka-ui`，部分使用 `radix-vue`

#### 根本原因

1. `profile-dropdown.vue` 使用了 `force-mount` 属性，导致菜单关闭后 DOM 元素仍存在
2. `theme-switch.vue` 直接从 `radix-vue` 导入组件，与其他组件使用的 `reka-ui` 混用
3. 存在多个错误的 `index.vue` 文件（如 `avatar/index.vue`、`alert-dialog/index.vue`）从 `radix-vue` 导入

#### 修复方案

1. **移除 `force-mount`**：在 `profile-dropdown.vue` 中删除 `force-mount` 属性

```vue
// 修改前
<DropdownMenuContent class="w-56" align="end" force-mount>

// 修改后
<DropdownMenuContent class="w-56" align="end">
```

2. **统一使用 reka-ui**：修改 `theme-switch.vue`

```vue
// 修改前
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'radix-vue'

// 修改后
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
```

3. **删除错误的 index.vue 文件**：
   - `src/components/ui/avatar/index.vue`
   - `src/components/ui/alert-dialog/index.vue`

4. **移除 radix-vue 依赖**：从 `package.json` 删除 `"radix-vue": "^1.9.17"`

#### 验证结果

- 主题切换菜单 ✅ 正常工作
- 用户下拉菜单 ✅ 可以正常关闭
- aria-hidden 警告 ✅ 已消失
- `radix-vue` ✅ 已完全移除

### 关键命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm vue-tsc --noEmit

# 预览
pnpm preview
```
