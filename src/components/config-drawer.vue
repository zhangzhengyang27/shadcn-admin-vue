<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const open = ref(false)

const configOptions = ref([
  { id: 'sidebar', label: 'Show Sidebar', enabled: true },
  { id: 'header', label: 'Show Header', enabled: true },
  { id: 'breadcrumbs', label: 'Show Breadcrumbs', enabled: true },
  { id: 'footer', label: 'Show Footer', enabled: false },
])
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline" size="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2" />
        </svg>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Layout Configuration</SheetTitle>
        <SheetDescription>Customize the layout and display options for your pages.</SheetDescription>
      </SheetHeader>

      <div class="mt-6 space-y-4">
        <div
          v-for="option in configOptions"
          :key="option.id"
          class="flex items-center justify-between"
        >
          <label :for="option.id" class="text-sm font-medium">
            {{ option.label }}
          </label>
          <Switch :id="option.id" v-model:checked="option.enabled" />
        </div>

        <Separator />

        <div class="flex justify-end gap-2 pt-4">
          <Button variant="outline" @click="open = false">Cancel</Button>
          <Button @click="open = false">Save Configuration</Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
