# Rediseño de Portafolio — "Terminal Refinado"

- **Fecha:** 2026-10-09
- **Autor:** Angel T. Ramírez (con asistencia)
- **Estado:** Aprobado para planificación
- **Repo original:** https://github.com/AngelTaRa99/portfolio-final
- **Nuevo proyecto:** `/home/angelo/portfolio`
- **Skill de diseño usada:** `ui-ux-pro-max` (nextlevelbuilder/ui-ux-pro-max-skill)

## 1. Objetivo

Rediseñar el portafolio personal desde cero. Se conservan tres cosas de la versión
actual:

1. **Marca y mensaje personal** — "IAmAngel.dev", la idea de "la solución a tus
   problemas" y el enfoque de resolver problemas técnicos.
2. **Vibe retro-terminal** — estética de terminal/CRT, cursor parpadeante, tipografía
   monoespaciada.
3. **Estructura de navegación** — shell con rail lateral + áreas de contenido.

Todo lo demás se rehace con una ejecución disciplinada, accesible y mantenible.

## 2. Decisiones tomadas (con el usuario)

| Tema | Decisión |
|------|----------|
| Alcance | Rediseño desde cero; solo se conserva marca, vibe retro-terminal y estructura |
| Secciones | Hero, Sobre mí/Skills, Proyectos, Experiencia/CV, Contacto (sin blog) |
| Contenido | Placeholders editables claramente marcados |
| Stack | Mantener Next.js (App Router) + React 19 + Tailwind v4 + TypeScript |
| Ubicación | `/home/angelo/portfolio` |
| Contacto | Solo enlaces / `mailto` (sin backend) |
| Dirección visual | **A. Terminal Refinado** |

## 3. Diagnóstico de la versión actual

Fortalezas a preservar: identidad clara (CRT + rojo + Geist), transición "cambio de
canal", cursor/scanlines, rail de navegación.

Problemas a corregir:

- **Neumorfismo** presente en casi toda la UI (botones, cards, cabecera). Da look
  genérico/"de IA" y tiene riesgo de accesibilidad alto (`risk:high`) según la base de
  diseño.
- Páginas `User` y `Contact` son placeholders (`<p>User</p>`, `<p>CONTACT</p>`).
- Tipografía y jerarquía débiles: `text-4xl tracking-widest` fijo para todo el
  contenido; sin escala tipográfica real.
- Enlaces de contacto inconsistentes: LinkedIn con href en minúsculas
  (`linkedin.com/in/AngelTaRa99`) y texto `LinkedIn`; email placeholder
  (`angel@example.com`).
- Sin light/dark tokens semánticos; valores hex y sombras dispersas en CSS.
- Motion sin respetar `prefers-reduced-motion`.

## 4. Dirección: Terminal Refinado

Ejecución disciplinada del look terminal.

- **Mono-first**: JetBrains Mono como familia principal (look terminal/developer,
  "precision"). Tamaños estrictos: 12 / 14 / 16 para UI y cuerpo; escala mayor para
  display.
- **Dark-first** con light mode real y completo (no un afterthought).
- **Rojo `#DC2626`** como acento de marca + **cian `#22D3EE`** secundario + **verde
  `#22C55E`** para estados de éxito.
- **Se elimina el neumorfismo.** Se reemplaza por **paneles con borde 1px** y
  **"terminal chrome"**: una barra de título por panel con dots de ventana y una ruta
  tipo `/home`.
- Glow rojo medido, solo en elementos activos/foco.
- Scanlines mucho más sutiles y con opción de desactivarse; el efecto "cambio de canal"
  se conserva pero atenuado.

Fundamento desde la base de datos de diseño (`--design-system`, dominio `style`):

- Estilos candidatos: Cyberpunk UI, Retro-Futurism, Dark OLED, Neumorphism
  (`risk:high`, descartado).
- Tipografía: *Terminal CLI Monospace* (JetBrains Mono).
- Paleta: el rojo actual ya coincide con un esquema neón-rojo sobre oscuro recomendado;
  verde/cian como acentos.
- Anti-patrones a evitar: estilo inconsistente, contraste pobre, emoji como iconos.

