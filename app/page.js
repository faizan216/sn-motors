import Link from "next/link";
import { ArrowRight, Shield, Truck, Clock, Award } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import CategoryGrid from "@/components/product/CategoryGrid";

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?featured=true&limit=8`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

const TRUST_ITEMS = [
  { icon: Truck,  label: "Free Delivery",   sub: "On orders above Rs. 5,000" },
  { icon: Shield, label: "Genuine Parts",   sub: "OEM & quality aftermarket"  },
  { icon: Clock,  label: "Fast Dispatch",   sub: "Ships within 24 hours"      },
  { icon: Award,  label: "1-Year Warranty", sub: "On all major components"    },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative bg-hero-pattern overflow-hidden min-h-[560px] flex items-center">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10" style={{ background: "repeating-linear-gradient(-45deg, #2563EB 0px, #2563EB 2px, transparent 2px, transparent 18px)" }} />
        <div className="absolute right-0 top-0 h-full w-96 bg-gradient-to-l from-brand-blue/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-brand-blue" />
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-widest">Pakistan&apos;s #1 Auto Parts Store</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase leading-none mb-6">
              BUILT FOR<br />
              <span className="text-brand-blue">PERFORMANCE</span>
            </h1>
            <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
              OEM-grade and premium aftermarket parts for every make and model. From engine overhauls to brake upgrades — SN Motors stocks it all.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-4">
                Shop All Parts <ArrowRight size={18} />
              </Link>
              <Link href="/products?category=Engine+Parts" className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-sm transition-all duration-200 inline-flex items-center gap-2">
                Engine Parts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-5">
                <Icon size={28} className="text-brand-blue shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-1">Browse by Type</p>
            <h2 className="section-heading">Shop Categories</h2>
          </div>
          <Link href="/products" className="text-brand-blue font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            All Products <ArrowRight size={14} />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* FEATURED */}
      <section className="bg-brand-smoke py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-1">Hand-picked</p>
              <h2 className="section-heading">Featured Products</h2>
            </div>
            <Link href="/products" className="text-brand-blue font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {featured.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No featured products yet.</p>
              <Link href="/admin" className="btn-primary mt-4 inline-flex">Add Products in Admin</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-white uppercase tracking-wide">Can&apos;t find the part you need?</h2>
            <p className="text-blue-200 mt-1">WhatsApp our team — we source any part within 48 hours.</p>
          </div>
          <a href="https://wa.me/923288167552" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-black text-white font-bold px-8 py-3 rounded-sm hover:bg-zinc-900 transition-colors inline-flex items-center gap-2 uppercase tracking-wide">
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
