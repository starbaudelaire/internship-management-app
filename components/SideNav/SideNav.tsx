"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  // Ini menu navigasinya
  const navItems = [
    { label: "Dashboard", href: "/student/dashboard", icon: "🏠" },
    { label: "Apply Magang", href: "/student/apply", icon: "📝" },
    { label: "Status", href: "/student/status", icon: "🔍" },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* BAGIAN LOGO */}
      <div className="p-6 border-b border-gray-100 flex justify-center">
        {/* Pastiin gambar ini ada di folder public/images/ */}
        <img
          src="/images/MAN LOGO.png"
          alt="Logo Kampus"
          className="w-32 h-auto object-contain"
        />
      </div>

      {/* BAGIAN MENU */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* BAGIAN BAWAH (LOGOUT) */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
