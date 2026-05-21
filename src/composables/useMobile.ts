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
