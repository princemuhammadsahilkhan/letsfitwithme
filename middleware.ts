import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export const middleware = withAuth(
  function middleware(req: NextRequest) {
    // This middleware is only called if the user is authenticated
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Protect /profile and other routes
export const config = {
  matcher: ['/profile/:path*'],
};
