import AdminOrdersTable from "@/components/admin/AdminOrdersTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getOrders() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/orders?limit=50`, { cache: "no-store" });
    if (!res.ok) return { data: [], pagination: { total: 0 } };
    return res.json();
  } catch { return { data: [], pagination: { total: 0 } }; }
}

export const metadata = { title: "Orders | Admin" };

export default async function AdminOrdersPage() {
  const { data: orders, pagination } = await getOrders();

  const pending   = orders.filter((o) => o.status === "Pending").length;
  const confirmed = orders.filter((o) => o.status === "Confirmed").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const revenue   = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-brand-blue flex items-center gap-1 hover:underline mb-3">
          <ArrowLeft size={14} /> Back to Admin
        </Link>
        <h1 className="section-heading">Orders</h1>
        <p className="section-subheading">Manage and update customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Orders",  value: pagination?.total ?? orders.length, color: "text-brand-blue" },
          { label: "Pending",       value: pending,   color: "text-yellow-500" },
          { label: "Confirmed",     value: confirmed, color: "text-green-600"  },
          { label: "Total Revenue", value: `Rs. ${revenue.toLocaleString()}`, color: "text-purple-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="admin-card">
            <p className={`text-2xl font-display font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="admin-card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide text-brand-dark">All Orders</h2>
        </div>
        <AdminOrdersTable orders={orders} />
      </div>
    </div>
  );
}
