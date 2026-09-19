import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { RouteCurtain } from '@/components/RouteCurtain';
import { ScrollProgress } from '@/components/ScrollProgress';
export const metadata:Metadata={title:{default:'ORIEL — Maison Paris',template:'%s — ORIEL'},description:'An independent maison of clothing, objects and enduring craft.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Preloader/><RouteCurtain/><ScrollProgress/><SmoothScroll/><CustomCursor/><Header/>{children}<Footer/></body></html>}
