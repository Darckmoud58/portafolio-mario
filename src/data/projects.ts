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
 * Fuente única de verdad.
 * No incluir: FOLAPSA, Meetpoint, Punto de Venta, KARDEX / BIP enterprise.
 * Ver PROMPT.md.
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
    subtitle: 'E-commerce B2C',
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
    subtitle: 'Full-stack instalable',
    description:
      'App PWA con API propia. Tareas, sync y experiencia lista para el móvil.',
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
    subtitle: 'Inventario en casa',
    description:
      'PWA familiar del refrigerador: Supabase + Netlify Functions. Simple y útil.',
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
    subtitle: 'Ente local 3D',
    description:
      'Asistente local con HUD neuronal, índice de conocimiento, voz y varias puertas: Cursor, CLI, HTTP.',
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
      'Presencia web del grupo: marca, secciones de negocio y diseño responsive.',
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
      'Sistema Laravel de inventario: recepciones, errores de procesamiento y operación diaria.',
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
    description: 'Sitio creativo con CSS animado. Pequeño, emocional y público.',
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
    description:
      'Juego para kiosco con pygame-ce: atrapa sacos en activaciones de piso.',
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
    description: 'Memorama de marca para punto de venta con pygame-ce.',
    year: '2025',
    stack: ['Python', 'pygame-ce'],
    visibility: 'lab',
    kind: 'game',
    accent: '#67e8f9',
  },
  {
    id: 'delivery-pizza',
    title: 'Delivery Pizza',
    subtitle: 'Mutation in the kitchen',
    description: 'Simulación creativa en C#: cocina, mutaciones y delivery.',
    year: '2025',
    stack: ['C#', 'Game'],
    visibility: 'lab',
    kind: 'game',
    accent: '#fdba74',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
