import { NextResponse } from "next/server";
import { getDataFromToken } from "./app/utils/getDataFromToken";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const path = request.nextUrl.pathname;

  const isPublic = path === "/login";
  const isAdminProcted = path === "/admin/dashboard" || path === "/admin/users";

  // Check token and redirect
  const token = request.cookies.get("token")?.value || "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If no token then redirect to login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Admin Routes
  const user = (await getDataFromToken(request)) || "";
  console.log(user.user_role);

  if (user.user_role !== "Admin" && isAdminProcted && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/dashboard",
    "/admin/users",
    "/view-all-products",
    "/view-row-hygiene",
    "/view-rehome-furniture",
    "/view-ajs-wahla",
    "/view-expenditure-data",
  ],
};
