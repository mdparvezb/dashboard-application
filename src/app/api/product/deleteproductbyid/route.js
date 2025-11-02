import { NextResponse } from "next/server";
import productsModel from "../../../../../lib/models/productModel";

export async function DELETE(request) {
  try {
    const productId = await request.nextUrl.searchParams.get("id");

    const response = await productsModel.findByIdAndDelete(productId);

    return NextResponse.json({
      message: "Product Deleted Successfully",
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
