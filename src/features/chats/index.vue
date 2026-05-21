<template>
  <div class="flex h-full overflow-hidden">
    <!-- Left Sidebar - Chat List -->
    <div
      :class="[
        'flex w-full flex-col border-e bg-card sm:w-72 lg:w-80',
        selectedUser && 'hidden sm:flex'
      ]"
    >
      <!-- Chat List Header -->
      <div class="flex items-center justify-between border-b p-4">
        <div class="flex items-center gap-2">
          <MessagesSquare :size="20" class="text-muted-foreground" />
          <h1 class="text-lg font-semibold">Messages</h1>
        </div>
        <Button
          size="icon"
          variant="ghost"
          @click="createConversationDialog = true"
          class="rounded-full"
        >
          <PenSquare :size="18" class="text-muted-foreground" />
        </Button>
      </div>

      <!-- Search -->
      <div class="border-b p-3">
        <div class="relative">
          <Search :size="15" class="absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            class="ps-9 h-9"
            v-model="search"
          />
        </div>
      </div>

      <!-- Chat List -->
      <ScrollArea class="flex-1">
        <div class="space-y-1 p-2">
          <template v-for="(chatUsr, index) in filteredChatList" :key="chatUsr.id">
            <button
              type="button"
              :class="[
                'group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-start transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                selectedUser?.id === chatUsr.id && 'bg-accent'
              ]"
              @click="selectUser(chatUsr)"
            >
              <Avatar class="mt-0.5 size-10">
                <AvatarImage :src="chatUsr.profile" :alt="chatUsr.username" />
                <AvatarFallback>{{ getDisplayNameInitials(chatUsr.fullName) }}</AvatarFallback>
              </Avatar>
              <div class="flex-1 overflow-hidden">
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ chatUsr.fullName }}</span>
                  <span class="text-xs text-muted-foreground">
                    {{ formatRelativeTime(chatUsr.messages[0]?.timestamp) }}
                  </span>
                </div>
                <p class="truncate text-sm text-muted-foreground group-hover:text-accent-foreground/80">
                  {{ getLastMessage(chatUsr) }}
                </p>
              </div>
              <Badge v-if="chatUsr.unread" variant="default" class="mt-1 ms-auto"> {{ chatUsr.unread }} </Badge>
            </button>
            <Separator v-if="index < filteredChatList.length - 1" class="my-1" />
          </template>

          <!-- Empty State -->
          <div v-if="filteredChatList.length === 0" class="flex flex-col items-center justify-center py-8 text-center">
            <MessagesSquare :size="32" class="mb-2 text-muted-foreground/50" />
            <p class="text-sm text-muted-foreground">No messages found</p>
          </div>
        </div>
      </ScrollArea>
    </div>

    <!-- Right Side - Chat Window -->
    <div
      v-if="selectedUser"
      :class="[
        'flex flex-1 flex-col bg-background',
        !selectedUser && 'hidden sm:flex'
      ]"
    >
      <!-- Chat Header -->
      <div class="flex items-center justify-between border-b p-4">
        <div class="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            class="sm:hidden"
            @click="selectedUser = null"
          >
            <ArrowLeft :size="18" />
          </Button>
          <Avatar class="hidden sm:flex size-10">
            <AvatarImage :src="selectedUser.profile" :alt="selectedUser.username" />
            <AvatarFallback>{{ getDisplayNameInitials(selectedUser.fullName) }}</AvatarFallback>
          </Avatar>
          <div>
            <h2 class="font-semibold">{{ selectedUser.fullName }}</h2>
            <p class="text-xs text-muted-foreground">{{ selectedUser.title }}</p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <Button size="icon" variant="ghost" class="hidden sm:inline-flex">
            <Video :size="18" class="text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost" class="hidden sm:inline-flex">
            <Phone :size="18" class="text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoreVertical :size="18" class="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <!-- Messages Area -->
      <ScrollArea class="flex-1 p-4">
        <div class="space-y-4">
          <template v-for="(group, dateKey) in groupedMessages" :key="dateKey">
            <!-- Date Divider -->
            <div class="flex items-center gap-2 py-2">
              <div class="h-px flex-1 bg-border"></div>
              <span class="text-xs text-muted-foreground">{{ dateKey }}</span>
              <div class="h-px flex-1 bg-border"></div>
            </div>

            <!-- Messages -->
            <div class="space-y-3">
              <template v-for="(msg, msgIndex) in group.messages" :key="`${msg.sender}-${msg.timestamp}-${msgIndex}`">
                <div
                  :class="[
                    'flex gap-2',
                    msg.sender === 'You' ? 'flex-row-reverse' : 'flex-row'
                  ]"
                >
                  <Avatar v-if="msg.sender !== 'You'" class="size-8 shrink-0">
                    <AvatarImage :src="selectedUser.profile" :alt="selectedUser.username" />
                    <AvatarFallback>{{ getDisplayNameInitials(selectedUser.fullName) }}</AvatarFallback>
                  </Avatar>

                  <div
                    :class="[
                      'max-w-[75%] rounded-2xl px-4 py-2',
                      msg.sender === 'You'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    ]"
                  >
                    <p class="text-sm">{{ msg.message }}</p>
                    <span
                      :class="[
                        'mt-1 block text-xs',
                        msg.sender === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      ]"
                    >
                      {{ formatTime(msg.timestamp) }}
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </ScrollArea>

      <!-- Message Input -->
      <div class="border-t p-4">
        <form class="flex items-end gap-2" @submit.prevent="sendMessage">
          <div class="flex items-center gap-1">
            <Button type="button" size="icon" variant="ghost" class="hidden sm:inline-flex">
              <Paperclip :size="18" class="text-muted-foreground" />
            </Button>
            <Button type="button" size="icon" variant="ghost" class="hidden sm:inline-flex">
              <ImagePlus :size="18" class="text-muted-foreground" />
            </Button>
          </div>

          <div class="flex flex-1 items-center gap-2 rounded-full border bg-background px-4 py-2">
            <input
              type="text"
              v-model="messageInput"
              placeholder="Type a message..."
              class="flex-1 bg-transparent text-sm focus-visible:outline-none"
            />
          </div>

          <Button type="submit" size="icon" class="rounded-full shrink-0">
            <Send :size="18" />
          </Button>
        </form>
      </div>
    </div>

    <!-- Empty State when no user selected -->
    <div
      v-else
      class="hidden flex-1 flex-col items-center justify-center bg-background sm:flex"
    >
      <div class="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
        <MessagesSquare :size="28" class="text-muted-foreground" />
      </div>
      <h2 class="text-lg font-semibold mb-1">Your Messages</h2>
      <p class="text-sm text-muted-foreground mb-4">Send a message to start a conversation</p>
      <Button @click="createConversationDialog = true">
        <PenSquare :size="16" class="me-2" />
        New Conversation
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  ImagePlus,
  Send,
  Video,
  MessagesSquare,
  PenSquare,
} from 'lucide-vue-next'
import { getDisplayNameInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { ChatUser, Convo } from './data/chat-types'
import { conversations } from './data/convo.json'

const search = ref('')
const selectedUser = ref<ChatUser | null>(null)
const messageInput = ref('')
const createConversationDialog = ref(false)

const filteredChatList = computed(() => {
  if (!search.value.trim()) return conversations
  return conversations.filter(({ fullName }) =>
    fullName.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

const groupedMessages = computed(() => {
  if (!selectedUser.value?.messages) return {} as Record<string, { messages: Convo[] }>

  return selectedUser.value.messages.reduce(
    (acc: Record<string, { messages: Convo[] }>, obj) => {
      const date = new Date(obj.timestamp)
      let key: string

      if (isToday(date)) {
        key = 'Today'
      } else if (isYesterday(date)) {
        key = 'Yesterday'
      } else {
        key = format(date, 'MMMM d, yyyy')
      }

      if (!acc[key]) {
        acc[key] = { messages: [] }
      }

      acc[key].messages.push(obj)

      return acc
    },
    {}
  )
})

const selectUser = (chatUsr: ChatUser) => {
  selectedUser.value = chatUsr
}

const getLastMessage = (chatUsr: ChatUser): string => {
  const lastConvo = chatUsr.messages[chatUsr.messages.length - 1]
  if (!lastConvo) return ''
  const prefix = lastConvo.sender === 'You' ? 'You: ' : ''
  return prefix + lastConvo.message
}

const formatTime = (timestamp: string): string => {
  return format(new Date(timestamp), 'HH:mm')
}

const formatRelativeTime = (timestamp?: string): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  if (isToday(date)) {
    return format(date, 'HH:mm')
  }
  return formatDistanceToNow(date, { addSuffix: true })
}

const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedUser.value) return

  const newMessage: Convo = {
    sender: 'You',
    message: messageInput.value.trim(),
    timestamp: new Date().toISOString()
  }

  selectedUser.value.messages = [newMessage, ...selectedUser.value.messages]
  messageInput.value = ''
}
</script>
