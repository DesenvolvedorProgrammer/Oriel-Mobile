'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EditorialMedia } from './EditorialMedia';
import { media } from '@/content/media';
import styles from './campaign-deck.module.css';

const DURATION=6400;
const slides = [
  {
    key:'oriel', eyebrow:'A CASA', title:'ORIEL', subtitle:'Chapter III · Autumn / Winter 2026', cta:'Enter the collection', href:'/collection', tone:'forest' as const,
    video:media.videos.house, poster:media.images.houseHero, objectPosition:'center 42%'
  },
  {
    key:'atelier', eyebrow:'ATELIER', title:'Cut by hand.', subtitle:'Nine pairs of hands. Eleven days. One final press.', cta:'Inside the atelier', href:'/maison', tone:'warm' as const,
    video:media.videos.atelier, poster:media.images.atelierMaster, objectPosition:'center'
  },
  {
    key:'women', eyebrow:'WOMEN', title:'Quiet structure.', subtitle:'Soft tailoring, disciplined line, movement without noise.', cta:'Discover women', href:'/collection?gender=women', tone:'stone' as const,
    video:media.videos.women, poster:media.images.womenClassic, objectPosition:'center'
  },
  {
    key:'men', eyebrow:'MEN', title:'Built to remain.', subtitle:'Coats, knitwear and leather designed beyond a single season.', cta:'Discover men', href:'/collection?gender=men', tone:'ink' as const,
    video:media.videos.men, poster:media.images.menEstate, objectPosition:'center'
  },
];

export function CampaignDeck(){
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const [cycle,setCycle]=useState(0);
  const [introReady,setIntroReady]=useState(false);
  const active=slides[index];

  useEffect(()=>{
    const onReady=()=>setIntroReady(true);
    if(document.documentElement.dataset.orielIntro==='done') setIntroReady(true);
    window.addEventListener('oriel:intro-complete',onReady);
    // Fail-safe: the campaign must never remain frozen if the intro is interrupted.
    const fallback=window.setTimeout(()=>setIntroReady(true),8500);
    return()=>{
      window.removeEventListener('oriel:intro-complete',onReady);
      window.clearTimeout(fallback);
    };
  },[]);

  useEffect(()=>{
    if(paused || !introReady) return;
    const id=window.setTimeout(()=>{
      setIndex(i=>(i+1)%slides.length);
      setCycle(c=>c+1);
    },DURATION);
    return()=>window.clearTimeout(id);
  },[index,paused,cycle,introReady]);

  function choose(i:number){
    setIndex(i);
    setCycle(c=>c+1);
  }

  return <section className={styles.stage} aria-label="Featured campaigns" data-chapter="Campaign">
    <div className={styles.backdrop} key={`back-${active.key}-${cycle}`}>
      <EditorialMedia src={active.poster} alt="" priority objectPosition={active.objectPosition}/>
    </div>
    <div className={styles.backdropShade}/>

    <div className={styles.cardWrap}>
      <div className={styles.card} key={`${active.key}-${cycle}`}>
        <EditorialMedia type="video" src={active.video} poster={active.poster} alt={`${active.eyebrow} campaign film`} priority loop paused={paused||!introReady} objectPosition={active.objectPosition}/>
        <div className={styles.cardShade}/>
        <div className={styles.copy}>
          <span>{active.eyebrow}</span>
          <h1>{active.title}</h1>
          <p>{active.subtitle}</p>
          <Link href={active.href}>{active.cta}</Link>
        </div>
      </div>

      <div className={styles.selector} role="tablist" aria-label="Campaign chapters">
        {slides.map((s,i)=><button key={s.key} onClick={()=>choose(i)} className={i===index?styles.active:''} role="tab" aria-selected={i===index}>
          <i data-tone={s.tone}/><span>{s.eyebrow}</span>
        </button>)}
      </div>
    </div>

    <div className={styles.timeline}>
      <span>{String(index+1).padStart(2,'0')}</span>
      <div className={styles.line}><i key={`${index}-${cycle}`} className={(paused||!introReady)?styles.progressPaused:styles.progress}/></div>
      <span>{String(slides.length).padStart(2,'0')}</span>
      <button onClick={()=>setPaused(p=>!p)} aria-label={paused?'Resume campaign':'Pause campaign'}>{paused?'▶':'Ⅱ'}</button>
    </div>
  </section>
}
