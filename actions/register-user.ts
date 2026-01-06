'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/lib/validations';
import { z } from 'zod';

// We define a return type for our action for better type-safety
type RegisterState = {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
};

export async function registerUser(prevState: any, formData: FormData): Promise<RegisterState> {
  // Convert formData to a plain object
  const data = Object.fromEntries(formData.entries());

  // 1. Validate the form data using Zod
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    console.log('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Validasi gagal, silakan periksa kembali isian Anda.',
      errors: validatedFields.error.issues,
    };
  }

  // Destructure the validated data
  const { firstName, lastName, nim, email, password } = validatedFields.data;

  try {
    // 2. Check if account already exists with this email
    const existingAccount = await prisma.account.findUnique({
      where: { username: email }, // Email is stored in 'username' field
    });

    if (existingAccount) {
      return { success: false, message: 'Akun dengan email ini sudah terdaftar.' };
    }
    
    // 3. Check if a user profile with this NIM already exists
    const existingUser = await prisma.user.findUnique({
      where: { userID: nim },
    });

    if (existingUser) {
      return { success: false, message: 'Profil mahasiswa dengan NIM ini sudah ada.' };
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the User profile and Account in a transaction
    await prisma.$transaction([
      prisma.user.create({
        data: {
          userID: nim,
          userRole: 'Student',
          firstName,
          lastName,
          personalEmail: email,
        },
      }),
      prisma.account.create({
        data: {
          username: email, // Store email in the username field
          password: hashedPassword,
          role: 'Student',
        },
      }),
    ]);

  } catch (error) {
    console.error('Gagal mendaftarkan user:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  }

  // On successful registration, redirect to login page
  // Note: Redirect should be called outside of try/catch
  redirect('/login?registered=true');
}