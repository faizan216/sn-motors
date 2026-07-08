"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, MessageCircle, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const params      = useSearchParams();
  const orderNumber = params.get("order") || "SN-1001";
  const total       = params.get("total") || "0";

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
      {/* Success icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={44} className="text-green-500" />
      </div>

      <h1 className="font-display text-4xl font-bold uppercase text-brand-dark mb-2">
        Order Placed!
      </h1>
      <p className="text-gray-500 mb-8">
        Thank you for shopping with SN Motors. Your order has been received.
      </p>

      {/* Order details card */}
      <div className="admin-card text-left space-y-3 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Order Number</span>
          <span className="font-bold text-brand-blue text-base">{orderNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Amount</span>
          <span className="font-bold text-brand-dark">Rs. {parseInt(total).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status</span>
          <span className="badge bg-yellow-100 text-yellow-700">Pending Confirmation</span>
        </div>
      </div>

      {/* Next steps */}
      <div className="admin-card text-left mb-8">
        <h3 className="font-display font-bold uppercase text-sm tracking-wide mb-3 text-brand-dark">What happens next?</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            "Our team will call you within 2 hours to confirm your order",
            "Your parts will be dispatched within 24 hours",
            "Delivery takes 2–5 working days depending on your city",
            "You can also track your order by contacting us on WhatsApp",
          ].map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand-blue font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/923288167552?text=${encodeURIComponent(`Hi, I just placed order ${orderNumber} on SN Motors. Please confirm my order.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-sm transition-colors"
        >
          <MessageCircle size={16} /> Confirm on WhatsApp
        </a>
        <Link href="/products" className="btn-outline justify-center">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
