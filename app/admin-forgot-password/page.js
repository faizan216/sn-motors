"use client";
import { useState } from "react";
import Link from "next/link";
import { KeyRound, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function AdminForgotPasswordPage() {
  const [step,        setStep]    = useState(1);
  const [code,        setCode]    = useState("");
  const [newPassword, setNew]     = useState("");
  const [loading,     setLoading] = useState(false);
  const [error,       setError]   = useState("");
  const [success,     setSuccess] = useState("");

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res  = await fetch("/api/admin/forgot-password", { method: "POST" });
    const json = await res.json();
    if (res.ok) { setStep(2); setSuccess(json.message || "Code sent!"); }
    else setError(json.error || "Failed to send code");
    setLoading(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res  = await fetch("/api/admin/forgot-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, newPassword }),
    });
    const json = await res.json();
    if (res.ok) { setStep(3); }
    else setError(json.error || "Invalid code");
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-brand-smoke">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center mx-auto mb-4">
            <KeyRound size={28} className="text-brand-blue" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide">Reset Password</h1>
          <p className="text-gray-400 text-sm mt-1">SN Motors Admin</p>
        </div>

        <div className="admin-card space-y-4">
          {error   && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">{error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm flex items-center gap-2"><CheckCircle size={14} />{success}</div>}

          {step === 1 && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <p className="text-sm text-gray-500">
                Click below to send a 6-digit reset code to <strong>snmotors207@gmail.com</strong>
              </p>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : "Send Reset Code to Email"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email.</p>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Reset Code</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required placeholder="Enter 6-digit code" className="input-field" maxLength={6} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNew(e.target.value)} required minLength={8} placeholder="Min 8 characters" className="input-field" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Resetting...</> : "Reset Password"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-brand-dark">Password reset successfully!</p>
              <Link href="/admin-login" className="btn-primary mt-4 inline-flex">Go to Login</Link>
            </div>
          )}

          <div className="text-center pt-2 border-t border-gray-100">
            <Link href="/admin-login" className="text-sm text-brand-blue hover:underline flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}