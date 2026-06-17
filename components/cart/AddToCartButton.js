"use client";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import useCartStore from "@/lib/cartStore";

export default function AddToCartButton({ product, disabled }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (disabled || added) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`btn-primary flex-1 justify-center py-4 text-base transition-all duration-300 ${added ? "bg-green-600 hover:bg-green-600" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {added ? <><Check size={18} /> Added to Cart!</> : disabled ? "Out of Stock" : <><ShoppingCart size={18} /> Add to Cart</>}
    </button>
  );
}