## 5. Arquitectura y rutas

App shell con rail lateral fijo + área de contenido (panel terminal).

| Ruta | Sección | Contenido |
|------|---------|-----------|
| `/` | Inicio / Hero | Saludo, propuesta de valor, stack principal, estado "disponible", CTAs |
| `/about` | Sobre mí / Skills | Bio breve + skills agrupadas (frontend, backend, herramientas) |
| `/projects` | Proyectos | Vitrina (Terra + placeholders) con tags y enlaces |
| `/experience` | Experiencia / CV | Timeline de experiencia y educación |
| `/contact` | Contacto | Enlaces reales (mailto, GitHub, LinkedIn) + placeholders corregidos |

La ruta actual `/user` se elimina; su intención pasa a `/about`.

### Estructura de carpetas propuesta

```
/home/angelo/portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # App shell: header, nav rail, main, footer
│   │   ├── page.tsx              # Hero
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── globals.css           # Tokens + utilidades
│   │   └── components/
│   │       ├── AppShell/ (Header, NavRail, Footer)
│   │       ├── TerminalPanel.tsx
│   │       ├── PromptLine.tsx
│   │       ├── BlinkingCursor.tsx
│   │       ├── StatusDot.tsx
│   │       ├── TechChip.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── TimelineItem.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── PageTransition.tsx
│   └── content/                  # Datos placeholder editables
│       ├── profile.ts
│       ├── projects.ts
│       ├── experience.ts
│       └── skills.ts
├── docs/superpowers/specs/       # Este documento + plan
├── tailwind / next / ts config
└── package.json
```

### Aislamiento de datos

Todo el contenido editable vive en `src/content/*.ts` como datos tipados
(`Profile`, `Project[]`, `Experience[]`, `Skill[]`). Las páginas consumen estos datos y
renderizan componentes. Cambiar contenido no requiere tocar la UI.

## 6. Sistema de diseño

### 6.1 Tokens de color (semánticos)

Dark (default):

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` | `#0A0A0B` | Fondo base |
| `--surface` | `#121214` | Paneles |
| `--surface-2` | `#17171A` | Paneles elevados / hover |
| `--foreground` | `#EDEDED` | Texto principal |
| `--muted-foreground` | `#94A3B8` | Texto secundario |
| `--border` | `rgba(255,255,255,0.08)` | Bordes de panel |
| `--primary` | `#DC2626` | Acento de marca |
| `--primary-hover` | `#EF4444` | Hover del acento |
| `--secondary` | `#22D3EE` | Acento secundario (cian) |
| `--success` | `#22C55E` | Estado éxito / LED |
| `--ring` | `#DC2626` | Anillo de foco |

Light:

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` | `#FAFAFA` | Fondo base |
| `--surface` | `#FFFFFF` | Paneles |
| `--surface-2` | `#F4F4F5` | Paneles elevados / hover |
| `--foreground` | `#09090B` | Texto principal |
| `--muted-foreground` | `#475569` | Texto secundario |
| `--border` | `#E4E4E7` | Bordes de panel |
| `--primary` | `#DC2626` | Acento de marca |
| `--secondary` | `#0891B2` | Cian ajustado para contraste en claro |
| `--success` | `#16A34A` | Estado éxito / LED |
| `--ring` | `#DC2626` | Anillo de foco |

Todos los colores se exponen como tokens en `globals.css` vía `@theme inline` de
Tailwind v4. **Prohibido hex crudo en componentes** — siempre tokens.

### 6.2 Tipografía

- Familia principal: **JetBrains Mono** (`next/font/google`), con fallback `monospace`.
- Jets: 400 (cuerpo), 500 (énfasis), 600/700 (títulos).
- Escala:
  - Display: `clamp(2rem, 5vw, 3rem)` / line-height 1.1
  - H1: 1.5rem–2rem / 1.2
  - H2: 1.25rem / 1.3
  - Body: 1rem / 1.6
  - Label / metadatos: 0.75rem uppercase + `letter-spacing: 0.08em`
- Regla: el cuerpo nunca baja de 16px; los labels nunca de 12px.
- (Opcional, no incluido en v1: IBM Plex Sans solo para párrafos largos si se detecta
  fatiga de lectura.)

