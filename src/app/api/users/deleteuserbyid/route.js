import { NextResponse } from "next/server";
import userModel from "../../../../../lib/models/userModel";
import { ConnectDB } from "../../../../../lib/config/db";


ConnectDB()
export async function DELETE(request) {
  try {
    const userId = await request.nextUrl.searchParams.get("id");
    console.log(userId);

    const response = await userModel.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "User Deleted Successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: error,
      success: false,
    });
  }
}
