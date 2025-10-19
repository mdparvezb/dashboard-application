"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="w-full h-full flex justify-center">
      <div className="w-full px-8 mt-10">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className="flex gap-2 items-center px-6 py-2 bg-white/90 hover:bg-white/70 active:bg-white/70 text-black rounded-lg transition-all duration-300"
          >
            <FaArrowLeft size={18} className="" />
            Back
          </Link>
          <h2 className="w-full text-center text-white font-bold text-3xl py-2 ">
            All Products
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-white/90 font-semibold bg-orange-600">
              <th className="text-center border-1 border-white/60">Sl No.</th>
              <th className="text-center border-1 border-white/60">
                Product Name
              </th>
              <th className="text-center border-1 border-white/60">
                Purchase Price
              </th>
              <th className="text-center border-1 border-white/60">Quantity</th>
              <th className="text-center border-1 border-white/60">
                Purchase Date
              </th>
              <th className="text-center border-1 border-white/60">Barcode</th>
              <th className="text-center border-1 border-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, index) => (
              <tr key={product._id} className="text-white/80 ">
                <td className="text-center border-1 border-white/60">
                  {index + 1}
                </td>
                <td className="text-center border-1 border-white/60">
                  {product.product_name}
                </td>
                <td className="text-center border-1 border-white/60">
                  {product.purchase_price}
                </td>
                <td className="text-center border-1 border-white/60">
                  {product.quantity}
                </td>
                <td className="text-center border-1 border-white/60">
                  {new Date(product.purchase_date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="text-center border-1 border-white/60">
                  | | | |
                </td>
                <td className="text-center border-1 border-white/60">
                  <button>X</button>
                  <button>O</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllProducts;
