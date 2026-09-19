'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap, Flip } from '@/lib/gsap';
import { products } from '@/content/site';
import { media } from '@/content/media';
import { EditorialMedia } from './EditorialMedia';
import styles from './collection.module.css';

const filters=['All','Dresses','Outerwear','Tailoring','Knitwear','Accessories','Footwear','Tops'];
export function CollectionExperience(){
 const [filter,setFilter]=useState('All'); const [dense,setDense]=useState(3); const grid=useRef<HTMLDivElement>(null);
 const visible=useMemo(()=>filter==='All'?products:products.filter(p=>p.category===filter),[filter]);
 const change=(f:string)=>{if(!grid.current)return setFilter(f);const state=Flip.getState(grid.current.children);setFilter(f);requestAnimationFrame(()=>Flip.from(state,{duration:.7,ease:'power3.inOut',absolute:true,stagger:.03}))};
 useEffect(()=>{gsap.from('[data-collection-title] span',{yPercent:115,duration:1.1,stagger:.08,ease:'power4.out'});},[]);
 return <main className={styles.page}>
  <section className={styles.hero}><EditorialMedia type="video" src={media.videos.duo} poster={media.images.campaignDuo} alt="ORIEL Chapter III collection film" loop={false}/><div className={styles.heroShade}/><div className={styles.heroCopy}><span>CHAPTER III · FALL / WINTER 2026</span><h1 data-collection-title><i><span>Sézanne</span></i><i><span>Collection</span></i></h1><p>Four mornings on rue de Provence. Eight new pieces cut to move between cold streets and warm rooms.</p></div></section>
  <section className={styles.note}><span>THE COLLECTION NOTE</span><blockquote>“Clothes should not announce themselves before the person wearing them enters the room.”</blockquote><small>NOOR HALABI · CREATIVE DIRECTOR</small></section>
  <section className={styles.film}><div className={styles.filmMedia}><EditorialMedia type="video" src={media.videos.women} poster={media.images.womenClassic} alt="ORIEL womenswear film" loop={false}/></div><div><span>THE FILM</span><h2>Four mornings<br/><em>on rue de Provence</em></h2><Link href="/editorial">Watch the campaign →</Link></div></section>
  <div className={styles.controls}><div className={styles.filters}>{filters.map(f=><button className={filter===f?styles.active:''} onClick={()=>change(f)} key={f}>{f}{f==='All'?` · ${products.length}`:''}</button>)}</div><div className={styles.view}>GRID <button onClick={()=>setDense(2)} className={dense===2?styles.active:''}>2</button><button onClick={()=>setDense(3)} className={dense===3?styles.active:''}>3</button><button onClick={()=>setDense(4)} className={dense===4?styles.active:''}>4</button></div></div>
  <section ref={grid} className={styles.grid} style={{'--cols':dense} as React.CSSProperties}>{visible.map((p)=><Link href={`/product/${p.slug}`} key={p.slug} className={styles.card}><div className={styles.cardMedia}><EditorialMedia src={p.image} alt={p.name} objectPosition="center top"/><div className={styles.hover}><EditorialMedia src={p.altImage} alt={`${p.name} second view`} objectPosition="center top"/></div></div><div className={styles.meta}><h3>{p.name}</h3><span>{p.material}</span><b>{p.price}</b></div></Link>)}</section>
  <section className={styles.editorialBreak}><EditorialMedia src={media.images.campaignDuo} alt="ORIEL Chapter III editorial"/><div><span>CHAPTER III</span><h2>Autumn light,<br/>worn without noise.</h2><Link href="/editorial">Read the story →</Link></div></section>
  <section className={styles.next}><span>NEXT CHAPTER</span><h2>Taitbout,<br/><em>Spring 2027</em></h2><Link href="/editorial">Preview the chapter →</Link></section>
 </main>
}
