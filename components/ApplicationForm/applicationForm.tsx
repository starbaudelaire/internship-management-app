"use client";

import { submitApplication } from "@/actions/submit-applications";
import { useFormStatus } from "react-dom";

// Ini logic tombol submit biar bisa loading
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:bg-gray-400 transition-all shadow-lg mt-8"
    >
      {pending ? "⏳ Lagi Mengirim Data..." : "Kirim Lamaran Magang 🚀"}
    </button>
  );
}

export default function ApplicationForm() {
  return (
    <form
      action={submitApplication}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Formulir Pendaftaran
        </h2>
        <p className="text-gray-500">
          Isi data lo yang bener biar cepet di-acc dosen!
        </p>
      </div>

      <div className="space-y-8">
        {/* --- SECTION 1: DATA MAHASISWA --- */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            👤 Data Mahasiswa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="studentId"
              placeholder="NIM"
              required
              className="input-field"
            />
            <input name="major" placeholder="Jurusan" className="input-field" />
            <input
              name="studentFirstName"
              placeholder="Nama Depan"
              required
              className="input-field"
            />
            <input
              name="studentLastName"
              placeholder="Nama Belakang"
              required
              className="input-field"
            />
            <input
              name="studentEmail"
              type="email"
              placeholder="Email Kampus"
              required
              className="input-field"
            />
            <input
              name="studentPhone"
              placeholder="No. HP / WA"
              className="input-field"
            />
            <textarea
              name="studentAddress"
              placeholder="Alamat Lengkap"
              className="input-field md:col-span-2 h-24 pt-3"
            />
          </div>
        </section>

        {/* --- SECTION 2: DATA DOSEN --- */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            🎓 Dosen Pembimbing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="facultyId"
              placeholder="NIP Dosen"
              required
              className="input-field"
            />
            <input
              name="facultyEmail"
              type="email"
              placeholder="Email Dosen"
              required
              className="input-field"
            />
            <input
              name="facultyFirstName"
              placeholder="Nama Depan Dosen"
              required
              className="input-field"
            />
            <input
              name="facultyLastName"
              placeholder="Nama Belakang Dosen"
              required
              className="input-field"
            />
          </div>
        </section>

        {/* --- SECTION 3: DATA PERUSAHAAN --- */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
            🏢 Data Perusahaan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="employerName"
              placeholder="Nama Perusahaan"
              required
              className="input-field"
            />
            <input
              name="pointOfContact"
              placeholder="Nama Supervisor"
              required
              className="input-field"
            />
            <input
              name="employerEmail"
              type="email"
              placeholder="Email Supervisor"
              required
              className="input-field"
            />
            <input
              name="employerPhone"
              placeholder="No. Telp Kantor"
              className="input-field"
            />

            <div className="md:col-span-2 grid grid-cols-2 gap-5 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">
                  Tanggal Mulai
                </label>
                <input
                  name="startDate"
                  type="date"
                  required
                  className="input-field bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">
                  Tanggal Selesai
                </label>
                <input
                  name="endDate"
                  type="date"
                  required
                  className="input-field bg-white"
                />
              </div>
            </div>

            <textarea
              name="employerAddress"
              placeholder="Alamat Perusahaan"
              className="input-field md:col-span-2 h-24 pt-3"
            />
          </div>
        </section>
      </div>

      <SubmitButton />
    </form>
  );
}
