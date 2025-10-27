import { NextResponse } from "next/server";
import transactionModel from "../../../../../lib/models/transactionsModel";

const { ConnectDB } = require("../../../../../lib/config/db");

ConnectDB();

export async function POST(request) {
  const data = await request.json();

  try {
    const response = await transactionModel.create(data);
    return NextResponse.json({
      message: "Transaction Saved Successfully!",
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
