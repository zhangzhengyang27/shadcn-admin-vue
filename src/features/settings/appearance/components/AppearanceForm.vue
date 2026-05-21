<template>
  <Form
    v-slot="{ handleSubmit }"
    :validation-schema="appearanceFormSchema"
    :initial-values="{
      theme: theme === 'system' ? 'light' : theme,
      font: font,
    }"
  >
    <form @submit="handleSubmit(onSubmit)" class="space-y-8">
      <FormField name="font" v-slot="{ field }">
        <FormItem>
          <FormLabel>字体</FormLabel>
          <div class="relative w-max">
            <FormControl>
              <select
                :class="[
                  buttonVariants({ variant: 'outline' }),
                  'w-[200px] appearance-none font-normal capitalize',
                  'dark:bg-background dark:hover:bg-background',
                ]"
                v-bind="field"
              >
                <option v-for="fontOption in fonts" :key="fontOption" :value="fontOption">
                  {{ fontOption }}
                </option>
              </select>
            </FormControl>
            <ChevronDownIcon class="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
          </div>
          <FormDescription class="font-manrope">设置您想在仪表盘中使用的字体。</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="theme" v-slot="{ field }">
        <FormItem>
          <FormLabel>主题</FormLabel>
          <FormDescription>选择仪表盘主题。</FormDescription>
          <FormMessage />
          <RadioGroup
            :model-value="field.value"
            @update:model-value="field.onChange"
            class="grid max-w-md grid-cols-2 gap-8 pt-2"
          >
            <FormItem>
              <FormLabel
                class="[&:has([data-state=checked])>div]:border-primary cursor-pointer"
              >
                <FormControl>
                  <RadioGroupItem value="light" class="sr-only" />
                </FormControl>
                <div class="flex items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                  <div class="w-full space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div class="space-y-2 rounded-md bg-white p-2 shadow-xs">
                      <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                      <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                      <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span class="block w-full p-2 text-center font-normal">浅色</span>
              </FormLabel>
            </FormItem>

            <FormItem>
              <FormLabel
                class="[&:has([data-state=checked])>div]:border-primary cursor-pointer"
              >
                <FormControl>
                  <RadioGroupItem value="dark" class="sr-only" />
                </FormControl>
                <div class="flex items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                  <div class="w-full space-y-2 rounded-sm bg-slate-950 p-2">
                    <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                      <div class="h-2 w-20 rounded-lg bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                      <div class="h-4 w-4 rounded-full bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                      <div class="h-4 w-4 rounded-full bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span class="block w-full p-2 text-center font-normal">深色</span>
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormItem>
      </FormField>

      <Button type="submit">更新偏好</Button>
    </form>
  </Form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { ChevronDownIcon } from 'lucide-vue-next'
import { buttonVariants } from '@/components/ui/button'
import { useFont } from '@/composables/useFont'
import { useTheme } from '@/composables/useTheme'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const fonts = ['inter', 'roboto', 'geist', 'system'] as const

const appearanceFormSchema = toTypedSchema(
  z.object({
    theme: z.enum(['light', 'dark']),
    font: z.enum(fonts),
  })
)

const { font, setFont } = useFont()
const { theme, setTheme } = useTheme()

const onSubmit = (values: any) => {
  if (values.font !== font.value) setFont(values.font)
  if (values.theme !== theme.value) setTheme(values.theme)

  console.log('Submitted values:', values)
}
</script>
