// import { RealEstate, RealEstateType } from "@prisma/client";
// import React, { useState } from "react";
// import { FormProps } from "../../Props/FormProps";
// import TextField from "@/app/components/TextField";
// import TexAreaField from "@/app/components/TexAreaField";
// import DropList from "@/app/components/DropList";
// import { enumToKeyValues } from "@/app/helpers/converters";

// type Props = FormProps & {
//   title: string;
//   description: string;
//   type: RealEstateType;
// };

// const RealEstateStep1Form = ({
//   title,
//   description,
//   type,
//   onChange,
//   onBlur,
//   errors,
// }: Props) => {
//   return (
//     <>
//       <TextField
//         fieldName="title"
//         label="Title"
//         value={title}
//         error={errors.title}
//         onChange={onChange}
//         onBlur={onBlur}
//       />

//       <TexAreaField
//         fieldName="description"
//         label="Description"
//         value={description}
//         error={errors.description}
//         onChange={onChange}
//         onBlur={onBlur}
//       />
//       <DropList
//         fieldName="type"
//         label="Type"
//         value={type}
//         onChange={onChange}
//         onBlur={onBlur}
//         options={enumToKeyValues(RealEstateType)}
//         error={errors.type}
//       />
//     </>
//   );
// };

// export default RealEstateStep1Form;
