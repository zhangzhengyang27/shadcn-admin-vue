import type { Router } from 'vue-router'

export function setupAuthGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    if (to.meta.title) {
      document.title = `${to.meta.title} | Admin`
    }

    next()
  })
}
