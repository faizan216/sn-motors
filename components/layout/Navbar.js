"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Search, Phone, ChevronDown } from "lucide-react";
import useCartStore from "@/lib/cartStore";

const CATEGORIES = [
  "Headlights","Tail Lights","Bodykit","Conversion","Grill",
  "Spoilers","Carbon Fiber Trims","Interior","Matts","PPF","Android Panel",
];

export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen,     setCatOpen]     = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [mounted,     setMounted]     = useState(false);

  const items      = useCartStore((s) => s.items);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-black text-xs text-zinc-400 py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span>Pakistan&apos;s trusted car modification parts supplier</span>
          <a href="tel:+923281339780" className="flex items-center gap-1 hover:text-white transition-colors">
            <Phone size={11} /> +92 328 133 9780
          </a>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-4">
              <div className="w-9 h-9 bg-black rounded-sm flex items-center justify-center">
                <span className="font-display font-black text-brand-blue text-lg leading-none">SN</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-black uppercase text-black tracking-wider">SN Motors</span>
                <span className="block text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-none -mt-0.5">Car Modification Parts</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              <Link href="/" className="text-sm font-medium px-3 py-2 hover:text-brand-blue transition-colors">Home</Link>

              <div className="relative" onMouseLeave={() => setCatOpen(false)}>
                <button
                  onMouseEnter={() => setCatOpen(true)}
                  className="text-sm font-medium px-3 py-2 hover:text-brand-blue transition-colors flex items-center gap-1"
                >
                  Categories <ChevronDown size={14} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-white border border-gray-100 shadow-lg rounded-sm w-56 py-2 z-50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                        onClick={() => setCatOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link href="/products" className="block px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-blue-50 transition-colors" onClick={() => setCatOpen(false)}>
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/products" className="text-sm font-medium px-3 py-2 hover:text-brand-blue transition-colors">All Parts</Link>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
              <div className="flex w-full border border-gray-200 rounded-sm overflow-hidden hover:border-brand-blue transition-colors focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue">
                <input
                  type="text"
                  placeholder="Search parts by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                />
                <button type="submit" className="bg-brand-blue text-white px-3 hover:bg-brand-blueDark transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 hover:text-brand-blue transition-colors">
                <Search size={20} />
              </button>
              <Link href="/cart" className="relative p-2 hover:text-brand-blue transition-colors">
                <ShoppingCart size={22} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-blue text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-ring">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:text-brand-blue transition-colors ml-1">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input type="text" placeholder="Search parts by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field" autoFocus />
              <button type="submit" className="btn-primary px-4 py-2"><Search size={16} /></button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-2">
            <Link href="/" className="block px-4 py-3 text-sm font-medium hover:bg-blue-50 hover:text-brand-blue transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/products" className="block px-4 py-3 text-sm font-medium hover:bg-blue-50 hover:text-brand-blue transition-colors" onClick={() => setMobileOpen(false)}>All Parts</Link>
            <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">Categories</div>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="block px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-brand-blue transition-colors" onClick={() => setMobileOpen(false)}>
                {cat}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
