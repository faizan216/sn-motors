import Link from "next/link";
import { Plus, Tag, BarChart3, ShoppingBag, Search } from "lucide-react";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminSettingsLink from "@/components/admin/AdminSettingsLink";
import Pagination from "@/components/ui/Pagination";
import { getProductsData, getAdminStatsData } from "@/lib/data";

export const metadata = { title: "Admin Panel | SN Motors" };

export default async function AdminPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";
  const limit = 50;

  const [{ data: products, pagination }, stats] = await Promise.all([
    getProductsData({ page, limit, search }),
    getAdminStatsData(),
  ]);

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
            {stats.pendingOrders > 0 && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">{stats.pendingOrders}</span>
            )}
          </Link>
          <Link href="/admin/add" className="btn-primary"><Plus size={18} /> Add Product</Link>
          <AdminSettingsLink />
          <AdminLogoutButton />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Products",       value: stats.totalProducts, color: "text-brand-blue" },
          { label: "In Stock",       value: stats.inStockProducts, color: "text-green-600" },
          { label: "Categories",     value: stats.totalCategories, color: "text-purple-600" },
          { label: "Pending Orders", value: stats.pendingOrders, color: "text-yellow-500" },
          { label: "Revenue",        value: `Rs. ${stats.revenue.toLocaleString()}`, color: "text-brand-blue" },
        ].map(({ label, value, color }) => (
          <div key={label} className="admin-card">
            <p className={`text-xl font-display font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/add" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center group-hover:bg-brand-blue transition-colors">
            <Plus size={20} className="text-brand-blue group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">Add New Product</p>
            <p className="text-xs text-gray-400">Add to catalogue</p>
          </div>
        </Link>
        <Link href="/admin/categories" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-purple-50 rounded-sm flex items-center justify-center group-hover:bg-purple-500 transition-colors">
            <Tag size={20} className="text-purple-500 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">Manage Categories</p>
            <p className="text-xs text-gray-400">Add or remove</p>
          </div>
        </Link>
        <Link href="/admin/orders" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-yellow-50 rounded-sm flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
            <ShoppingBag size={20} className="text-yellow-500 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">View All Orders</p>
            <p className="text-xs text-gray-400">{stats.pendingOrders} pending</p>
          </div>
        </Link>
        <Link href="/" target="_blank" className="admin-card flex items-center gap-3 hover:border-brand-blue border border-transparent transition-colors group">
          <div className="w-10 h-10 bg-green-50 rounded-sm flex items-center justify-center group-hover:bg-green-500 transition-colors">
            <BarChart3 size={20} className="text-green-500 group-hover:text-white" />
          </div>
          <div>
            <p className="font-semibold text-brand-dark text-sm">View Storefront</p>
            <p className="text-xs text-gray-400">Live store</p>
          </div>
        </Link>
      </div>

      {/* Products Table */}
      <div className="admin-card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-bold text-lg uppercase tracking-wide text-brand-dark">All Products</h2>
            <span className="text-sm text-gray-400">({pagination.total} total)</span>
          </div>
          <form className="relative sm:w-64" action="/admin" method="GET">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-brand-blue"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </form>
        </div>
        <AdminProductTable products={products} />
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              searchParams={searchParams}
              baseUrlPath="/admin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
