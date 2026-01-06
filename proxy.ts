import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Helper function to get the JWT secret key
function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT Secret key is not set in environment variables!');
  }
  return new TextEncoder().encode(secret);
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/student');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  // 1. Check for session
  let sessionPayload = null;
  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, getJwtSecretKey());
      sessionPayload = payload;
    } catch (err) {
      // Token is invalid or expired. Clear the cookie and proceed as unauthenticated.
      console.log('Invalid session token:', err);
      const response = NextResponse.next();
      response.cookies.delete('session');
      // We will decide the redirect later down the logic
    }
  }
  
  // 2. Logic for protected routes
  if (isProtectedRoute) {
    if (!sessionPayload) {
      // Not authenticated, redirect to login page.
      // Prepend the intended destination for a better UX after login.
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If authenticated, let them proceed.
    return NextResponse.next();
  }
  
  // 3. Logic for auth routes (e.g., /login, /register)
  if (isAuthRoute) {
    if (sessionPayload) {
      // Authenticated user trying to access login/register page,
      // redirect them to their dashboard.
      // @ts-ignore - a bit of a hack, but payload role should exist
      const role = sessionPayload.role as string;
      const dashboardUrl = role === 'Student' ? '/student/dashboard' : '/home';
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
    // If not authenticated, let them access the auth page.
    return NextResponse.next();
  }

  // 4. For all other routes, do nothing.
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (our custom image folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
