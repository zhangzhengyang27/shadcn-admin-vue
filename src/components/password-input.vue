<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  class?: string
  disabled?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const showPassword = ref(false)
</script>

<template>
  <div :class="cn('relative rounded-md', props.class)">
    <input
      v-bind="$attrs"
      :type="showPassword ? 'text' : 'password'"
      class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="props.disabled"
    />
    <Button
      type="button"
      size="icon"
      variant="ghost"
      :disabled="props.disabled"
      class="absolute inset-e-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
      @click="showPassword = !showPassword"
    >
      <Eye v-if="showPassword" :size="18" />
      <EyeOff v-else :size="18" />
      <span class="sr-only">
        {{ showPassword ? '隐藏密码' : '显示密码' }}
      </span>
    </Button>
  </div>
</template>
