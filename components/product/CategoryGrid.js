"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { name: "Headlights",        desc: "OEM & LED upgrades",         color: "bg-yellow-50  border-yellow-300  hover:border-yellow-500  hover:bg-yellow-100"  },
  { name: "Tail Lights",       desc: "LED & sequential",           color: "bg-red-50     border-red-300     hover:border-red-500     hover:bg-red-100"     },
  { name: "Bodykit",           desc: "Front, rear & side kits",    color: "bg-blue-50    border-blue-300    hover:border-blue-500    hover:bg-blue-100"    },
  { name: "Conversion",        desc: "Facelift & full conversion",  color: "bg-purple-50  border-purple-300  hover:border-purple-500  hover:bg-purple-100"  },
  { name: "Grill",             desc: "Front grilles & mesh",       color: "bg-zinc-50    border-zinc-400    hover:border-zinc-600    hover:bg-zinc-100"    },
  { name: "Spoilers",          desc: "Rear spoilers & lips",       color: "bg-indigo-50  border-indigo-300  hover:border-indigo-500  hover:bg-indigo-100"  },
  { name: "Carbon Fiber Trims",desc: "Carbon fiber & trim pieces",  color: "bg-gray-100   border-gray-400    hover:border-gray-600    hover:bg-gray-200"    },
  { name: "Interior",          desc: "Interior accessories",       color: "bg-amber-50   border-amber-300   hover:border-amber-500   hover:bg-amber-100"   },
  { name: "Matts",             desc: "Floor & dash mats",          color: "bg-orange-50  border-orange-300  hover:border-orange-500  hover:bg-orange-100"  },
  { name: "PPF",               desc: "Paint protection film",      color: "bg-green-50   border-green-300   hover:border-green-500   hover:bg-green-100"   },
  { name: "Android Panel",     desc: "Head units & displays",      color: "bg-cyan-50    border-cyan-300    hover:border-cyan-500    hover:bg-cyan-100"    },
];

export default function CategoryGrid() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
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
        className="flex gap-4 overflow-x-auto px-2 py-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={`group flex-shrink-0 flex flex-col items-center justify-center text-center p-5 border-2 rounded-xl w-40 min-h-[100px] transition-all duration-200 hover:shadow-lg ${cat.color}`}
          >
            <span className="font-display font-black text-sm text-brand-dark group-hover:text-brand-blue transition-colors tracking-wide leading-tight capitalize">
  {cat.name}
</span>
            <span className="text-xs text-gray-400 mt-1.5 leading-snug">
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
