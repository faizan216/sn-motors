"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import useCartStore from "@/lib/cartStore";

const CITIES = [
  "Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad",
  "Multan","Peshawar","Quetta","Sialkot","Gujranwala",
  "Hyderabad","Abbottabad","Other",
];

const PAYMENT_METHODS = [
  {
    id: "COD",
    label: "Cash on Delivery",
    desc: "Pay when you receive your order",
    icon: "💵",
    detail: null,
  },
  {
    id: "JazzCash",
    label: "JazzCash",
    desc: "Send to: 0328-1339780",
    icon: "🟠",
    detail: "After payment, send screenshot on WhatsApp: 0328-1339780",
  },
  {
    id: "EasyPaisa",
    label: "EasyPaisa",
    desc: "Send to: 0328-1339780",
    icon: "🟢",
    detail: "After payment, send screenshot on WhatsApp: 0328-1339780",
  },
  {
    id: "Bank Transfer",
    label: "Bank Transfer (UBL)",
    desc: "Shehroz / Sahrooz — AC: 0516381418409",
    icon: "🏦",
    detail: "IBAN: PK84UNIL0109000381418409 | After transfer, send screenshot on WhatsApp: 0328-1339780",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "Lahore", notes: "",
  });
  const [payment, setPayment] = useState("COD");

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold uppercase mb-3">Your Cart is Empty</h1>
        <Link href="/products" className="btn-primary mt-4 inline-flex">Browse Parts</Link>
      </div>
    );
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total    = subtotal + shipping;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customer: {
        name:    form.name,
        phone:   form.phone,
        email:   form.email,
        address: form.address,
        city:    form.city,
      },
      items: items.map((i) => ({
        productId: i._id,
        name:      i.name,
        price:     i.price,
        quantity:  i.quantity,
        image:     i.image,
        category:  i.category,
      })),
      subtotal,
      shipping,
      total,
      paymentMethod: payment,
      notes: form.notes,
    };

    try {
      const res  = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to place order");

      clearCart();
      router.push(`/order-success?order=${json.data.orderNumber}&total=${total}`);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const sendWhatsApp = () => {
    const itemsList = items.map((i) => `• ${i.name} x${i.quantity} = Rs.${(i.price * i.quantity).toLocaleString()}`).join("\n");
    const message = `🛒 *New Order - SN Motors*\n\n*Customer:* ${form.name || "Not filled"}\n*Phone:* ${form.phone || "Not filled"}\n*City:* ${form.city}\n*Address:* ${form.address || "Not filled"}\n\n*Items:*\n${itemsList}\n\n*Subtotal:* Rs.${subtotal.toLocaleString()}\n*Shipping:* Rs.${shipping}\n*Total:* Rs.${total.toLocaleString()}\n\n*Payment:* ${payment}`;
    window.open(`https://wa.me/923281339780?text=${encodeURIComponent(message)}`, "_blank");
  };

  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === payment);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-6">
        <Link href="/cart" className="text-sm text-brand-blue flex items-center gap-1 hover:underline mb-3">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <h1 className="section-heading">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="admin-card space-y-4">
              <h2 className="font-display font-bold text-lg uppercase tracking-wide border-b border-gray-100 pb-3">Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Muhammad Ali" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="03XX-XXXXXXX" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email (Optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">City <span className="text-red-500">*</span></label>
                <select name="city" value={form.city} onChange={handleChange} required className="input-field">
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Delivery Address <span className="text-red-500">*</span></label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={3} placeholder="House No, Street, Area, City" className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Order Notes (Optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Car model, color preferences, special instructions..." className="input-field resize-none" />
              </div>
            </div>

            {/* Payment */}
            <div className="admin-card space-y-3">
              <h2 className="font-display font-bold text-lg uppercase tracking-wide border-b border-gray-100 pb-3">Payment Method</h2>
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className={`flex items-start gap-4 p-4 border-2 rounded-sm cursor-pointer transition-all ${payment === m.id ? "border-brand-blue bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}>
                  <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-brand-blue mt-0.5" />
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">{m.label}</p>
                    <p className="text-xs text-gray-500">{m.desc}</p>
                    {payment === m.id && m.detail && (
                      <p className="text-xs text-brand-blue mt-1 font-medium">ℹ️ {m.detail}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="admin-card sticky top-24 space-y-4">
              <h2 className="font-display font-bold text-lg uppercase tracking-wide border-b border-gray-100 pb-3">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-dark line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-blue shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-brand-dark border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-brand-blue">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Placing Order...</> : <><CheckCircle size={18} /> Place Order</>}
              </button>

              <button type="button" onClick={sendWhatsApp} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-sm transition-colors text-sm">
                <MessageCircle size={16} /> Order via WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center">By placing your order you agree to our terms and conditions.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
