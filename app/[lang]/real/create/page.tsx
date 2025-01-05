import React from "react";
import { FormStepper } from "./FormStepper";
import { LangParams } from "@/app/Props/RoutingProps";
import { getDictionary } from "@/lib/dictionary";
import { CreateRealEstateItem } from "./FormStepper/CreateRealEstateItem";

const page = async ({ params: { lang } }: Readonly<LangParams>) => {
  const { forms } = await getDictionary(lang);

  return <CreateRealEstateItem t={forms} />;
  return <FormStepper t={forms} />;
};

export default page;
