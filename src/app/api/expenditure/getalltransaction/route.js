import { NextResponse } from "next/server";
import expenditureModel from "../../../../../lib/models/expenditureModel";

const { ConnectDB } = require("../../../../../lib/config/db");

ConnectDB();

export async function GET() {
  try {
    const response = await expenditureModel.find({});
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
