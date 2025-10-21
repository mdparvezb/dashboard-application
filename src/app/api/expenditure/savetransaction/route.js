import { NextResponse } from "next/server";
import expenditureModel from "../../../../../lib/models/expenditureModel";

const { ConnectDB } = require("../../../../../lib/config/db");

ConnectDB();

export async function POST(request) {
  const data = await request.json();
  try {
    const response = await expenditureModel.create(data);
    return NextResponse.json({
      message: "Transaction Saved",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Transaction Failed to Save",
      error: error,
      success: false,
    });
  }
}
