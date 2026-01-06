'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutUser() {
  // Delete the session cookie
  cookies().delete('session');

  // Redirect to the login page
  redirect('/login');
}
