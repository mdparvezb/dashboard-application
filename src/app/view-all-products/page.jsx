"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import DownloadExcel from "@/components/DownloadExcel";
import ProductSold from "@/components/ProductSold";
import NoDataPage from "@/components/NoDataPage";

const ViewAllProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [user, setUser] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    getUser();
  }, [updateModal]);

  async function fetchProducts() {
    setLoading(true);
    const response = await axios.get("/api/product/getallproducts");
    setProductsData(response.data.data);
    setLoading(false);
  }

  //  Delete Function
  async function deleteProduct(id) {
    setLoading(true);
    const response = await axios.delete("/api/product/deleteproductbyid", {
      params: {
        id: id,
      },
    });
    fetchProducts();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  // Get User Data
  async function getUser() {
    const response = await axios.get("api/users/me");
    return setUser(response.data.data || "");
  }
  return (
    <>
      {loading && <Loader />}
      {updateModal && (
        <ProductSold
          loading={loading}
          setLoading={setLoading}
          productId={productId}
          setUpdateModal={setUpdateModal}
        />
      )}
      <div className="w-full flex justify-center pb-4">
        <div className="w-full px-2 md:px-4 mt-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
            <Link
              href={"/"}
              className="flex gap-2 items-center px-4 py-2 bg-blue-800/90 hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white text-white rounded-sm transition-all duration-300"
            >
              <FaArrowLeft size={16} />
              Back
            </Link>
            <h2 className="w-full text-center text-blue-600 font-bold text-3xl py-2 text-shadow-xs ">
              All Products
            </h2>
            <DownloadExcel data={productsData} fileName={"All-Products"} />
          </div>
          {/* Desktop Table */}
          <div className="w-full hidden md:block">
            {!productsData.length > 0 ? (
              <NoDataPage />
            ) : (
              <table className="w-full bg-gray-50">
                <thead>
                  <tr className="text-white/90 font-semibold bg-orange-600">
                    <th className="text-center border border-orange-300 py-2 px-1">
                      Sl No.
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Product Name
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Purchase Price
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Business Type
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Quantity
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Payment mode
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Purchase Date
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Status
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Sold Paymt Mode
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Change Status
                    </th>
                    <th className="text-center border border-orange-300 py-1 px-1">
                      Barcode
                    </th>
                    {user.user_role === "Admin" && (
                      <th className="text-center border border-orange-300 py-1 px-1">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {productsData.map((product, index) => (
                    <tr key={product._id} className="text-black ">
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {index + 1}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.product_name}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.purchase_price}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.business_type || "NA"}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.quantity}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.payment_mode}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {new Date(product.purchase_date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.status}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        {product.sold_payment_mode}
                      </td>
                      <td className="text-center border border-orange-300 py-1 px-1">
                        <button
                          onClick={() => {
                            setProductId(product._id);
                            setUpdateModal(true);
                          }}
                          className="px-3 py-1 text-sm bg-blue-700 rounded-sm shadow-sm text-white cursor-pointer hover:opacity-90"
                        >
                          Update
                        </button>
                      </td>

                      <td className="text-center border border-orange-300">
                        <div className="overflow-hidden flex justify-center p-1">
                          <QRCodeSVG value={product.product_name} size={80} />
                        </div>
                      </td>
                      {user.user_role === "Admin" && (
                        <td className="text-center border border-orange-300 py-1 px-1">
                          <div className="w-full flex justify-center items-center gap-2">
                            <MdOutlineDelete
                              size={25}
                              onClick={() => deleteProduct(product._id)}
                              className="text-red-600 cursor-pointer"
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Table For Product View */}
          </div>
          {/* Desktop Table Ends Here*/}
          {/* Mobile Table Starts Here*/}

          <div className="w-full md:hidden flex flex-col justify-center gap-4 mt-4">
            {!productsData.length > 0 && <NoDataPage />}
            {/* Table Main */}
            {productsData.map((product, index) => (
              <div
                key={product._id}
                className="w-full bg-[bisque]/50 border border-orange-200 shadow-md"
              >
                {/* Mobile Table Headings and Data */}
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sl No.</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Product Name</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.product_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Purchase Price</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.purchase_price}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Business Type</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.business_type || "NA"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Quantity</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.quantity}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Purchase Date</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {new Date(product.purchase_date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Status</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.status}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Sold Paymt Mode</p>
                  <p className="px-4 py-2 border-l border-orange-200 font-semibold">
                    {product.sold_payment_mode}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Change Status</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    <button
                      onClick={() => {
                        setProductId(product._id);
                        setUpdateModal(true);
                      }}
                      className="px-3 py-1 text-sm bg-blue-700 rounded-sm shadow-sm text-white cursor-pointer hover:opacity-90"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                  <p className="px-4 py-2 font-semibold">Barcode</p>
                  <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                    <QRCodeSVG value={product.product_name} size={80} />
                  </div>
                </div>
                {user.user_role === "Admin" && (
                  <div className="grid grid-cols-2 gap-1 border-b border-orange-200 items-center overflow-hidden">
                    <p className="px-4 py-2 font-semibold">Actions</p>
                    <div className="px-4 py-2 border-l border-orange-200 font-semibold">
                      <div className="w-full flex items-center gap-4">
                        <MdOutlineDelete
                          size={25}
                          onClick={() => deleteProduct(product._id)}
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllProducts;
