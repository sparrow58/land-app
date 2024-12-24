import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken, JWT } from "next-auth/jwt";
import { Roles } from "@prisma/client";
type RoleBasedAccess = {
  [key: string]: Roles[]; // Key is a string, and value is an array of roles
};
// Define role-based access rules
const roleBasedAccess: RoleBasedAccess = {
  "/admin": ["ADMIN"], // Only allow admin role
  "/user": ["ADMIN", "BASIC"], // Allow both admin and user roles
};
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  const token = await getToken({ req: request });

  if (isAuthPath(pathname) && token) {
    // Redirect to the callbackUrl after some validation
    if (callbackUrl)
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    else return NextResponse.redirect(new URL("/", request.url));
  }

  // // Protect /admin routes with role-based access
  protectRoutes(request, token);
  return NextResponse.next();

  // Continue with the existing response if no redirection is needed
}
const protectRoutes = (request: NextRequest, token: JWT | null) => {
  for (const [path, roles] of Object.entries(roleBasedAccess)) {
    const noLangPath = request.nextUrl.pathname.substring(3);
    if (noLangPath.startsWith(path)) {
      if (!token) {
        // If no token, redirect to login page
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));
      }
      if (isSuperAdmin(token)) {
        return NextResponse.next();
      }
      if (token?.role)
        if (!roles.includes(token?.role)) {
          return NextResponse.redirect(new URL("/", request.url));
        }
    }
  }
};
const isSuperAdmin = (token: JWT) => {
  return token.role === "SUPERADMIN";
};
// Function to check if the path matches `signin` or `signup`, ignoring locale
const isAuthPath = (pathname: string): boolean => {
  const pathSegments = pathname.split("/").filter(Boolean); // Split path and remove empty segments

  // Check if the second segment is `signin` or `signup`
  return pathSegments[1] === "signin" || pathSegments[1] === "signup";
};
const protectAdminRoute = async (
  request: NextRequest,
  token: JWT | null
): Promise<NextResponse | null> => {
  const pathname = request.nextUrl.pathname;

  if (pathname.includes("/admin/")) {
    // Use getToken to validate the session and check for the admin role

    if (!token) {
      // If no token, redirect to login page
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
    if (isSuperAdmin(token)) {
      return NextResponse.next();
    }

    // If token is present, check if user has admin role
    if (token.role !== "ADMIN") {
      // Redirect if user does not have admin privileges
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return null;
};
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|images|videos|favicon.ico).*)"],
};
