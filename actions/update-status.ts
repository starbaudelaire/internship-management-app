"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(
  applicationId: number,
  newStatus: string,
  comments: string
) {
  try {
    await prisma.application.update({
      where: { applicationID: applicationId },
      data: {
        status: newStatus,
        comments: comments,
      },
    });

    revalidatePath("/faculty/dashboard"); // Refresh dashboard dosen
    return { success: true };
  } catch (error) {
    console.error("Gagal update status:", error);
    return { success: false, message: "Gagal update status" };
  }
}
