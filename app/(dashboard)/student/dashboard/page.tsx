'use client';

import { BookUser } from "lucide-react";

export default function DashboardPage() {
    return (
        <>
            {/* Breadcrumb Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Dashboard Mahasiswa
                </h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <span className="font-medium">Dashboard</span>
                        </li>
                    </ol>
                </nav>
            </div>
            
            {/* Welcome Banner */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md text-center">
                <BookUser className="mx-auto h-12 w-12 text-blue-500" />
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                    Selamat Datang di Dasbor Anda!
                </h3>
                <p className="mt-2 text-gray-500">
                    Gunakan navigasi di sebelah kiri untuk mendaftar magang atau melihat status aplikasi Anda.
                </p>
            </div>
        </>
    );
}