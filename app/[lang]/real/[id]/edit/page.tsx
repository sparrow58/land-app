import React from "react";
import { getRealEstate } from "@/app/services/reatState/getService";
import { AdvisorType } from "@prisma/client";
import { getDictionary } from "@/lib/dictionary";
import { LangParams } from "@/app/Props/RoutingProps";
import { CreateRealEstateItem } from "../../create/FormStepper/CreateRealEstateItem";
import {
  AreaOption,
  RealEstateFormData,
} from "@/app/fromSchemas/realEstateFormSchema";

interface Props {
  params: {
    id: string;
  };
}
const page = async ({ params: { id, lang } }: Props & LangParams) => {
  const data = await getRealEstate(id);

  const { forms } = await getDictionary(lang);

  if (data) {
    const details = data.details ? JSON.parse(data.details.toString()) : {};
    const mapped: RealEstateFormData = {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      advisorType: data.advisorType!,
      overlooking: data.overlooking,
      paymentMethod: data.paymentMethod,
      price: data.price,
      rentOrSell: data.rentOrSell,
      size: data.size,
      details: details,
    };

    return <CreateRealEstateItem t={forms} data={mapped} />;
    // return <FormStepper data={mapped} t={forms} />;
  }
};

export default page;
