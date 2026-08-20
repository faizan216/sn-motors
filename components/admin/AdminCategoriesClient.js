"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from "lucide-react";

const COLOR_OPTIONS = [
  { label: "Yellow",  value: "bg-yellow-50 border-yellow-300 hover:border-yellow-500 hover:bg-yellow-100"  },
  { label: "Red",     value: "bg-red-50 border-red-300 hover:border-red-500 hover:bg-red-100"              },
  { label: "Blue",    value: "bg-blue-50 border-blue-300 hover:border-blue-500 hover:bg-blue-100"          },
  { label: "Purple",  value: "bg-purple-50 border-purple-300 hover:border-purple-500 hover:bg-purple-100"  },
  { label: "Gray",    value: "bg-zinc-50 border-zinc-400 hover:border-zinc-600 hover:bg-zinc-100"          },
  { label: "Indigo",  value: "bg-indigo-50 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-100"  },
  { label: "Dark",    value: "bg-gray-100 border-gray-400 hover:border-gray-600 hover:bg-gray-200"         },
  { label: "Amber",   value: "bg-amber-50 border-amber-300 hover:border-amber-500 hover:bg-amber-100"      },
  { label: "Orange",  value: "bg-orange-50 border-orange-300 hover:border-orange-500 hover:bg-orange-100"  },
  { label: "Green",   value: "bg-green-50 border-green-300 hover:border-green-500 hover:bg-green-100"      },
  { label: "Cyan",    value: "bg-cyan-50 border-cyan-300 hover:border-cyan-500 hover:bg-cyan-100"          },
  { label: "Pink",    value: "bg-pink-50 border-pink-300 hover:border-pink-500 hover:bg-pink-100"          },
];

const EMPTY = { name: "", description: "", color: COLOR_OPTIONS[0].value };

export default function AdminCategoriesClient() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");
  const [showForm,   setShowForm]   = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [form,       setForm]       = useState(EMPTY);
  const [deleteId,   setDeleteId]   = useState(null);

  const fetchCategories = async () => {
    try {
      const res  = await fetch("/api/categories");
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch { setError("Failed to load categories"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const url    = editId ? `/api/categories/${editId}` : "/api/categories";
      const method = editId ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSuccess(editId ? "Category updated!" : "Category added!");
      setForm(EMPTY);
      setShowForm(false);
      setEditId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description || "", color: cat.color });
    setEditId(cat._id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) { fetchCategories(); setDeleteId(null); }
    } catch { setError("Failed to delete"); }
  };

  const handleToggle = async (cat) => {
    try {
      await fetch(`/api/categories/${cat._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !cat.active }),
      });
      fetchCategories();
    } catch { setError("Failed to update"); }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <Loader2 size={32} className="animate-spin text-brand-blue mx-auto" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading">Manage Categories</h1>
          <p className="section-subheading">Add, edit or remove product categories</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); setError(""); setSuccess(""); }}
          className="btn-primary"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {error   && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm mb-4">{success}</div>}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="admin-card mb-6">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide mb-4 border-b border-gray-100 pb-3">
            {editId ? "Edit Category" : "Add New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Category Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  placeholder="e.g. Fog Lights"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="e.g. Front fog light upgrades"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Card Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, color: c.value }))}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm border-2 transition-all ${c.value} ${form.color === c.value ? "ring-2 ring-brand-blue ring-offset-1" : ""}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {editId ? "Update" : "Add"} Category</>}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY); }} className="btn-outline px-6">
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-lg uppercase mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently delete this category. Products using it will need to be updated.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="btn-danger flex-1 justify-center">Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} className="btn-outline flex-1 justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="admin-card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide text-brand-dark">All Categories</h2>
          <span className="text-sm text-gray-400">{categories.length} categories</span>
        </div>
        <div className="divide-y divide-gray-50">
          {categories.map((cat) => (
            <div key={cat._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <GripVertical size={16} className="text-gray-300 shrink-0" />
              <div className={`w-10 h-10 rounded-sm border-2 shrink-0 ${cat.color}`} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-dark">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Toggle active */}
                <button
                  onClick={() => handleToggle(cat)}
                  className={`text-xs px-2 py-1 rounded-sm font-semibold transition-colors ${cat.active ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700" : "bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700"}`}
                >
                  {cat.active ? "Active" : "Hidden"}
                </button>
                <button onClick={() => handleEdit(cat)} className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-sm transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => setDeleteId(cat._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}