<script setup lang="ts">
import { reactive, ref } from 'vue'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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
import PasswordInput from '@/components/password-input.vue'
import SelectDropdown from '@/components/select-dropdown.vue'
import { roles } from '../data/data'
import type { User } from '../data/schema'

interface Props {
  currentRow?: User
  open: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentRow: undefined,
})
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isEdit = !!props.currentRow

const form = reactive<Record<string, string | boolean>>(
  isEdit
    ? {
        firstName: props.currentRow?.firstName ?? '',
        lastName: props.currentRow?.lastName ?? '',
        username: props.currentRow?.username ?? '',
        email: props.currentRow?.email ?? '',
        role: props.currentRow?.role ?? '',
        phoneNumber: props.currentRow?.phoneNumber ?? '',
        password: '',
        confirmPassword: '',
        isEdit,
      }
    : {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        isEdit,
      }
)

const isPasswordTouched = ref(false)

function onSubmit() {
  Object.keys(form).forEach((key) => {
    if (typeof form[key] === 'string') {
      form[key] = ''
    }
  })
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
    <DialogContent class="sm:max-w-lg">
      <DialogHeader class="text-start">
        <DialogTitle>{{ isEdit ? 'Edit User' : 'Add New User' }}</DialogTitle>
        <DialogDescription>
          {{ isEdit ? 'Update user information here.' : 'Create a new user here.' }}
          Click Save when done.
        </DialogDescription>
      </DialogHeader>
      <div class="h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
        <Form>
          <form id="user-form" @submit.prevent="onSubmit" class="space-y-4 px-0.5">
            <FormField name="firstName">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">First Name</FormLabel>
                <FormControl>
                  <Input v-model="(form.firstName as string)" placeholder="John" class="col-span-4" autocomplete="off" />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="lastName">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Last Name</FormLabel>
                <FormControl>
                  <Input v-model="(form.lastName as string)" placeholder="三" class="col-span-4" autocomplete="off" />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="username">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Username</FormLabel>
                <FormControl>
                  <Input v-model="(form.username as string)" placeholder="john_doe" class="col-span-4" />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="email">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Email</FormLabel>
                <FormControl>
                  <Input v-model="(form.email as string)" placeholder="john.doe@gmail.com" class="col-span-4" />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="phoneNumber">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Phone Number</FormLabel>
                <FormControl>
                  <Input v-model="(form.phoneNumber as string)" placeholder="+123456789" class="col-span-4" />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="role">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Role</FormLabel>
                <SelectDropdown
                  :default-value="form.role as string"
                  @value-change="(val: string) => { form.role = val }"
                  placeholder="Select role"
                  class="col-span-4"
                  :items="roleOptions"
                />
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="password">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    v-model="(form.password as string)"
                    placeholder="e.g., S3cur3P@ssw0rd"
                    class="col-span-4"
                    @update:model-value="isPasswordTouched = true"
                  />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>

            <FormField name="confirmPassword">
              <FormItem class="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <FormLabel class="col-span-2 text-end">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    v-model="(form.confirmPassword as string)"
                    placeholder="e.g., S3cur3P@ssw0rd"
                    class="col-span-4"
                    :disabled="!isPasswordTouched"
                  />
                </FormControl>
                <FormMessage class="col-span-4 col-start-3" />
              </FormItem>
            </FormField>
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button type="submit" form="user-form">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
