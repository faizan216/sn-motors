import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const LINKS = {
  "Quick Links": [
    { label: "Home",         href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Cart",         href: "/cart" },
    { label: "Admin Panel",  href: "/admin" },
  ],
  "Categories": [
    { label: "Engine Parts", href: "/products?category=Engine+Parts" },
    { label: "Brakes",       href: "/products?category=Brakes" },
    { label: "Suspension",   href: "/products?category=Suspension" },
    { label: "Exhaust",      href: "/products?category=Exhaust" },
    { label: "Electrical",   href: "/products?category=Electrical" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-blue flex items-center justify-center rounded-sm">
                <span className="text-white font-display font-black text-lg">SN</span>
              </div>
              <span className="font-display text-xl font-black text-white uppercase tracking-wider">SN Motors</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 mb-5">
              Pakistan&apos;s trusted source for OEM and premium aftermarket car parts. Quality parts, fast delivery, unbeatable prices.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-zinc-800 hover:bg-brand-blue rounded-sm flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-display font-bold uppercase tracking-wide mb-4 text-sm">{heading}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-zinc-400 hover:text-brand-blue transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wide mb-4 text-sm">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin size={14} className="text-brand-blue mt-0.5 shrink-0" />
                Rimpa Plaza, Lakshami Chok, Lahore, Pakistan             </li>
              <li>
                <a href="tel:+923001234567" className="flex items-center gap-2 text-zinc-400 hover:text-brand-blue transition-colors">
                  <Phone size={14} className="text-brand-blue" /> +92 328 8167552
                </a>
              </li>
              <li>
                <a href="mailto:info@snmotors.pk" className="flex items-center gap-2 text-zinc-400 hover:text-brand-blue transition-colors">
                  <Mail size={14} className="text-brand-blue" /> snmotors207@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">We accept</p>
              <div className="flex gap-2 flex-wrap">
                {[
  { label: "JazzCash",  href: "https://www.jazzcash.com.pk" },
  { label: "EasyPaisa", href: "https://easypaisa.com.pk" },
  { label: "COD",       href: "#" },
  { label: "Bank",      href: "#" },
].map((m) => (
  <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer" className="text-xs bg-zinc-800 hover:bg-brand-blue text-zinc-300 hover:text-white px-2 py-1 rounded-sm transition-colors cursor-pointer">
    {m.label}
  </a>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} SN Motors. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
