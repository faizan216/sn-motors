"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Eye } from "lucide-react";
import useCartStore from "@/lib/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = product.stock > 0;
  const stars   = Math.round(product.rating ?? 4);

  return (
    <article className="card group flex flex-col overflow-hidden animate-slide-up">
      <div className="relative aspect-square bg-brand-smoke overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        {!inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="badge bg-zinc-800 text-white text-xs">Out of Stock</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 badge bg-brand-blue text-white text-[10px]">Featured</span>
        )}
        <Link href={`/products/${product._id}`} className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-brand-dark p-2 rounded-sm shadow opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-brand-blue">
          <Eye size={15} />
        </Link>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{product.category}</span>
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-brand-dark hover:text-brand-blue transition-colors text-sm leading-snug line-clamp-2 mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < stars ? "fill-brand-blue text-brand-blue" : "text-gray-200"} />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({product.reviewCount ?? 0})</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-display text-xl font-bold text-brand-blue">Rs. {product.price.toLocaleString()}</span>
          <button
            onClick={() => inStock && addItem(product)}
            disabled={!inStock}
            className={`p-2 rounded-sm transition-all duration-200 ${inStock ? "bg-brand-blue text-white hover:bg-brand-blueDark active:scale-95" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
