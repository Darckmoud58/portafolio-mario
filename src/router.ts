import { useEffect, useState } from 'react'

export const plays = {
  '/play/filo': 'filo',
  '/play/peso': 'peso',
  '/play/trazo': 'trazo',
  '/play/sala': 'sala',
  '/play/rosa': 'rosa',
  '/play/anillo': 'anillo',
  '/play/ola': 'ola',
} as const

export type PlayId = (typeof plays)[keyof typeof plays]
export type RouteId = 'home' | PlayId

export function readRoute(): RouteId {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return plays[path as keyof typeof plays] ?? 'home'
}

export function go(path: string) {
  const next = path.startsWith('/') ? path : `/${path}`
  if (window.location.pathname !== next) {
    window.history.pushState({}, '', next)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function useRoute() {
  const [route, setRoute] = useState<RouteId>(readRoute)
  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  return route
}
