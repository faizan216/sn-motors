"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff, Save, Loader2, CheckCircle, Shield } from "lucide-react";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new:     false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleShow = (field) =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }
    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res  = await fetch("/api/admin/change-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to change password");

      setSuccess("Password changed successfully! Use your new password next time you login.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const strengthCheck = (pwd) => {
    if (!pwd) return null;
    const checks = [
      { label: "At least 8 characters", pass: pwd.length >= 8 },
      { label: "Contains a number",     pass: /\d/.test(pwd) },
      { label: "Contains a symbol",     pass: /[!@#$%^&*]/.test(pwd) },
      { label: "Contains uppercase",    pass: /[A-Z]/.test(pwd) },
    ];
    return checks;
  };

  const strength = strengthCheck(form.newPassword);
  const strengthScore = strength ? strength.filter((c) => c.pass).length : 0;
  const strengthColor = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"][strengthScore - 1] || "bg-gray-200";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-brand-blue flex items-center gap-1 hover:underline mb-3">
            <ArrowLeft size={14} /> Back to Admin
          </Link>
          <h1 className="section-heading">Admin Settings</h1>
          <p className="section-subheading">Manage your admin account security</p>
        </div>
        <AdminLogoutButton />
      </div>

      {/* Security card */}
      <div className="admin-card mb-6 flex items-center gap-4 border-l-4 border-brand-blue">
        <Shield size={32} className="text-brand-blue shrink-0" />
        <div>
          <p className="font-semibold text-brand-dark">Password stored securely in MongoDB</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Your password is hashed and stored in the database. Changes take effect immediately — no need to update Vercel.
          </p>
        </div>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="admin-card space-y-5">
        <h2 className="font-display font-bold text-lg uppercase tracking-wide border-b border-gray-100 pb-3 flex items-center gap-2">
          <Lock size={18} className="text-brand-blue" /> Change Password
        </h2>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">{error}</div>}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm text-sm flex items-center gap-2">
            <CheckCircle size={16} /> {success}
          </div>
        )}

        {/* Current Password */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
              placeholder="Enter current password"
              className="input-field pr-10"
            />
            <button type="button" onClick={() => toggleShow("current")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue">
              {show.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter new password"
              className="input-field pr-10"
            />
            <button type="button" onClick={() => toggleShow("new")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue">
              {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Strength meter */}
          {form.newPassword && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strengthScore ? strengthColor : "bg-gray-200"}`} />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-1">
                {strength.map((c) => (
                  <li key={c.label} className={`text-xs flex items-center gap-1 ${c.pass ? "text-green-600" : "text-gray-400"}`}>
                    <span>{c.pass ? "✓" : "○"}</span> {c.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
              className={`input-field pr-10 ${form.confirmPassword && form.confirmPassword !== form.newPassword ? "border-red-300 focus:ring-red-300" : ""}`}
            />
            <button type="button" onClick={() => toggleShow("confirm")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue">
              {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {form.confirmPassword && form.confirmPassword !== form.newPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
          {form.confirmPassword && form.confirmPassword === form.newPassword && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle size={11} /> Passwords match</p>
          )}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Changing Password...</>
              : <><Save size={16} /> Change Password</>
            }
          </button>
        </div>
      </form>

      {/* Info box */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-sm p-4 text-sm text-blue-700">
        <p className="font-semibold mb-1">💡 How it works</p>
        <ul className="space-y-1 text-xs text-blue-600">
          <li>• Your new password is saved in MongoDB — no Vercel changes needed</li>
          <li>• The original password in <code className="bg-blue-100 px-1 rounded">.env</code> becomes a backup only</li>
          <li>• Password is stored as a secure SHA-256 hash</li>
          <li>• Changes take effect immediately on the live site</li>
        </ul>
      </div>
    </div>
  );
}
