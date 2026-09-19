'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from './footer.module.css';

export function Footer(){
 const [sent,setSent]=useState(false);
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setSent(true)};
 return <footer className={styles.footer}>
  <section className={styles.news}>
   <div><span>THE CIRCLE</span><h2>{sent?'Welcome to the house.':'Letters from the maison.'}</h2><p>{sent?'Your first letter will arrive with the next chapter.':'Private notes on collections, ateliers, places and the people around them.'}</p></div>
   <form onSubmit={submit} className={sent?styles.formSent:''}><input aria-label="Email" type="email" required placeholder="YOUR EMAIL ADDRESS" disabled={sent}/><button type="submit" disabled={sent}>{sent?'Subscribed ✓':'Subscribe →'}</button></form>
  </section>
  <div className={styles.columns}>
   <div><b>Shop</b><Link href="/collection">New Arrivals</Link><Link href="/collection?gender=women">Womenswear</Link><Link href="/collection?gender=men">Menswear</Link><Link href="/collection?category=accessories">Accessories</Link></div>
   <div><b>Maison</b><Link href="/maison">Manifesto</Link><Link href="/maison#savoir-faire">Savoir-faire</Link><Link href="/maison#materials">Our mills</Link><Link href="/maison">Sustainability</Link></div>
   <div><b>Client Services</b><Link href="/maison#appointments">Private appointments</Link><a href="#shipping">Shipping</a><a href="#returns">Returns</a><a href="mailto:concierge@oriel.example">Contact concierge</a></div>
   <div><b>Follow</b><a href="#instagram">Instagram</a><a href="#vimeo">Vimeo</a><a href="#pinterest">Pinterest</a></div>
  </div>
  <div className={styles.footerUtility}><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button><span>Paris · By appointment</span></div>
  <div className={styles.wordmark}>ORIEL</div>
  <div className={styles.base}><span>© 2026 ORIEL</span><span>EUR € · France</span><span>Privacy · Terms · Cookies</span></div>
 </footer>
}
