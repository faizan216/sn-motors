import Link from "next/link";
import { Plus, Package, Tag, BarChart3 } from "lucide-react";
import AdminProductTable from "@/components/admin/AdminProductTable";

async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?limit=100`, { cache: "no-store" });
    if (!res.ok) return { data: [], pagination: { total: 0 } };
    return res.json();
  } catch { return { data: [], pagination: { total: 0 } }; }
}

export const metadata = { title: "Admin Panel | SN Motors" };

export default async function AdminPage() {
  const { data: products, pagination } = await getProducts();

  const categories = [...new Set(products.map((p) => p.category))];
  const inStock    = products.filter((p) => p.stock > 0).length;
  const featured   = products.filter((p) => p.featured).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading">Admin Panel</h1>
          <p className="section-subheading">Manage your SN Motors product catalogue</p>
        </div>
        <Link href="/admin/add" className="btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Products", value: pagination?.total ?? products.length, icon: Package,  color: "text-brand-blue" },
          { label: "In Stock",       value: inStock,    icon: BarChart3, color: "text-green-600" },
          { label: "Categories",     value: categories.length, icon: Tag, color: "text-purple-600" },
          { label: "Featured",       value: featured,   icon: BarChart3, color: "text-orange-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="admin-card flex items-center gap-4">
            <Icon size={28} className={color} />
            <div>
              <p className="text-2xl font-display font-bold text-brand-dark">{value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
            </div>
          </div>
        ))}
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
