"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Headlights",
  "Tail Lights",
  "Bodykit",
  "Conversion",
  "Grill",
  "Spoilers",
  "Carbon Fiber",
  "Trims",
  "Matts",
  "PPF",
  "Android Panel",
];

const EMPTY = {
  name: "", price: "", image: "", description: "",
  category: "Engine Parts", stock: "", brand: "", sku: "",
  rating: "4.5", reviewCount: "0", featured: false,
};

export default function ProductForm({ mode, product }) {
  const router  = useRouter();
  const [form,   setForm]   = useState(product ? {
    ...product,
    price:       String(product.price),
    stock:       String(product.stock),
    rating:      String(product.rating ?? 4.5),
    reviewCount: String(product.reviewCount ?? 0),
  } : EMPTY);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
  ...form,
  price:       parseFloat(form.price),
  stock:       parseInt(form.stock),
  rating:      parseFloat(form.rating),
  reviewCount: parseInt(form.reviewCount),
  sku:         form.sku.trim() || undefined,
};

    try {
      const url    = mode === "edit" ? `/api/products/${product._id}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Something went wrong");

      setSuccess(mode === "edit" ? "Product updated successfully!" : "Product added successfully!");
      if (mode === "add") {
        setForm(EMPTY);
        setTimeout(() => router.push("/admin"), 1500);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-6">
      {error   && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm">{success}</div>}

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Product Name <span className="text-red-500">*</span></label>
        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Toyota Corolla Engine Rebuild Kit" className="input-field" />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Price (Rs.) <span className="text-red-500">*</span></label>
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="e.g. 5000" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required placeholder="e.g. 25" className="input-field" />
        </div>
      </div>

      {/* Category + Brand */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Category <span className="text-red-500">*</span></label>
          <select name="category" value={form.category} onChange={handleChange} required className="input-field">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Bosch, NGK, KYB" className="input-field" />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Image URL <span className="text-red-500">*</span></label>
        <input name="image" value={form.image} onChange={handleChange} required placeholder="https://images.unsplash.com/..." className="input-field" />
        {form.image && (
          <div className="mt-2 w-24 h-24 relative rounded-sm overflow-hidden border border-gray-100">
            <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = "none"} />
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">Use any image URL from Unsplash, Cloudinary, etc.</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Description <span className="text-red-500">*</span></label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Describe the product, compatibility, specs..." className="input-field resize-none" />
      </div>

      {/* SKU + Rating + Reviews */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">SKU</label>
          <input name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. ENG-001" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Rating (0–5)</label>
          <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Review Count</label>
          <input name="reviewCount" type="number" min="0" value={form.reviewCount} onChange={handleChange} className="input-field" />
        </div>
      </div>

      {/* Featured toggle */}
      <div className="flex items-center gap-3 py-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={form.featured}
          onChange={handleChange}
          className="w-4 h-4 accent-brand-blue"
        />
        <label htmlFor="featured" className="text-sm font-semibold text-brand-dark cursor-pointer">
          Mark as Featured Product
          <span className="block text-xs text-gray-400 font-normal">Featured products appear on the homepage</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {mode === "edit" ? "Update Product" : "Add Product"}</>}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-outline px-6">
          Cancel
        </button>
      </div>
    </form>
  );
}
