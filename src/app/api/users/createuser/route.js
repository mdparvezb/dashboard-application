const { ConnectDB } = require("../../../../../lib/config/db");
import bcrypt from "bcrypt";
import userModel from "../../../../../lib/models/userModel";
import { NextResponse } from "next/server";

ConnectDB();

export async function POST(request) {
  const data = await request.json();
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const response = await userModel.create({
      user_name: data.user_name,
      password: hashedPassword,
      user_role: data.user_role,
    });

    return NextResponse.json({
      message: "User Created Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to Ceate User",
      success: false,
      error: error,
    });
  }
}
