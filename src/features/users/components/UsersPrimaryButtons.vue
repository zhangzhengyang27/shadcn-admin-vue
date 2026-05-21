<script setup lang="ts">
import { MailPlus, UserPlus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useUsersContext } from './users-provider'

const { setOpen } = useUsersContext()
</script>

<template>
  <div class="flex gap-2">
    <Button variant="outline" class="space-x-1" @click="setOpen('invite')">
      <span>Invite User</span>
      <MailPlus :size="18" />
    </Button>
    <Button class="space-x-1" @click="setOpen('add')">
      <span>Add User</span>
      <UserPlus :size="18" />
    </Button>
  </div>
</template>
