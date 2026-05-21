<template>
  <div class="space-y-8">
    <div
      v-for="sale in sales"
      :key="sale.email"
      class="flex items-center gap-4"
    >
      <Avatar class="h-9 w-9">
        <AvatarImage :src="sale.avatar" :alt="sale.name" />
        <AvatarFallback>{{ sale.initials }}</AvatarFallback>
      </Avatar>
      <div class="flex flex-1 flex-wrap items-center justify-between">
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">{{ sale.name }}</p>
          <p class="text-sm text-muted-foreground">{{ sale.email }}</p>
        </div>
        <div class="font-medium">+{{ sale.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const sales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: '/avatars/01.png',
    initials: 'OM',
    amount: '$1,999.00',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: '/avatars/02.png',
    initials: 'JL',
    amount: '$39.00',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
    initials: 'IN',
    amount: '$299.00',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
    initials: 'WK',
    amount: '$99.00',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: '/avatars/05.png',
    initials: 'SD',
    amount: '$39.00',
  },
]
</script>
