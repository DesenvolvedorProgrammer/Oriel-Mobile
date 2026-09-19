# Implementation Notes

## Philosophy

This is intentionally not a clone of Ralph Lauren or any other fashion house. The benchmark is the **level of craft**: full-bleed campaign media, calm typography, dense editorial/product rhythm, restrained transitions, strong navigation and careful mobile adaptation.

## Motion hierarchy

### Tier A — Signature moments
- first-session preloader
- hero typography + campaign media
- pinned horizontal wardrobe
- route curtain
- collection grid FLIP

### Tier B — Editorial rhythm
- mask reveal
- parallax
- sticky campaign split
- media hover swap
- hide/reveal navigation

### Tier C — Microinteraction
- custom cursor
- underlines
- accordions
- size / swatch state
- cart states

Do not add another Tier A animation without removing or simplifying one elsewhere.

## When Gemini assets arrive

1. Replace Hero placeholder first and validate color contrast.
2. Replace horizontal-look assets next; these define the season.
3. Replace category and product media.
4. Replace campaign / savoir-faire films last.
5. Re-tune parallax only after final crops exist.

## Performance rules

- Never preload every film.
- Hero uses poster as the LCP element; video starts after hydration/load.
- Avoid more than one playing video inside the viewport on mobile.
- Keep all `ScrollTrigger` timelines scoped and destroyed on unmount.
- Preserve `prefers-reduced-motion` behavior.
- No 3D/WebGL in this build.

## V2: princípios de interação adicionados

A referência analisada usa profundidade pela composição de **mídia sobre mídia**, não pela quantidade de efeitos. O CampaignDeck reproduz esse princípio de forma original: filme ambiente full-screen, filme principal em um card central, seletor de universos, timeline e pause.

O objetivo não é copiar a Ralph Lauren. O que foi absorvido é o princípio: navegação editorial persistente, campanhas tratadas como mundos, mídia grande, alternância de ritmo e controles discretos.

A página deve respirar. Não adicionar scroll-jacking extra nem animações simultâneas só para “ter mais movimento”. Priorizar hero, transições de mídia, mega-menu, horizontal wardrobe e story sections.
