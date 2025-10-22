"use client";
import ExpenditureModal from "./ExpenditureModal";
import { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import ProductModal from "./ProductModal";

const DataEntry = ({ productModalOpen, setProductModalOpen }) => {
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
      <div className="w-full h-full pb-4 flex-col md:w-[78%] items-center justify-center overflow-hidden">
        {/* Item Selling Menus */}
        <div className="w-full mt-10">
          <h1 className="text-3xl w-full text-center font-bold text-shadow-black text-shadow-xs">
            Add Transactions
          </h1>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 justify-center md:px-8 px-4 mt-6">
          {homePageButtons.map((btn, index) => (
            <button
              key={index}
              onClick={() => {
                btn.action(btn.type, btn.name);
              }}
              className={`w-full h-60 md:h-80 py-4 rounded-md text-white font-semibold tracking-wider cursor-pointer ${btn.bg} shadow-md hover:opacity-90 hover:-translate-y-2 active:-translate-y-2 hover:shadow-3xl active:shadow-3xl transition-all duration-300`}
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
          transactionModalOpen={transactionModalOpen}
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
