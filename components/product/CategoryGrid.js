"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Headlights",
    desc: "OEM & LED upgrades",
    color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
    iconColor: "text-yellow-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <ellipse cx="20" cy="32" rx="14" ry="20" fill="#FEF08A" stroke="#EAB308" strokeWidth="2"/>
        <path d="M34 18 Q50 20 56 32 Q50 44 34 46" stroke="#EAB308" strokeWidth="2.5" fill="#FEF9C3"/>
        <line x1="36" y1="32" x2="56" y2="32" stroke="#EAB308" strokeWidth="2"/>
        <line x1="38" y1="26" x2="54" y2="22" stroke="#EAB308" strokeWidth="1.5"/>
        <line x1="38" y1="38" x2="54" y2="42" stroke="#EAB308" strokeWidth="1.5"/>
        <ellipse cx="20" cy="32" rx="6" ry="8" fill="#FDE047"/>
        <circle cx="20" cy="32" r="3" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Tail Lights",
    desc: "LED & sequential",
    color: "bg-red-50 border-red-200 hover:border-red-400",
    iconColor: "text-red-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="14" width="18" height="36" rx="3" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2"/>
        <rect x="10" y="16" width="14" height="10" rx="2" fill="#EF4444"/>
        <rect x="10" y="28" width="14" height="8" rx="2" fill="#F87171"/>
        <rect x="10" y="38" width="14" height="10" rx="2" fill="#FCA5A5" stroke="#EF4444" strokeWidth="1"/>
        <rect x="28" y="20" width="14" height="28" rx="3" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2"/>
        <rect x="30" y="22" width="10" height="8" rx="2" fill="#EF4444"/>
        <rect x="30" y="32" width="10" height="8" rx="2" fill="#F87171"/>
        <rect x="30" y="42" width="10" height="4" rx="1" fill="#FEE2E2"/>
        <circle cx="15" cy="21" r="2" fill="white" opacity="0.6"/>
        <circle cx="35" cy="26" r="1.5" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Bodykit",
    desc: "Front, rear & side kits",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M8 38 Q10 30 20 26 L32 24 L44 26 Q54 30 56 38 L54 42 Q52 44 50 44 L14 44 Q12 44 10 42 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2"/>
        <path d="M20 26 L22 18 Q24 16 32 16 Q40 16 42 18 L44 26" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="10" y="38" width="10" height="6" rx="2" fill="#1D4ED8" opacity="0.3"/>
        <rect x="44" y="38" width="10" height="6" rx="2" fill="#1D4ED8" opacity="0.3"/>
        <path d="M8 38 Q6 40 6 43 L10 44" stroke="#3B82F6" strokeWidth="2" fill="#DBEAFE"/>
        <path d="M56 38 Q58 40 58 43 L54 44" stroke="#3B82F6" strokeWidth="2" fill="#DBEAFE"/>
        <circle cx="16" cy="44" r="5" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1.5"/>
        <circle cx="16" cy="44" r="2.5" fill="#60A5FA"/>
        <circle cx="48" cy="44" r="5" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1.5"/>
        <circle cx="48" cy="44" r="2.5" fill="#60A5FA"/>
      </svg>
    ),
  },
  {
    name: "Conversion",
    desc: "Facelift & full conversion",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    iconColor: "text-purple-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M10 32 Q10 20 22 16 L32 14 L42 16 Q54 20 54 32" stroke="#A855F7" strokeWidth="2.5" fill="none" strokeDasharray="4 2"/>
        <path d="M8 34 Q8 44 20 48 L32 50 L44 48 Q56 44 56 34" stroke="#7C3AED" strokeWidth="2.5" fill="#EDE9FE"/>
        <path d="M14 26 L10 32 L8 34" stroke="#A855F7" strokeWidth="2" fill="none"/>
        <path d="M50 26 L54 32 L56 34" stroke="#A855F7" strokeWidth="2" fill="none"/>
        <circle cx="32" cy="32" r="8" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2"/>
        <path d="M28 32 L31 35 L36 29" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 14 L22 10 L24 14" fill="#A855F7"/>
        <path d="M40 14 L42 10 L44 14" fill="#A855F7"/>
      </svg>
    ),
  },
  {
    name: "Grill",
    desc: "Front grilles & mesh",
    color: "bg-zinc-50 border-zinc-300 hover:border-zinc-500",
    iconColor: "text-zinc-600",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="16" width="48" height="32" rx="4" fill="#F4F4F5" stroke="#71717A" strokeWidth="2"/>
        <line x1="8" y1="24" x2="56" y2="24" stroke="#71717A" strokeWidth="1.5"/>
        <line x1="8" y1="32" x2="56" y2="32" stroke="#71717A" strokeWidth="1.5"/>
        <line x1="8" y1="40" x2="56" y2="40" stroke="#71717A" strokeWidth="1.5"/>
        <line x1="20" y1="16" x2="20" y2="48" stroke="#71717A" strokeWidth="1.5"/>
        <line x1="32" y1="16" x2="32" y2="48" stroke="#71717A" strokeWidth="1.5"/>
        <line x1="44" y1="16" x2="44" y2="48" stroke="#71717A" strokeWidth="1.5"/>
        <rect x="8" y="16" width="48" height="32" rx="4" fill="none" stroke="#52525B" strokeWidth="2.5"/>
        <rect x="12" y="20" width="4" height="4" rx="1" fill="#A1A1AA"/>
        <rect x="48" y="20" width="4" height="4" rx="1" fill="#A1A1AA"/>
        <rect x="12" y="40" width="4" height="4" rx="1" fill="#A1A1AA"/>
        <rect x="48" y="40" width="4" height="4" rx="1" fill="#A1A1AA"/>
      </svg>
    ),
  },
  {
    name: "Spoilers",
    desc: "Rear spoilers & lips",
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
    iconColor: "text-indigo-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M6 36 Q20 28 32 30 Q44 28 58 36" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M6 36 Q8 40 12 40 L52 40 Q56 40 58 36" fill="#C7D2FE" stroke="#6366F1" strokeWidth="2"/>
        <rect x="18" y="40" width="4" height="10" rx="1" fill="#6366F1"/>
        <rect x="42" y="40" width="4" height="10" rx="1" fill="#6366F1"/>
        <path d="M16 50 L22 50 L20 52 L18 52 Z" fill="#4338CA"/>
        <path d="M40 50 L46 50 L44 52 L42 52 Z" fill="#4338CA"/>
        <path d="M8 36 Q10 30 15 28" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="2 2"/>
        <path d="M56 36 Q54 30 49 28" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    name: "Carbon Fiber",
    desc: "Hoods, mirrors & trim",
    color: "bg-gray-50 border-gray-300 hover:border-gray-500",
    iconColor: "text-gray-700",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="8" width="48" height="48" rx="4" fill="#18181B"/>
        <pattern id="cf" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill="#27272A"/>
          <rect x="4" y="4" width="4" height="4" fill="#27272A"/>
          <rect x="0" y="0" width="4" height="4" fill="none" stroke="#3F3F46" strokeWidth="0.5"/>
          <rect x="4" y="4" width="4" height="4" fill="none" stroke="#3F3F46" strokeWidth="0.5"/>
        </pattern>
        <rect x="8" y="8" width="48" height="48" rx="4" fill="url(#cf)"/>
        <rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="#52525B" strokeWidth="2"/>
        <path d="M8 8 L20 8 L8 20 Z" fill="white" opacity="0.05"/>
        <path d="M12 14 L18 10" stroke="white" opacity="0.15" strokeWidth="1"/>
        <path d="M12 20 L22 12" stroke="white" opacity="0.1" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: "Trims",
    desc: "Chrome & matte trims",
    color: "bg-amber-50 border-amber-200 hover:border-amber-400",
    iconColor: "text-amber-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="26" width="48" height="12" rx="3" fill="url(#chrome)" stroke="#D97706" strokeWidth="1.5"/>
        <defs>
          <linearGradient id="chrome" x1="8" y1="26" x2="56" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF3C7"/>
            <stop offset="30%" stopColor="#FCD34D"/>
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9"/>
            <stop offset="70%" stopColor="#FCD34D"/>
            <stop offset="100%" stopColor="#F59E0B"/>
          </linearGradient>
        </defs>
        <rect x="6" y="20" width="52" height="6" rx="2" fill="#F59E0B" opacity="0.3"/>
        <rect x="6" y="38" width="52" height="6" rx="2" fill="#F59E0B" opacity="0.3"/>
        <circle cx="16" cy="32" r="3" fill="white" opacity="0.7"/>
        <circle cx="32" cy="32" r="3" fill="white" opacity="0.7"/>
        <circle cx="48" cy="32" r="3" fill="white" opacity="0.7"/>
        <path d="M10 29 L54 29" stroke="white" opacity="0.4" strokeWidth="1"/>
        <path d="M10 35 L54 35" stroke="white" opacity="0.4" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: "Matts",
    desc: "Floor & dash mats",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    iconColor: "text-orange-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="8" y="18" width="48" height="30" rx="4" fill="#FED7AA" stroke="#F97316" strokeWidth="2"/>
        <rect x="12" y="22" width="40" height="22" rx="2" fill="#FDBA74" stroke="#EA580C" strokeWidth="1"/>
        <line x1="12" y1="28" x2="52" y2="28" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="12" y1="34" x2="52" y2="34" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="12" y1="40" x2="52" y2="40" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="22" y1="22" x2="22" y2="44" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="32" y1="22" x2="32" y2="44" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <line x1="42" y1="22" x2="42" y2="44" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2"/>
        <rect x="8" y="18" width="48" height="4" rx="2" fill="#F97316"/>
        <rect x="8" y="44" width="48" height="4" rx="2" fill="#F97316"/>
      </svg>
    ),
  },
  {
    name: "PPF",
    desc: "Paint protection film",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    iconColor: "text-green-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M32 8 L52 18 L52 36 Q52 50 32 58 Q12 50 12 36 L12 18 Z" fill="#BBF7D0" stroke="#22C55E" strokeWidth="2"/>
        <path d="M32 14 L46 22 L46 36 Q46 46 32 52 Q18 46 18 36 L18 22 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5"/>
        <path d="M24 33 L30 39 L40 27" stroke="#15803D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 8 L32 14" stroke="#22C55E" strokeWidth="2"/>
        <path d="M12 18 L18 22" stroke="#22C55E" strokeWidth="1.5"/>
        <path d="M52 18 L46 22" stroke="#22C55E" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Android Panel",
    desc: "Head units & displays",
    color: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
    iconColor: "text-cyan-500",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="6" y="14" width="52" height="32" rx="4" fill="#0F172A" stroke="#06B6D4" strokeWidth="2"/>
        <rect x="9" y="17" width="46" height="26" rx="2" fill="#0EA5E9" opacity="0.15"/>
        <rect x="9" y="17" width="46" height="26" rx="2" fill="none" stroke="#0EA5E9" strokeWidth="0.5"/>
        <rect x="12" y="20" width="28" height="16" rx="2" fill="#1E293B"/>
        <path d="M14 26 L16 22 L20 26 L18 26 L18 32 L14 32 Z" fill="#22D3EE" opacity="0.8"/>
        <rect x="22" y="24" width="8" height="2" rx="1" fill="#38BDF8" opacity="0.6"/>
        <rect x="22" y="28" width="6" height="2" rx="1" fill="#38BDF8" opacity="0.4"/>
        <circle cx="44" cy="26" r="4" fill="#1E293B" stroke="#06B6D4" strokeWidth="1"/>
        <circle cx="44" cy="26" r="1.5" fill="#06B6D4"/>
        <rect x="42" y="33" width="6" height="2" rx="1" fill="#0EA5E9" opacity="0.5"/>
        <rect x="42" y="37" width="4" height="2" rx="1" fill="#0EA5E9" opacity="0.3"/>
        <rect x="24" y="46" width="16" height="3" rx="1.5" fill="#06B6D4" opacity="0.5"/>
        <circle cx="32" cy="47.5" r="1" fill="#06B6D4"/>
      </svg>
    ),
  },
];

export default function CategoryGrid() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex-shrink-0 flex flex-col items-center text-center p-5 border-2 rounded-xl w-44 ${cat.color} hover:shadow-lg transition-all duration-200`}
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-200 drop-shadow-sm">
              {cat.svg}
            </div>
            <span className="font-display font-bold uppercase text-sm text-brand-dark group-hover:text-brand-blue transition-colors tracking-wide leading-tight">
              {cat.name}
            </span>
            <span className="text-xs text-gray-400 mt-1 leading-snug">
              {cat.desc}
            </span>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
