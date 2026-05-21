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
  email: z.string().email('Invalid email format.').min(1, 'Please enter an email address to invite.'),
  role: z.string().min(1, 'Role cannot be empty.'),
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
          <MailPlus /> Invite User
        </DialogTitle>
        <DialogDescription>
          Invite new users to join your team by sending an email. Assign roles to define their access level.
        </DialogDescription>
      </DialogHeader>
      <Form>
        <form id="user-invite-form" @submit.prevent="onSubmit" class="space-y-4">
          <FormField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input v-model="form.email" type="email" placeholder="eg: john.doe@gmail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="role">
            <FormItem>
              <FormLabel>Role</FormLabel>
              <SelectDropdown
                :default-value="form.role"
                @value-change="(val: string) => { form.role = val }"
                placeholder="Select role"
                :items="roleOptions"
              />
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="desc">
            <FormItem class="">
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  v-model="form.desc"
                  class="resize-none"
                  placeholder="Add a personal note to the invitation (optional)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </Form>
      <DialogFooter class="gap-y-2">
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" form="user-invite-form">
          Invite <Send />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
