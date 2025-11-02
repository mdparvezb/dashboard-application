import { NextResponse } from "next/server";
import transactionModel from "../../../../../lib/models/transactionsModel";
import { ConnectDB } from "../../../../../lib/config/db";


ConnectDB()
export async function DELETE(request) {
  try {
    const transId = await request.nextUrl.searchParams.get("id");

    const response = await transactionModel.findByIdAndDelete(transId);
    return NextResponse.json({
      message: "Deleted Successfully",
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
