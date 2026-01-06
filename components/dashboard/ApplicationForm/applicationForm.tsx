"use client";

import { submitApplication } from "@/actions/submit-applications";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center rounded bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-70"
    >
      {pending ? "Sedang Mengirim..." : "Simpan & Kirim Lamaran"}
    </button>
  );
}

export default function ApplicationForm() {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 sm:col-span-2">
        {/* Card Container */}
        <div className="card-style shadow-lg">
          <div className="border-b border-slate-200 px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-semibold text-black dark:text-white text-xl">
              Formulir Pendaftaran Magang
            </h3>
          </div>

          <form action={submitApplication} className="p-6.5">
            {/* --- DATA MAHASISWA --- */}
            <div className="mb-10">
              <h4 className="mb-6 text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3">
                Data Mahasiswa
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-style">NIM</label>
                  <input
                    name="studentId"
                    placeholder="Masukkan NIM"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Jurusan</label>
                  <input
                    name="major"
                    placeholder="Teknik Informatika"
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Nama Depan</label>
                  <input
                    name="studentFirstName"
                    placeholder="Budi"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Nama Belakang</label>
                  <input
                    name="studentLastName"
                    placeholder="Santoso"
                    required
                    className="input-style"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label-style">Email Kampus</label>
                  <input
                    name="studentEmail"
                    type="email"
                    placeholder="budi@student.univ.ac.id"
                    required
                    className="input-style"
                  />
                </div>
              </div>
            </div>

            {/* --- DATA DOSEN --- */}
            <div className="mb-10">
              <h4 className="mb-6 text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3">
                Dosen Pembimbing
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-style">NIP Dosen</label>
                  <input
                    name="facultyId"
                    placeholder="198xxxxxx"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Email Dosen</label>
                  <input
                    name="facultyEmail"
                    type="email"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Nama Depan Dosen</label>
                  <input
                    name="facultyFirstName"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Nama Belakang Dosen</label>
                  <input
                    name="facultyLastName"
                    required
                    className="input-style"
                  />
                </div>
              </div>
            </div>

            {/* --- DATA PERUSAHAAN --- */}
            <div className="mb-10">
              <h4 className="mb-6 text-lg font-bold text-slate-700 border-l-4 border-blue-600 pl-3">
                Data Perusahaan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="label-style">Nama Perusahaan</label>
                  <input
                    name="employerName"
                    placeholder="PT. Mencari Cinta Sejati"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Supervisor (PIC)</label>
                  <input
                    name="pointOfContact"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Email Supervisor</label>
                  <input
                    name="employerEmail"
                    type="email"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Tanggal Mulai</label>
                  <input
                    name="startDate"
                    type="date"
                    required
                    className="input-style"
                  />
                </div>
                <div>
                  <label className="label-style">Tanggal Selesai</label>
                  <input
                    name="endDate"
                    type="date"
                    required
                    className="input-style"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label-style">Alamat Perusahaan</label>
                  <textarea
                    name="employerAddress"
                    rows={4}
                    className="input-style py-4"
                    placeholder="Alamat lengkap..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
