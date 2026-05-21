import { ref, watch } from 'vue'

type FontFamily = 'inter' | 'roboto' | 'geist' | 'system'

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
