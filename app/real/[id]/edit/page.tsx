import React from "react";
import { FormStepper } from "../../create/FormStepper";
import { getRealEstate } from "@/app/services/reatState/getService";
import {
  AreaOption,
  RealEstateFormData,
} from "@/app/dataObjects/RealEstateFormData";
import { AdvisorType } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params: { id } }: Props) => {
  const data = await getRealEstate(id);
  console.log("data", data);
  if (data) {
    const mapped: RealEstateFormData = {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      advisorType: data.advisorType as AdvisorType,
      overlooking: data.overlooking,
      paymentMethod: data.paymentMethod,
      price: data.price,
      rentOrSell: data.rentOrSell,
      size: data.size,
      areaOption: AreaOption.METER,
      details: data.details ? JSON.parse(data.details.toString()) : {},
    };
    return <FormStepper data={mapped} />;
  }
};

export default page;
