import { NextResponse } from "next/server";
import productsModel from "../../../../lib/models/productModel";

const { ConnectDB } = require("../../../../lib/config/db");

ConnectDB();

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  try {
    const response = await productsModel.create(data);
    return NextResponse.json({
      message: "Product Added Successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Product Failed to Save",
      error: error,
      success: false,
    });
  }
}
