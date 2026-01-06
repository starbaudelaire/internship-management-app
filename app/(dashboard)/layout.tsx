import SideNav from '@/components/dashboard/SideNav/SideNav';
import AutoLogout from '@/components/dashboard/AutoLogout/AutoLogout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AutoLogout />
      <div className="flex h-screen overflow-hidden bg-slate-100">
        <SideNav />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden lg:ml-72">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
