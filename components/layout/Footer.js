import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Youtube } from "lucide-react";

const LINKS = {
  "Quick Links": [
    { label: "Home",         href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Cart",         href: "/cart" },
  ],
  "Categories": [
    { label: "Headlights",   href: "/products?category=Headlights"   },
    { label: "Tail Lights",  href: "/products?category=Tail+Lights"  },
    { label: "Bodykit",      href: "/products?category=Bodykit"      },
    { label: "Spoilers",     href: "/products?category=Spoilers"     },
    { label: "Android Panel",href: "/products?category=Android+Panel"},
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
              Pakistan&apos;s trusted source for car modification parts — headlights, bodykits, spoilers, PPF, Android panels & more.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/snmotors207?igsh=cDQ5cWRqc2xINDI5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-800 hover:bg-brand-blue rounded-sm flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://youtube.com/@snmotors207?si=87p6uxJwUC5oOjap"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-800 hover:bg-red-600 rounded-sm flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <Youtube size={15} />
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
              <li>
                <li className="flex items-start gap-2 text-zinc-400">
  <MapPin size={14} className="text-brand-blue mt-0.5 shrink-0" />
  Rimpa Plaza, Lakhshami Chok, Lahore, Punjab, Pakistan
</li>
                <a href="tel:+923281339780" className="flex items-center gap-2 text-zinc-400 hover:text-brand-blue transition-colors">
                  <Phone size={14} className="text-brand-blue shrink-0" /> +92 328 133 9780
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923281339780"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors"
                >
                  <span className="text-green-400 text-xs font-bold shrink-0">WA</span> WhatsApp: +92 328 133 9780
                </a>
              </li>
            </ul>

            {/* Payment */}
            <h4 className="text-white font-display font-bold uppercase tracking-wide mb-3 text-sm">We Accept</h4>
            <div className="space-y-2">
              <a href="https://www.jazzcash.com.pk" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-brand-blue text-zinc-300 hover:text-white px-3 py-2 rounded-sm transition-colors w-full">
                🟠 JazzCash — 0328 133 9780
              </a>
              <a href="https://easypaisa.com.pk" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-brand-blue text-zinc-300 hover:text-white px-3 py-2 rounded-sm transition-colors w-full">
                🟢 EasyPaisa — 0328 133 9780
              </a>
              <div className="text-xs bg-zinc-800 text-zinc-300 px-3 py-2 rounded-sm">
                💵 Cash on Delivery (COD)
              </div>
              <div className="text-xs bg-zinc-800 text-zinc-300 px-3 py-2 rounded-sm leading-relaxed">
                🏦 <strong className="text-white">UBL Bank</strong><br />
                Shehroz / Sahrooz<br />
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
