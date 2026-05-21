<template>
  <ContentSection title="账户" desc="管理您的账户设置。">
    <Form v-slot="{ handleSubmit }">
      <form @submit="handleSubmit(onSubmit)" class="space-y-8">
        <FormField name="name" v-slot="{ field }">
          <FormItem>
            <FormLabel>姓名</FormLabel>
            <FormControl>
              <Input placeholder="您的姓名" v-bind="field" />
            </FormControl>
            <FormDescription>这将显示在您的个人资料和邮件中。</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="dob" v-slot="{ field }">
          <FormItem class="flex flex-col">
            <FormLabel>出生日期</FormLabel>
            <DatePicker :selected="field.value" @update:selected="field.onChange" />
            <FormDescription>您的出生日期用于计算年龄。</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="language" v-slot="{ field }">
          <FormItem class="flex flex-col">
            <FormLabel>语言</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    :class="[
                      'w-[200px] justify-between',
                      !field.value && 'text-muted-foreground',
                    ]"
                  >
                    {{
                      field.value
                        ? languages.find((l) => l.value === field.value)?.label
                        : '选择语言'
                    }}
                    <ChevronDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="搜索语言..." />
                  <CommandEmpty>未找到语言。</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        v-for="language in languages"
                        :key="language.value"
                        :value="language.label"
                        @select="field.onChange(language.value)"
                      >
                        <CheckIcon
                          :class="[
                            'mr-2 h-4 w-4',
                            language.value === field.value ? 'opacity-100' : 'opacity-0',
                          ]"
                        />
                        {{ language.label }}
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>这是将在仪表盘中使用的语言。</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">更新账户</Button>
      </form>
    </Form>
  </ContentSection>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { ChevronDownIcon, CheckIcon } from 'lucide-vue-next'
import ContentSection from '../components/ContentSection.vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import DatePicker from '@/components/date-picker/DatePicker.vue'

const languages = [
  { label: '英语', value: 'en' },
  { label: '法语', value: 'fr' },
  { label: '德语', value: 'de' },
  { label: '西班牙语', value: 'es' },
  { label: '葡萄牙语', value: 'pt' },
  { label: '俄语', value: 'ru' },
  { label: '日语', value: 'ja' },
  { label: '韩语', value: 'ko' },
  { label: '中文', value: 'zh' },
] as const

const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, '请输入您的姓名。')
      .min(2, '姓名至少需要2个字符。')
      .max(30, '姓名不能超过30个字符。'),
    dob: z.date(),
    language: z.string({ message: '请选择一种语言。' }),
  })
)

void accountFormSchema

const onSubmit = (values: any) => {
  console.log('Submitted values:', values)
}
</script>
