<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  type NavCollapsible,
  type NavItem,
  type NavGroup as NavGroupProps,
} from './types'

interface Props extends NavGroupProps {}

const props = defineProps<Props>()
const route = useRoute()
const { state, isMobile, setOpenMobile } = useSidebar()

const href = route.fullPath

function checkIsActive(currentHref: string, item: NavItem | any, mainNav = false) {
  return (
    currentHref === item.url || // /endpint?search=param
    currentHref.split('?')[0] === item.url || // endpoint
    !!item?.items?.filter((i: any) => i.url === currentHref).length || // if child nav is active
    (mainNav &&
      currentHref.split('/')[1] !== '' &&
      currentHref.split('/')[1] === item?.url?.split('/')[1])
  )
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ title }}</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="`${item.title}-${item.url}`">
        <!-- Simple link without sub-items -->
        <SidebarMenuItem v-if="!item.items">
          <SidebarMenuButton
            as-child
            :is-active="checkIsActive(href, item)"
            :tooltip="item.title"
          >
            <RouterLink :to="item.url" @click="() => setOpenMobile(false)">
              <component v-if="item.icon" :is="item.icon" />
              <span>{{ item.title }}</span>
              <Badge v-if="item.badge" class='rounded-full px-1 py-0 text-xs'>
                {{ item.badge }}
              </Badge>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <!-- Collapsible menu when sidebar is expanded or on mobile -->
        <Collapsible
          v-else-if="state !== 'collapsed' || isMobile"
          as-child
          :default-open="checkIsActive(href, item, true)"
          class='group/collapsible'
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
                <Badge v-if="item.badge" class='rounded-full px-1 py-0 text-xs'>
                  {{ item.badge }}
                </Badge>
                <ChevronRight class='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180' />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent class='CollapsibleContent'>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in (item as NavCollapsible).items" :key="subItem.title">
                  <SidebarMenuSubButton
                    as-child
                    :is-active="checkIsActive(href, subItem)"
                  >
                    <RouterLink :to="subItem.url" @click="() => setOpenMobile(false)">
                      <component v-if="subItem.icon" :is="subItem.icon" />
                      <span>{{ subItem.title }}</span>
                      <Badge v-if="subItem.badge" class='rounded-full px-1 py-0 text-xs'>
                        {{ subItem.badge }}
                      </Badge>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <!-- Dropdown menu when sidebar is collapsed -->
        <SidebarMenuItem v-else>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                :tooltip="item.title"
                :is-active="checkIsActive(href, item)"
              >
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
                <Badge v-if="item.badge" class='rounded-full px-1 py-0 text-xs'>
                  {{ item.badge }}
                </Badge>
                <ChevronRight class='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' align='start' :side-offset="4">
              <DropdownMenuLabel>
                {{ item.title }} {{ item.badge ? `(${item.badge})` : '' }}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                v-for="sub in (item as NavCollapsible).items"
                :key="`${sub.title}-${sub.url}`"
                as-child
              >
                <RouterLink
                  :to="sub.url"
                  :class="checkIsActive(href, sub) ? 'bg-secondary' : ''"
                >
                  <component v-if="sub.icon" :is="sub.icon" />
                  <span class='max-w-52 text-wrap'>{{ sub.title }}</span>
                  <span v-if="sub.badge" class='ms-auto text-xs'>{{ sub.badge }}</span>
                </RouterLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
