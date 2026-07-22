"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  "Headlights","Tail Lights","Bodykit","Conversion","Grill",
  "Spoilers","Carbon Fiber Trims","Interior","Matts","PPF","Android Panel",
];

export default function ProductFilters({ active }) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [nameQuery, setNameQuery] = useState(active?.search || "");

  const setParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handleNameSearch = (e) => {
    e.preventDefault();
    setParam("search", nameQuery.trim());
  };

  const clearSearch = () => {
    setNameQuery("");
    setParam("search", "");
  };

  const clearAll = () => {
    setNameQuery("");
    router.push("/products");
  };

  const activeCategory = active?.category;
  const hasFilters = !!(active?.category || active?.search);

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-brand-blue font-semibold uppercase tracking-wide hover:underline flex items-center gap-1"
        >
          <X size={12} /> Clear all filters
        </button>
      )}

      {/* Search by name */}
      <div>
        <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">
          Search by Name
        </h3>
        <form onSubmit={handleNameSearch} className="flex gap-1">
          <div className="relative flex-1">
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="e.g. Spoiler, LED..."
              className="input-field pr-7 text-xs py-2"
            />
            {nameQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-brand-blue text-white px-2.5 rounded-sm hover:bg-brand-blueDark transition-colors"
          >
            <Search size={14} />
          </button>
        </form>
        {active?.search && (
          <p className="text-xs text-gray-400 mt-1">
            Results for: <strong className="text-brand-blue">{active.search}</strong>
          </p>
        )}
      </div>

      {/* Filter by category */}
      <div>
        <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">
          Filter by Category
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setParam("category", "")}
              className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${
                !activeCategory
                  ? "bg-brand-blue text-white font-semibold"
                  : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"
              }`}
            >
              All Categories
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setParam("category", cat)}
                className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-display font-bold uppercase text-xs tracking-widest text-gray-400 mb-3">
          Availability
        </h3>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-brand-blue">
          <input
            type="checkbox"
            className="accent-brand-blue"
            onChange={(e) => setParam("inStock", e.target.checked ? "true" : "")}
            defaultChecked={active?.inStock === "true"}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}
