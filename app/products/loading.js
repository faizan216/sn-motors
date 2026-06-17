export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header skeleton */}
      <div className="animate-pulse mb-8 space-y-3">
        <div className="h-8 bg-gray-200 rounded w-64" />
        <div className="h-4 bg-gray-100 rounded w-40" />
        <div className="flex gap-3 mt-4">
          <div className="h-10 bg-gray-100 rounded w-80" />
          <div className="h-10 bg-gray-100 rounded w-40" />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-60 shrink-0 animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-200 rounded w-24" />
                  <div className="h-8 w-8 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
