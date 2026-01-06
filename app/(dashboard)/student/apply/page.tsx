'use client';

import ApplicationForm from '@/components/dashboard/ApplicationForm/applicationForm';

export default function ApplyPage() {
  return (
    <>
      {/* Breadcrumb Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Formulir Pendaftaran Magang
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium" href="/student/dashboard">
                Dashboard /
              </a>
            </li>
            <li className="font-medium text-blue-600">Apply</li>
          </ol>
        </nav>
      </div>

      {/* Form Masuk Sini */}
      <ApplicationForm />
    </>
  );
}
