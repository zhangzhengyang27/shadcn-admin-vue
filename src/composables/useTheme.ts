import { ref, computed, watch, onMounted } from 'vue'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

const DEFAULT_THEME: Theme = 'system'
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

  const isDark = computed(() => resolvedTheme.value === 'dark')

  const mode = ref<Theme>(theme.value)

  const applyTheme = (currentResolvedTheme: ResolvedTheme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(currentResolvedTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setCookie(THEME_COOKIE_NAME, newTheme, THEME_COOKIE_MAX_AGE)
    theme.value = newTheme
    mode.value = newTheme
  }

  const setMode = (newMode: Theme) => {
    setTheme(newMode)
  }

  const toggleTheme = () => {
    const next = resolvedTheme.value === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  const resetTheme = () => {
    removeCookie(THEME_COOKIE_NAME)
    theme.value = DEFAULT_THEME
    mode.value = DEFAULT_THEME
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
  })

  return {
    theme,
    resolvedTheme,
    isDark,
    mode,
    defaultTheme: DEFAULT_THEME as Theme,
    setTheme,
    setMode,
    toggleTheme,
    resetTheme,
  }
}
