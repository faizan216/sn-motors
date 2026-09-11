import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getProductByIdData } from "@/lib/data";

export const metadata = { title: "Edit Product | Admin" };

export default async function EditProductPage({ params }) {
  const product = await getProductByIdData(params.id);
  if (!product) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-brand-blue flex items-center gap-1 hover:underline mb-4">
          <ArrowLeft size={14} /> Back to Admin
        </Link>
        <h1 className="section-heading">Edit Product</h1>
        <p className="section-subheading">Update the details for <strong>{product.name}</strong></p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
