<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>新建对话</DialogTitle>
      </DialogHeader>

      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-baseline-last gap-2">
          <span class="min-h-6 text-sm text-muted-foreground">To:</span>
          <Badge
            v-for="user in selectedUsers"
            :key="user.id"
            variant="default"
            class="gap-1"
          >
            {{ user.fullName }}
            <button
              class="ms-1 rounded-full ring-offset-background outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
              @click="removeUser(user.id)"
              @keydown.enter="removeUser(user.id)"
            >
              <X class="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        </div>

        <Command class="rounded-lg border">
          <CommandInput placeholder="搜索联系人..." class="text-foreground" />
          <CommandList>
            <CommandEmpty>未找到联系人。</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="user in users"
                :key="user.id"
                :value="user.id"
                @select="() => selectUser(user)"
                class="flex items-center justify-between gap-2 hover:bg-accent hover:text-accent-foreground"
              >
                <div class="flex items-center gap-2">
                  <img
                    :src="user.profile || '/placeholder.svg'"
                    :alt="user.fullName"
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ user.fullName }}</span>
                    <span class="text-xs text-accent-foreground/70">{{ user.username }}</span>
                  </div>
                </div>

                <Check v-if="isUserSelected(user.id)" class="h-4 w-4" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <Button variant="default" @click="submitChat" :disabled="selectedUsers.length === 0">
          对话
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { ChatUser } from '../data/chat-types'

type User = Omit<ChatUser, 'messages'>

const props = defineProps<{
  users: User[]
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const selectedUsers = ref<User[]>([])

const isUserSelected = (userId: string): boolean => {
  return selectedUsers.value.some((u) => u.id === userId)
}

const selectUser = (user: User) => {
  if (!isUserSelected(user.id)) {
    selectedUsers.value = [...selectedUsers.value, user]
  } else {
    removeUser(user.id)
  }
}

const removeUser = (userId: string) => {
  selectedUsers.value = selectedUsers.value.filter((user) => user.id !== userId)
}

const handleOpenChange = (newOpen: boolean) => {
  emit('update:open', newOpen)
  if (!newOpen) {
    selectedUsers.value = []
  }
}

const submitChat = () => {
  console.log('Selected users:', selectedUsers.value)
}
</script>
