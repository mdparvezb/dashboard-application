import { NextResponse } from "next/server";
import productsModel from "../../../../lib/models/productModel";

const { ConnectDB } = require("../../../../lib/config/db");

ConnectDB();

// Save Product Data
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

// Get All the Products
export async function GET(request) {
  try {
    const response = await productsModel.find({});
    return NextResponse.json({
      data: response,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch the data",
      error: error,
      success: false,
    });
  }
}
