<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'
import { MailPlus, Send } from 'lucide-vue-next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import SelectDropdown from '@/components/select-dropdown.vue'
import { roles } from '../data/data'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, '角色不能为空。'),
  desc: z.string().optional(),
})

type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const form = reactive<UserInviteForm>({
  email: '',
  role: '',
  desc: '',
})

function onSubmit() {
  Object.assign(form, { email: '', role: '', desc: '' })
  showSubmittedData(form)
  emit('update:open', false)
}

const roleOptions = roles.map(({ label, value }) => ({
  label,
  value,
}))
</script>

<template>
  <Dialog :open="open" @update:open="(state) => { emit('update:open', state) }">
    <DialogContent class="sm:max-w-md">
      <DialogHeader class="text-start">
        <DialogTitle class="flex items-center gap-2">
          <MailPlus /> 邀请用户
        </DialogTitle>
        <DialogDescription>
          通过发送邮件邀请新用户加入您的团队。分配角色以定义其访问权限级别。
        </DialogDescription>
      </DialogHeader>
      <Form>
        <form id="user-invite-form" @submit.prevent="onSubmit" class="space-y-4">
          <FormField name="email">
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input v-model="form.email" type="email" placeholder="eg: john.doe@gmail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="role">
            <FormItem>
              <FormLabel>角色</FormLabel>
              <SelectDropdown
                :default-value="form.role"
                @value-change="(val: string) => { form.role = val }"
                placeholder="选择角色"
                :items="roleOptions"
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="desc">
            <FormItem class="">
              <FormLabel>描述（可选）</FormLabel>
              <FormControl>
                <Textarea
                  v-model="form.desc"
                  class="resize-none"
                  placeholder="添加个人备注到邀请中（可选）"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </Form>
      <DialogFooter class="gap-y-2">
        <DialogClose as-child>
          <Button variant="outline">取消</Button>
        </DialogClose>
        <Button type="submit" form="user-invite-form">
          邀请 <Send />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
