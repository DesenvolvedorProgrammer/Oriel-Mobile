import Link from 'next/link';
import { MediaPlaceholder } from './MediaPlaceholder';
import styles from './editorial.module.css';
export function EditorialExperience(){return <main className={styles.page}>
 <section className={styles.hero}><div className={styles.heroMeta}><span>JOURNAL</span><small>Issue 14 · September 2026 · Paris</small></div><h1>The house,<br/><em>in motion.</em></h1><div className={styles.cover}><MediaPlaceholder label="Journal cover · atelier" tone="ink"/></div></section>
 <section className={styles.lead}><div className={styles.leadMedia}><MediaPlaceholder label="Cover story · atelier" tone="warm"/></div><div className={styles.leadCopy}><span>COVER STORY · ATELIER</span><h2>The room where<br/>the coat was made.</h2><p>Three weeks inside the atelier on rue Taitbout, following a single camel overcoat from paper pattern to final press.</p><small>Words by Élise Mercier · Photography by Camille Ferrand</small><Link href="#">Read the story →</Link></div></section>
 <section className={styles.features}>{[
  ['Conversation','Noor Halabi on restraint','stone'],['Material','Waxed linen, six seasons on','forest'],['City guide','Nine addresses in the ninth','wine']
 ].map(([k,t,tone])=><article key={t}><div className={styles.featureMedia}><MediaPlaceholder label={k} tone={tone as any}/></div><span>{k}</span><h3>{t}</h3><p>The people, objects and addresses that shape the maison beyond the collection.</p></article>)}</section>
 <section className={styles.film}><MediaPlaceholder label="Film · Chapter III · 02:47" tone="ink" video/><div><span>FILM · CHAPTER III</span><h2>Four mornings<br/><em>on rue de Provence</em></h2><button>Watch · 02:47</button></div></section>
 <section className={styles.archive}><div><span>FROM THE ARCHIVE</span><h2>Issues 01 — 13</h2></div><div className={styles.archiveGrid}>{['A summer with no white','Thirty years of the same shears','The mill at Roubaix, in its own words'].map((x,i)=><article key={x}><span>ISSUE {13-i}</span><h3>{x}</h3><small>{['June','April','February'][i]} 2026</small></article>)}</div></section>
 <section className={styles.most}><span>MOST READ</span>{['How to wear an overcoat open','Why we rest cloth for 21 days','A tailor’s guide to the ninth','Horn, shell and the case against plastic'].map((x,i)=><div key={x}><b>0{i+1}</b><h3>{x}</h3><span>Read →</span></div>)}</section>
 </main>}
