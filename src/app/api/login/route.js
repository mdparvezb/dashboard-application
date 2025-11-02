import { NextResponse } from "next/server";
import userModel from "../../../../lib/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { ConnectDB } = require("../../../../lib/config/db");

ConnectDB();

export async function POST(request) {
  const userData = await request.json();
  try {
    const user = await userModel.findOne({ user_name: userData.userName });
    if (!user) {
      return NextResponse.json({
        message: "User does not exist!",
        success: false,
      });
    }
    // Validate Password
    const passwordValidate = await bcrypt.compare(
      userData.userPassword,
      user.password
    );
    if (!passwordValidate) {
      return NextResponse.json({
        message: "Password is incorrect!",
        success: false,
      });
    }
    //  Create a Token
    const token = jwt.sign(
      { user_name: user.user_name, _id: user._id, user_role: user.user_role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to Login",
    });
  }
}
