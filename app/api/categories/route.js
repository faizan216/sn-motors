import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

const DEFAULT_CATEGORIES = [
  { name: "Headlights",        description: "OEM & LED upgrades",          color: "bg-yellow-50 border-yellow-300 hover:border-yellow-500 hover:bg-yellow-100",  order: 1  },
  { name: "Tail Lights",       description: "LED & sequential",            color: "bg-red-50 border-red-300 hover:border-red-500 hover:bg-red-100",               order: 2  },
  { name: "Bodykit",           description: "Front, rear & side kits",     color: "bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100",           order: 3  },
  { name: "Conversion",        description: "Facelift & full conversion",  color: "bg-purple-50 border-purple-300 hover:border-purple-500 hover:bg-purple-100",   order: 4  },
  { name: "Grill",             description: "Front grilles & mesh",        color: "bg-zinc-50 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-100",           order: 5  },
  { name: "Spoilers",          description: "Rear spoilers & lips",        color: "bg-indigo-50 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-100",   order: 6  },
  { name: "Carbon Fiber Trims",description: "Carbon fiber & trim pieces",  color: "bg-gray-100 border-gray-400 hover:border-gray-600 hover:bg-gray-200",          order: 7  },
  { name: "Interior",          description: "Interior accessories",        color: "bg-amber-50 border-amber-300 hover:border-amber-500 hover:bg-amber-100",       order: 8  },
  { name: "Matts",             description: "Floor & dash mats",           color: "bg-orange-50 border-orange-300 hover:border-orange-500 hover:bg-orange-100",   order: 9  },
  { name: "PPF",               description: "Paint protection film",       color: "bg-green-50 border-green-300 hover:border-green-500 hover:bg-green-100",       order: 10 },
  { name: "Android Panel",     description: "Head units & displays",       color: "bg-cyan-50 border-cyan-300 hover:border-cyan-500 hover:bg-cyan-100",           order: 11 },
];

export async function GET() {
  try {
    await dbConnect();

    let categories = await Category.find({ active: true }).sort({ order: 1 }).lean();

    // Seed defaults if empty
    if (categories.length === 0) {
      await Category.insertMany(DEFAULT_CATEGORIES);
      categories = await Category.find({ active: true }).sort({ order: 1 }).lean();
    }

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const lastCat = await Category.findOne().sort({ order: -1 });
    const order   = lastCat ? lastCat.order + 1 : 1;

    const category = await Category.create({ ...body, order });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}