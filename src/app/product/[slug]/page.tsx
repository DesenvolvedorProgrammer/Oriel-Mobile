import { ProductExperience } from '@/components/ProductExperience';
import { products } from '@/content/site';
export async function generateStaticParams(){return products.map(({slug})=>({slug}))}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ProductExperience slug={slug}/>}
