import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

const LINKS = {
  "Quick Links": [
    { label: "Home",         href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Cart",         href: "/cart" },
  ],
  "Categories": [
    { label: "Headlights",    href: "/products?category=Headlights"    },
    { label: "Tail Lights",   href: "/products?category=Tail+Lights"   },
    { label: "Bodykit",       href: "/products?category=Bodykit"       },
    { label: "Spoilers",      href: "/products?category=Spoilers"      },
    { label: "Android Panel", href: "/products?category=Android+Panel" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-blue flex items-center justify-center rounded-sm">
                <span className="text-white font-display font-black text-lg">SN</span>
              </div>
              <span className="font-display text-xl font-black text-white uppercase tracking-wider">SN Motors</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 mb-5">
              Pakistan&apos;s trusted source for car modification parts — headlights, bodykits, spoilers, PPF, Android panels &amp; more.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/snmotors207?igsh=cDQ5cWRqc2xINDI5" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-800 hover:bg-brand-blue rounded-sm flex items-center justify-center transition-colors" title="Instagram">
                <Instagram size={15} />
              </a>
              <a href="https://youtube.com/@snmotors207?si=87p6uxJwUC5oOjap" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-800 hover:bg-red-600 rounded-sm flex items-center justify-center transition-colors" title="YouTube">
                <Youtube size={15} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61591608008337" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-800 hover:bg-blue-600 rounded-sm flex items-center justify-center transition-colors" title="Facebook">
                <Facebook size={15} />
              </a>
              <a href="https://www.tiktok.com/@snmotors207?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-800 hover:bg-zinc-600 rounded-sm flex items-center justify-center transition-colors" title="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
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

          {/* Contact + Payment */}
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wide mb-4 text-sm">Contact Us</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin size={14} className="text-brand-blue mt-0.5 shrink-0" />
                Rimpa Plaza, Lakhshami Chok, Lahore, Punjab, Pakistan
              </li>
              <li>
                <a href="tel:+923281339780" className="flex items-center gap-2 text-zinc-400 hover:text-brand-blue transition-colors">
                  <Phone size={14} className="text-brand-blue shrink-0" /> +92 328 133 9780
                </a>
              </li>
              <li>
                <a href="https://wa.me/923281339780" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors">
                  <span className="text-green-400 text-xs font-bold shrink-0">WA</span> WhatsApp: +92 328 133 9780
                </a>
              </li>
            </ul>

            <h4 className="text-white font-display font-bold uppercase tracking-wide mb-3 text-sm">We Accept</h4>
            <div className="space-y-2">
              <a href="https://www.jazzcash.com.pk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-brand-blue text-zinc-300 hover:text-white px-3 py-2 rounded-sm transition-colors w-full">
                🟠 JazzCash — 0328 133 9780
              </a>
              <a href="https://easypaisa.com.pk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-brand-blue text-zinc-300 hover:text-white px-3 py-2 rounded-sm transition-colors w-full">
                🟢 EasyPaisa — 0328 133 9780
              </a>
              <div className="text-xs bg-zinc-800 text-zinc-300 px-3 py-2 rounded-sm">
                💵 Cash on Delivery (COD)
              </div>
              <div className="text-xs bg-zinc-800 text-zinc-300 px-3 py-2 rounded-sm leading-relaxed">
                🏦 <strong className="text-white">UBL Bank</strong><br />
                Sahrooz<br />
                AC: 0516381418409<br />
                IBAN: PK84UNIL0109000381418409
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