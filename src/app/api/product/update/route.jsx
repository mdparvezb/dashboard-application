import { NextResponse } from "next/server";
import productsModel from "../../../../../lib/models/productModel";

export async function PUT(request) {
  try {
    const productId = await request.nextUrl.searchParams.get("id");
    const data = await request.json();
    const response = await productsModel.findByIdAndUpdate(
      productId,
      { $set: data },
      { new: true }
    );

    return NextResponse.json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to Update!",
      error: error,
      success: false,
    });
  }
}
