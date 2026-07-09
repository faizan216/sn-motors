"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const CAR_DATA = {
  "Toyota":   ["Corolla","Yaris","Camry","Prado","Fortuner","Hilux","Land Cruiser","Vitz","Aqua","Crown","CHR","Rush"],
  "Honda":    ["Civic","City","BR-V","HR-V","Accord","CR-V","Fit","Jazz","Freed","Vezel","WR-V"],
  "Suzuki":   ["Alto","Cultus","Swift","Wagon R","Jimny","Vitara","Celerio","Ertiga","Bolan","Ravi"],
  "Kia":      ["Sportage","Picanto","Stonic","Sorento","Carnival","Stinger","Cerato","K5"],
  "Hyundai":  ["Tucson","Elantra","Sonata","Santa Fe","i10","i20","Ioniq","Creta","Porter"],
  "Changan":  ["Alsvin","Oshan X7","Uni-T","Uni-K","CS35 Plus","CS55 Plus","Hunter","Kaicene F70"],
  "MG":       ["HS","ZS","5","GT","RX5","Marvel R","One","VS HEV"],
  "BMW":      ["3 Series","5 Series","7 Series","X1","X3","X5","X6","M3","M5","i3","i8"],
  "Mercedes": ["C-Class","E-Class","S-Class","GLC","GLE","A-Class","CLA","AMG GT"],
  "Audi":     ["A3","A4","A5","A6","Q3","Q5","Q7","TT","R8","e-tron"],
  "Nissan":   ["Dayz","Note","Juke","X-Trail","Patrol","Navara","370Z","GT-R","Leaf"],
  "Mitsubishi":["Outlander","Pajero","Eclipse Cross","L200","ASX","Galant","Lancer"],
  "Daihatsu": ["Mira","Move","Cast","Tanto","Rocky","Terios","Hijet"],
  "Subaru":   ["Forester","Outback","XV","Impreza","Legacy","WRX","BRZ"],
  "Mazda":    ["3","6","CX-3","CX-5","CX-9","MX-5","RX-8"],
  "Haval":    ["H6","Jolion","H1","H2","H9","Dargo"],
  "Proton":   ["Saga","X50","X70","Iriz","Persona","Ertiga"],
  "DFSK":     ["Glory 580","Glory 500","Seres 3","EC35"],
  "Prince":   ["Pearl","DFSK Mini Truck"],
  "FAW":      ["V2","Carrier","Sirius","X-PV"],
};

const MAKES = Object.keys(CAR_DATA).sort();

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

  const handleMakeChange = (e) => {
    setMake(e.target.value);
    setModel("");
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("make");
    params.delete("model");
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
          {/* Make */}
          <div className="relative">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
              Make (Brand)
            </label>
            <div className="relative">
              <select
                value={make}
                onChange={handleMakeChange}
                className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition text-sm cursor-pointer"
              >
                <option value="">Select Make...</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Model */}
          <div className="relative">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">
              Model
            </label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                className="w-full bg-zinc-800 border border-zinc-600 text-white rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">{make ? "Select Model..." : "Select Make first"}</option>
                {models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Search button */}
          <div className="flex flex-col justify-end gap-2">
            <label className="block text-xs font-semibold text-transparent uppercase tracking-widest mb-1.5 hidden sm:block">
              &nbsp;
            </label>
            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blueDark text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Search size={18} /> Find Parts
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(make || model) && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-zinc-400 text-xs">Filtering:</span>
            {make && (
              <span className="bg-brand-blue/20 text-brand-blue text-xs px-2 py-1 rounded-full font-semibold">
                {make}
              </span>
            )}
            {model && (
              <span className="bg-brand-blue/20 text-brand-blue text-xs px-2 py-1 rounded-full font-semibold">
                {model}
              </span>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="text-zinc-400 hover:text-white text-xs underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
