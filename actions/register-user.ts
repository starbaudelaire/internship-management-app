'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const nim = formData.get('nim') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!firstName || !lastName || !nim || !email || !password) {
    // In a real app, you'd return a proper error message to the user
    console.error('All fields are required');
    return; // Or redirect with error
  }

  // Check if account already exists with this email
  const existingAccount = await prisma.account.findUnique({
    where: { username: email }, // We are using the 'username' field to store the email
  });

  if (existingAccount) {
    // In a real app, you'd return a proper error message
    console.error('An account with this email already exists');
    redirect('/register?error=EmailExists');
    return;
  }
  
  // Also check if a user profile with this NIM already exists to prevent duplicates
  const existingUser = await prisma.user.findUnique({
    where: { userID: nim },
  });

  if (existingUser) {
    console.error('A user profile with this NIM already exists');
    redirect('/register?error=NIMExists');
    return;
  }


  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create both the User profile and the Account in a transaction
    await prisma.$transaction([
      prisma.user.create({
        data: {
          userID: nim,
          userRole: 'Student', // Hardcoded role
          firstName,
          lastName,
          personalEmail: email,
        },
      }),
      prisma.account.create({
        data: {
          username: email, // Store email in the username field
          password: hashedPassword,
          role: 'Student', // Hardcoded role
        },
      }),
    ]);
  } catch (error) {
    console.error('Failed to register user:', error);
    // Handle error appropriately, maybe redirect with a generic error
    redirect('/register?error=RegistrationFailed');
    return;
  }

  // Redirect to login page on successful registration
  redirect('/login');
}
