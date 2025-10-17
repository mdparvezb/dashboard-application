"use client";
import ExpenditureModal from "./ExpenditureModal";
import { useState } from "react";
import TransactionModal from "./TransactionModal";
import ProductModal from "./ProductModal";

const DataEntry = ({
  productModalOpen,
  setProductModalOpen,
}) => {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [expenditureModalOpen, setExpenditureModalOpen] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const homePageButtons = [
    {
      name: "Rehome Furniture",
      bg: "bg-[green]",
      type: "rehome_furniture",
      action: modalHandler,
    },
    {
      name: "Row Hygiene",
      bg: "bg-[purple]",
      type: "row_hygiene",
      action: modalHandler,
    },
    {
      name: "Ajs Wahla",
      bg: "bg-orange-600",
      type: "ajs_wahla",
      action: modalHandler,
    },
    {
      name: "Expenditure",
      bg: "bg-red-800",
      type: "expenditure",
      action: modalHandler,
    },
  ];

  function modalHandler(type, name) {
    if (
      type === "rehome_furniture" ||
      type === "row_hygiene" ||
      type === "ajs_wahla"
    ) {
      setTransactionModalOpen(true);
      setBusinessType(type);
      setBusinessName(name);
    } else {
      setExpenditureModalOpen(true);
      setBusinessType(type);
      setBusinessName(name);
    }
  }

  return (
    <>
      <div className="w-full h-full flex-col md:w-[78%] items-center justify-center overflow-hidden">
        {/* Item Selling Menus */}
        <div className="w-full">
          <h1 className="text-3xl w-full text-center font-bold bg-green-500 text-white"></h1>
        </div>
        <div className="flex flex-col gap-4 justify-center md:px-10 px-4 mt-10">
          {homePageButtons.map((btn, index) => (
            <button
              key={index}
              onClick={() => {
                btn.action(btn.type, btn.name);
              }}
              className={`px-8 py-4 rounded-full text-white cursor-pointer ${btn.bg} tracking-wider shadow-sm hover:opacity-90 hover:scale-105 hover:shadow-xl transition-all duration-300`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>
      {transactionModalOpen && (
        <TransactionModal
          businessName={businessName}
          businessType={businessType}
          setTransactionModalOpen={setTransactionModalOpen}
        />
      )}
      {expenditureModalOpen && (
        <ExpenditureModal
          businessName={businessName}
          businessType={businessType}
          setExpenditureModalOpen={setExpenditureModalOpen}
        />
      )}

      {productModalOpen && (
        <ProductModal setProductModalOpen={setProductModalOpen} />
      )}
    </>
  );
};

export default DataEntry;
