# Mario Glez — Portafolio

Portafolio interactivo (React + Three.js + GSAP). Minimal, con escena orbital 3D y catálogo de sitios / sistemas / PWAs.

**GitHub:** [Darckmoud58](https://github.com/Darckmoud58)

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Añadir proyectos

Edita `src/data/projects.ts`. Bio y contacto en `src/data/site.ts`.

Para que **otro Cursor** en otro equipo complete el catálogo, usa el archivo **`PROMPT.md`** (cópialo al chat en modo Agent).

## Deploy

- **Vercel / Netlify:** importar este repo, build `npm run build`, output `dist`.
- **GitHub Pages:** configurar Actions o `base` en `vite.config.ts` si el sitio no está en la raíz del dominio.

## Stack

- Vite · React · TypeScript
- `@react-three/fiber` · `@react-three/drei`
- GSAP ScrollTrigger
