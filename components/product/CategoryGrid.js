"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryGrid() {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((j) => { if (j.success) setCategories(j.data); });
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
    }
  };

  if (categories.length === 0) return (
    <div className="flex gap-4 overflow-x-auto px-2 py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-40 h-24 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="relative">
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
        <ChevronLeft size={18} />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-2 py-2 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex-shrink-0 flex flex-col items-center justify-center text-center p-5 border-2 rounded-xl w-40 min-h-[100px] transition-all duration-200 hover:shadow-lg ${cat.color}`}
          >
            <span className="font-display font-black text-sm text-brand-dark group-hover:text-brand-blue transition-colors tracking-wide leading-tight capitalize">
              {cat.name}
            </span>
            <span className="text-xs text-gray-400 mt-1.5 leading-snug">{cat.description}</span>
          </Link>
        ))}
      </div>

      <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}