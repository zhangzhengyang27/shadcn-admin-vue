<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  class?: string
  links?: {
    title: string
    href: string
    isActive: boolean
    disabled?: boolean
  }[]
}

withDefaults(defineProps<Props>(), {
  links: () => []
})
</script>

<template>
  <div>
    <DropdownMenu :modal="false">
      <DropdownMenuTrigger as-child>
        <Button
          size="icon"
          variant="outline"
          :class="cn('md:size-7 lg:hidden', $props.class)"
        >
          <Menu />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuItem
          v-for="{ title, href, isActive, disabled } in links"
          :key="`${title}-${href}`"
          as-child
          :disabled="disabled"
        >
          <RouterLink
            :to="href"
            :class="!isActive ? 'text-muted-foreground' : ''"
          >
            {{ title }}
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <nav
      :class="cn(
        'hidden items-center gap-1 lg:flex',
        $props.class
      )"
    >
      <RouterLink
        v-for="{ title, href, isActive, disabled } in links"
        :key="`${title}-${href}`"
        :to="href"
        :class="cn(
          'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          disabled
            ? 'pointer-events-none cursor-not-allowed text-muted-foreground opacity-60'
            : isActive
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )"
      >
        {{ title }}
      </RouterLink>
    </nav>
  </div>
</template>
