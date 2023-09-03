import { OverlookingType } from "@prisma/client";
import React, { ReactEventHandler } from "react";
import { FormProps } from "../../Props/FormProps";

type Props = FormProps & {
  price: number;
  size: number;
  overlooking: OverlookingType;
};
// function handleChange(
//   fieldName: string,
//   updateFields: (data: Record<string, any>) => void
// ) {
//   return (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     updateFields({ [fieldName]: newValue });
//   };
// }

const RealEstateStep2Form = ({
  price,
  size,
  overlooking,
  onChange: handleChange,
}: Props) => {
  //   const handleChange =
  //     (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //       updateFields({ [fieldName]: e.target.value });
  //     };
  return (
    <>
      <label>Price: </label>
      <input
        value={price}
        onChange={handleChange("price")}
        autoFocus
        required
        type="number"
      />
      <label>Size: </label>
      <input
        value={size}
        onChange={handleChange("size")}
        required
        type="number"
      />
      <label>Overlooking: </label>
      <select onChange={handleChange("overlooking")}>
        <option value={overlooking}>Select...</option>
        {Object.values(OverlookingType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  );
};

export default RealEstateStep2Form;
