<template>
  <div>
    <Header>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <Main fixed>
      <section class="flex h-full gap-6">
        <!-- Left Side -->
        <div class="flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80">
          <div class="sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none">
            <div class="flex items-center justify-between py-2">
              <div class="flex gap-2">
                <h1 class="text-2xl font-bold">收件箱</h1>
                <MessagesSquare :size="20" />
              </div>

              <Button
                size="icon"
                variant="ghost"
                @click="createConversationDialog = true"
                class="rounded-lg"
              >
                <Edit :size="24" class="stroke-muted-foreground" />
              </Button>
            </div>

            <label
              :class="
                cn(
                  'focus-within:ring-1 focus-within:ring-ring focus-within:outline-hidden',
                  'flex h-10 w-full items-center space-x-0 rounded-md border border-border ps-2'
                )
              "
            >
              <SearchIcon :size="15" class="me-2 stroke-slate-500" />
              <span class="sr-only">搜索</span>
              <input
                type="text"
                class="w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden"
                placeholder="搜索聊天..."
                v-model="search"
              />
            </label>
          </div>

          <ScrollArea class="-mx-3 h-full overflow-scroll p-3">
            <template v-for="(chatUsr, index) in filteredChatList" :key="chatUsr.id">
              <button
                type="button"
                :class="
                  cn(
                    'group hover:bg-accent hover:text-accent-foreground',
                    'flex w-full rounded-md px-2 py-2 text-start text-sm',
                    selectedUser?.id === chatUsr.id && 'sm:bg-muted'
                  )
                "
                @click="selectUser(chatUsr)"
              >
                <div class="flex gap-2">
                  <Avatar>
                    <AvatarImage :src="chatUsr.profile" :alt="chatUsr.username" />
                    <AvatarFallback>{{ getDisplayNameInitials(chatUsr.fullName) }}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span class="col-start-2 row-span-2 font-medium">{{ chatUsr.fullName }}</span>
                    <span class="col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground group-hover:text-accent-foreground/90">
                      {{ getLastMessage(chatUsr) }}
                    </span>
                  </div>
                </div>
              </button>
              <Separator v-if="index < filteredChatList.length - 1" class="my-1" />
            </template>
          </ScrollArea>
        </div>

        <!-- Right Side -->
        <div
          v-if="selectedUser"
          :class="
            cn(
              'absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col border bg-background shadow-xs sm:static sm:z-auto sm:flex sm:rounded-md',
              mobileSelectedUser && 'inset-s-0 flex'
            )
          "
        >
          <!-- Top Part -->
          <div class="mb-1 flex flex-none justify-between bg-card p-4 shadow-lg sm:rounded-t-md">
            <!-- Left -->
            <div class="flex gap-3">
              <Button
                size="icon"
                variant="ghost"
                class="-ms-2 h-full sm:hidden"
                @click="mobileSelectedUser = null"
              >
                <ArrowLeft class="rtl:rotate-180" />
              </Button>
              <div class="flex items-center gap-2 lg:gap-4">
                <Avatar class="size-9 lg:size-11">
                  <AvatarImage :src="selectedUser.profile" :alt="selectedUser.username" />
                  <AvatarFallback>{{ getDisplayNameInitials(selectedUser.fullName) }}</AvatarFallback>
                </Avatar>
                <div>
                  <span class="col-start-2 row-span-2 text-sm font-medium lg:text-base">{{ selectedUser.fullName }}</span>
                  <span class="col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis text-muted-foreground lg:max-w-none lg:text-sm">{{ selectedUser.title }}</span>
                </div>
              </div>
            </div>

            <!-- Right -->
            <div class="-me-1 flex items-center gap-1 lg:gap-2">
              <Button size="icon" variant="ghost" class="hidden size-8 rounded-full sm:inline-flex lg:size-10">
                <Video :size="22" class="stroke-muted-foreground" />
              </Button>
              <Button size="icon" variant="ghost" class="hidden size-8 rounded-full sm:inline-flex lg:size-10">
                <Phone :size="22" class="stroke-muted-foreground" />
              </Button>
              <Button size="icon" variant="ghost" class="h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6">
                <MoreVertical class="stroke-muted-foreground sm:size-5" />
              </Button>
            </div>
          </div>

          <!-- Conversation -->
          <div class="flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4">
            <div class="flex size-full flex-1">
              <div class="chat-text-container relative -me-4 flex flex-1 flex-col overflow-y-hidden">
                <div class="chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pe-4 pb-4">
                  <template v-for="(msgs, key) in groupedMessages" :key="key">
                    <template v-for="(msg, index) in msgs" :key="`${msg.sender}-${msg.timestamp}-${index}`">
                      <div
                        :class="
                          cn(
                            'chat-box max-w-72 px-3 py-2 wrap-break-word shadow-lg',
                            msg.sender === 'You'
                              ? 'self-end rounded-[16px_16px_0_16px] bg-primary/90 text-primary-foreground/75'
                              : 'self-start rounded-[16px_16px_16px_0] bg-muted'
                          )
                        "
                      >
                        {{ msg.message }}
                        <span
                          :class="
                            cn(
                              'mt-1 block text-xs font-light text-foreground/75 italic',
                              msg.sender === 'You' && 'text-end text-primary-foreground/85'
                            )
                          "
                        >
                          {{ formatTime(msg.timestamp) }}
                        </span>
                      </div>
                    </template>
                    <div class="text-center text-xs">{{ key }}</div>
                  </template>
                </div>
              </div>
            </div>
            <form class="flex w-full flex-none gap-2" @submit.prevent="sendMessage">
              <div class="flex flex-1 items-center gap-2 rounded-md border border-input bg-card px-2 py-1 focus-within:ring-1 focus-within:ring-ring focus-within:outline-hidden lg:gap-4">
                <div class="space-x-1">
                  <Button type="button" size="icon" variant="ghost" class="h-8 rounded-md">
                    <Plus :size="20" class="stroke-muted-foreground" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" class="hidden h-8 rounded-md lg:inline-flex">
                    <ImagePlus :size="20" class="stroke-muted-foreground" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost" class="hidden h-8 rounded-md lg:inline-flex">
                    <Paperclip :size="20" class="stroke-muted-foreground" />
                  </Button>
                </div>
                <label class="flex-1">
                  <span class="sr-only">聊天输入框</span>
                  <input
                    type="text"
                    placeholder="输入您的消息..."
                    class="h-8 w-full bg-inherit focus-visible:outline-hidden"
                    v-model="messageInput"
                  />
                </label>
                <Button variant="ghost" size="icon" type="submit" class="hidden sm:inline-flex">
                  <Send :size="20" />
                </Button>
              </div>
              <Button type="submit" class="h-full sm:hidden">
                <Send :size="18" /> 发送
              </Button>
            </form>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          :class="
            cn(
              'absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-card shadow-xs sm:static sm:z-auto sm:flex'
            )
          "
        >
          <div class="flex flex-col items-center space-y-6">
            <div class="flex size-16 items-center justify-center rounded-full border-2 border-border">
              <MessagesSquare class="size-8" />
            </div>
            <div class="space-y-2 text-center">
              <h1 class="text-xl font-semibold">您的消息</h1>
              <p class="text-sm text-muted-foreground">发送消息以开始聊天。</p>
            </div>
            <Button @click="createConversationDialog = true">发送消息</Button>
          </div>
        </div>

        <NewChat
          :users="users"
          :open="createConversationDialog"
          @update:open="createConversationDialog = $event"
        />
      </section>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import {
  ArrowLeft,
  MoreVertical,
  Edit,
  Paperclip,
  Phone,
  ImagePlus,
  Plus,
  Send,
  Video,
  MessagesSquare,
} from 'lucide-vue-next'
import { cn, getDisplayNameInitials } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import ConfigDrawer from '@/components/config-drawer.vue'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import NewChat from './components/NewChat.vue'
import type { ChatUser, Convo } from './data/chat-types'
import { conversations } from './data/convo.json'

const SearchIcon = Plus

const search = ref('')
const selectedUser = ref<ChatUser | null>(null)
const mobileSelectedUser = ref<ChatUser | null>(null)
const messageInput = ref('')
const createConversationDialog = ref(false)

const users = computed(() => conversations.map(({ messages, ...user }) => user))

const filteredChatList = computed(() => {
  if (!search.value.trim()) return conversations
  return conversations.filter(({ fullName }) =>
    fullName.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

const groupedMessages = computed(() => {
  if (!selectedUser.value?.messages) return {} as Record<string, Convo[]>

  return selectedUser.value.messages.reduce((acc: Record<string, Convo[]>, obj) => {
    const key = format(new Date(obj.timestamp), 'd MMM, yyyy')
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
})

const selectUser = (chatUsr: ChatUser) => {
  selectedUser.value = chatUsr
  mobileSelectedUser.value = chatUsr
}

const getLastMessage = (chatUsr: ChatUser): string => {
  const lastConvo = chatUsr.messages[0]
  if (!lastConvo) return ''
  const prefix = lastConvo.sender === 'You' ? 'You: ' : ''
  return prefix + lastConvo.message
}

const formatTime = (timestamp: string): string => {
  return format(new Date(timestamp), 'h:mm a')
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
