"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Upload, X, ChevronDown, Plus, Tag } from "lucide-react";
import { CAR_DATA, MAKES } from "@/lib/carData";

const CATEGORIES = [
  "Headlights","Tail Lights","Bodykit","Conversion","Grill",
  "Spoilers","Carbon Fiber Trims","Interior","Matts","PPF","Android Panel",
];

const EMPTY = {
  name: "", price: "", discount: "0", image: "", images: [],
  description: "", category: "Headlights", stock: "", brand: "",
  sku: "", rating: "4.5", reviewCount: "0", featured: false,
  make: "", model: "",
};

export default function ProductForm({ mode, product }) {
  const router  = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState(product ? {
    ...product,
    price:       String(product.price),
    discount:    String(product.discount ?? 0),
    stock:       String(product.stock),
    rating:      String(product.rating ?? 4.5),
    reviewCount: String(product.reviewCount ?? 0),
    make:        product.make  || "",
    model:       product.model || "",
    images:      product.images || [],
  } : EMPTY);

  const [loading,       setLoading]       = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");

  const models    = form.make ? CAR_DATA[form.make] || [] : [];
  const salePrice = form.price && parseFloat(form.discount) > 0
    ? Math.round(parseFloat(form.price) * (1 - parseFloat(form.discount) / 100))
    : null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "make") {
      setForm((f) => ({ ...f, make: value, model: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res  = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error || "Upload failed");
    return json.url;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadLoading(true);
    setError("");
    try {
      const urls      = await Promise.all(files.map(uploadFile));
      const allImages = [...(form.images || []), ...urls];
      setForm((f) => ({ ...f, images: allImages, image: f.image || allImages[0] }));
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploadLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (idx) => {
    const newImages = form.images.filter((_, i) => i !== idx);
    setForm((f) => ({ ...f, images: newImages, image: newImages[0] || "" }));
  };

  const setPrimary = (url) => setForm((f) => ({ ...f, image: url }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const payload = {
      ...form,
      price:       parseFloat(form.price),
      discount:    parseFloat(form.discount) || 0,
      stock:       parseInt(form.stock),
      rating:      parseFloat(form.rating),
      reviewCount: parseInt(form.reviewCount),
      sku:         form.sku.trim() || undefined,
      images:      form.images || [],
    };
    try {
      const url    = mode === "edit" ? `/api/products/${product._id}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json   = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setSuccess(mode === "edit" ? "Product updated!" : "Product added!");
      if (mode === "add") {
        setForm(EMPTY);
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setTimeout(() => { router.refresh(); router.push("/admin"); }, 1000);
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
        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. BMW E90 LED Headlights" className="input-field" />
      </div>

      {/* Price + Discount + Stock */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Price (Rs.) <span className="text-red-500">*</span></label>
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="15000" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            <Tag size={12} className="inline mr-1 text-brand-blue" />Discount %
          </label>
          <input name="discount" type="number" min="0" max="100" step="1" value={form.discount} onChange={handleChange} placeholder="0" className="input-field" />
          {salePrice && (
            <p className="text-xs text-green-600 mt-1">Sale price: Rs. {salePrice.toLocaleString()}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Stock <span className="text-red-500">*</span></label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required placeholder="10" className="input-field" />
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
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Osram, Philips, OEM" className="input-field" />
        </div>
      </div>

      {/* Make + Model */}
      <div className="border border-blue-100 rounded-sm p-4 bg-blue-50 space-y-3">
        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">Car Compatibility</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Car Make</label>
            <div className="relative">
              <select name="make" value={form.make} onChange={handleChange} className="input-field appearance-none pr-8">
                <option value="">Select Make...</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Car Model</label>
            <div className="relative">
              <select name="model" value={form.model} onChange={handleChange} disabled={!form.make || form.make === "Universal"} className="input-field appearance-none pr-8 disabled:opacity-40">
                <option value="">{form.make === "Universal" ? "All Models" : form.make ? "Select Model..." : "Select Make first"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <p className="text-xs text-blue-500">Select &quot;Universal&quot; if this part fits all cars</p>
      </div>

      {/* Multiple Images */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          Product Images <span className="text-red-500">*</span>
          <span className="text-xs text-gray-400 font-normal ml-2">(click image to set as primary)</span>
        </label>

        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="image-upload" />
        <label htmlFor="image-upload" className={`flex flex-col items-center justify-center border-2 border-dashed rounded-sm p-6 cursor-pointer transition-colors ${uploadLoading ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-brand-blue hover:bg-blue-50"}`}>
          {uploadLoading
            ? <><Loader2 size={24} className="text-brand-blue animate-spin mb-2" /><span className="text-sm text-brand-blue">Uploading...</span></>
            : <><Upload size={24} className="text-gray-400 mb-2" /><span className="text-sm font-semibold text-gray-600">Click to upload images</span><span className="text-xs text-gray-400 mt-1">Select multiple — JPG, PNG, WEBP up to 5MB each</span></>
          }
        </label>

        {form.images && form.images.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {form.images.map((url, idx) => (
              <div key={idx} className={`relative group cursor-pointer rounded-sm overflow-hidden border-2 transition-all ${url === form.image ? "border-brand-blue" : "border-gray-200 hover:border-brand-blue"}`} onClick={() => setPrimary(url)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Product ${idx + 1}`} className="w-24 h-24 object-cover" />
                {url === form.image && (
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-blue text-white text-[9px] text-center py-0.5 font-bold">PRIMARY</div>
                )}
                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={11} />
                </button>
              </div>
            ))}
            <label htmlFor="image-upload" className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center cursor-pointer hover:border-brand-blue transition-colors">
              <Plus size={20} className="text-gray-400" />
            </label>
          </div>
        )}
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
          <input name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. HL-001" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Rating (0-5)</label>
          <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Review Count</label>
          <input name="reviewCount" type="number" min="0" value={form.reviewCount} onChange={handleChange} className="input-field" />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3 py-2">
        <input id="featured" name="featured" type="checkbox" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-brand-blue" />
        <label htmlFor="featured" className="text-sm font-semibold text-brand-dark cursor-pointer">
          Mark as Featured Product
          <span className="block text-xs text-gray-400 font-normal">Featured products appear on the homepage</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={loading || uploadLoading} className="btn-primary flex-1 justify-center py-3">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {mode === "edit" ? "Update Product" : "Add Product"}</>}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-outline px-6">Cancel</button>
      </div>
    </form>
  );
}