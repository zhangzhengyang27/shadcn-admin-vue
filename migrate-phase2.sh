#!/bin/bash

# ============================================================
# shadcn-admin 阶段二：基础设施层迁移脚本
# 用途：创建 Pinia Store、Composables、完善路由系统
# 使用方法：在 Vue 项目根目录执行 bash migrate-phase2.sh
# ============================================================

set -e  # 遇到错误立即退出

echo "🚀 开始阶段二：基础设施层迁移..."
echo ""

# ---- 1. 创建 Pinia Auth Store ----
echo "📦 [1/7] 创建 Pinia Auth Store..."
mkdir -p src/stores
cat > src/stores/auth.ts << 'STORE_EOF'
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
      setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
      this.accessToken = accessToken
    },

    resetAccessToken() {
      removeCookie(ACCESS_TOKEN)
      this.accessToken = ''
    },

    reset() {
      removeCookie(ACCESS_TOKEN)
      this.user = null
      this.accessToken = ''
    },
  },
})
STORE_EOF
echo "   ✅ src/stores/auth.ts"

# ---- 2. 创建 Theme Composable ----
echo "🎨 [2/7] 创建 Theme Composable..."
mkdir -p src/composables
cat > src/composables/useTheme.ts << 'THEME_EOF'
import { ref, computed, watch, onMounted } from 'vue'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

const DEFAULT_THEME = 'system'
const THEME_COOKIE_NAME = 'vite-ui-theme'
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export function useTheme() {
  const theme = ref<Theme>(
    (getCookie(THEME_COOKIE_NAME) as Theme) || DEFAULT_THEME
  )

  const resolvedTheme = computed<ResolvedTheme>(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme.value as ResolvedTheme
  })

  const applyTheme = (currentResolvedTheme: ResolvedTheme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(currentResolvedTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setCookie(THEME_COOKIE_NAME, newTheme, THEME_COOKIE_MAX_AGE)
    theme.value = newTheme
  }

  const resetTheme = () => {
    removeCookie(THEME_COOKIE_NAME)
    theme.value = DEFAULT_THEME
  }

  watch(resolvedTheme, (newResolvedTheme) => {
    applyTheme(newResolvedTheme)
  }, { immediate: true })

  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme.value === 'system') {
        applyTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    // 组件卸载时移除监听（如果需要在 setup 返回清理函数）
  })

  return {
    theme,
    resolvedTheme,
    defaultTheme: DEFAULT_THEME as Theme,
    setTheme,
    resetTheme,
  }
}
THEME_EOF
echo "   ✅ src/composables/useTheme.ts"

# ---- 3. 创建 Mobile Composable ----
echo "📱 [3/7] 创建 Mobile Detection Composable..."
cat > src/composables/useMobile.ts << 'MOBILE_EOF'
import { ref, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  const isMobile = ref(false)

  const update = () => {
    isMobile.value = window.matchMedia(MOBILE_QUERY).matches
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return isMobile
}
MOBILE_EOF
echo "   ✅ src/composables/useMobile.ts"

# ---- 4. 创建 Dialog State Composable ----
echo "💬 [4/7] 创建 Dialog State Composable..."
cat > src/composables/useDialogState.ts << 'DIALOG_EOF'
import { ref } from 'vue'

export function useDialogState(initialValue = false) {
  const isOpen = ref(initialValue)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
DIALOG_EOF
echo "   ✅ src/composables/useDialogState.ts"

# ---- 5. 创建 Font Composable ----
echo "🔤 [5/7] 创建 Font Composable..."
cat > src/composables/useFont.ts << 'FONT_EOF'
import { ref, watch, onMounted } from 'vue'

type FontFamily = 'inter' | 'roboto' | 'geist' | 'system'

const FONT_COOKIE_NAME = 'vite-ui-font'
const DEFAULT_FONT: FontFamily = 'inter'

export function useFont() {
  const font = ref<FontFamily>(DEFAULT_FONT as FontFamily)

  const setFont = (newFont: FontFamily) => {
    font.value = newFont
  }

  const applyFont = (currentFont: FontFamily) => {
    const root = document.documentElement
    
    root.classList.remove('font-inter', 'font-roboto', 'font-geist', 'font-system')
    root.classList.add(`font-${currentFont}`)
  }

  watch(font, (newFont) => {
    applyFont(newFont)
  }, { immediate: true })

  return {
    font,
    setFont,
  }
}
FONT_EOF
echo "   ✅ src/composables/useFont.ts"

# ---- 6. 创建 Layout Composable ----
echo "📐 [6/7] 创建 Layout Composable..."
cat > src/composables/useLayout.ts << 'LAYOUT_EOF'
import { ref, computed } from 'vue'

type SidebarType = 'default' | 'floating' | 'inset'
type LayoutMode = 'compact' | 'full'

export function useLayout() {
  const sidebarType = ref<SidebarType>('default')
  const layoutMode = ref<LayoutMode>('full')
  const sidebarOpen = ref(true)

  const isCompact = computed(() => layoutMode.value === 'compact')

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setSidebarType = (type: SidebarType) => {
    sidebarType.value = type
  }

  const setLayoutMode = (mode: LayoutMode) => {
    layoutMode.value = mode
  }

  return {
    sidebarType,
    layoutMode,
    sidebarOpen,
    isCompact,
    toggleSidebar,
    setSidebarType,
    setLayoutMode,
  }
}
LAYOUT_EOF
echo "   ✅ src/composables/useLayout.ts"

# ---- 7. 更新 App.vue 支持 RouterView ----
echo "🖥️  [7/7] 更新 App.vue..."
cat > src/App.vue << 'APP_EOF'
<script setup lang="ts">
// App 根组件 - RouterView 将在这里渲染匹配的路由组件
</script>

<template>
  <RouterView />
</template>
APP_EOF
echo "   ✅ src/App.vue"

# 完成
echo ""
echo "✨ 阶段二迁移完成！"
echo ""
echo "📋 已创建的文件："
echo "   ├── src/stores/auth.ts              (Pinia 认证状态管理)"
echo "   ├── src/composables/useTheme.ts     (主题切换)"
echo "   ├── src/composables/useMobile.ts    (移动端检测)"
echo "   ├── src/composables/useDialogState.ts (对话框状态)"
echo "   ├── src/composables/useFont.ts      (字体设置)"
echo "   ├── src/composables/useLayout.ts    (布局配置)"
echo "   └── src/App.vue                    (根组件更新)"
echo ""
echo "🎯 下一步：运行 pnpm dev 验证项目是否正常启动"
