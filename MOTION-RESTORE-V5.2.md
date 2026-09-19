# ORIEL v5.2 — Motion restoration

Fixes made after visual review of the localhost recording:

- Intro now plays once on every real homepage load/reload, but not repeatedly during client-side navigation.
- Removed the accidental dependency on `prefers-reduced-motion` that could disable the intro, campaign rotation, smooth scroll and GSAP motion all at once on this machine.
- Campaign hero auto-rotates every 6.4 seconds again and has an 8.5s fail-safe so it cannot remain frozen if the intro event is missed.
- Campaign videos loop and resume correctly after intro completion.
- Wardrobe horizontal section has robust ScrollTrigger pinning, dynamic travel measurement, ResizeObserver refresh, resize/load refresh and GPU transform hints.
- Parallax range restored to the original stronger values.
- Product reveal animations remain enabled.
- Build-fix in Header.tsx from v5.1 is preserved.

This version keeps the production photos/videos from v5.1 and restores motion behavior instead of replacing the media work.
