<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ConfirmDialog from '@/components/confirm-dialog.vue'

interface Props {
  open: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const router = useRouter()
const authStore = useAuthStore()

function handleSignOut() {
  authStore.reset()
  const currentPath = window.location.pathname
  router.push({
    path: '/sign-in',
    query: { redirect: currentPath },
  })
}
</script>

<template>
  <ConfirmDialog
    :open="open"
    @update:open="(val: boolean) => emit('update:open', val)"
    title="Sign Out"
    desc="Are you sure you want to sign out? You'll need to sign in again to access your account."
    confirm-text="Sign Out"
    :destructive="true"
    @confirm="handleSignOut"
  />
</template>