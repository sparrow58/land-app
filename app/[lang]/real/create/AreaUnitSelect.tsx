import { AreaOption } from "@/app/dataObjects/RealEstateFormData";
import React from "react";
interface Props {
  areaOption: AreaOption;
  onChange: (value: AreaOption) => void;
}
const AreaUnitSelect = ({ areaOption, onChange }: Props) => {
  console.log("areaOption", areaOption);
  return (
    <div className="flex flex-row justify-between gap-6">
      <div className="flex items-center">
        <input
          checked={areaOption === "METER"}
          id="default-radio-2"
          type="radio"
          value="METER"
          name="meter-radio"
          onChange={(e) => {
            onChange(e.target.value as AreaOption);
          }}
          className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300
     
      dark:bg-gray-700 "
        />
        <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium ">
          Meter Square
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="default-radio-2"
          checked={areaOption === "LEBNAH"}
          type="radio"
          value="LEBNAH"
          name="lebnah-radio"
          onChange={(e) => {
            onChange(e.target.value as AreaOption);
          }}
          className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300
      "
        />
        <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium ">
          Lebnah
        </label>
      </div>
    </div>
  );
};

export default AreaUnitSelect;
