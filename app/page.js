import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Shield, Truck, Clock, Award, RefreshCcw, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import CategoryGrid from "@/components/product/CategoryGrid";
import MakeModelFilter from "@/components/product/MakeModelFilter";

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?featured=true&limit=8`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

const TRUST_ITEMS = [
  { icon: Truck,  label: "Nationwide Delivery", sub: "Delivering all across Pakistan"   },
  { icon: Shield, label: "Quality Guaranteed",  sub: "Premium modification parts only" },
  { icon: Clock,  label: "Fast Dispatch",        sub: "Ships within 24 hours"           },
  { icon: Award,  label: "Expert Advice",        sub: "WhatsApp us for fitment queries"},
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
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-widest">Pakistan&apos;s Car Modification Specialists</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase leading-none mb-6">
              MODIFY YOUR<br />
              <span className="text-brand-blue">RIDE</span>
            </h1>
            <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
              Headlights, Bodykits, Spoilers, PPF, Carbon fiber, Android panels & more.
              Premium car modification parts delivered across Pakistan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-8 py-4">
                Shop All Parts <ArrowRight size={18} />
              </Link>
              <Link href="/products?category=Bodykit" className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-sm transition-all duration-200 inline-flex items-center gap-2">
                View Bodykits
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

      {/* MAKE & MODEL FILTER */}
      <section className="bg-brand-smoke py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Suspense fallback={<div className="h-32 bg-zinc-800 rounded-xl animate-pulse" />}>
            <MakeModelFilter />
          </Suspense>
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

      {/* RETURN POLICY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-full mb-4">
              <RefreshCcw size={28} className="text-brand-blue" />
            </div>
            <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-1">Our Policy</p>
            <h2 className="section-heading">Exchange & Return Policy</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We want you to be 100% satisfied with your purchase. Please read our exchange policy carefully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border-2 border-green-100 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={22} className="text-green-600" />
                <h3 className="font-display font-bold uppercase tracking-wide text-green-800">What&apos;s Allowed</h3>
              </div>
              <ul className="space-y-3 text-sm text-green-700">
                {[
                  "Exchange within 24 hours of delivery",
                  "Item must be unused and in original packaging",
                  "Exchange for same product or equal value item",
                  "Defective or damaged items on arrival",
                  "Wrong item delivered by us",
                  "Contact us via WhatsApp with photos first",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-red-100 rounded-xl p-6 bg-red-50">
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={22} className="text-red-600" />
                <h3 className="font-display font-bold uppercase tracking-wide text-red-800">Not Applicable</h3>
              </div>
              <ul className="space-y-3 text-sm text-red-700">
                {[
                  "No cash/money refunds under any circumstances",
                  "No exchange after 24 hours of delivery",
                  "Installed or used items cannot be exchanged",
                  "Items damaged by customer after delivery",
                  "Custom-ordered or special import items",
                  "Items without original packaging",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle size={22} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm">Important Note</p>
              <p className="text-amber-700 text-sm mt-1">
                After <strong>24 hours of delivery</strong>, items are considered accepted and cannot be exchanged.
                We offer <strong>exchange only — no money back</strong>. To initiate an exchange, WhatsApp us at{" "}
                <a href="https://wa.me/923281339780" className="underline font-semibold">0328-133-9780</a>{" "}
                with your order number and photos of the item within 24 hours of receiving your order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-white uppercase tracking-wide">Need help choosing the right part?</h2>
            <p className="text-blue-200 mt-1">WhatsApp us — we&apos;ll guide you to the perfect fit for your car.</p>
          </div>
          <a href="https://wa.me/923281339780" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-black text-white font-bold px-8 py-3 rounded-sm hover:bg-zinc-900 transition-colors inline-flex items-center gap-2 uppercase tracking-wide">
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}