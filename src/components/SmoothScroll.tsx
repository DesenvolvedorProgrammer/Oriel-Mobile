'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/gsap';
export function SmoothScroll(){
  useEffect(()=>{
    const nativeTouch = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
    if(nativeTouch){
      requestAnimationFrame(()=>ScrollTrigger.refresh());
      return;
    }
    const lenis = new Lenis({duration:1.15,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1.1});
    let raf=0;
    const frame=(t:number)=>{lenis.raf(t);raf=requestAnimationFrame(frame)};
    lenis.on('scroll',()=>ScrollTrigger.update());
    raf=requestAnimationFrame(frame);
    const onLoad=()=>ScrollTrigger.refresh();
    window.addEventListener('load',onLoad);
    requestAnimationFrame(()=>ScrollTrigger.refresh());
    return()=>{window.removeEventListener('load',onLoad);cancelAnimationFrame(raf);lenis.destroy()};
  },[]);
  return null;
}
