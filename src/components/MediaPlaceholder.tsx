'use client';
import { EditorialMedia } from './EditorialMedia';
import { media } from '@/content/media';
import styles from './media-placeholder.module.css';

type Props = {
  label: string;
  tone?: 'warm'|'ink'|'stone'|'forest'|'wine';
  className?: string;
  video?: boolean;
};

function resolveImage(label:string,tone:string){
  const l=label.toLowerCase();
  if(l.includes('atelier')||l.includes('craft')||l.includes('stitch')) return media.images.atelierDetail;
  if(l.includes('women')||l.includes('dress')) return media.images.womenModern;
  if(l.includes('men')||l.includes('blazer')||l.includes('coat')) return media.images.menModern;
  if(l.includes('leather')||l.includes('object')||l.includes('bag')) return media.images.objectsStill;
  if(l.includes('scarf')||l.includes('silk')) return media.images.scarf;
  if(l.includes('provence')||l.includes('escape')||l.includes('field')) return media.images.escape;
  if(l.includes('portrait')||l.includes('maison')||l.includes('house')) return media.images.houseHero;
  if(l.includes('campaign')||l.includes('look')||l.includes('collection')) return media.images.campaignDuo;
  return tone==='ink'?media.images.menModern:tone==='stone'?media.images.womenModern:tone==='forest'?media.images.escape:tone==='wine'?media.images.campaignDuo:media.images.houseLifestyle;
}

function resolveVideo(label:string,tone:string){
  const l=label.toLowerCase();
  if(l.includes('atelier')||l.includes('craft')||l.includes('stitch')) return media.videos.atelier;
  if(l.includes('women')) return media.videos.women;
  if(l.includes('men')) return media.videos.men;
  if(l.includes('leather')||l.includes('object')||l.includes('bag')) return media.videos.leather;
  if(l.includes('scarf')||l.includes('silk')) return media.videos.scarf;
  if(l.includes('campaign')||l.includes('collection')||l.includes('film')) return media.videos.duo;
  return tone==='warm'?media.videos.atelier:tone==='stone'?media.videos.women:tone==='ink'?media.videos.men:tone==='wine'?media.videos.duo:media.videos.house;
}

export function MediaPlaceholder({label,tone='warm',className='',video=false}:Props){
  const poster=resolveImage(label,tone);
  return <div className={`${styles.media} ${styles[tone]} ${className}`} data-media-slot>
    {video
      ? <EditorialMedia type="video" src={resolveVideo(label,tone)} poster={poster} alt={label} loop/>
      : <EditorialMedia src={poster} alt={label}/>
    }
    <div className={styles.grain}/>
  </div>;
}
