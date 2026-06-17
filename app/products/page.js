import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import ProductsHeader from "@/components/product/ProductsHeader";
import Pagination from "@/components/ui/Pagination";

export const metadata = {
  title: "All Products",
  description: "Browse our full catalogue of car parts and accessories.",
};

async function getProducts(searchParams) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const params = new URLSearchParams();

    if (searchParams?.category)  params.set("category", searchParams.category);
    if (searchParams?.search)    params.set("search",   searchParams.search);
    if (searchParams?.sort)      params.set("sort",     searchParams.sort);
    if (searchParams?.order)     params.set("order",    searchParams.order);
    if (searchParams?.page)      params.set("page",     searchParams.page);
    params.set("limit", "12");

    const res = await fetch(`${baseUrl}/api/products?${params.toString()}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    return { data: [], pagination: { page: 1, pages: 1, total: 0 } };
  }
}

export default async function ProductsPage({ searchParams }) {
  const { data: products, pagination } = await getProducts(searchParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <ProductsHeader total={pagination?.total ?? 0} searchParams={searchParams} />

      <div className="flex gap-8 mt-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <ProductFilters active={searchParams} />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-5xl mb-4">🔧</p>
              <p className="text-xl font-semibold text-gray-600">No parts found</p>
              <p className="text-sm mt-2">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
              <div className="mt-10">
                <Pagination
                  currentPage={pagination?.page ?? 1}
                  totalPages={pagination?.pages ?? 1}
                  searchParams={searchParams}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
