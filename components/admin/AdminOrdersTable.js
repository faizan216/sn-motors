"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, ChevronDown } from "lucide-react";

const STATUSES = ["Pending","Confirmed","Processing","Shipped","Delivered","Cancelled"];

const STATUS_COLORS = {
  Pending:    "bg-yellow-100 text-yellow-700",
  Confirmed:  "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped:    "bg-indigo-100 text-indigo-700",
  Delivered:  "bg-green-100 text-green-700",
  Cancelled:  "bg-red-100 text-red-700",
};

export default function AdminOrdersTable({ orders }) {
  const router   = useRouter();
  const [updating, setUpdating] = useState(null);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold text-gray-600">No orders yet</p>
        <p className="text-sm mt-1">Orders will appear here when customers checkout</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Order</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Customer</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Items</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Total</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Payment</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-brand-blue">{order.orderNumber}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-PK")}</p>
              </td>
              <td className="px-4 py-4">
                <p className="font-semibold text-brand-dark">{order.customer.name}</p>
                <p className="text-xs text-gray-400">{order.customer.phone}</p>
                <p className="text-xs text-gray-400">{order.customer.city}</p>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <p className="text-brand-dark">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                <p className="text-xs text-gray-400 line-clamp-1">{order.items.map((i) => i.name).join(", ")}</p>
              </td>
              <td className="px-4 py-4 font-bold text-brand-blue">
                Rs. {order.total.toLocaleString()}
              </td>
              <td className="px-4 py-4 hidden sm:table-cell text-gray-600 text-xs">{order.paymentMethod}</td>
              <td className="px-4 py-4">
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    disabled={updating === order._id}
                    className={`text-xs font-semibold px-2 py-1 rounded-sm border-0 outline-none cursor-pointer appearance-none pr-6 ${STATUS_COLORS[order.status]}`}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${order.customer.name}, your SN Motors order ${order.orderNumber} status has been updated to: ${order.status}. Thank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-semibold"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
