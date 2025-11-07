import { NextResponse } from "next/server";
import userModel from "../../../../../lib/models/userModel";
import { ConnectDB } from "../../../../../lib/config/db";
import { getDataFromToken } from "@/app/utils/getDataFromToken";

ConnectDB();
export async function GET(request) {
  try {
    const userData = await getDataFromToken(request) || "";
    if(userData) {
 const user = await userModel
      .findOne({ _id: userData._id })
      .select("-password");

    return NextResponse.json({
      data: user,
      message: "User Found",
      success: true,
    });
    }
   
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "No user available",
      error: error,
      success: false,
    });
  }
}
