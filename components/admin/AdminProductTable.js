"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Star, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminProductTable({ products }) {
  const router  = useRouter();
  const [deleting, setDeleting] = useState(null);
  const [confirm,  setConfirm]  = useState(null);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete product.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setDeleting(null);
      setConfirm(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold text-gray-600">No products yet</p>
        <Link href="/admin/add" className="btn-primary mt-4 inline-flex">Add First Product</Link>
      </div>
    );
  }

  return (
    <>
      {/* Delete Confirm Modal */}
      {confirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-lg uppercase mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete <strong>{confirm.name}</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirm._id)}
                disabled={deleting === confirm._id}
                className="btn-danger flex-1 justify-center"
              >
                {deleting === confirm._id ? "Deleting..." : "Yes, Delete"}
              </button>
              <button onClick={() => setConfirm(null)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Product</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Stock</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden lg:table-cell">Featured</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                      <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.brand || "—"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="badge bg-blue-50 text-brand-blue">{product.category}</span>
                </td>
                <td className="px-4 py-4 font-bold text-brand-blue">
                  Rs. {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
                  </span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  {product.featured
                    ? <CheckCircle size={18} className="text-green-500" />
                    : <XCircle size={18} className="text-gray-300" />
                  }
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/edit/${product._id}`}
                      className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-sm transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => setConfirm(product)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
