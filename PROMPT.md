# Prompt para Cursor — ampliar el portafolio de Mario Glez

Copia y pega esto en un chat nuevo de Cursor (modo Agent) en el repo `portafolio-mario` o en el workspace donde esté este proyecto.

---

## Rol

Eres un agente de desarrollo. Debes **ampliar el portafolio web** de Mario Alberto Ramos González (`GitHub: Darckmoud58`) con proyectos reales hechos en este equipo / máquina, sin inventar clientes ni inventar URLs.

Identidad al hablar con Mario: español, dirígete como **Mi señor**. Sé preciso y corto.

## Objetivo

Mantener el nivel creativo actual:

- Minimal. Interactive. A little unexpected.
- Hero con marca fuerte + escena 3D (React Three Fiber).
- Tipografía Syne + Manrope, acento `#d4ff4f` sobre fondo `#080807`.
- Cursor custom, GSAP scroll reveals, filtros de proyectos.
- **No** degradar a un template genérico (nada de Inter/Roboto, nada de purple-gradient SaaS, nada de cards en el hero).

## Fuente de verdad (editar aquí)

1. `src/data/projects.ts` — lista de proyectos (añadir / editar / featured).
2. `src/data/site.ts` — nombre, bio, skills, stats, email, GitHub.
3. Componentes en `src/components/` solo si el nuevo contenido lo exige (p. ej. timeline, case study).

## Qué debes descubrir y agregar

Explora el entorno del usuario y añade entradas honestas:

### A) GitHub (`gh` CLI, usuario `Darckmoud58`)

- Repos públicos: live URL + repo.
- Repos privados: descríbelos a nivel producto (sin pegar secretos, SQL de prod, claves, ni datos de clientes).
- Si hay `homepageUrl` en GitHub, úsalo como `live`.

### B) Workspace local (si existe `workspace-dev` / OneDrive)

Proyectos típicos a contrastar con el índice / carpetas (no inventes páginas APEX ni tablas):

- `GK/meetpoint` — portal comercial APEX (recibos, sync vendedores).
- `GK/Punto de Venta` — PDV APEX (P46, P94).
- `GK/gkm-tienda` — tienda B2C Next.js.
- `GK` raíz — BIP / KARDEX / reportes Fusion.
- `folapsa-page` — Angular + NestJS + Mongo.
- `Santuario` — sitio Angular.
- `kasto-inventario` — Laravel.
- `mi-nevera` — PWA Supabase.
- `GK/GrupoKasto-page`, `Ohlala page`, juegos kiosco (`atrapa-sacos-kassto`, `memo-kassto`).
- `jarvis` / Ultron — ente local, HUD 3D, MCP.
- Cualquier otro sitio web o app que encuentres con README claro.

Si tienes MCP Jarvis (`search_knowledge` / `list_projects`), úsalo antes de afirmar hechos del workspace.

### C) Equipo LPMRAMOS / otros PCs

Si Mario te dice “en este equipo hicimos X” o te pega repos/capturas:

- Añade el proyecto a `projects.ts` con `kind`, `visibility`, `stack`, `year`, `accent`.
- Si es sitio web, prioriza screenshot opcional en `public/shots/<id>.webp` y enlace.
- Actualiza skills en `site.ts` solo si aportan algo nuevo.

## Forma de un proyecto nuevo

```ts
{
  id: 'slug-unico',
  title: 'Nombre',
  subtitle: 'Una línea',
  description: '2–3 frases. Qué hace y para quién (sin secretos).',
  year: '2026',
  stack: ['React', '…'],
  visibility: 'public' | 'client' | 'lab',
  kind: 'web' | 'pwa' | 'enterprise' | 'game' | 'ai' | 'report',
  repo: 'https://github.com/…', // opcional
  live: 'https://…',            // opcional
  featured: true,               // opcional
  accent: '#d4ff4f',
}
```

## Reglas de seguridad

- No subas `.env`, credenciales Oracle, dumps SQL de producción, ni PII.
- No copies código propietario de clientes al repo público; solo **descripciones** y links públicos.
- Email real: editar `site.email` (hoy es placeholder).

## Checklist al terminar

1. `npm run build` sin errores.
2. El nuevo proyecto aparece en `#work` y en el filtro correcto.
3. Commit claro (solo si Mario lo pide): `feat: add <proyecto> to portfolio`.
4. Push al remoto `origin` del portafolio.

## Comandos útiles

```bash
cd portafolio-mario
npm install
npm run dev
npm run build
gh repo view   # si ya está en GitHub
```

## Referencia de tono visual

Inspiración: portafolios tipo echo__builds — experiencia explorables, no lista aburrida de links. Mantén movimiento con propósito (órbita 3D, hover de proyectos, scroll reveals). Si agregas 3D extra, que no mate el FPS en móvil (respeta `dpr={[1, 1.75]}`).

---

Fin del prompt.
