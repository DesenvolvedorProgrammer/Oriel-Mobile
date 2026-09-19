'use client';

import { useEffect, useRef } from 'react';
import styles from './editorial-media.module.css';

type BaseProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
  objectPosition?: string;
};

type ImageProps = BaseProps & {
  type?: 'image';
  src: string;
};

type VideoProps = BaseProps & {
  type: 'video';
  src: string;
  poster?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  paused?: boolean;
};

export function EditorialMedia(props: ImageProps | VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = props.type === 'video';
  const src=props.src;
  const paused=isVideo ? props.paused ?? false : false;
  const autoPlay=isVideo ? props.autoPlay ?? true : false;

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    if (paused) {
      video.pause();
      return;
    }
    if (!autoPlay) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.12, rootMargin: '180px 0px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo, src, paused, autoPlay]);

  if (isVideo) {
    return (
      <div className={`${styles.frame} ${props.className ?? ''}`}>
        <video
          ref={videoRef}
          className={styles.media}
          src={props.src}
          poster={props.poster}
          muted={props.muted ?? true}
          loop={props.loop ?? true}
          playsInline
          preload={props.priority ? 'auto' : 'metadata'}
          aria-label={props.alt || 'ORIEL campaign film'}
          style={{ objectPosition: props.objectPosition ?? 'center' }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.frame} ${props.className ?? ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.media}
        src={props.src}
        alt={props.alt ?? ''}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: props.objectPosition ?? 'center' }}
      />
    </div>
  );
}
