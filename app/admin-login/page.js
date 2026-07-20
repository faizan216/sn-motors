"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ username: "", password: "" });
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin"); router.refresh(); }
    else { setError("Incorrect username or password."); setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-brand-smoke">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-brand-blue" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-1">SN Motors — Restricted Area</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-card space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm text-center">{error}</div>}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Username</label>
            <div className="relative">
              <input type="text" value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} required autoFocus placeholder="Enter username" className="input-field pl-9" />
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Password</label>
            <div className="relative">
              <input type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required placeholder="Enter password" className="input-field pl-9 pr-10" />
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : <><Lock size={16} /> Login</>}
          </button>
          <div className="text-center">
            <Link href="/admin-forgot-password" className="text-sm text-brand-blue hover:underline">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}