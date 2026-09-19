'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { EditorialMedia } from './EditorialMedia';
import { media } from '@/content/media';
import { products } from '@/content/site';
import styles from './product.module.css';

function supportMedia(slug:string){
  const map:Record<string,string[]>={
    'burgundy-silk-dress':[media.images.womenClassic,media.images.womenModern,media.images.campaignDuo],
    'espresso-structured-bag':[media.images.leatherEditorial,media.images.objectsStill,media.images.structuredBagAlt2],
    'forest-cashmere-polo':[media.images.menEstate,media.images.menModern,media.images.escape],
    'espresso-leather-loafer':[media.images.menEstate,media.images.menModern,media.images.objectsStill],
    'navy-wool-coat':[media.images.womenClassic,media.images.womenModern,media.images.campaignDuo],
    'ivory-burgundy-silk-scarf':[media.images.objectsStill,media.images.houseLifestyle,media.images.womenModern],
    'charcoal-wool-trousers':[media.images.menEstate,media.images.menModern,media.images.campaignDuo],
    'ivory-draped-silk-blouse':[media.images.womenModern,media.images.womenClassic,media.images.houseLifestyle],
  };
  return map[slug]??[media.images.campaignDuo,media.images.houseLifestyle,media.images.objectsStill];
}

export function ProductExperience({slug}:{slug:string}){
 const p=products.find(x=>x.slug===slug)??products[0];
 const sizes=useMemo(()=>p.category==='Accessories'?['One Size']:p.category==='Footwear'?['39','40','41','42','43','44']:['34','36','38','40','42','44'],[p.category]);
 const [size,setSize]=useState(sizes[2]??sizes[0]); const [open,setOpen]=useState<string|null>('Description'); const [added,setAdded]=useState(false);
 const support=supportMedia(p.slug);
 const film=p.category==='Accessories'?(p.slug.includes('scarf')?media.videos.scarf:media.videos.leather):(p.gender==='men'?media.videos.men:media.videos.women);
 return <main className={styles.page}>
  <div className={styles.crumbs}><Link href="/collection">Collection</Link><span>/</span><Link href={`/collection?category=${encodeURIComponent(p.category)}`}>{p.category}</Link><span>/</span><b>{p.name}</b></div>
  <section className={styles.product}>
   <div className={styles.gallery}>
    <div className={styles.media}><EditorialMedia src={p.image} alt={`${p.name} front`} objectPosition="center top"/><span className={styles.zoom}>＋ VIEW DETAIL</span></div>
    <div className={styles.media}><EditorialMedia src={p.altImage} alt={`${p.name} second view`} objectPosition="center top"/><span className={styles.zoom}>＋ VIEW DETAIL</span></div>
    <div className={styles.media}><EditorialMedia src={support[0]} alt={`${p.name} campaign context`}/><span className={styles.zoom}>＋ VIEW DETAIL</span></div>
    <div className={styles.media}><EditorialMedia src={support[1]} alt={`${p.name} material context`}/><span className={styles.zoom}>＋ VIEW DETAIL</span></div>
    <div className={styles.media}><EditorialMedia src={support[2]} alt={`${p.name} editorial context`}/><span className={styles.zoom}>＋ VIEW DETAIL</span></div>
    <div className={`${styles.media} ${styles.video}`}><EditorialMedia type="video" src={film} poster={p.altImage} alt={`${p.name} film`} loop={false}/><span className={styles.zoom}>FILM · 08 SEC</span></div>
   </div>
   <aside className={styles.info}><div className={styles.infoInner}><span className={styles.season}>FALL / WINTER 2026</span><h1>{p.name}</h1><div className={styles.price}>{p.price}<small>Includes duties · Ref. OR-26-{p.slug.slice(0,3).toUpperCase()}</small></div><div className={styles.rule}/>
    <div className={styles.option}><label>COLOUR <b>{p.color}</b></label><div className={styles.swatches}><button className={styles.selected}/><button/><button/></div></div>
    <div className={styles.option}><label>SIZE <a>Size guide</a></label><div className={styles.sizes}>{sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={size===s?styles.sizeActive:''}>{s}</button>)}</div></div>
    <button onClick={()=>setAdded(true)} className={`${styles.add} ${added?styles.added:''}`}>{added?'ADDED TO BAG ✓':'ADD TO BAG'}</button>
    <button className={styles.fitting}>Book a fitting at the atelier →</button>
    <div className={styles.miniLinks}><button>Add to wishlist ♡</button><button>Share ↗</button></div>
    <div className={styles.accordions}>{['Description','Composition & care','Fit & measurements','Shipping & returns','The atelier'].map(a=><div key={a}><button onClick={()=>setOpen(open===a?null:a)}><span>{a}</span><i>{open===a?'−':'+'}</i></button><div className={`${styles.answer} ${open===a?styles.answerOpen:''}`}><p>Cut and finished in Paris in a short run. Designed to soften with wear while keeping the original line. Every detail can be serviced at the atelier for the life of the piece.</p></div></div>)}</div>
   </div></aside>
  </section>
  <section className={styles.craft}><div className={styles.craftText}><span>SAVOIR-FAIRE</span><h2>Eleven days,<br/><em>nine pairs of hands.</em></h2><p>Materials are rested, marked and handled slowly. What looks simple at distance is resolved in millimetres at the table.</p><Link href="/maison">How ORIEL is made →</Link></div><div className={styles.craftMedia}><EditorialMedia src={media.images.atelierDetail} alt="ORIEL hand finishing"/></div></section>
  <section className={styles.look}><span>STYLED WITH</span><h2>Complete the look.</h2><div className={styles.related}>{products.filter(r=>r.slug!==p.slug).slice(0,4).map((r)=><Link key={r.slug} href={`/product/${r.slug}`}><div><EditorialMedia src={r.image} alt={r.name} objectPosition="center top"/></div><h3>{r.name}</h3><p>{r.material}</p><b>{r.price}</b></Link>)}</div></section>
  <section className={styles.services}><div><b>Lifetime alterations</b><p>Any ORIEL garment, refitted at the atelier for as long as you own it.</p></div><div><b>Named mills</b><p>Every cloth traceable to the mill and the year it was woven.</p></div><div><b>Private appointment</b><p>Rue Taitbout, Tuesday to Saturday, one client at a time.</p></div></section>
 </main>
}
