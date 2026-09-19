'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { CampaignDeck } from './CampaignDeck';
import { EditorialMedia } from './EditorialMedia';
import { MaskReveal, Reveal } from './Reveal';
import { products, journal } from '@/content/site';
import { media } from '@/content/media';
import styles from './home.module.css';

export function HomeExperience(){
 const root=useRef<HTMLElement>(null); const horizontal=useRef<HTMLDivElement>(null); const [chapter,setChapter]=useState(0);
 const chapters=['Campaign','Manifesto','Chapter III','Worlds','Wardrobe','Categories','Atelier','Arrivals','Savoir-faire','Stories','Journal'];
 useEffect(()=>{
   if(!root.current)return;
   const mm=gsap.matchMedia();
   const ctx=gsap.context(()=>{
     // Desktop keeps the cinematic pinned wardrobe. On touch/mobile the same
     // content becomes a native horizontal, scroll-snap gallery: faster,
     // predictable and much easier to control with a thumb.
     mm.add('(min-width: 761px)',()=>{
       if(horizontal.current){
         const track=horizontal.current;
         const wrap=root.current?.querySelector<HTMLElement>('[data-horizontal-wrap]');
         if(wrap){
           const travel=()=>Math.max(0,track.scrollWidth-window.innerWidth+window.innerWidth*.10);
           gsap.set(track,{x:0});
           gsap.to(track,{
             x:()=>-travel(),
             ease:'none',
             scrollTrigger:{
               trigger:wrap,
               start:'top top',
               end:()=>`+=${Math.max(window.innerHeight*1.6,travel()*1.12)}`,
               pin:true,
               pinSpacing:true,
               scrub:.75,
               anticipatePin:1,
               invalidateOnRefresh:true
             }
           });
         }
       }
       gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el=>gsap.fromTo(el,{yPercent:-5},{yPercent:8,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}}));
     });

     mm.add('(max-width: 760px)',()=>{
       if(horizontal.current) gsap.set(horizontal.current,{clearProps:'transform'});
     });

     gsap.utils.toArray<HTMLElement>('[data-product-card]').forEach((el,i)=>gsap.fromTo(el,{y:28,opacity:0},{y:0,opacity:1,duration:.8,delay:(i%2)*.05,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
   },root);

   const refresh=()=>ScrollTrigger.refresh();
   const ro=typeof ResizeObserver!=='undefined'&&horizontal.current?new ResizeObserver(refresh):null;
   if(ro&&horizontal.current)ro.observe(horizontal.current);
   window.addEventListener('load',refresh);
   window.addEventListener('resize',refresh);
   const id=window.setTimeout(refresh,250);
   requestAnimationFrame(refresh);

   return()=>{
     window.clearTimeout(id);
     window.removeEventListener('load',refresh);
     window.removeEventListener('resize',refresh);
     ro?.disconnect();
     mm.revert();
     ctx.revert();
   };
 },[]);
 useEffect(()=>{
   if(!root.current)return;
   const nodes=Array.from(root.current.querySelectorAll<HTMLElement>('[data-chapter]'));
   const observer=new IntersectionObserver((entries)=>{
     const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
     if(!visible)return;
     const idx=nodes.indexOf(visible.target as HTMLElement);
     if(idx>=0)setChapter(idx);
   },{rootMargin:'-36% 0px -48% 0px',threshold:[0,.1,.25,.5]});
   nodes.forEach(n=>observer.observe(n));
   return()=>observer.disconnect();
 },[]);
 return <main id="main-content" ref={root}>
   <CampaignDeck/>

   <section className={styles.manifesto} data-chapter="Manifesto">
    <Reveal><div className="eyebrow">I · THE MAISON</div><h2>We do not chase the season.<br/><em>We build the wardrobe that outlives it.</em></h2><p>Founded in 1994 in the ninth arrondissement, ORIEL works in short series from a single atelier. Every garment is cut by hand, fitted on the body, and finished by the same tailor who began it.</p><Link className="link-line" href="/maison">Read the manifesto</Link></Reveal>
   </section>

   <section className={styles.fullCampaign} data-chapter="Chapter III">
    <div className={styles.fullMedia} data-parallax><EditorialMedia type="video" src={media.videos.duo} poster={media.images.campaignDuo} alt="ORIEL Chapter III campaign film" loop={false}/></div><div className={styles.fullShade}/>
    <Reveal className={styles.campaignCopy}><span>II · CHAPTER III</span><h2>Sézanne,<br/><em>after dawn.</em></h2><p>Cut for cold streets, warm rooms and everything between.</p><Link href="/collection">Discover the chapter →</Link></Reveal>
   </section>

   <section className={styles.worlds} data-chapter="Worlds">
    <div className={styles.worldsHead}><span>III · ORIEL WORLDS</span><h2>One house.<br/><em>Several lives.</em></h2><p>Campaign, tailoring, objects and travel move through the same visual language — distinct chapters, one point of view.</p></div>
    <div className={styles.worldGrid}>
      <Link href="/collection?gender=women" className={styles.worldCard}><div className={styles.worldMedia}><EditorialMedia src={media.images.womenModern} alt="ORIEL womenswear campaign" objectPosition="center 32%"/></div><div className={styles.worldShade}/><span>01</span><h3>Women</h3><p>The line softens.</p><b>Discover →</b></Link>
      <Link href="/collection?gender=men" className={styles.worldCard}><div className={styles.worldMedia}><EditorialMedia src={media.images.menModern} alt="ORIEL menswear campaign"/></div><div className={styles.worldShade}/><span>02</span><h3>Men</h3><p>Structure without weight.</p><b>Discover →</b></Link>
      <Link href="/collection?category=Accessories" className={styles.worldCard}><div className={styles.worldMedia}><EditorialMedia type="video" src={media.videos.leather} poster={media.images.leatherEditorial} alt="ORIEL leather goods film" loop={false}/></div><div className={styles.worldShade}/><span>03</span><h3>Objects</h3><p>Leather, silk, metal.</p><b>Discover →</b></Link>
      <Link href="/editorial" className={styles.worldCard}><div className={styles.worldMedia}><EditorialMedia src={media.images.escape} alt="ORIEL Escape campaign"/></div><div className={styles.worldShade}/><span>04</span><h3>Escape</h3><p>Field notes from elsewhere.</p><b>Discover →</b></Link>
    </div>
   </section>

   <section className={styles.horizontalWrap} data-horizontal-wrap data-chapter="Wardrobe">
    <div className={styles.horizontalIntro}><div><span>III · THE WARDROBE</span><h2>Pieces in<br/>conversation.</h2></div><p>Move through a wardrobe of silk, cashmere, leather and flannel — quiet pieces designed to live together.</p></div>
    <div className={styles.horizontalTrack} ref={horizontal}>
      {products.slice(0,6).map((p,i)=><Link href={`/product/${p.slug}`} className={styles.look} key={p.slug} data-cursor><div className={styles.lookMedia}><EditorialMedia src={p.image} alt={p.name} objectPosition="center top"/></div><div className={styles.lookMeta}><span>0{i+1}</span><div><b>{p.name}</b><small>{p.material}</small></div></div></Link>)}
    </div>
   </section>

   <section className={styles.categories} data-chapter="Categories">
    <div className={styles.sectionHead}><span>IV · CATEGORIES</span><h2>The house,<br/><em>by category.</em></h2></div>
    <div className={styles.triptych}>
      <Link href="/collection?gender=women" className={styles.category}><EditorialMedia src={media.images.womenClassic} alt="Womenswear"/><div><strong>Womenswear</strong><span>Explore →</span></div></Link>
      <Link href="/collection?gender=men" className={styles.category}><EditorialMedia src={media.images.menEstate} alt="Menswear"/><div><strong>Menswear</strong><span>Explore →</span></div></Link>
      <Link href="/collection?category=Accessories" className={styles.category}><EditorialMedia type="video" src={media.videos.scarf} poster={media.images.scarf} alt="Accessories film" loop={false}/><div><strong>Accessories</strong><span>Explore →</span></div></Link>
    </div>
   </section>

   <section className={styles.splitCampaign} data-chapter="Atelier">
    <div className={styles.splitVisual}><EditorialMedia type="video" src={media.videos.atelier} poster={media.images.atelierMaster} alt="ORIEL atelier film" loop={false} objectPosition="center"/></div>
    <div className={styles.splitStory}>{[
      ['01','THE ROOM','A coat begins as a silence on kraft paper.'],['02','THE HAND','Nine pairs of hands, eleven days, one final press.'],['03','THE CITY','Rue Taitbout before the doors open.']
    ].map(([n,t,d])=><Reveal key={n} className={styles.storyBlock}><span>{n} / CAMPAIGN</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
   </section>

   <section className={styles.arrivals} data-chapter="Arrivals">
    <div className={styles.arrivalsHead}><div><span>V · NEW ARRIVALS</span><h2>Just arrived.</h2></div><Link className="link-line" href="/collection">View all 8</Link></div>
    <div className={styles.productGrid}>{products.map((p)=><div key={p.slug} data-product-card><Link href={`/product/${p.slug}`} className={styles.productCard}><div className={styles.productMedia}><EditorialMedia src={p.image} alt={`${p.name} front`} objectPosition="center top"/><div className={styles.productAlt}><EditorialMedia src={p.altImage} alt={`${p.name} second view`} objectPosition="center top"/></div>{p.badge&&<span className={styles.badge}>{p.badge}</span>}</div><h3>{p.name}</h3><p>{p.material}</p><b>{p.price}</b></Link></div>)}</div>
   </section>

   <section className={styles.savoir} data-chapter="Savoir-faire">
    <div className={styles.savoirMedia} data-parallax><EditorialMedia src={media.images.atelierDetail} alt="ORIEL hand tailoring detail"/></div><div className={styles.savoirShade}/><Reveal className={styles.savoirCopy}><span>VI · SAVOIR-FAIRE</span><h2>Eleven days.<br/>Nine pairs of hands.</h2><p>Craft is not nostalgia. It is the refusal to hurry what the body will remember.</p><Link href="/maison">Inside the atelier →</Link></Reveal>
   </section>

   <section className={styles.houseStories} data-chapter="Stories">
    <div className={styles.storyLead}><span>VII · STORIES</span><h2>What surrounds<br/><em>the clothes.</em></h2><p>Portraits, places, objects and rituals that give a wardrobe its memory.</p><Link href="/editorial">Enter the journal →</Link></div>
    <div className={styles.storyMosaic}>
      <div className={styles.storyTall}><EditorialMedia src={media.images.houseLifestyle} alt="ORIEL private weekend"/></div>
      <div className={styles.storySmall}><EditorialMedia src={media.images.escape} alt="ORIEL field note"/></div>
      <div className={styles.storyWide}><EditorialMedia src={media.images.objectsStill} alt="ORIEL object study"/></div>
    </div>
   </section>

   <section className={styles.journal} data-chapter="Journal"><div className={styles.journalHead}><span>VIII · JOURNAL</span><h2>Stories from<br/><em>the house.</em></h2></div><div className={styles.journalGrid}>{journal.map((j,i)=><Link href="/editorial" className={i===0?styles.journalLead:styles.journalCard} key={j.title}><MaskReveal className={styles.journalMedia}><EditorialMedia src={i===0?media.images.campaignDuo:i===1?media.images.houseHero:media.images.scarf} alt={j.title}/></MaskReveal><span>{j.kind} · {j.meta}</span><h3>{j.title}</h3></Link>)}</div></section>

   <section className={styles.marquee} aria-hidden="true"><div>ORIEL · PARIS · ORIEL · PARIS · ORIEL · PARIS · ORIEL · PARIS · </div></section>
   <aside className={styles.chapterRail} aria-label="Home chapters">
    <span>{String(chapter+1).padStart(2,'0')}</span>
    <div>{chapters.map((name,i)=><button key={name} className={i===chapter?styles.chapterActive:''} aria-label={`Go to ${name}`} title={name} onClick={()=>{const nodes=root.current?.querySelectorAll<HTMLElement>('[data-chapter]');nodes?.[i]?.scrollIntoView({behavior:'smooth',block:'start'})}}><i/><b>{name}</b></button>)}</div>
    <span>{String(chapters.length).padStart(2,'0')}</span>
   </aside>
 </main>
}
