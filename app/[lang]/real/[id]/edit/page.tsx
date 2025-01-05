import React from "react";
import { FormData, FormStepper } from "../../create/FormStepper";
import { getRealEstate } from "@/app/services/reatState/getService";
import { AreaOption } from "@/app/dataObjects/RealEstateFormData";
import { AdvisorType } from "@prisma/client";
import { getDictionary } from "@/lib/dictionary";
import { LangParams } from "@/app/Props/RoutingProps";

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params: { id, lang } }: Props & LangParams) => {
  const data = await getRealEstate(id);

  const { forms } = await getDictionary(lang);

  console.log("data", data);
  if (data) {
    const mapped: FormData = {
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
    return <FormStepper data={mapped} t={forms} />;
  }
};

export default page;
