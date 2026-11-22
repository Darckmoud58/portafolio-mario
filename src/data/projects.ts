export type ProjectVisibility = 'public' | 'client' | 'lab'

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  year: string
  stack: string[]
  visibility: ProjectVisibility
  kind: 'web' | 'pwa' | 'enterprise' | 'game' | 'ai' | 'report'
  href?: string
  repo?: string
  live?: string
  featured?: boolean
  accent: string
}

/**
 * Fuente única de verdad del portafolio.
 * Otro Cursor / agente: añadir proyectos aquí (ver PROMPT.md).
 */
export const projects: Project[] = [
  {
    id: 'trago-pwa',
    title: 'TraGo',
    subtitle: 'Promociones por sucursal',
    description:
      'PWA de promociones vigentes por sucursal (UTJ / PW). Catálogo vivo, offline-ready y despliegue en Vercel.',
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
    id: 'pwacompleto',
    title: 'Todo PWA',
    subtitle: 'API + frontend completo',
    description:
      'App PWA full-stack con API propia. Flujo de tareas, sync y experiencia instalable en móvil.',
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
      'Inventario del refrigerador en casa: PWA, Supabase y Netlify Functions. Útil, rápida y listable.',
    year: '2025',
    stack: ['JavaScript', 'Supabase', 'Netlify'],
    visibility: 'public',
    kind: 'pwa',
    repo: 'https://github.com/Darckmoud58/mi-nevera',
    featured: true,
    accent: '#ff9b6a',
  },
  {
    id: 'gkm-tienda',
    title: 'GKM Tienda',
    subtitle: 'B2C Grupo Kasto',
    description:
      'Tienda online B2C: catálogo, checkout y pagos con Mercado Pago / PayPal. Next.js en producción.',
    year: '2025',
    stack: ['Next.js', 'TypeScript', 'Pagos'],
    visibility: 'client',
    kind: 'web',
    featured: true,
    accent: '#ffd166',
  },
  {
    id: 'santuario',
    title: 'Santuario de los Mártires',
    subtitle: 'Sitio oficial',
    description:
      'Plataforma informativa y administrativa: eventos, historia, donaciones, agenda litúrgica y contacto con la comunidad.',
    year: '2025',
    stack: ['Angular', 'TypeScript'],
    visibility: 'client',
    kind: 'web',
    featured: true,
    accent: '#e8c547',
  },
  {
    id: 'folapsa',
    title: 'FOLAPSA',
    subtitle: 'Sitio + admin + API',
    description:
      'Plataforma web pública con panel admin, API NestJS, MongoDB, SEO y gestión de contenidos.',
    year: '2025',
    stack: ['Angular', 'NestJS', 'MongoDB'],
    visibility: 'client',
    kind: 'web',
    featured: true,
    accent: '#86efac',
  },
  {
    id: 'meetpoint',
    title: 'Meetpoint',
    subtitle: 'Portal comercial GK',
    description:
      'Ecosistema Oracle APEX: recibos de caja, sync de vendedores, roles, diagnósticos y portal clientes (Laravel + ORDS).',
    year: '2024–26',
    stack: ['Oracle APEX', 'PL/SQL', 'Laravel', 'ORDS'],
    visibility: 'client',
    kind: 'enterprise',
    featured: true,
    accent: '#fbbf24',
  },
  {
    id: 'pdv',
    title: 'Punto de Venta GK',
    subtitle: 'APEX + directorio',
    description:
      'PDV en APEX: alta/búsqueda de clientes, directorio público P46, carga Excel P94 y flujos de operación diaria.',
    year: '2025–26',
    stack: ['Oracle APEX', 'SQL', 'DA'],
    visibility: 'client',
    kind: 'enterprise',
    accent: '#f472b6',
  },
  {
    id: 'oracle-bip',
    title: 'Oracle BIP / KARDEX',
    subtitle: 'Data Models & reportes',
    description:
      'Reportes Fusion: KARDEX, inventarios, costos, cobranza, comisiones y pedidos. SQL de producción y Data Models BIP.',
    year: '2024–26',
    stack: ['Oracle BIP', 'SQL', 'Fusion'],
    visibility: 'client',
    kind: 'report',
    accent: '#94a3b8',
  },
  {
    id: 'kasto-inventario',
    title: 'Kasto Inventario',
    subtitle: 'Recepciones & control',
    description:
      'Sistema Laravel de inventario: recepciones, errores de procesamiento e integración operativa con Oracle.',
    year: '2025',
    stack: ['Laravel', 'PHP', 'MySQL'],
    visibility: 'client',
    kind: 'enterprise',
    accent: '#38bdf8',
  },
  {
    id: 'grupokasto-page',
    title: 'Grupo Kasto',
    subtitle: 'Sitio corporativo',
    description:
      'Página web corporativa del grupo: presencia de marca, secciones de negocio y diseño responsive.',
    year: '2025',
    stack: ['HTML', 'CSS', 'JS'],
    visibility: 'client',
    kind: 'web',
    accent: '#a3e635',
  },
  {
    id: 'portal-clientes',
    title: 'Portal Clientes Meetpoint',
    subtitle: 'Laravel + ORDS + HTTPS',
    description:
      'Portal para clientes con Laravel, consumo ORDS y despliegue Docker con HTTPS.',
    year: '2025',
    stack: ['Laravel', 'ORDS', 'Docker'],
    visibility: 'client',
    kind: 'enterprise',
    accent: '#fcd34d',
  },
  {
    id: 'atrapa-sacos',
    title: 'Catcher Game',
    subtitle: 'Kiosco Kassto',
    description:
      'Juego kiosco con pygame-ce: atrapa sacos, pensado para activaciones en piso de venta.',
    year: '2025',
    stack: ['Python', 'pygame-ce'],
    visibility: 'lab',
    kind: 'game',
    accent: '#fb7185',
  },
  {
    id: 'memo-kassto',
    title: 'Memorama Kassto',
    subtitle: 'Kiosco interactivo',
    description:
      'Memorama para kiosco de marca: experiencia lúdica en punto de venta con pygame-ce.',
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
    description:
      'Juego / simulación en C#: cocina, mutaciones y delivery. Proyecto creativo de gameplay.',
    year: '2025',
    stack: ['C#', 'Game'],
    visibility: 'lab',
    kind: 'game',
    accent: '#fdba74',
  },
  {
    id: 'flores-amarillas',
    title: 'Flores Amarillas',
    subtitle: 'Experiencia visual',
    description:
      'Sitio creativo con CSS animado. Pieza pequeña, emocional y pública en GitHub.',
    year: '2025',
    stack: ['CSS', 'HTML'],
    visibility: 'public',
    kind: 'web',
    repo: 'https://github.com/Darckmoud58/Flores-Amarillas',
    accent: '#fde047',
  },
  {
    id: 'ultron',
    title: 'Ultron',
    subtitle: 'Ente local de desarrollo',
    description:
      'Asistente local con conocimiento indexado, HUD 3D neuronal, MCP, voz y memoria del workspace. Varias puertas: Cursor, CLI, HTTP.',
    year: '2025–26',
    stack: ['Node', 'Three.js', 'MongoDB', 'MCP'],
    visibility: 'lab',
    kind: 'ai',
    featured: true,
    accent: '#d4ff4f',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
