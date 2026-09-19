'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { products } from '@/content/site';
import styles from './search-overlay.module.css';

type Props = { open: boolean; onClose: () => void };

const suggestions = ['Coats', 'Tailoring', 'Leather', 'Cashmere', 'Chapter III'];

export function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s
      ? products.filter((p) => `${p.name} ${p.material} ${p.category}`.toLowerCase().includes(s)).slice(0, 8)
      : products.slice(0, 4);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 240);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Search ORIEL">
      <div className={styles.top}>
        <span>ORIEL / SEARCH</span>
        <span className={styles.hint}>Press ESC to close</span>
      </div>

      <button className={styles.closeButton} onClick={onClose} aria-label="Close search">
        <span>Close</span><i aria-hidden="true" />
      </button>

      <div className={styles.inner}>
        <label htmlFor="oriel-search">What are you looking for?</label>
        <div className={styles.inputWrap}>
          <input
            id="oriel-search"
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the house"
            autoComplete="off"
          />
          {q && <button className={styles.clear} onClick={() => { setQ(''); inputRef.current?.focus(); }}>Clear</button>}
        </div>
        <div className={styles.rule} />

        <div className={styles.suggestions} aria-label="Suggested searches">
          <span>Popular</span>
          <div>{suggestions.map((s) => <button key={s} onClick={() => setQ(s)}>{s}</button>)}</div>
        </div>

        <div className={styles.meta}>
          <span>{q ? `${results.length} results for “${q}”` : 'Selected from the house'}</span>
          <span>{q ? 'Refine your search' : 'Autumn / Winter 2026'}</span>
        </div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((p, i) => (
              <Link href={`/product/${p.slug}`} key={p.slug} onClick={onClose} className={styles.result}>
                <div className={styles.preview} data-tone={i % 4}><span>OR</span><small>View piece ↗</small></div>
                <span>{p.category}</span><h3>{p.name}</h3><small>{p.price}</small>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span>NO RESULTS</span>
            <h3>Nothing under that name.</h3>
            <p>Try a material, category or piece from the current chapter.</p>
            <button onClick={() => { setQ(''); inputRef.current?.focus(); }}>Reset search</button>
          </div>
        )}
      </div>
    </div>
  );
}
