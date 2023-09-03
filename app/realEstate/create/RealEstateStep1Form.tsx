import { RealEstate, RealEstateType } from "@prisma/client";
import React, { useState } from "react";
import { FormProps } from "../../Props/FormProps";
import TextField from "@/app/components/TextField";
import TexAreaField from "@/app/components/TexAreaField";
import DropList from "@/app/components/DropList";
import { enumToKeyValues } from "@/app/helpers/converters";

type Props = FormProps & {
  title: string;
  description: string;
  type: RealEstateType;
};

const RealEstateStep1Form = ({
  title,
  description,
  type,
  onChange: handleChange,
  onBlur: handleBlur,
  errors,
}: Props) => {
  const typeOptions = Object.keys(RealEstateType).map((value) => ({
    key: value,
    value: value,
  }));

  return (
    <>
      {/* <label>Title</label>
      <input
        value={title}
        onChange={handleChange("title")}
        onBlur={handleBlur("title")}
        autoFocus
        required
        type="text"
      /> */}
      <TextField
        fieldName="title"
        label="Title"
        value={title}
        error={errors.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {/* <label>Description</label>
      <textarea
        value={description}
        onChange={handleChange("description")}
        onBlur={handleBlur("description")}
        required
      /> */}
      {console.log("errors", errors)}
      <TexAreaField
        fieldName="description"
        label="Description"
        value={description}
        error={errors.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DropList
        fieldName="type"
        label="Type"
        value={type}
        onChange={handleChange}
        onBlur={handleBlur}
        options={enumToKeyValues(RealEstateType)}
        error={errors.type}
      />
      {/* <label>Type</label>
      <select value={type} onChange={handleChange("type")}>
        <option value="">Select...</option>
        {Object.values(RealEstateType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select> */}
    </>
  );
};

export default RealEstateStep1Form;
