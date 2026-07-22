import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star, Package, Tag, ArrowLeft, CheckCircle } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";

async function getProduct(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const inStock = product.stock > 0;
  const stars = Math.round(product.rating ?? 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-brand-red transition-colors">Products</Link>
        <ChevronRight size={14} />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-red transition-colors">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-brand-steel font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square bg-brand-smoke rounded-sm overflow-hidden border border-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.featured && (
            <span className="absolute top-4 left-4 badge bg-brand-red text-white">
              Featured
            </span>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-sm">
              <span className="bg-zinc-800 text-white font-bold px-6 py-2 rounded-sm text-lg uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Category + SKU */}
          <div className="flex items-center gap-3 mb-3">
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="badge bg-brand-smoke text-brand-steel border border-gray-200 hover:bg-brand-red hover:text-white transition-colors"
            >
              {product.category}
            </Link>
            {product.sku && (
              <span className="text-xs text-gray-400">SKU: {product.sku}</span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-steel uppercase leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < stars ? "fill-brand-accent text-brand-accent" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating?.toFixed(1)} ({product.reviewCount ?? 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
  {product.discount > 0 ? (
    <>
      <span className="font-display text-4xl font-extrabold text-brand-blue">
        Rs. {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
      </span>
      <span className="text-gray-400 text-sm line-through">
        Rs. {product.price.toLocaleString()}
      </span>
      <span className="badge bg-green-100 text-green-700">Save {product.discount}%</span>
    </>
  ) : (
    <span className="font-display text-4xl font-extrabold text-brand-blue">
      Rs. {product.price.toLocaleString()}
    </span>
  )}
</div>

          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Tag size={14} className="text-brand-red" />
              <span>Brand: <strong>{product.brand}</strong></span>
            </div>
          )}

          {/* Stock */}
          <div className={`flex items-center gap-2 text-sm mb-6 ${inStock ? "text-green-600" : "text-red-500"}`}>
            <Package size={14} />
            {inStock
              ? <span><strong>{product.stock}</strong> units in stock — order now</span>
              : <span>Currently out of stock</span>
            }
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-6 mb-8">
            <h2 className="font-semibold text-brand-steel mb-2 uppercase text-sm tracking-wide">Description</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* Key features */}
          <ul className="space-y-2 mb-8">
  {["Compatible with multiple models", "Easy installation", "Fast dispatch within 24 hours", "Nationwide delivery across Pakistan"].map((f) => (
    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
      <CheckCircle size={14} className="text-green-500 shrink-0" />
      {f}
    </li>
  ))}
</ul>

          {/* CTA */}
          <div className="flex gap-3 flex-wrap">
            <AddToCartButton product={product} disabled={!inStock} />
            <Link href="/products" className="btn-outline">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
