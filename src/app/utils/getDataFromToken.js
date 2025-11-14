import jwt from "jsonwebtoken";
import { ConnectDB } from "../../../lib/config/db";
import { NextResponse } from "next/server";

ConnectDB();
export async function getDataFromToken(request) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
