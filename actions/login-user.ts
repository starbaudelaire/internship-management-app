'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { LoginSchema } from '@/lib/validations';



// Helper function to get the JWT secret key

function getJwtSecretKey(): Uint8Array {

  const secret = process.env.JWT_SECRET;

  if (!secret) {

    throw new Error('JWT Secret key is not set in environment variables!');

  }

  return new TextEncoder().encode(secret);

}



export async function loginUser(formData: FormData) {

  // 1. Validate form data

  const data = Object.fromEntries(formData.entries());

  const validatedFields = LoginSchema.safeParse(data);



  if (!validatedFields.success) {

    // Return the first validation error message

    return { success: false, message: validatedFields.error.errors[0].message };

  }

  

  const { email, password } = validatedFields.data;



  try {

    // 2. Find account and validate password

    const account = await prisma.account.findUnique({

      where: { username: email }, // Email is stored in 'username' field

    });



    if (!account) {

      return { success: false, message: 'Akun tidak ditemukan.' };

    }



    const isPasswordValid = await bcrypt.compare(password, account.password);



    if (!isPasswordValid) {

      return { success: false, message: 'Password salah bro.' };

    }



    // --- 3. Login Successful, Create Session ---

    const userPayload = {

      accountId: account.id,

      username: account.username, // This is the email

      role: account.role,

    };

    

    const sessionToken = await new SignJWT(userPayload)

      .setProtectedHeader({ alg: 'HS256' })

      .setIssuedAt()

      .setExpirationTime('1h') // Token expires in 1 hour

      .sign(getJwtSecretKey());



    // Set the session cookie

    cookies().set('session', sessionToken, {

      httpOnly: true,

      secure: process.env.NODE_ENV === 'production',

      maxAge: 60 * 60, // 1 hour

      path: '/',

    });



    return { success: true, message: 'Login berhasil!', role: account.role };



  } catch (error) {

    console.error('Login error:', error);

    return { success: false, message: 'Terjadi kesalahan pada server.' };

  }

}
