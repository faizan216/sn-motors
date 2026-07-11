import Link from "next/link";
import { Settings } from "lucide-react";

export default function AdminSettingsLink() {
  return (
    <Link
      href="/admin/settings"
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-blue transition-colors px-3 py-2 border border-gray-200 hover:border-brand-blue rounded-sm"
    >
      <Settings size={15} /> Settings
    </Link>
  );
}
