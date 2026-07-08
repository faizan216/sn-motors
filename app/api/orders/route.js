import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page   = parseInt(searchParams.get("page") || "1");
    const limit  = parseInt(searchParams.get("limit") || "20");
    const skip   = (page - 1) * limit;

    const filter = {};
    if (status && status !== "All") filter.status = status;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.customer?.name || !body.customer?.phone || !body.customer?.address || !body.customer?.city) {
      return NextResponse.json({ success: false, error: "Customer details are required" }, { status: 400 });
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ success: false, error: "Order must have at least one item" }, { status: 400 });
    }

    const order = await Order.create(body);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
