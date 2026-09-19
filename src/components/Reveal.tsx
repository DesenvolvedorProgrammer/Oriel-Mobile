'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
export function Reveal({children,className=''}:PropsWithChildren<{className?:string}>){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!ref.current)return;const ctx=gsap.context(()=>{
  gsap.fromTo(ref.current,{y:42,opacity:0},{y:0,opacity:1,duration:1.05,ease:'power4.out',scrollTrigger:{trigger:ref.current,start:'top 88%',once:true}})
 },ref);return()=>ctx.revert()},[]);
 return <div ref={ref} className={className}>{children}</div>
}
export function MaskReveal({children,className=''}:PropsWithChildren<{className?:string}>){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!ref.current)return;const ctx=gsap.context(()=>{
  gsap.fromTo(ref.current,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:1.25,ease:'power4.inOut',scrollTrigger:{trigger:ref.current,start:'top 88%',once:true}})
 },ref);return()=>ctx.revert()},[]);
 return <div ref={ref} className={className}>{children}</div>
}
