"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { CAR_DATA, MAKES } from "@/lib/carData";

export default function MakeModelFilter() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [make,  setMake]  = useState(searchParams.get("make")  || "");
  const [model, setModel] = useState(searchParams.get("model") || "");

  const models = make ? CAR_DATA[make] || [] : [];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (make)  params.set("make",  make);  else params.delete("make");
    if (model) params.set("model", model); else params.delete("model");
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handleMakeChange = (e) => { setMake(e.target.value); setModel(""); };

  const handleClear = () => {
    setMake(""); setModel("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("make"); params.delete("model");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="bg-brand-dark rounded-xl p-6 shadow-xl">
      <div className="text-center mb-5">
        <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
          Find Parts for Your Car
        </h3>
        <p className="text-zinc-400 text-sm mt-1">Select your car make and model</p>
      </div>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Make (Brand)</label>
            <div className="relative">
              <select value={make} onChange={handleMakeChange} className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-blue transition text-sm cursor-pointer">
                <option value="">Select Make...</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Model</label>
            <div className="relative">
              <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-blue transition text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <option value="">{make === "Universal" ? "All Models" : make ? "Select Model..." : "Select Make first"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <label className="block text-xs font-semibold text-transparent uppercase tracking-widest mb-1.5 hidden sm:block">&nbsp;</label>
            <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95">
              <Search size={18} /> Find Parts
            </button>
          </div>
        </div>
        {(make || model) && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-zinc-400 text-xs">Filtering:</span>
            {make  && <span className="bg-brand-blue/20 text-brand-blue text-xs px-2 py-1 rounded-full font-semibold">{make}</span>}
            {model && <span className="bg-brand-blue/20 text-brand-blue text-xs px-2 py-1 rounded-full font-semibold">{model}</span>}
            <button type="button" onClick={handleClear} className="text-zinc-400 hover:text-white text-xs underline ml-1">Clear</button>
          </div>
        )}
      </form>
    </div>
  );
}