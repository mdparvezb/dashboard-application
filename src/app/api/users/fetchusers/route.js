import { NextResponse } from "next/server";
import userModel from "../../../../../lib/models/userModel";

const { ConnectDB } = require("../../../../../lib/config/db");

ConnectDB();

export async function GET() {
  try {
    const response = await userModel.find({});
    return NextResponse.json({
      data: response,
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
