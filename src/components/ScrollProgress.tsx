'use client';
import { useEffect, useRef } from 'react'; import styles from './scroll-progress.module.css';
export function ScrollProgress(){const bar=useRef<HTMLDivElement>(null);useEffect(()=>{const on=()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=max>0?scrollY/max:0;if(bar.current)bar.current.style.transform=`scaleX(${p})`};addEventListener('scroll',on,{passive:true});on();return()=>removeEventListener('scroll',on)},[]);return <div className={styles.track}><div ref={bar}/></div>}
