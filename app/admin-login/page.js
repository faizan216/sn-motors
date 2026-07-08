"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-brand-smoke">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-brand-blue" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-dark">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-1">SN Motors — Restricted Area</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin password"
                className="input-field pr-10"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Verifying...</>
              : <><Lock size={16} /> Login to Admin</>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
