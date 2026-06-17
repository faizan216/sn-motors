import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center animate-fade-in">
      <p className="font-display text-8xl font-extrabold text-brand-red opacity-20 mb-0">404</p>
      <h1 className="font-display text-3xl font-bold text-brand-steel uppercase -mt-4 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-400 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/products" className="btn-secondary">Browse Parts</Link>
      </div>
    </div>
  );
}
