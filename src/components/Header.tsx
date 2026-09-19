'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { navItems } from '@/content/site';
import { SearchOverlay } from './SearchOverlay';
import styles from './header.module.css';

type Tone = 'warm' | 'stone' | 'ink' | 'forest' | 'wine';
type FlyoutCard = { kicker: string; title: string; tone: Tone; href: string };
type FlyoutSection = {
  eyebrow: string;
  intro: string;
  links: { label: string; href: string }[];
  cards: FlyoutCard[];
};

const visualMap: Record<string, { eyebrow: string; title: string; tone: Tone }> = {
  'New Arrivals': { eyebrow: 'NEW SEASON', title: 'First light.', tone: 'warm' },
  Women: { eyebrow: 'WOMEN', title: 'Quiet structure.', tone: 'stone' },
  Men: { eyebrow: 'MEN', title: 'Built to remain.', tone: 'ink' },
  Collections: { eyebrow: 'CHAPTER III', title: 'Sézanne, after dawn.', tone: 'forest' },
  Editorial: { eyebrow: 'JOURNAL', title: 'Stories from the house.', tone: 'wine' },
  Maison: { eyebrow: 'THE HOUSE', title: 'Made slowly.', tone: 'warm' },
};

const flyouts: Record<string, FlyoutSection> = {
  'New Arrivals': {
    eyebrow: 'NEW / AUTUMN — WINTER 2026',
    intro: 'The first pieces of Chapter III. Tailoring, leather and objects arriving in short series.',
    links: [
      { label: 'View all new arrivals', href: '/collection' },
      { label: 'Ready-to-wear', href: '/collection?category=ready-to-wear' },
      { label: 'Leather goods', href: '/collection?category=accessories' },
      { label: 'Shoes', href: '/collection?category=footwear' },
      { label: 'House icons', href: '/collection?edit=icons' },
    ],
    cards: [
      { kicker: '01 · NEW', title: 'Navy wool coat', tone: 'warm', href: '/product/navy-wool-coat' },
      { kicker: '02 · NEW', title: 'Charcoal tailoring', tone: 'stone', href: '/product/charcoal-wool-trousers' },
      { kicker: '03 · OBJECT', title: 'Structured leather', tone: 'forest', href: '/product/espresso-structured-bag' },
      { kicker: '04 · EDIT', title: 'After dawn', tone: 'wine', href: '/editorial' },
    ],
  },
  Women: {
    eyebrow: 'WOMEN / THE WARDROBE',
    intro: 'A wardrobe built through proportion: long coats, quiet dresses, exact knits and objects made to age well.',
    links: [
      { label: 'Explore women', href: '/collection?gender=women' },
      { label: 'Coats & jackets', href: '/collection?gender=women&category=outerwear' },
      { label: 'Tailoring', href: '/collection?gender=women&category=tailoring' },
      { label: 'Knitwear', href: '/collection?gender=women&category=knitwear' },
      { label: 'Accessories', href: '/collection?gender=women&category=accessories' },
    ],
    cards: [
      { kicker: 'WOMEN · 01', title: 'Navy coat', tone: 'stone', href: '/product/navy-wool-coat' },
      { kicker: 'WOMEN · 02', title: 'Evening study', tone: 'wine', href: '/collection?gender=women' },
      { kicker: 'WOMEN · 03', title: 'Forest cashmere', tone: 'warm', href: '/product/forest-cashmere-polo' },
      { kicker: 'WOMEN · 04', title: 'Structured bag', tone: 'ink', href: '/product/espresso-structured-bag' },
    ],
  },
  Men: {
    eyebrow: 'MEN / THE WARDROBE',
    intro: 'Structure without weight. Tailoring and outerwear designed to move through a full day without announcing themselves.',
    links: [
      { label: 'Explore men', href: '/collection?gender=men' },
      { label: 'Tailoring', href: '/collection?gender=men&category=tailoring' },
      { label: 'Outerwear', href: '/collection?gender=men&category=outerwear' },
      { label: 'Knitwear', href: '/collection?gender=men&category=knitwear' },
      { label: 'Shoes', href: '/collection?gender=men&category=footwear' },
    ],
    cards: [
      { kicker: 'MEN · 01', title: 'Wool trousers', tone: 'ink', href: '/product/charcoal-wool-trousers' },
      { kicker: 'MEN · 02', title: 'Field coat', tone: 'forest', href: '/collection?gender=men' },
      { kicker: 'MEN · 03', title: 'Cashmere polo', tone: 'stone', href: '/product/forest-cashmere-polo' },
      { kicker: 'MEN · 04', title: 'Espresso loafer', tone: 'warm', href: '/product/espresso-leather-loafer' },
    ],
  },
  Collections: {
    eyebrow: 'COLLECTIONS / CHAPTER III',
    intro: 'Each collection is treated as a chapter: a place, a light, a set of materials and a wardrobe that remains after the campaign.',
    links: [
      { label: 'Chapter III — Sézanne', href: '/collection' },
      { label: 'Permanent collection', href: '/collection?edit=permanent' },
      { label: 'House icons', href: '/collection?edit=icons' },
      { label: 'Lookbook', href: '/editorial' },
      { label: 'Campaign films', href: '/editorial' },
    ],
    cards: [
      { kicker: 'CHAPTER III', title: 'After dawn', tone: 'forest', href: '/collection' },
      { kicker: 'PERMANENT', title: 'The house line', tone: 'stone', href: '/collection' },
      { kicker: 'ARCHIVE', title: 'Issue 14', tone: 'wine', href: '/editorial' },
      { kicker: 'FILM', title: 'Rue Taitbout', tone: 'ink', href: '/editorial' },
    ],
  },
  Editorial: {
    eyebrow: 'EDITORIAL / JOURNAL',
    intro: 'Portraits, places, process and field notes. The world around the clothes, edited as carefully as the clothes themselves.',
    links: [
      { label: 'Journal index', href: '/editorial' },
      { label: 'Campaigns', href: '/editorial?filter=campaign' },
      { label: 'Conversations', href: '/editorial?filter=conversation' },
      { label: 'Materials', href: '/editorial?filter=material' },
      { label: 'Field notes', href: '/editorial?filter=field-notes' },
    ],
    cards: [
      { kicker: 'CAMPAIGN', title: 'The room', tone: 'wine', href: '/editorial' },
      { kicker: 'PORTRAIT', title: 'Noor Halabi', tone: 'stone', href: '/editorial' },
      { kicker: 'MATERIAL', title: 'Waxed linen', tone: 'warm', href: '/editorial' },
      { kicker: 'FIELD NOTE', title: 'Provence', tone: 'forest', href: '/editorial' },
    ],
  },
  Maison: {
    eyebrow: 'MAISON / PARIS 1994',
    intro: 'One atelier, short series, exacting materials. The house is built around the people and time required to make an object properly.',
    links: [
      { label: 'The house', href: '/maison' },
      { label: 'Savoir-faire', href: '/maison#savoir-faire' },
      { label: 'Materials', href: '/maison#materials' },
      { label: 'Atelier', href: '/maison#atelier' },
      { label: 'Private appointments', href: '/maison#appointments' },
    ],
    cards: [
      { kicker: 'ATELIER', title: 'Cut by hand', tone: 'warm', href: '/maison' },
      { kicker: 'MATERIAL', title: 'Wool & linen', tone: 'stone', href: '/maison' },
      { kicker: 'ARCHIVE', title: 'Paris, 1994', tone: 'ink', href: '/maison' },
      { kicker: 'SERVICE', title: 'By appointment', tone: 'forest', href: '/maison' },
    ],
  },
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hovered, setHovered] = useState('Collections');
  const [flyout, setFlyout] = useState<string | null>(null);
  const [brandHover, setBrandHover] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visual = useMemo(() => visualMap[hovered] ?? visualMap.Collections, [hovered]);
  const flyoutData = flyout ? flyouts[flyout] : null;
  const lightSurface = solid || brandHover || Boolean(flyout);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setFlyout(null), 130);
  };
  const openFlyout = (label: string) => {
    cancelClose();
    setFlyout(label);
    setHovered(label);
  };
  const closeFlyout = () => {
    cancelClose();
    setFlyout(null);
  };

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setSolid(y > 70);
      setHidden(y > 150 && y > last + 5);
      if (y < last - 5) setHidden(false);
      if (Math.abs(y - last) > 12) setFlyout(null);
      last = y;
    };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch(false);
        setFlyout(null);
      }
      if (!typing && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        setOpen(false);
        setFlyout(null);
        setSearch(true);
      }
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || search ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, search]);

  useEffect(() => () => cancelClose(), []);

  const launchMenu = () => {
    closeFlyout();
    setSearch(false);
    setOpen(true);
  };
  const launchSearch = () => {
    closeFlyout();
    setOpen(false);
    setSearch(true);
  };

  return (
    <>
      <div className={`${styles.shipping} ${solid ? styles.shippingHidden : ''}`}>
        Complimentary shipping and returns · <span>Private client services</span>
      </div>

      <div className={`${styles.chromeSurface} ${lightSurface ? styles.chromeSurfaceLight : ''} ${hidden ? styles.hidden : ''}`} aria-hidden="true" />

      <header className={`${styles.header} ${solid ? styles.solid : ''} ${lightSurface ? styles.light : ''} ${hidden ? styles.hidden : ''}`}>
        <div className={styles.left}>
          <button onClick={launchMenu} aria-label="Open menu" aria-expanded={open} aria-controls="oriel-main-menu" className={`${styles.menuBtn} ${styles.utilityBtn}`}>
            <span className={styles.menuGlyph} aria-hidden="true"><i /><i /></span>
            <span>Menu</span>
          </button>
          <button onClick={launchSearch} aria-haspopup="dialog" aria-expanded={search} className={`${styles.searchBtn} ${styles.utilityBtn}`}>
            <span>Search</span><kbd>⌘K</kbd><i aria-hidden="true" />
          </button>
        </div>

        <Link
          href="/"
          className={styles.brand}
          onMouseEnter={() => setBrandHover(true)}
          onMouseLeave={() => setBrandHover(false)}
          onFocus={() => setBrandHover(true)}
          onBlur={() => setBrandHover(false)}
        >
          <b>ORIEL</b><small>Maison · Paris</small>
        </Link>

        <div className={styles.right}>
          <Link className={`${styles.utilityLink} ${styles.desktop}`} href="/maison#appointments">Client Services</Link>
          <button className={`${styles.utilityBtn} ${styles.desktop}`} onClick={launchMenu}>Account</button>
          <Link className={styles.utilityLink} href="/bag">Bag <em>(0)</em></Link>
        </div>
      </header>

      <nav
        className={`${styles.nav} ${solid ? styles.navSolid : ''} ${lightSurface ? styles.navLight : ''} ${hidden ? styles.hidden : ''}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        aria-label="Primary navigation"
      >
        {navItems.map((n) => (
          <Link
            key={n.label}
            href={n.href}
            className={`${flyout === n.label ? styles.navActive : ''} ${pathname === n.href.split('?')[0] && n.label === 'Maison' ? styles.navCurrent : ''}`}
            onMouseEnter={() => openFlyout(n.label)}
            onFocus={() => openFlyout(n.label)}
            onClick={closeFlyout}
          >
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>

      <section
        className={`${styles.hoverMega} ${flyoutData ? styles.hoverMegaOpen : ''} ${solid ? styles.hoverMegaSolid : ''}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        aria-hidden={!flyoutData}
      >
        {flyoutData && (
          <div className={styles.hoverMegaInner} key={flyout}>
            <aside className={styles.flyoutIntro}>
              <span>{flyoutData.eyebrow}</span>
              <p>{flyoutData.intro}</p>
              <div className={styles.flyoutLinks}>
                {flyoutData.links.map((item, index) => (
                  <Link key={item.label} href={item.href} onClick={closeFlyout}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <b>{item.label}</b><i>↗</i>
                  </Link>
                ))}
              </div>
            </aside>
            <div className={styles.flyoutShowcase}>
              <div className={styles.showcaseLabel}><span>Selected stories</span><span>{flyout?.toUpperCase() ?? ''}</span></div>
              <div className={styles.flyoutCards}>
                {flyoutData.cards.map((card, index) => (
                  <Link href={card.href} onClick={closeFlyout} className={`${styles.flyoutCard} ${styles[`tone_${card.tone}`]}`} key={card.title}>
                    <span>{card.kicker}</span>
                    <div className={styles.cardMark}>{index === 2 ? 'O' : 'OR'}</div>
                    <div><strong>{card.title}</strong><small>Discover →</small></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <div id="oriel-main-menu" className={`${styles.mega} ${open ? styles.megaOpen : ''}`} aria-hidden={!open}>
        <div className={styles.megaTop}><span>ORIEL / MENU</span><button onClick={() => setOpen(false)}>Close ×</button></div>
        <div className={styles.megaGrid}>
          <div className={styles.megaPrimary}>{navItems.map((n, i) => <Link onMouseEnter={() => setHovered(n.label)} onFocus={() => setHovered(n.label)} onClick={() => setOpen(false)} key={n.label} href={n.href}><span>0{i + 1}</span>{n.label}<i>↗</i></Link>)}</div>
          <div className={styles.megaMeta}><p>THE HOUSE</p><Link href="/maison" onClick={() => setOpen(false)}>Savoir-faire</Link><Link href="/editorial" onClick={() => setOpen(false)}>Journal</Link><Link href="/maison#appointments" onClick={() => setOpen(false)}>Private appointments</Link><p className={styles.megaSeason}>AUTUMN / WINTER 2026<br />CHAPTER III</p></div>
          <div className={`${styles.megaVisual} ${styles[`tone_${visual.tone}`]}`} key={hovered}><span>{visual.eyebrow}</span><strong>{visual.title}</strong><small>Campaign media preview · Gemini slot</small><div className={styles.visualIndex}>{String(navItems.findIndex((n) => n.label === hovered) + 1).padStart(2, '0')} / {String(navItems.length).padStart(2, '0')}</div></div>
        </div>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