### 6.3 Espaciado y layout

- Escala 4px base: 8 / 12 / 16 / 24 / 32 / 48 / 64.
- Contenedor de contenido: `max-width: 64rem`, padding lateral fluido.
- Layout: rail lateral fijo de 4.5rem (solo iconos) en móvil, 4.5rem + labels en
  desktop (≥1024px) + `main` flexible.
- Radios: 8–12px, consistentes.
- Grid de proyectos: 1 col <768px / 2 col 768–1023px / 3 col ≥1024px.

## 7. Componentes

| Componente | Responsabilidad |
|-----------|-----------------|
| `TerminalPanel` | Panel con borde 1px + title-bar (dots + ruta). Base de todas las secciones |
| `PromptLine` | Prefijo `$ ` + efecto typing; usado en hero y vacíos |
| `BlinkingCursor` | Cursor `▊` parpadeante, desactivado con reduced-motion |
| `StatusDot` | LED de estado (activo = rojo/verde, inactivo = muted) |
| `TechChip` | Tag de tecnología (mono, borde suave) |
| `ProjectCard` | Tarjeta de proyecto: título, indicador LED, descripción, chips, enlace |
| `TimelineItem` | Fila de experiencia con periodo, rol, empresa, descripción |
| `NavRail` | Navegación lateral con iconos + labels e indicador de ruta activa |
| `ThemeToggle` | Conmutador claro/oscuro persistido en `localStorage` |
| `PageTransition` | Efecto sutil de cambio de página, respeta reduced-motion |

Cada componente es una unidad con una sola responsabilidad, props tipadas y sin
acoplarse a los datos (recibe datos por props).

## 8. Movimiento

- **Hero:** typing del mensaje principal (~40–60ms/carácter) + cursor parpadeante.
- **Cambio de página:** transición atenuada (fade + ligero barrido), ~200–300ms.
- **Hover:** 150–200ms en interactivos; estados de foco visibles e instantáneos.
- **Scanlines:** opcionales, opacidad muy baja, sin animación permanente en móvil.
- **Todos los efectos se desactivan bajo `prefers-reduced-motion: reduce`.**

## 9. Accesibilidad

- Contraste texto ≥ 4.5:1 (labels y texto secundario incluidos).
- `focus-visible` con anillo rojo en todo elemento interactivo.
- Botones solo-icono con `aria-label`.
- Áreas táctiles ≥ 44×44px.
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`, `time`).
- Sin emoji como iconos — SVG (`@deemlol/next-icons` ya en uso).
- Verificación responsive en 375 / 768 / 1024 / 1440.
- `lang="es"` en `<html>`.

## 10. Contenido (placeholders)

Los ficheros en `src/content/` se rellenan con texto marcado como placeholder y un
comentario `// TODO(content): reemplazar`. Datos a completar por el usuario:

- Email real (sustituir `angel@example.com`).
- Enlaces correctos de GitHub y LinkedIn (LinkedIn con mayúsculas correctas o, si no
  existe, retirarlo).
- Bio, lista de skills, proyectos adicionales y experiencia/educación reales.

## 11. Fuera de alcance (v1)

- Blog / artículos.
- Backend o envío real de formulario (solo `mailto`/enlaces).
- i18n multi-idioma (contenido en español).
- CMS.
- Command palette / ⌘K (considerado pero descartado de v1).
- Sonidos o audio.

## 12. Criterios de éxito

1. La build (`next build`) y el lint pasan sin errores.
2. Las 5 rutas renderizan y la navegación por rail funciona con estado activo.
3. Dark y light mode con tokens semánticos; sin hex crudo en componentes.
4. Contraste ≥ 4.5:1 y focos visibles en interactivos.
5. `prefers-reduced-motion` desactiva typing, scanlines y transiciones.
6. Responsive correcto en 375 / 768 / 1024 / 1440 sin scroll horizontal.
7. Enlaces de contacto corregidos; contenido placeholder claramente marcado.
8. Sin neumorfismo; paneles con borde y "terminal chrome" consistentes.
