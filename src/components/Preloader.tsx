'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { media } from '@/content/media';
import styles from './preloader.module.css';

export function Preloader(){
  const pathname=usePathname();
  const videoRef=useRef<HTMLVideoElement>(null);
  const finishingRef=useRef(false);
  const playedThisLoadRef=useRef(false);
  const [show,setShow]=useState(false);
  const [leaving,setLeaving]=useState(false);
  const [soundBlocked,setSoundBlocked]=useState(false);

  useEffect(()=>{
    if(pathname!=='/'){
      document.documentElement.dataset.orielIntro='done';
      window.dispatchEvent(new Event('oriel:intro-complete'));
      setShow(false);
      document.body.style.overflow='';
      return;
    }

    // Show once on each real page load, but never again during client-side navigation.
    if(playedThisLoadRef.current) return;
    playedThisLoadRef.current=true;
    finishingRef.current=false;
    delete document.documentElement.dataset.orielIntro;
    setLeaving(false);
    setShow(true);
    document.body.style.overflow='hidden';

    const safety=window.setTimeout(()=>finish(),8200);
    return()=>{
      window.clearTimeout(safety);
      document.body.style.overflow='';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname]);

  useEffect(()=>{
    if(!show||!videoRef.current)return;
    const video=videoRef.current;
    video.currentTime=0;
    video.volume=.12;
    video.muted=false;
    void video.play().catch(()=>{
      video.muted=true;
      setSoundBlocked(true);
      void video.play().catch(()=>undefined);
    });
  },[show]);

  function finish(){
    if(finishingRef.current)return;
    finishingRef.current=true;
    document.documentElement.dataset.orielIntro='done';
    window.dispatchEvent(new Event('oriel:intro-complete'));
    setLeaving(true);
    window.setTimeout(()=>{
      setShow(false);
      document.body.style.overflow='';
    },850);
  }

  function enableSound(){
    const video=videoRef.current;
    if(!video)return;
    video.muted=false;
    video.volume=.12;
    setSoundBlocked(false);
    void video.play().catch(()=>undefined);
  }

  if(!show)return null;

  return <div className={`${styles.preloader} ${leaving?styles.done:''}`} onPointerDown={soundBlocked?enableSound:undefined}>
    <video ref={videoRef} className={styles.video} src={media.videos.intro} playsInline preload="auto" onEnded={finish}/>
    <div className={styles.vignette}/>
    {soundBlocked&&<button className={styles.sound} onClick={enableSound} aria-label="Enable intro sound"><span>Sound</span><i>◌</i></button>}
    <button className={styles.skip} onClick={finish}>Skip</button>
  </div>
}
