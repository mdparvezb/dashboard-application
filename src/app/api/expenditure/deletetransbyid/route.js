import { NextResponse } from "next/server";
import expenditureModel from "../../../../../lib/models/expenditureModel";
import { ConnectDB } from "../../../../../lib/config/db";

ConnectDB

export async function DELETE(request) {
  try {
    const trnasctionId = await request.nextUrl.searchParams.get("id");

    const response = await expenditureModel.findByIdAndDelete(trnasctionId);

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
