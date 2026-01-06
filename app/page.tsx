import ApplicationForm from "@/components/ApplicationForm/applicationForm";
import SideNav from "@/components/SideNav/SideNav";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar di kiri */}
      <SideNav />

      {/* Konten Utama di kanan */}
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Dashboard Mahasiswa
            </h1>
            <p className="text-gray-500 mt-2">
              Selamat datang! Silakan lengkapi data magang lo di bawah ini.
            </p>
          </header>

          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
