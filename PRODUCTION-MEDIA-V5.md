# ORIEL — Production Media V5

This build replaces the visual placeholders with the approved ORIEL photography and campaign films.

## Home film map

- Intro: `public/video/oriel/intro.mp4` — 6 s brand intro, one time per browser session.
- A CASA: `public/video/oriel/a-casa.mp4`
- ATELIER: `public/video/oriel/atelier.mp4`
- WOMEN: `public/video/oriel/women.mp4`
- MEN: `public/video/oriel/men.mp4`
- LEATHER GOODS: `public/video/oriel/leather-goods.mp4`
- ACCESSORIES: `public/video/oriel/accessories-scarf.mp4`
- CHAPTER III / CAMPAIGN: `public/video/oriel/campaign-duo.mp4`

Campaign films are muted, plays-inline and intersection-aware so off-screen films pause. MP4 files were remuxed with `faststart`; non-intro audio was stripped. The intro keeps its low-volume audio track and gracefully falls back to muted autoplay when browser autoplay policy blocks sound. In that case a restrained Sound control appears.

## Intro behavior

`Preloader.tsx` now acts as the ORIEL brand intro:

- Only on `/`.
- Once per session (`sessionStorage: oriel-intro-seen`).
- 6-second film + 850 ms dissolve into the already-rendered home.
- Campaign deck waits for the intro-complete event before starting its first film/timeline.
- Reduced-motion users skip the film.
- Safety timeout prevents a stalled media request from trapping the user.

## Photography

Approved photography is stored in `public/media/oriel/` and wired through:

- Home campaign deck, Chapter III, Worlds, Wardrobe, Categories, Atelier, New Arrivals, Savoir-faire, Stories and Journal.
- Collection hero, campaign film, product grid and editorial break.
- Product gallery, campaign context, product film, craftsmanship and related products.
- Bag thumbnails and recommendations.
- Remaining legacy `MediaPlaceholder` calls resolve to real ORIEL production media instead of gradients, so Maison/Editorial/navigation surfaces stay visually coherent.

## Product media pairs

1. Burgundy Silk Dress — front / second view
2. Structured Leather Bag — packshot / on-model
3. Forest Cashmere Polo — full / detail
4. Espresso Leather Loafer — still life / on-foot
5. Navy Wool Coat — full / detail
6. Silk Scarf 90 — still life / on-model
7. Charcoal Wool Trousers — full / detail
8. Ivory Draped Silk Blouse — full / detail

## Motion polish

Existing GSAP + ScrollTrigger + Lenis remain. V5 adds:

- 8-second campaign deck synchronized to each approved film.
- Hero/video poster fallback and reduced-motion image fallback.
- Lazy intersection playback for off-screen films.
- Product-grid stagger entrance.
- Media-scale hover transitions.
- Full-bleed film vignette and controlled parallax.
- Product hover swaps using the approved paired photography.

## Local run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
