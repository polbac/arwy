# ARWY — Contexto del proyecto

Sitio web artístico de **ÁRWY / Nube Rosa**. Simula un escritorio retro (estilo macOS clásico) con carpetas arrastrables que abren ventanas flotantes. El contenido se gestiona desde **Prismic CMS**.

## Stack

| Tecnología | Versión / notas |
|------------|-----------------|
| Next.js | 13.3.1 (Pages Router) |
| React | 18.2 |
| TypeScript | 5.0 |
| Prismic | `@prismicio/client`, `@prismicio/react`, `@prismicio/next` |
| Slice Machine | `@slicemachine/adapter-next` |
| UI / interacción | `react-draggable`, `react-fast-marquee`, `react-medium-image-zoom`, `lunarphase-js` |

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run start        # servir build
npm run lint         # ESLint
npm run slicemachine # editor de contenido Prismic
```

## Arquitectura

```
pages/
  _app.tsx      # PrismicProvider, DesktopContext, efecto sparkle del cursor, ruido visual
  _document.tsx
  index.tsx     # meta tags (OG, viewport, título)

components/
  Desktop.tsx   # layout principal: fondo, carpetas, imágenes flotantes, luna
  Folder.tsx    # carpeta arrastrable que abre una sección como ventana
  Window.tsx    # ventana draggable con barra de título, resize, z-index
  FloatingImage.tsx / FloatingJpg.tsx
  Moon.tsx
  sections/     # una carpeta = un custom type de Prismic
    Bio, Music, Audiovisual, Poesia, Visiones, Oraculo, NubeRosa, Prensa

context/
  desktopContext.tsx  # z-index, posición del mouse, handlers de mouseup global

customtypes/    # esquemas Prismic (Slice Machine)
prismic.ts      # cliente Prismic (repo: "arwy")
styles/
  globals.css   # estilos del desktop, ventanas, carpetas, fuentes custom
utils/
  browser.ts    # posicionamiento de ventanas
  random.ts
```

### Flujo de la app

1. `_app.tsx` envuelve todo en `PrismicProvider` + `DesktopContextProvider` + `Desktop`.
2. `Desktop` carga el fondo desde el custom type `dektop` (typo intencional en Prismic) y renderiza carpetas fijas.
3. Cada `Folder` abre su `Component` de `sections/` como ventana al hacer clic (distingue clic de drag).
4. Las secciones usan hooks de Prismic (`useSinglePrismicDocument`, `useAllPrismicDocumentsByType`) y renderizan contenido dentro de `Window`.

### Carpetas del escritorio

| Carpeta | Componente | Custom type Prismic |
|---------|------------|---------------------|
| música | `Music` | `music` |
| bio | `Bio` | `bio` |
| audiovisual | `Audiovisual` | `audiovisual` |
| poesía | `Poesia` | `text` |
| visiones | `Visiones` | `vision` |
| oráculo | `Oraculo` | `oraculo` |
| nube rosa | `NubeRosa` | `nube_rosa` |
| prensa | `Prensa` | `prensa` |

## Convenciones de código

- **Alias de imports**: `@/*` apunta a la raíz del proyecto (`tsconfig.json`).
- **Estilo visual**: estética retro / glitch. Títulos de ventana con efecto ASCII (`asciiEffect` en `Window.tsx`). Cursor personalizado con sparkle y nube rosa.
- **Ventanas**: usar `Window` con `WindowSize` (`SMALL` | `MEDIUM` | `LARGE`). Pasar `data` de Prismic para mostrar "cargando..." hasta que llegue.
- **Contexto**: `DestkopBrowser` (typo en el nombre) gestiona z-index y eventos globales de mouse.
- **Prismic**: repositorio `arwy`. Tipos generados en `prismicio-types.d.ts`. No hay rutas dinámicas; todo es SPA en una sola página.
- **Build**: `next.config.js` tiene `ignoreBuildErrors: true` — no depender de esto para introducir errores de tipos.

## CMS (Prismic)

- Editar contenido: `npm run slicemachine` o el dashboard de Prismic.
- Los custom types viven en `customtypes/`.
- El fondo del desktop (`dektop`) incluye: imágenes de fondo aleatorias, color, opción de posición, imágenes flotantes e imágenes JPEG abribles como ventanas.

## Tareas pendientes (TODO.txt)

- **Visiones**: quitar efecto "ruedita" y abrir imágenes como archivos JPG.
- **Desktop**: las imágenes JPG deben abrirse como ventanitas.
- **Nube rosa**: crear acceso directo al mail.
- **Música**: arreglar "superpantano".
- **Mobile**: adaptar la web a formato celular.

Completadas: título/imagen en Nube Rosa, imagen OG para WhatsApp (`/shared.jpeg`).

## Notas para el agente

- Responder y documentar en **español** cuando interactúes con el usuario.
- Mantener la estética y UX existente; no modernizar la UI sin que se pida.
- Cambios mínimos y focalizados; reutilizar `Window`, `Folder` y patrones de secciones existentes.
- No commitear ni pushear sin que el usuario lo pida explícitamente.
- Fuentes e iconos custom están en `public/` (no usar fuentes del sistema salvo Helvetica en labels).
- Probar en desktop; el soporte móvil es limitado (`isMobile` desactiva drag en ventanas).
