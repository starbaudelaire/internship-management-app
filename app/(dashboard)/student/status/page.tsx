'use client';

import { ListChecks } from 'lucide-react';

export default function StatusPage() {
  return (
    <>
      {/* Breadcrumb Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Status Lamaran
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium" href="/student/dashboard">
                Dashboard /
              </a>
            </li>
            <li className="font-medium text-blue-600">Status</li>
          </ol>
        </nav>
      </div>

      {/* Placeholder Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md text-center">
        <ListChecks className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-4 text-2xl font-semibold text-gray-800">
          Halaman Status Lamaran Magang
        </h3>
        <p className="mt-2 text-gray-500">
          Fitur untuk melihat status lamaran Anda akan segera hadir di sini.
        </p>
        <p className="mt-2 text-gray-500">
          Untuk saat ini, Anda bisa kembali ke{" "}
          <a href="/student/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </a>{" "}
          atau{" "}
          <a href="/student/apply" className="text-blue-600 hover:underline">
            mengisi formulir magang
          </a>.
        </p>
      </div>
    </>
  );
}
