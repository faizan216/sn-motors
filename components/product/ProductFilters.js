"use client";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "Engine Parts","Brakes","Suspension","Exhaust",
  "Electrical","Body Parts","Transmission","Cooling System","Filters","Lighting",
];

export default function ProductFilters({ active }) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const setParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const clearAll = () => router.push("/products");
  const activeCategory = active?.category;
  const hasFilters = !!(active?.category || active?.search);

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button onClick={clearAll} className="text-xs text-brand-blue font-semibold uppercase tracking-wide hover:underline">
          ✕ Clear all filters
        </button>
      )}
      <div>
        <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">Category</h3>
        <ul className="space-y-1">
          <li>
            <button onClick={() => setParam("category", "")} className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${!activeCategory ? "bg-brand-blue text-white font-semibold" : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"}`}>
              All Categories
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button onClick={() => setParam("category", cat)} className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${activeCategory === cat ? "bg-brand-blue text-white font-semibold" : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"}`}>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">Availability</h3>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-brand-blue">
          <input type="checkbox" className="accent-brand-blue" onChange={(e) => setParam("inStock", e.target.checked ? "true" : "")} defaultChecked={active?.inStock === "true"} />
          In Stock Only
        </label>
      </div>
    </div>
  );
}
