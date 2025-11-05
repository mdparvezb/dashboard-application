import React, { useState } from "react";

const ProductSearchBox = ({
  showDropdown,
  setShowDropdown,
  productList,
  productName,
  setProductName,
}) => {
  // Filter items based on search term
  const filteredList = productList.filter((item) =>
    item.product_name.toLowerCase().includes(productName.toLowerCase())
  );

  const handleSelect = (item) => {
    setProductName(item);
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 absolute top-10 left-2 z-99">
      <div className="relative">
        {/* Dropdown */}
        {showDropdown && productName && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md max-h-48 overflow-y-auto">
            {filteredList.length > 0 ? (
              filteredList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item.product_name)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item.product_name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSearchBox;
