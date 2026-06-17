import Link from "next/link";

const CATEGORIES = [
  { name: "Engine Parts",    icon: "🔩", desc: "Pistons, gaskets, timing belts & more",  color: "bg-red-50   border-red-100"  },
  { name: "Brakes",          icon: "🛞", desc: "Pads, rotors, calipers & brake fluid",   color: "bg-blue-50  border-blue-100" },
  { name: "Suspension",      icon: "🔧", desc: "Shocks, struts, springs & bushings",     color: "bg-zinc-50  border-zinc-200" },
  { name: "Exhaust",         icon: "💨", desc: "Manifolds, mufflers & catalytic converters", color: "bg-amber-50 border-amber-100" },
  { name: "Electrical",      icon: "⚡", desc: "Sensors, alternators & wiring harnesses",color: "bg-yellow-50 border-yellow-100" },
  { name: "Body Parts",      icon: "🚗", desc: "Bumpers, panels, mirrors & grilles",     color: "bg-green-50 border-green-100" },
  { name: "Transmission",    icon: "⚙️", desc: "Clutch kits, gearbox & CV joints",       color: "bg-purple-50 border-purple-100" },
  { name: "Filters",         icon: "🔬", desc: "Oil, air, fuel & cabin air filters",     color: "bg-orange-50 border-orange-100" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.name}
          href={`/products?category=${encodeURIComponent(cat.name)}`}
          className={`group flex flex-col items-center text-center p-5 border rounded-sm ${cat.color} hover:border-brand-red hover:shadow-md transition-all duration-200`}
        >
          <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
            {cat.icon}
          </span>
          <span className="font-display font-bold uppercase text-sm text-brand-steel group-hover:text-brand-red transition-colors tracking-wide">
            {cat.name}
          </span>
          <span className="text-xs text-gray-400 mt-1 line-clamp-2 leading-snug hidden sm:block">
            {cat.desc}
          </span>
        </Link>
      ))}
    </div>
  );
}
