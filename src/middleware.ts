import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth";

const AuthRoutes = ["/login"];

type Role = keyof typeof roleBasedRoutes;

// Define role-based routes (only accessible by specific roles)
const roleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

// Middleware function to handle routing logic
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  // If user is not authenticated and is trying to access a protected route
  if (!user) {
    // Allow unauthenticated access to login and register pages only
    if (!AuthRoutes.includes(pathname)) {
      // Redirect unauthenticated user to the login page
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    // Let them continue to login or register pages
    return NextResponse.next();
  }

  // If user is authenticated and tries to access login or register, redirect to home page
  if (user && AuthRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
  }

  // Role-based route access control (e.g., USER can access /profile, ADMIN can access /admin)
  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const routes = roleBasedRoutes[user.role as Role];

    // Check if the user has permission to access the requested route
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next(); // Allow access to the route
    }
  }
}

// Apply middleware to the necessary routes (apply to all routes except static files)
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
