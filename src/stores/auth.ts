import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  user: AuthUser | null
  accessToken: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const cookieState = getCookie(ACCESS_TOKEN)
    const initToken = cookieState ? JSON.parse(cookieState) : ''
    
    return {
      user: null,
      accessToken: initToken,
    }
  },

  actions: {
    setUser(user: AuthUser | null) {
      this.user = user
    },

    setAccessToken(accessToken: string) {
      localStorage.setItem('auth_token', accessToken)
      setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
      this.accessToken = accessToken
    },

    resetAccessToken() {
      localStorage.removeItem('auth_token')
      removeCookie(ACCESS_TOKEN)
      this.accessToken = ''
    },

    reset() {
      localStorage.removeItem('auth_token')
      removeCookie(ACCESS_TOKEN)
      this.user = null
      this.accessToken = ''
    },

    logout() {
      this.reset()
    },
  },
})
