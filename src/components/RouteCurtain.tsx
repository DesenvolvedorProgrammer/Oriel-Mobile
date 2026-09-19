'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import styles from './route-curtain.module.css';
export function RouteCurtain(){
 const panel=useRef<HTMLDivElement>(null);const router=useRouter();const pathname=usePathname();
 useEffect(()=>{if(!panel.current)return;gsap.set(panel.current,{yPercent:100});},[pathname]);
 useEffect(()=>{
  const click=(e:MouseEvent)=>{if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=(e.target as HTMLElement).closest('a') as HTMLAnchorElement|null;if(!a||!a.href)return;if(a.target==='_blank'||a.hasAttribute('download'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.pathname===location.pathname)return;e.preventDefault();if(!panel.current){router.push(url.pathname+url.search);return}gsap.timeline().set(panel.current,{yPercent:100}).to(panel.current,{yPercent:0,duration:.55,ease:'power4.inOut'}).add(()=>router.push(url.pathname+url.search)).to(panel.current,{yPercent:-100,duration:.7,ease:'power4.inOut',delay:.18});};
  document.addEventListener('click',click);return()=>document.removeEventListener('click',click);
 },[router]);
 return <div ref={panel} className={styles.curtain} aria-hidden="true"><span>ORIEL</span></div>
}
