import { NextResponse } from "next/server";
import productsModel from "../../../../../lib/models/productModel";

const { ConnectDB } = require("../../../../../lib/config/db");

ConnectDB();
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
