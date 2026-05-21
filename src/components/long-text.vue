<script setup lang="ts">
interface Props {
  text?: string
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  text: '',
  customClass: '',
})
</script>

<template>
  <div :class="['truncate', customClass]">
    <slot>{{ text }}</slot>
  </div>
</template>
