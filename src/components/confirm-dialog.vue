<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface Props {
  open: boolean
  disabled?: boolean
  cancelBtnText?: string
  confirmText?: string | object
  destructive?: boolean
  isLoading?: boolean
  className?: string
  form?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  cancelBtnText: 'Cancel',
  confirmText: 'Continue',
  destructive: false,
  isLoading: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()

const handleClickConfirm = () => {
  if (!props.form) {
    emit('confirm')
  }
}
</script>

<template>
  <AlertDialog :open="open" @update:open="(v: boolean) => emit('update:open', v)">
    <AlertDialogContent :class="cn(className && className)">
      <AlertDialogHeader class="text-start">
        <AlertDialogTitle><slot name="title" /></AlertDialogTitle>
        <AlertDialogDescription as-child>
          <div><slot name="desc" /></div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <slot />
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isLoading">
          {{ cancelBtnText }}
        </AlertDialogCancel>
        <Button
          :type="form ? 'submit' : 'button'"
          :form="form"
          :variant="destructive ? 'destructive' : 'default'"
          :disabled="disabled || isLoading"
          @click="handleClickConfirm"
        >
          {{ confirmText }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
