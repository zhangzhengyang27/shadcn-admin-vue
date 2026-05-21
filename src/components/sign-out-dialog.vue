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
    title="退出登录"
    desc="您确定要退出登录吗？您需要重新登录才能访问您的账户。"
    confirm-text="退出登录"
    :destructive="true"
    @confirm="handleSignOut"
  />
</template>