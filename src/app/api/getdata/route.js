import transactionModel from "../../../../lib/models/transactionsModel";
import { NextResponse } from "next/server";

const { ConnectDB } = require("../../../../lib/config/db");

ConnectDB();

export async function GET(request) {
  try {
    const data = await transactionModel.find({});
    return NextResponse.json({ data: data, success: true });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
}
