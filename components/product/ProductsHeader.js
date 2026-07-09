"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { label: "Newest First",    value: "createdAt-desc" },
  { label: "Oldest First",    value: "createdAt-asc"  },
  { label: "Price: Low→High", value: "price-asc"      },
  { label: "Price: High→Low", value: "price-desc"     },
  { label: "Top Rated",       value: "rating-desc"    },
];

export default function ProductsHeader({ total, searchParams }) {
  const router  = useRouter();
  const params  = useSearchParams();
  const [q, setQ] = useState(searchParams?.search || "");

  const currentSort = `${searchParams?.sort || "createdAt"}-${searchParams?.order || "desc"}`;
  const activeMake  = searchParams?.make;
  const activeModel = searchParams?.model;

  const handleSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams(params.toString());
    if (q.trim()) p.set("search", q.trim());
    else p.delete("search");
    p.delete("page");
    router.push(`/products?${p.toString()}`);
  };

  const handleSort = (e) => {
    const [sort, order] = e.target.value.split("-");
    const p = new URLSearchParams(params.toString());
    p.set("sort", sort);
    p.set("order", order);
    p.delete("page");
    router.push(`/products?${p.toString()}`);
  };

  const removeFilter = (key) => {
    const p = new URLSearchParams(params.toString());
    p.delete(key);
    p.delete("page");
    router.push(`/products?${p.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="section-heading">
          {searchParams?.category || "All Car Parts"}
        </h1>
        <p className="section-subheading">
          {total.toLocaleString()} product{total !== 1 ? "s" : ""} found
          {searchParams?.search && (
            <> for <strong className="text-brand-steel">&quot;{searchParams.search}&quot;</strong></>
          )}
        </p>
      </div>

      {/* Active make/model filters */}
      {(activeMake || activeModel) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Filtered by:</span>
          {activeMake && (
            <span className="flex items-center gap-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full">
              {activeMake}
              <button onClick={() => removeFilter("make")} className="hover:text-red-500 ml-1">
                <X size={11} />
              </button>
            </span>
          )}
          {activeModel && (
            <span className="flex items-center gap-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full">
              {activeModel}
              <button onClick={() => removeFilter("model")} className="hover:text-red-500 ml-1">
                <X size={11} />
              </button>
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary px-4 py-2.5">
            <Search size={16} />
          </button>
        </form>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-gray-400 shrink-0" />
          <select value={currentSort} onChange={handleSort} className="input-field w-auto text-sm">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
