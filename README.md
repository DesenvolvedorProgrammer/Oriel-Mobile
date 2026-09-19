# ORIEL — Luxury Fashion Experience V4

# ORIEL — Luxury Fashion Experience

A content-driven luxury fashion site built from the ORIEL art direction. No database, no 3D. The visual weight comes from typography, editorial layout, video, image, scroll choreography and micro-interaction.

## Stack

- Next.js 16 + React 19 + strict TypeScript
- GSAP + ScrollTrigger + Flip
- Lenis smooth scrolling
- CSS Modules + global design tokens
- Local content (TypeScript) — no database
- Native responsive media slots, ready for Gemini-generated assets

## Implemented pages

- `/` — cinematic Home
- `/collection` — collection story + filters + FLIP grid density
- `/product/[slug]` — editorial PDP with sticky buying panel and long-form gallery
- `/editorial` — journal / campaign storytelling
- `/maison` — brand / savoir-faire / mills / repair
- `/bag` — premium cart experience

## Experience layer already implemented

- first-session preloader
- transparent-to-solid intelligent header
- hide-on-scroll navigation
- full-screen mega menu
- custom difference cursor
- Lenis smooth scrolling
- GSAP hero reveal and media parallax
- pinned horizontal wardrobe sequence
- mask reveals / staggered entrances
- editorial sticky split section
- hover media swap on product cards
- collection grid density switching with GSAP Flip
- mobile-specific composition changes
- reduced-motion fallback

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important: media

Every colored block is intentional scaffolding, not final art. Search the code for `MediaPlaceholder`. Once Gemini media exists, replace those blocks with `<Image>` or `<video>` while preserving the surrounding wrapper and animation hooks.

See `MEDIA-BRIEF.md` for the complete asset plan.

## Direction

Do not add 3D. Do not fill every viewport with animation. The luxury feeling depends on controlled pacing: cinematic moments followed by quiet editorial space.

## V2 — campaign system / Ralph-level interaction study

A V2 adiciona um sistema de campanha inspirado em padrões de grandes maisons (sem copiar layouts/identidade):

- hero com **ambient background film + campaign film card** em primeiro plano;
- quatro universos alternáveis por um seletor em pill;
- autoplay, pausa, índice e timeline/progress;
- mega-menu com preview que muda conforme o hover;
- busca full-screen editorial;
- seção ORIEL Worlds com quatro universos de campanha;
- seção Stories em mosaico editorial;
- microinterações adicionais e transições mais profundas.

### Se abrir em localhost:3001
Isso é normal: o Next.js tenta `3000` primeiro. Se outra aplicação ainda estiver usando essa porta, ele escolhe a próxima livre (`3001`, `3002` etc.). Para voltar ao 3000, encerre o processo que está ocupando a porta e reinicie `npm run dev`.


## V3 — Navigation interaction

- Desktop hover mega-navigation inspired by luxury retail navigation patterns (original ORIEL execution).
- Per-section editorial flyouts for New Arrivals, Women, Men, Collections, Editorial and Maison.
- Header switches to an ivory surface on wordmark hover and while flyouts are active.
- Menu and Search utilities now have visible hover micro-interactions and remain fully functional on click.
- Full-screen Menu and Search experiences are preserved.
