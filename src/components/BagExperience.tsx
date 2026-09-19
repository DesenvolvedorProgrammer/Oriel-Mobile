'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { EditorialMedia } from './EditorialMedia';
import { products } from '@/content/site';
import styles from './bag.module.css';

type Row={slug:string;size:string;qty:number};
export function BagExperience(){
 const [rows,setRows]=useState<Row[]>([{slug:'navy-wool-coat',size:'38',qty:1},{slug:'forest-cashmere-polo',size:'40',qty:1},{slug:'ivory-burgundy-silk-scarf',size:'One Size',qty:1}]);
 const items=useMemo(()=>rows.map(r=>({r,p:products.find(p=>p.slug===r.slug)!})).filter(x=>x.p),[rows]);
 const remove=(slug:string)=>setRows(x=>x.filter(r=>r.slug!==slug));
 const total=items.reduce((sum,{p})=>sum+Number(p.price.replace(/[^0-9]/g,'')),0);
 const totalLabel=`€ ${total.toLocaleString('en-US')}`;
 return <main className={styles.page}>
  <div className={styles.top}><Link href="/collection">← CONTINUE SHOPPING</Link><span>SECURE PAYMENT · COMPLIMENTARY SHIPPING AND RETURNS</span><span>EN · FRANCE</span></div>
  <section className={styles.header}><span>YOUR BAG</span><h1>{rows.length} pieces,<br/><em>reserved for 60 minutes.</em></h1></section>
  <section className={styles.grid}>
   <div className={styles.items}>{items.map(({r,p},i)=><article key={p.slug}><div className={styles.thumb}><EditorialMedia src={p.image} alt={p.name} objectPosition="center top"/></div><div className={styles.itemInfo}><Link href={`/product/${p.slug}`}><h2>{p.name}</h2></Link><p>{p.material}</p><small>Size {r.size} · Ref. OR-26-{String(41-i*11).padStart(3,'0')}</small><div className={styles.actions}><button onClick={()=>remove(p.slug)}>Remove</button><button>Move to wishlist</button></div>{i===0&&<span className={styles.note}>Includes lifetime alterations</span>}{i===2&&<span className={styles.note}>Last piece in this colour</span>}</div><b>{p.price}</b></article>)}
    <div className={styles.gift}><div><span>COMPLIMENTARY</span><h3>Gift wrapping</h3><p>Kraft box, cotton ribbon and a handwritten card from the atelier.</p></div><button>Add wrapping →</button></div>
    <div className={styles.call}><span>BEFORE YOU ORDER</span><h3>Unsure of your size?</h3><p>A tailor will call you and take three measurements over video.</p><button>Request a call →</button></div>
   </div>
   <aside className={styles.summary}><div><span>SUMMARY</span><dl><div><dt>Subtotal</dt><dd>{totalLabel}</dd></div><div><dt>Shipping · DHL Express</dt><dd>Included</dd></div><div><dt>Duties and taxes</dt><dd>Included</dd></div><div><dt>Estimated delivery</dt><dd>19 — 22 Sep</dd></div></dl><div className={styles.total}><span>Total</span><b>{totalLabel}</b></div><button className={styles.checkout}>PROCEED TO CHECKOUT</button><button className={styles.installments}>Pay in three instalments →</button><ul><li>Free returns within 30 days</li><li>Alterations included, for life</li><li>Packed by hand at the atelier</li></ul><div className={styles.code}><input placeholder="PROMOTIONAL CODE"/><button>Apply</button></div></div></aside>
  </section>
  <section className={styles.selected}><span>SELECTED FOR YOU</span><h2>To finish the wardrobe.</h2><div>{products.slice(3,7).map((p)=><Link href={`/product/${p.slug}`} key={p.slug}><div><EditorialMedia src={p.image} alt={p.name} objectPosition="center top"/></div><h3>{p.name}</h3><p>{p.price}</p></Link>)}</div></section>
 </main>
}
