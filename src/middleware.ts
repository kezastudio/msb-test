import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest } from "next/server";
import {
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
  SIGN_IN,
} from "./lib/routes";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const supabase =  createClient();

  const { data } = await supabase.auth.getSession();
  console.log("data",data)
  const isAuthenticated = !!data.session?.access_token;
  
 

  console.log("isAuth", isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  console.log("isPublicRoute", isPublicRoute);

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(SIGN_IN, nextUrl));

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */

    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};

// import { NextResponse } from 'next/server';
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { PROTECTED_SUB_ROUTES, PUBLIC_ROUTES, ROOT, SIGN_IN } from './lib/routes';

// export async function middleware(req) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });

//   const { data: session, error } = await supabase.auth.getSession();

//   if (error) {
//     console.log('Error:', error.message);
//   } else {
//     console.log('Session:', session);
//   }

//   const isAuthenticated = !!session?.access_token;
//   const { nextUrl } = req;

//   console.log('Authenticated user session:', session);
//   const isPublicRoute =
//     (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
//       nextUrl.pathname === ROOT) &&
//     !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

//   console.log('isAuth', isAuthenticated, nextUrl.pathname);
//   console.log('isPublicRoute', isPublicRoute);

//   if (!isAuthenticated && !isPublicRoute) {
//     return NextResponse.redirect(new URL(SIGN_IN, nextUrl));
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     "/((?!.+\\.[\\w]+$|_next).*)",
//     "/",
//     "/(api|trpc)(.*)",
//   ],
// };








