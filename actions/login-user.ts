'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    // In a real app, you'd return an error to the login page
    console.error('Email and password are required');
    redirect('/login?error=MissingFields');
    return;
  }

  // Find the account by email (which is stored in the 'username' field)
  const account = await prisma.account.findUnique({
    where: { username: email },
  });

  if (!account) {
    // Account not found
    console.error('No account found with that email');
    redirect('/login?error=InvalidCredentials');
    return;
  }

  // Compare the provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, account.password);

  if (!isPasswordValid) {
    // Passwords do not match
    console.error('Invalid password');
    redirect('/login?error=InvalidCredentials');
    return;
  }

  // --- Login Successful ---
  // In a real application, this is where you would create a session,
  // set a cookie, or generate a JWT.
  // For now, we will just redirect to the dashboard.

  // Redirect based on role
  if (account.role === 'Student') {
    redirect('/student/dashboard');
  } else if (account.role === 'Faculty') {
    // Redirect to a faculty dashboard if it exists
    redirect('/faculty/dashboard');
  } else if (account.role === 'Admin') {
    // Redirect to an admin dashboard if it exists
    redirect('/admin/dashboard');
  } else {
    // Fallback redirect
    redirect('/home');
  }
}
