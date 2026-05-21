<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col gap-1.5">
          <p class="text-sm leading-none font-medium">管理员</p>
          <p class="text-xs leading-none text-muted-foreground">
            admin@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <router-link to="/settings">
            个人资料
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </router-link>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <router-link to="/settings">
            账单
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </router-link>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <router-link to="/settings">
            设置
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </router-link>
        </DropdownMenuItem>
        <DropdownMenuItem>新建团队</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        退出登录
        <DropdownMenuShortcut class="text-current">
          ⇧⌘Q
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
