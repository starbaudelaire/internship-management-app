"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/student/dashboard", icon: "Squares2X2Icon" }, // Icon nanti bisa diganti SVG
    {
      label: "Formulir Magang",
      href: "/student/apply",
      icon: "DocumentTextIcon",
    },
    {
      label: "Status Lamaran",
      href: "/student/status",
      icon: "ClipboardDocumentCheckIcon",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-[#1C2434] duration-300 ease-linear dark:bg-boxdark lg:translate-x-0">
      {/* HEADER LOGO */}
      <div className="flex items-center justify-center gap-2 px-6 py-10">
        <img src="/images/MAN LOGO.png" alt="Logo" className="w-16 h-auto" />
        <span className="text-2xl font-bold text-white">MAGANG.</span>
      </div>

      {/* MENU */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-slate-400">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-700 ${
                        isActive ? "bg-slate-700 text-white" : ""
                      }`}
                    >
                      {/* Placeholder Icon Bulat */}
                      <span className="h-5 w-5 bg-current rounded-full opacity-50"></span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* FOOTER LOGOUT */}
      <div className="mt-auto p-6">
        <button className="flex w-full items-center justify-center gap-2 rounded bg-slate-700 p-3 font-medium text-white hover:bg-opacity-90">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
