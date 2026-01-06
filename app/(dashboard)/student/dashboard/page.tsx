import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookUser, FileClock, Hourglass } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();

  // If there's no session, the middleware should've already redirected.
  // This is an extra layer of security.
  if (!session) {
    redirect("/login");
  }

  // Fetch the user's profile data using their email (stored in session.username)
  // We need to find the user whose personalEmail matches the account's username.
  const user = await prisma.user.findFirst({
    where: {
      personalEmail: session.username,
    },
  });

  if (!user) {
    // This case is unlikely if the database is consistent, but good to handle.
    console.error("No user profile found for the logged-in account.");
    redirect("/login");
  }

  // Fetch the user's latest application status
  const application = await prisma.application.findFirst({
    where: {
      stuID: user.userID, // stuID in Application table is the NIM
    },
    orderBy: {
      applicationDate: "desc", // Get the most recent one
    },
  });

  return (
    <>
      {/* Breadcrumb Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard Mahasiswa
        </h2>
      </div>

      {/* Welcome Banner */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Halo, {user.firstName}!
        </h3>
        <p className="mt-2 text-gray-600">
          Selamat datang kembali di dasbor Anda. Di sini Anda dapat mengelola
          pendaftaran magang Anda.
        </p>
      </div>

      {/* Application Status Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Status Lamaran Magang Anda
        </h4>
        {application ? (
          <div className="flex items-center gap-4">
            {application.status === "Pending" ? (
              <Hourglass className="h-10 w-10 text-yellow-500" />
            ) : application.status === "Approved" ? (
              <FileClock className="h-10 w-10 text-green-500" />
            ) : (
              <BookUser className="h-10 w-10 text-red-500" />
            )}
            <div>
              <p className="font-semibold text-lg text-gray-700">
                Status Terkini:{" "}
                <span
                  className={`font-bold ${
                    application.status === "Pending"
                      ? "text-yellow-600"
                      : application.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {application.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Tanggal Pengajuan:{" "}
                {application.applicationDate.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <BookUser className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-3 text-gray-600">
              Anda belum pernah mengajukan lamaran magang.
            </p>
            <Link
              href="/student/apply"
              className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Ajukan Sekarang
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
