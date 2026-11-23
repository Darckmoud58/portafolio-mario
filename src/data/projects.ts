export type ProjectVisibility = 'public' | 'client' | 'lab'

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  year: string
  stack: string[]
  visibility: ProjectVisibility
  kind: 'web' | 'pwa' | 'game' | 'ai'
  repo?: string
  live?: string
  featured?: boolean
  accent: string
}

/**
 * Fuente única de verdad del portafolio.
 * No incluir: Meetpoint, Punto de Venta, FOLAPSA, KARDEX / BIP Oracle.
 * Otro Cursor: ver PROMPT.md.
 */
export const projects: Project[] = [
  {
    id: 'trago-pwa',
    title: 'TraGo',
    subtitle: 'Promociones por sucursal',
    description:
      'PWA de promociones vigentes por sucursal. Catálogo vivo, instalable y desplegada en Vercel.',
    year: '2025',
    stack: ['TypeScript', 'PWA', 'Vercel'],
    visibility: 'public',
    kind: 'pwa',
    repo: 'https://github.com/Darckmoud58/trago-pwa',
    live: 'https://trago-pwa.vercel.app',
    featured: true,
    accent: '#d4ff4f',
  },
  {
    id: 'gkm-tienda',
    title: 'GKM Tienda',
    subtitle: 'Commerce B2C',
    description:
      'Tienda online: catálogo, checkout y pagos con Mercado Pago / PayPal. Next.js en producción.',
    year: '2025',
    stack: ['Next.js', 'TypeScript', 'Pagos'],
    visibility: 'client',
    kind: 'web',
    featured: true,
    accent: '#ffd166',
  },
  {
    id: 'santuario',
    title: 'Santuario',
    subtitle: 'Sitio oficial',
    description:
      'Plataforma informativa: eventos, historia, donaciones, agenda y contacto con la comunidad.',
    year: '2025',
    stack: ['Angular', 'TypeScript'],
    visibility: 'client',
    kind: 'web',
    featured: true,
    accent: '#e8c547',
  },
  {
    id: 'pwacompleto',
    title: 'Todo PWA',
    subtitle: 'API + frontend',
    description:
      'App PWA full-stack con API propia. Tareas, sync y experiencia instalable en móvil.',
    year: '2025',
    stack: ['TypeScript', 'PWA', 'API'],
    visibility: 'public',
    kind: 'pwa',
    repo: 'https://github.com/Darckmoud58/pwacompleto',
    live: 'https://todo-pwa-api-pink.vercel.app',
    featured: true,
    accent: '#7ee8ff',
  },
  {
    id: 'mi-nevera',
    title: 'Mi Nevera',
    subtitle: 'Inventario familiar',
    description:
      'Inventario del refrigerador: PWA, Supabase y Netlify Functions. Útil y rápida.',
    year: '2025',
    stack: ['JavaScript', 'Supabase', 'Netlify'],
    visibility: 'public',
    kind: 'pwa',
    repo: 'https://github.com/Darckmoud58/mi-nevera',
    featured: true,
    accent: '#ff9b6a',
  },
  {
    id: 'ultron',
    title: 'Ultron',
    subtitle: 'Ente local',
    description:
      'Asistente local con conocimiento indexado, HUD 3D, MCP, voz y memoria. Cursor, CLI y HTTP.',
    year: '2025–26',
    stack: ['Node', 'Three.js', 'MongoDB'],
    visibility: 'lab',
    kind: 'ai',
    featured: true,
    accent: '#d4ff4f',
  },
  {
    id: 'grupokasto-page',
    title: 'Grupo Kasto',
    subtitle: 'Sitio corporativo',
    description:
      'Página web del grupo: presencia de marca, secciones de negocio y diseño responsive.',
    year: '2025',
    stack: ['HTML', 'CSS', 'JS'],
    visibility: 'client',
    kind: 'web',
    accent: '#a3e635',
  },
  {
    id: 'kasto-inventario',
    title: 'Kasto Inventario',
    subtitle: 'Recepciones & control',
    description:
      'Sistema Laravel de inventario: recepciones, procesamiento y control operativo.',
    year: '2025',
    stack: ['Laravel', 'PHP', 'MySQL'],
    visibility: 'client',
    kind: 'web',
    accent: '#38bdf8',
  },
  {
    id: 'flores-amarillas',
    title: 'Flores Amarillas',
    subtitle: 'Pieza visual',
    description: 'Sitio creativo con CSS animado. Pequeña, emocional y pública en GitHub.',
    year: '2025',
    stack: ['CSS', 'HTML'],
    visibility: 'public',
    kind: 'web',
    repo: 'https://github.com/Darckmoud58/Flores-Amarillas',
    accent: '#fde047',
  },
  {
    id: 'atrapa-sacos',
    title: 'Catcher',
    subtitle: 'Juego kiosco',
    description: 'Juego kiosco con pygame-ce para activaciones en piso de venta.',
    year: '2025',
    stack: ['Python', 'pygame-ce'],
    visibility: 'lab',
    kind: 'game',
    accent: '#fb7185',
  },
  {
    id: 'memo-kassto',
    title: 'Memorama',
    subtitle: 'Kiosco interactivo',
    description: 'Memorama de marca para kiosco: experiencia lúdica en punto de venta.',
    year: '2025',
    stack: ['Python', 'pygame-ce'],
    visibility: 'lab',
    kind: 'game',
    accent: '#67e8f9',
  },
  {
    id: 'delivery-pizza',
    title: 'Delivery Pizza',
    subtitle: 'Mutation kitchen',
    description: 'Simulación en C#: cocina, mutaciones y delivery. Gameplay creativo.',
    year: '2025',
    stack: ['C#', 'Game'],
    visibility: 'lab',
    kind: 'game',
    accent: '#fdba74',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
