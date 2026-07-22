"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Upload, X, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "Headlights","Tail Lights","Bodykit","Conversion","Grill",
  "Spoilers","Carbon Fiber Trims","Interior","Matts","PPF","Android Panel",
];

const CAR_DATA = {
  "Toyota":    ["Corolla","Yaris","Camry","Prado","Fortuner","Hilux","Land Cruiser","Vitz","Aqua","Crown","CHR","Rush"],
  "Honda":     ["Civic","City","BR-V","HR-V","Accord","CR-V","Fit","Jazz","Freed","Vezel","WR-V"],
  "Suzuki":    ["Alto","Cultus","Swift","Wagon R","Jimny","Vitara","Celerio","Ertiga","Bolan","Ravi"],
  "Kia":       ["Sportage","Picanto","Stonic","Sorento","Carnival","Stinger","Cerato","K5"],
  "Hyundai":   ["Tucson","Elantra","Sonata","Santa Fe","i10","i20","Ioniq","Creta","Porter"],
  "Changan":   ["Alsvin","Oshan X7","Uni-T","Uni-K","CS35 Plus","CS55 Plus","Hunter","Kaicene F70"],
  "MG":        ["HS","ZS","5","GT","RX5","Marvel R","One","VS HEV"],
  "BMW":       ["3 Series","5 Series","7 Series","X1","X3","X5","X6","M3","M5","i3","i8"],
  "Mercedes":  ["C-Class","E-Class","S-Class","GLC","GLE","A-Class","CLA","AMG GT"],
  "Audi":      ["A3","A4","A5","A6","Q3","Q5","Q7","TT","R8","e-tron"],
  "Nissan":    ["Dayz","Note","Juke","X-Trail","Patrol","Navara","370Z","GT-R","Leaf"],
  "Mitsubishi":["Outlander","Pajero","Eclipse Cross","L200","ASX","Galant","Lancer"],
  "Daihatsu":  ["Mira","Move","Cast","Tanto","Rocky","Terios","Hijet"],
  "Subaru":    ["Forester","Outback","XV","Impreza","Legacy","WRX","BRZ"],
  "Mazda":     ["3","6","CX-3","CX-5","CX-9","MX-5","RX-8"],
  "Haval":     ["H6","Jolion","H1","H2","H9","Dargo"],
  "Proton":    ["Saga","X50","X70","Iriz","Persona","Ertiga"],
  "DFSK":      ["Glory 580","Glory 500","Seres 3","EC35"],
  "Prince":    ["Pearl","DFSK Mini Truck"],
  "FAW":       ["V2","Carrier","Sirius","X-PV"],
  "Universal": ["All Models"],
};

const MAKES = ["Universal", ...Object.keys(CAR_DATA).filter(k => k !== "Universal").sort()];

const EMPTY = {
  name: "", price: "", image: "", description: "",
  category: "Headlights", stock: "", brand: "", sku: "",
  rating: "4.5", reviewCount: "0", featured: false,
  make: "", model: "",
};

export default function ProductForm({ mode, product }) {
  const router  = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState(product ? {
    ...product,
    price:       String(product.price),
    stock:       String(product.stock),
    rating:      String(product.rating ?? 4.5),
    reviewCount: String(product.reviewCount ?? 0),
    make:        product.make  || "",
    model:       product.model || "",
  } : EMPTY);

  const [loading,       setLoading]       = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error,         setError]         = useState("");
  const [success,       setSuccess]       = useState("");
  const [imagePreview,  setImagePreview]  = useState(product?.image || "");
  const [uploadMethod,  setUploadMethod]  = useState("upload");

  const models = form.make ? CAR_DATA[form.make] || [] : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "make") {
      setForm((f) => ({ ...f, make: value, model: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);

    setUploadLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res  = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.success) throw new Error(json.error || "Upload failed");

      setForm((f) => ({ ...f, image: json.url }));
      setImagePreview(json.url);
    } catch (err) {
      setError(`Image upload failed: ${err.message}`);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    setForm((f) => ({ ...f, image: e.target.value }));
    setImagePreview(e.target.value);
  };

  const clearImage = () => {
    setForm((f) => ({ ...f, image: "" }));
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
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
        setImagePreview("");
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
        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. BMW E90 LED Headlights" className="input-field" />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Price (Rs.) <span className="text-red-500">*</span></label>
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="e.g. 15000" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required placeholder="e.g. 10" className="input-field" />
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
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Car Make (Brand)</label>
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
              <select
                name="model"
                value={form.model}
                onChange={handleChange}
                disabled={!form.make || form.make === "Universal"}
                className="input-field appearance-none pr-8 disabled:opacity-40"
              >
                <option value="">{form.make === "Universal" ? "All Models" : form.make ? "Select Model..." : "Select Make first"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <p className="text-xs text-blue-500">Select &quot;Universal&quot; if this part fits all cars</p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">Product Image <span className="text-red-500">*</span></label>

        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setUploadMethod("upload")}
            className={`text-xs px-3 py-1.5 rounded-sm font-semibold transition-colors ${uploadMethod === 'upload' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            📁 Upload from Device
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod("url")}
            className={`text-xs px-3 py-1.5 rounded-sm font-semibold transition-colors ${uploadMethod === 'url' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            🔗 Use Image URL
          </button>
        </div>

        {uploadMethod === "upload" ? (
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-sm p-6 cursor-pointer transition-colors ${
                uploadLoading ? "border-brand-blue bg-blue-50" : "border-gray-200 hover:border-brand-blue hover:bg-blue-50"
              }`}
            >
              {uploadLoading ? (
                <><Loader2 size={24} className="text-brand-blue animate-spin mb-2" /><span className="text-sm text-brand-blue">Uploading...</span></>
              ) : (
                <><Upload size={24} className="text-gray-400 mb-2" /><span className="text-sm font-semibold text-gray-600">Click to upload image</span><span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB</span></>
              )}
            </label>
          </div>
        ) : (
          <input
            type="url"
            value={form.image}
            onChange={handleUrlChange}
            placeholder="https://images.unsplash.com/..."
            className="input-field"
          />
        )}

        {imagePreview && (
          <div className="mt-3 relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-sm border border-gray-200"
              onError={() => setImagePreview("")}
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <X size={12} />
            </button>
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
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Rating (0–5)</label>
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
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
            : <><Save size={16} /> {mode === "edit" ? "Update Product" : "Add Product"}</>
          }
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn-outline px-6">Cancel</button>
      </div>
    </form>
  );
}