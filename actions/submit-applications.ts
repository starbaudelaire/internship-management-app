"use server";

import { prisma } from "@/lib/prisma"; // Pastiin path ini bener (nanti kita cek file lib/prisma)
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitApplication(formData: FormData) {
  // 1. Ambil semua data dari Form HTML
  // Kita pake "get" buat ngambil value berdasarkan "name" di input field nanti
  const rawData = {
    // Data Mahasiswa
    studentId: formData.get("studentId") as string,
    studentFirstName: formData.get("studentFirstName") as string,
    studentLastName: formData.get("studentLastName") as string,
    studentEmail: formData.get("studentEmail") as string,
    studentPhone: formData.get("studentPhone") as string,
    studentAddress: formData.get("studentAddress") as string,
    major: formData.get("major") as string,

    // Data Dosen (Faculty)
    facultyId: formData.get("facultyId") as string, // Biasanya NIP/Email prefix
    facultyFirstName: formData.get("facultyFirstName") as string,
    facultyLastName: formData.get("facultyLastName") as string,
    facultyEmail: formData.get("facultyEmail") as string,

    // Data Perusahaan (Internship)
    employerName: formData.get("employerName") as string,
    pointOfContact: formData.get("pointOfContact") as string,
    employerEmail: formData.get("employerEmail") as string,
    employerPhone: formData.get("employerPhone") as string,
    employerAddress: formData.get("employerAddress") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),

    // Data Aplikasi (Hidden fields buat edit mode)
    applicationId: formData.get("applicationId")
      ? parseInt(formData.get("applicationId") as string)
      : null,
    internshipId: formData.get("internshipId")
      ? parseInt(formData.get("internshipId") as string)
      : null,
  };

  try {
    // 2. Upsert Data Mahasiswa (Update kalo ada, Create kalo baru)
    await prisma.user.upsert({
      where: { userID: rawData.studentId },
      update: {
        firstName: rawData.studentFirstName,
        lastName: rawData.studentLastName,
        personalEmail: rawData.studentEmail,
        phone: rawData.studentPhone,
        studentAddress: rawData.studentAddress,
        major: rawData.major,
        userRole: "Student",
      },
      create: {
        userID: rawData.studentId,
        firstName: rawData.studentFirstName,
        lastName: rawData.studentLastName,
        personalEmail: rawData.studentEmail,
        phone: rawData.studentPhone,
        studentAddress: rawData.studentAddress,
        major: rawData.major,
        userRole: "Student",
      },
    });

    // 3. Upsert Data Dosen
    await prisma.user.upsert({
      where: { userID: rawData.facultyId },
      update: {
        firstName: rawData.facultyFirstName,
        lastName: rawData.facultyLastName,
        personalEmail: rawData.facultyEmail,
        userRole: "Faculty",
      },
      create: {
        userID: rawData.facultyId,
        firstName: rawData.facultyFirstName,
        lastName: rawData.facultyLastName,
        personalEmail: rawData.facultyEmail,
        userRole: "Faculty",
      },
    });

    let internshipId = rawData.internshipId;

    // 4. Handle Data Perusahaan (Internship)
    if (internshipId) {
      // Kalo Edit Mode (ID ada), update data lama
      await prisma.internship.update({
        where: { internshipID: internshipId },
        data: {
          employerName: rawData.employerName,
          pointOfContact: rawData.pointOfContact,
          employerEmail: rawData.employerEmail,
          employerPhone: rawData.employerPhone,
          employerAddress: rawData.employerAddress,
          startDate: rawData.startDate,
          endDate: rawData.endDate,
        },
      });
    } else {
      // Kalo Baru, create data baru
      const newInternship = await prisma.internship.create({
        data: {
          employerName: rawData.employerName,
          pointOfContact: rawData.pointOfContact,
          employerEmail: rawData.employerEmail,
          employerPhone: rawData.employerPhone,
          employerAddress: rawData.employerAddress,
          startDate: rawData.startDate,
          endDate: rawData.endDate,
        },
      });
      internshipId = newInternship.internshipID;
    }

    // 5. Handle Aplikasi (Application)
    if (rawData.applicationId) {
      // Update Aplikasi Lama
      await prisma.application.update({
        where: { applicationID: rawData.applicationId },
        data: {
          status: "Pending", // Reset status jadi pending kalo diedit
          applicationDate: new Date(),
          internID: internshipId!,
          stuID: rawData.studentId,
          facID: rawData.facultyId,
        },
      });
    } else {
      // Bikin Aplikasi Baru
      await prisma.application.create({
        data: {
          status: "Pending",
          internID: internshipId!,
          stuID: rawData.studentId,
          facID: rawData.facultyId,
          signature: "Digital Signature", // Bisa diganti logic signature beneran nanti
          agreementDate: new Date().toISOString(),
        },
      });
    }

    // 6. Refresh halaman biar data update realtime
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Gagal submit:", error);
    return { message: "Gagal menyimpan data bro. Cek console." };
  }

  // 7. Balikin user ke dashboard
  redirect("/student/dashboard");
}
