import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Add Product | Admin" };

export default function AddProductPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-brand-blue flex items-center gap-1 hover:underline mb-4">
          <ArrowLeft size={14} /> Back to Admin
        </Link>
        <h1 className="section-heading">Add New Product</h1>
        <p className="section-subheading">Fill in the details below to add a product to SN Motors</p>
      </div>
      <ProductForm mode="add" />
    </div>
  );
}
