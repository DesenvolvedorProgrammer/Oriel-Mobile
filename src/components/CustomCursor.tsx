'use client';
import { useEffect, useRef } from 'react';
import styles from './cursor.module.css';
export function CustomCursor(){
 const dot=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(matchMedia('(pointer:coarse)').matches)return;
  let x=0,y=0,tx=0,ty=0,raf=0;
  const move=(e:PointerEvent)=>{tx=e.clientX;ty=e.clientY};
  const tick=()=>{x+=(tx-x)*.18;y+=(ty-y)*.18;if(dot.current)dot.current.style.transform=`translate3d(${x}px,${y}px,0)`;raf=requestAnimationFrame(tick)};
  addEventListener('pointermove',move);raf=requestAnimationFrame(tick);
  const onOver=(e:Event)=>{const t=e.target as HTMLElement;if(t.closest('a,button,[data-cursor]'))dot.current?.classList.add(styles.active)};
  const onOut=()=>dot.current?.classList.remove(styles.active);
  addEventListener('mouseover',onOver);addEventListener('mouseout',onOut);
  return()=>{removeEventListener('pointermove',move);removeEventListener('mouseover',onOver);removeEventListener('mouseout',onOut);cancelAnimationFrame(raf)}
 },[]);
 return <div ref={dot} className={styles.cursor}><span/></div>
}
