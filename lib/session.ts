import 'server-only'; // Make sure this utility is only used on the server
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { JWTPayload } from 'jose';

// Define the shape of our session payload
interface SessionPayload extends JWTPayload {
  accountId: number;
  username: string; // email
  role: string;
}

// Helper function to get the JWT secret key
function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT Secret key is not set in environment variables!');
  }
  return new TextEncoder().encode(secret);
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(sessionCookie, getJwtSecretKey());
    return payload as SessionPayload;
  } catch (error) {
    console.log('Failed to verify session token:', error);
    return null;
  }
}
