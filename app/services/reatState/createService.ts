import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import prisma from "@/lib/prisma";
import {
  OverlookingType,
  PaymentMethodType,
  Prisma,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export function CreateRealEstate(data: RealEstateFormData) {
  console.log("not mapped data", data);
  return prisma.realEstate.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price as number,
      size: data.size as number,
      userId: "clmjhsx490000ac7g03dkr0zf",
      type: data.type as RealEstateType,
      paymentMethod: data.paymentMethod as PaymentMethodType,
      rentOrSell: data.rentOrSell as RentOrSell,
      overlooking: data.overlooking as OverlookingType,
    },
  });
}
