"use client";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import useCartStore from "@/lib/cartStore";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
        <div className="animate-pulse h-4 bg-gray-100 rounded w-64 mx-auto" />
      </div>
    );
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total    = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-fade-in">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-brand-steel uppercase mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-gray-400 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/products" className="btn-primary">
          <ArrowLeft size={16} /> Browse Parts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-heading">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <Trash2 size={14} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4 animate-slide-up">
              <div className="relative w-24 h-24 shrink-0 bg-brand-smoke rounded-sm overflow-hidden border border-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item._id}`}
                  className="font-semibold text-brand-steel hover:text-brand-red transition-colors line-clamp-2 text-sm"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Qty controls */}
                  <div className="flex items-center border border-gray-200 rounded-sm">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-brand-red transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-brand-red transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-brand-red">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold uppercase text-brand-steel mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Add Rs. {(5000 - subtotal).toLocaleString()} more for free delivery
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-brand-steel">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button className="btn-primary w-full justify-center mt-6 py-4 text-base">
              Proceed to Checkout
            </button>

            <Link href="/products" className="block text-center text-sm text-brand-red hover:underline mt-4">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
