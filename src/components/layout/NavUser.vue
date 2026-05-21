<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'
import { useDialogState } from '@/composables/useDialogState'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  user: {
    name: string
    email: string
    avatar: string
  }
}

const props = defineProps<Props>()
const { open: _open, setOpen } = useDialogState()
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="gap-2 h-auto py-2 px-3 bg-background shadow-md">
          <Avatar class="h-7 w-7 rounded-lg">
            <AvatarImage :src="user.avatar" :alt="user.name" />
            <AvatarFallback class="rounded-lg text-xs">SN</AvatarFallback>
          </Avatar>
          <div class="hidden sm:flex flex-col items-start text-left leading-tight">
            <span class="text-xs font-semibold truncate max-w-[100px]">{{ user.name }}</span>
            <span class="text-[11px] text-muted-foreground truncate max-w-[100px]">{{ user.email }}</span>
          </div>
          <ChevronsUpDown class="size-3.5 text-muted-foreground shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="w-56 rounded-lg"
        align="end"
        :side-offset="8"
      >
        <DropdownMenuLabel class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">SN</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem as-child>
            <RouterLink to="/settings/account">
              <BadgeCheck />
              Account
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem as-child>
            <RouterLink to="/settings">
              <CreditCard />
              Billing
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem as-child>
            <RouterLink to="/settings/notifications">
              <Bell />
              Notifications
            </RouterLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          @click="() => setOpen(true)"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
