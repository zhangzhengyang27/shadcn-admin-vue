<template>
  <form :class="cn('grid gap-2', $attrs.class)" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="otp">
      <FormItem>
        <FormLabel class="sr-only">One-Time Password</FormLabel>
        <FormControl>
          <InputOTP
            v-bind="componentField"
            :maxlength="6"
            container-class="justify-between sm:[&>[data-slot='input-otp-group']>div]:w-12"
          >
            <InputOTPGroup>
              <InputOTPSlot :index="0" />
              <InputOTPSlot :index="1" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot :index="2" />
              <InputOTPSlot :index="3" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot :index="4" />
              <InputOTPSlot :index="5" />
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="mt-2" :disabled="otpValue.length < 6 || isLoading">
      Verify
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const router = useRouter()
const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    otp: z.string().min(6, 'Please enter the 6-digit code.').max(6, 'Please enter the 6-digit code.'),
  })
)

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: { otp: '' },
})

const otpValue = computed(() => values.otp || '')

const onSubmit = handleSubmit((data) => {
  isLoading.value = true

  console.log('Submitted OTP data:', data)

  setTimeout(() => {
    isLoading.value = false
    router.push('/')
  }, 1000)
})
</script>
