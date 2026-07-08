import Link from "next/link";
import { Plus, Package, Tag, BarChart3, ShoppingBag, LogOut } from "lucide-react";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?limit=100`, { cache: "no-store" });
    if (!res.ok) return { data: [], pagination: { total: 0 } };
    return res.json();
  } catch { return { data: [], pagination: { total: 0 } }; }
}

async function getOrderStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/orders?limit=100`, { cache: "no-store" });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch { return { data: [] }; }
}

export const metadata = { title: "Admin Panel | SN Motors" };

export default async function AdminPage() {
  const [{ data: products, pagination }, { data: orders }] = await Promise.all([
    getProducts(),
    getOrderStats(),
  ]);

  const categories   = [...new Set(products.map((p) => p.category))];
  const inStock      = products.filter((p) => p.stock > 0).length;
  const featured     = products.filter((p) => p.featured).length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const revenue      = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading">Admin Panel</h1>
          <p className="section-subheading">Manage your SN Motors store</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="btn-secondary flex items-center gap-2">
            <ShoppingBag size={16} />
            Orders
            {pendingOrders > 0 && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">{pendingOrders}</span>
            )}
          </Link>
          <Link href="/admin/add" className="btn-primary"><Plus size={18} /> Add Product</Link>
          <AdminLogoutButton />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Products",       value: pagination?.total ?? products.length, color: "text-brand-blue"  },
          { label: "In Stock",       value: inStock,      color: "text-green-600"  },
          { label: "Categories",     value: categories.length, color: "text-purple-600" },
          { label: "Pending Orders", value: pendingOrders, color: "text-yellow-500" },
          { label: "Revenue",        value: `Rs. ${revenue.toLocaleString()}`, color: "text-brand-blue" },
        ].map(({ label, value, color }) => (
          <div key={label} className="admin-card">
            <p className={`text-xl font-display font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/add" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center group-hover:bg-brand-blue transition-colors">
            <Plus size={20} className="text-brand-blue group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">Add New Product</p>
            <p className="text-xs text-gray-400">Add to your catalogue</p>
          </div>
        </Link>
        <Link href="/admin/orders" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-yellow-50 rounded-sm flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
            <ShoppingBag size={20} className="text-yellow-500 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">View All Orders</p>
            <p className="text-xs text-gray-400">{pendingOrders} pending orders</p>
          </div>
        </Link>
        <Link href="/" target="_blank" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-green-50 rounded-sm flex items-center justify-center group-hover:bg-green-500 transition-colors">
            <BarChart3 size={20} className="text-green-500 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">View Store</p>
            <p className="text-xs text-gray-400">See live storefront</p>
          </div>
        </Link>
      </div>

      {/* Products Table */}
      <div className="admin-card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide text-brand-dark">All Products</h2>
          <span className="text-sm text-gray-400">{products.length} products</span>
        </div>
        <AdminProductTable products={products} />
      </div>
    </div>
  );
}
