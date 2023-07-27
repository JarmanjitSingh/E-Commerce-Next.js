"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { AvailableSizes, adminAddProductformControls } from "@/utils";
import React from "react";

const AdminAddNewProduct = () => {
  const handleImageChange = () => {};
  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mb-0 ml-0 mr-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImageChange}
          />
          <div className="flex flex-col gap-2">
            <label>Available Sizes</label>
            <TileComponent data={AvailableSizes} />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType == "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
              />
            ) : controlItem.componentType == "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
              />
            ) : null
          )}

          <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;
