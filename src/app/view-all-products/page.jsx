"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { PiMicrosoftExcelLogoThin } from "react-icons/pi";
import { QRCodeSVG } from "qrcode.react";
import Loader from "@/components/Loader";

const ViewAllProducts = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await axios.get("/api/product");
    setProductsData(response.data.data);
  }
  return (
    <>
      {!productsData.length > 0 && <Loader />}
      <div className="w-full flex justify-center pb-4">
        {/* Desktop Table */}
        <div className="w-full md:px-8 mt-10">
          <div className="w-full flex justify-between items-center">
            <Link
              href={"/"}
              className="flex gap-2 items-center px-4 py-2 bg-white/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-black rounded-sm transition-all duration-300"
            >
              <FaArrowLeft size={16} />
              Back
            </Link>
            <h2 className="w-full text-center text-white font-bold text-3xl py-2 ">
              All Products
            </h2>
            <button className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-sm transition-all duration-300 cursor-pointer">
              <PiMicrosoftExcelLogoThin size={20} />
              Download
            </button>
          </div>
          <div className="w-full">
            {/* Table For Product View */}
            <table className="w-full bg-gray-50">
              <thead>
                <tr className="text-white/90 font-semibold bg-orange-600">
                  <th className="text-center border-1 border-orange-300 py-2 px-1">
                    Sl No.
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Product Name
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Purchase Price
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Quantity
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Purchase Date
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Barcode
                  </th>
                  <th className="text-center border-1 border-orange-300 py-1 px-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product, index) => (
                  <tr key={product._id} className="text-black ">
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {index + 1}
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {product.product_name}
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {product.purchase_price}
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {product.business_type || "NA"}
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {product.quantity}
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      {new Date(product.purchase_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="text-center border-1 border-orange-300">
                      <div className="overflow-hidden flex justify-center p-1">
                        <QRCodeSVG value={product.product_name} size={80} />
                      </div>
                    </td>
                    <td className="text-center border-1 border-orange-300 py-1 px-1">
                      <div className="w-full flex justify-center items-center gap-2">
                        <BiEdit size={22} className="text-blue-600" />
                        <MdOutlineDelete size={25} className="text-red-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllProducts;
