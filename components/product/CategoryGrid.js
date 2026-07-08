import Link from "next/link";
import { GiRedCarpet } from "react-icons/gi";
import {
  FaCarSide,
  FaArrowsRotate,
  FaShieldHalved,
  FaMobileScreenButton,
  FaCircle,
  FaPlane,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { BsGrid3X3Gap } from "react-icons/bs";
import { TbSquareRoundedFilled } from "react-icons/tb";
import { MdOutlineLightbulb } from "react-icons/md";

const CATEGORIES = [
  { name: "Headlights",    Icon: MdOutlineLightbulb,    desc: "OEM & aftermarket headlight assemblies",     color: "bg-yellow-50  border-yellow-100" },
  { name: "Tail Lights",   Icon: FaCircle,              desc: "LED & halogen tail light upgrades",           color: "bg-red-50     border-red-100"    },
  { name: "Bodykit",       Icon: FaCarSide,             desc: "Front, rear & side body kit packages",        color: "bg-blue-50    border-blue-100"   },
  { name: "Conversion",    Icon: FaArrowsRotate,        desc: "Full car conversion kits & facelift parts",   color: "bg-purple-50  border-purple-100" },
  { name: "Grill",         Icon: BsGrid3X3Gap,          desc: "Front grilles & mesh grill upgrades",         color: "bg-zinc-50    border-zinc-200"   },
  { name: "Spoilers",      Icon: FaPlane,               desc: "Rear spoilers & front lip extensions",        color: "bg-indigo-50  border-indigo-100" },
  { name: "Carbon Fiber",  Icon: TbSquareRoundedFilled, desc: "Carbon fiber hoods, mirrors & trim pieces",   color: "bg-gray-50    border-gray-200"   },
  { name: "Trims",         Icon: HiSparkles,            desc: "Interior & exterior chrome/matte trims",      color: "bg-amber-50   border-amber-100"  },
  { name: "Matts",         Icon: GiRedCarpet,           desc: "Floor mats, dash mats & carpet sets",         color: "bg-orange-50  border-orange-100" },
  { name: "PPF",           Icon: FaShieldHalved,        desc: "Paint protection film & window tint",         color: "bg-green-50   border-green-100"  },
  { name: "Android Panel", Icon: FaMobileScreenButton,  desc: "Android head units & infotainment systems",   color: "bg-cyan-50    border-cyan-100"   },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.name}
          href={`/products?category=${encodeURIComponent(cat.name)}`}
          className={`group flex flex-col items-center text-center p-5 border rounded-sm ${cat.color} hover:border-brand-blue hover:shadow-md transition-all duration-200`}
        >
          <cat.Icon className="text-3xl mb-3 text-brand-dark group-hover:scale-110 group-hover:text-brand-blue transition-transform duration-200" />
          <span className="font-display font-bold uppercase text-sm text-brand-dark group-hover:text-brand-blue transition-colors tracking-wide">
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