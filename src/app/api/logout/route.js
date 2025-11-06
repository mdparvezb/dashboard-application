import { NextResponse } from "next/server";

const { ConnectDB } = require("../../../../lib/config/db");

ConnectDB();

export function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    NextResponse.json({
      message: "Internal server error",
      success: false,
    });
  }
}
