"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Clock,
  LogOut,
  GraduationCap,
} from "lucide-react";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Formulir Magang",
      href: "/student/apply",
      icon: FileText,
    },
    {
      label: "Status Lamaran",
      href: "/student/status",
      icon: Clock,
    },
  ];

  const handleSignOut = () => {
    // In a real app, you'd also clear the user's session (e.g., remove a token)
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-y-auto bg-gray-900 text-gray-200 lg:translate-x-0">
      {/* HEADER LOGO */}
      <div className="flex items-center justify-center gap-3 px-6 py-8 border-b border-gray-700">
        <GraduationCap className="h-8 w-8 text-white" />
        <span className="text-2xl font-bold text-white">MAGANG.</span>
      </div>

      {/* MENU */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-6 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold uppercase text-gray-400">
              Menu
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-md px-4 py-3 font-medium duration-300 ease-in-out hover:bg-gray-700 ${
                        isActive ? "bg-blue-600 text-white" : "hover:text-white"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
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
        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-gray-700 px-4 py-3 font-medium text-gray-300 hover:bg-opacity-80 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}