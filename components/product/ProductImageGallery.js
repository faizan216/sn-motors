"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageGallery({ images, name }) {
  const [active, setActive] = useState(0);

  const validImages = (images || []).filter(Boolean);
  if (validImages.length === 0) return null;

  const prev = () => setActive((i) => (i === 0 ? validImages.length - 1 : i - 1));
  const next = () => setActive((i) => (i === validImages.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="w-full rounded-sm overflow-hidden border border-gray-100 bg-brand-smoke relative">
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Image
            src={validImages[active]}
            alt={`${name} - ${active + 1}`}
            fill
            className="object-contain absolute inset-0"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Arrows — only show if more than 1 image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full shadow flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight size={18} />
            </button>
            {/* Counter */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {active + 1} / {validImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`relative shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                idx === active ? "border-brand-blue" : "border-gray-200 hover:border-brand-blue"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}