<script setup lang="ts">
import { MixerHorizontalIcon } from '@radix-icons/vue'
import { type Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  table: Table<unknown>
}

defineProps<Props>()
</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ms-auto hidden h-8 lg:flex"
      >
        <MixerHorizontalIcon class="size-4" />
        Views
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-37.5">
      <DropdownMenuLabel>Toggle Column Visibility</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="column in table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())"
        :key="column.id"
        :checked="column.getIsVisible()"
        @update:checked="(value: unknown) => column.toggleVisibility(!!value)"
        class="capitalize"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
