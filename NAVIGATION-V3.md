# ORIEL V3 — Navigation system

This version adds a luxury-retail desktop navigation layer inspired by the interaction patterns seen in high-end fashion sites while keeping ORIEL's own visual identity.

## Desktop hover flyouts

Every primary item opens a large editorial panel on hover/focus:

- New Arrivals
- Women
- Men
- Collections
- Editorial
- Maison

The panel includes a focused link index and four editorial media slots. The navigation/header turns ivory while the panel is active, so the transition feels like a physical layer entering above the campaign film.

## Wordmark interaction

Hovering/focusing the ORIEL wordmark turns the top chrome into a light ivory surface and reveals a fine underline. Leaving it restores the campaign-overlay state when the page is at the top.

## Menu

`MENU` is not decorative: click opens the existing full-screen house menu. Hover reverses the two-line glyph and draws an underline sweep.

## Search

`SEARCH` is not decorative: click opens the full-screen live product search. Hover reveals the micro magnifier and underline transition.

## Interaction details

- delayed hover close prevents flyout flicker between nav and panel;
- Escape closes menu/search/flyouts;
- scrolling closes a hover flyout;
- keyboard focus opens the same panels;
- mobile keeps the full-screen menu model rather than desktop hover behavior.
