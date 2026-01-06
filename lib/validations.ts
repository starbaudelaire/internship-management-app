import { z } from 'zod';

// Skema untuk validasi form registrasi
export const RegisterSchema = z.object({
  firstName: z.string().min(2, { message: 'Nama depan minimal 2 karakter.' }),
  lastName: z.string().min(2, { message: 'Nama belakang minimal 2 karakter.' }),
  nim: z.string().min(5, { message: 'NIM tidak valid.' }),
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

// Skema untuk validasi form login
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(1, { message: 'Password tidak boleh kosong.' }),
});
