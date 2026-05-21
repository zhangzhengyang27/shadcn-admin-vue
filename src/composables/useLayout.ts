import { ref } from 'vue'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

type Collapsible = 'offcanvas' | 'icon' | 'none'
type Variant = 'inset' | 'sidebar' | 'floating'

const LAYOUT_COLLAPSIBLE_COOKIE_NAME = 'layout_collapsible'
const LAYOUT_VARIANT_COOKIE_NAME = 'layout_variant'
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const DEFAULT_VARIANT: Variant = 'inset'
const DEFAULT_COLLAPSIBLE: Collapsible = 'icon'

function initRef<T>(cookieName: string, defaultValue: T): T {
  const saved = getCookie(cookieName)
  return ((saved ?? defaultValue) as T)
}

const collapsible = ref<Collapsible>(initRef(LAYOUT_COLLAPSIBLE_COOKIE_NAME, DEFAULT_COLLAPSIBLE))
const variant = ref<Variant>(initRef(LAYOUT_VARIANT_COOKIE_NAME, DEFAULT_VARIANT))

export function useLayout() {
  const setCollapsible = (v: Collapsible) => {
    collapsible.value = v
    setCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME, v, LAYOUT_COOKIE_MAX_AGE)
  }

  const setVariant = (v: Variant) => {
    variant.value = v
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, v, LAYOUT_COOKIE_MAX_AGE)
  }

  const resetLayout = () => {
    removeCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME)
    removeCookie(LAYOUT_VARIANT_COOKIE_NAME)
    collapsible.value = DEFAULT_COLLAPSIBLE
    variant.value = DEFAULT_VARIANT
  }

  return {
    defaultCollapsible: DEFAULT_COLLAPSIBLE,
    defaultVariant: DEFAULT_VARIANT,
    collapsible,
    variant,
    setCollapsible,
    setVariant,
    resetLayout,
  }
}
