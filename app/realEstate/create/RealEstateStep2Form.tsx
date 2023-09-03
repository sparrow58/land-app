import { OverlookingType } from "@prisma/client";
import React, { ReactEventHandler } from "react";
import { FormProps } from "../../Props/FormProps";
import TextField from "@/app/components/TextField";
import { error } from "console";
import DropList from "@/app/components/DropList";
import { enumToKeyValues } from "@/app/helpers/converters";

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
  onChange,
  onBlur,
  errors,
}: Props) => {
  //   const handleChange =
  //     (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //       updateFields({ [fieldName]: e.target.value });
  //     };
  return (
    <>
      <TextField
        fieldName="price"
        label="Price"
        value={price}
        error={errors.price}
        onChange={onChange}
        onBlur={onBlur}
        type="number"
      />
      <TextField
        fieldName="size"
        label="Size"
        value={size}
        error={errors.size}
        onChange={onChange}
        onBlur={onBlur}
        type="number"
      />
      <DropList
        fieldName="overlooking"
        label="Overlooking"
        value={overlooking}
        onChange={onChange}
        onBlur={onBlur}
        options={enumToKeyValues(OverlookingType)}
        error={errors.overlooking}
      />
    </>
  );
};

export default RealEstateStep2Form;
