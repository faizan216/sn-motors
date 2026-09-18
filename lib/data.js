import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Order from "@/models/Order";

// Helper to convert Mongoose documents to plain JS objects (safely serializable for Server Components)
function serializeDoc(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

function escapeRegex(str) {
  return typeof str === "string" ? str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "";
}

export async function getProductsData({
  category,
  search,
  make,
  model,
  sort = "createdAt",
  order = -1,
  page = 1,
  limit = 12,
  featured,
  inStock,
} = {}) {
  try {
    await dbConnect();

    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (featured === "true" || featured === true) filter.featured = true;
    if (inStock === "true" || inStock === true) filter.stock = { $gt: 0 };

    if (search && typeof search === "string" && search.trim()) {
      const cleanSearch = escapeRegex(search.trim());
      filter.$or = [
        { name:        { $regex: cleanSearch, $options: "i" } },
        { description: { $regex: cleanSearch, $options: "i" } },
        { brand:       { $regex: cleanSearch, $options: "i" } },
      ];
    }

    if (make && typeof make === "string" && make.trim())   filter.make  = { $regex: escapeRegex(make.trim()),  $options: "i" };
    if (model && typeof model === "string" && model.trim()) filter.model = { $regex: escapeRegex(model.trim()), $options: "i" };

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 12);
    const skip = (pageNum - 1) * limitNum;
    const sortObj = { [sort]: order === "asc" || order === 1 ? 1 : -1 };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .select("-images -description")
        .allowDiskUse(true)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return {
      success: true,
      data: serializeDoc(products) || [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    };
  } catch (error) {
    console.error("getProductsData error:", error);
    return { success: false, data: [], pagination: { page: 1, limit: 12, total: 0, pages: 1 } };
  }
}

export async function getProductByIdData(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return serializeDoc(product);
  } catch (error) {
    console.error("getProductByIdData error:", error);
    return null;
  }
}

export async function getOrdersData({ status, page = 1, limit = 50 } = {}) {
  try {
    await dbConnect();
    const filter = {};
    if (status && status !== "All") filter.status = status;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 50);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).allowDiskUse(true).lean(),
      Order.countDocuments(filter),
    ]);

    return {
      success: true,
      data: serializeDoc(orders) || [],
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) || 1 },
    };
  } catch (error) {
    console.error("getOrdersData error:", error);
    return { success: false, data: [], pagination: { page: 1, limit: 50, total: 0, pages: 1 } };
  }
}

export async function getAdminStatsData() {
  try {
    await dbConnect();
    const [totalProducts, inStockProducts, categoryList, allOrders] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ stock: { $gt: 0 } }),
      Product.distinct("category"),
      Order.find({}).select("status total").lean(),
    ]);

    const pendingOrders = allOrders.filter((o) => o.status === "Pending").length;
    const revenue = allOrders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalProducts,
      inStockProducts,
      totalCategories: categoryList.length,
      pendingOrders,
      revenue,
    };
  } catch (error) {
    console.error("getAdminStatsData error:", error);
    return {
      totalProducts: 0,
      inStockProducts: 0,
      totalCategories: 0,
      pendingOrders: 0,
      revenue: 0,
    };
  }
}
