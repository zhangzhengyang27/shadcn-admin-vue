<script setup lang="ts">
import { Download, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useTasksContext } from './tasks-provider'

const { setOpen } = useTasksContext()
</script>

<template>
  <div class="flex gap-2">
    <Button variant="outline" class="space-x-1" @click="setOpen('import')">
      <span>导入</span>
      <Download :size="18" />
    </Button>
    <Button class="space-x-1" @click="setOpen('create')">
      <span>新建</span>
      <Plus :size="18" />
    </Button>
  </div>
</template>
