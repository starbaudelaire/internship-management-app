import ApplicationForm from "@/components/ApplicationForm/applicationForm";
import SideNav from "@/components/SideNav/SideNav";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar (Fixed width 72 / 18rem) */}
      <SideNav />

      {/* Content Area (Geser 72 unit ke kanan) */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ml-72">
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {/* Breadcrumb Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Dashboard Mahasiswa
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="#">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-blue-600">Apply</li>
                </ol>
              </nav>
            </div>

            {/* Form Masuk Sini */}
            <ApplicationForm />
          </div>
        </main>
      </div>
    </div>
  );
}
