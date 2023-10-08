import { RealEstateFormData } from "@/app/dataObjects/RealEstateFormData";
import { convertToMeter as FromLebnahtToMeter } from "@/app/helpers/converters";
import prisma from "@/lib/prisma";
import {
  AdvisorType,
  OverlookingType,
  PaymentMethodType,
  Prisma,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export function createRealEstateAsync(data: RealEstateFormData) {
  console.log("not mapped data", data);
  return prisma.realEstate.create({
    data: mapData(data),
  });
}

export function updateRealEstate(data: RealEstateFormData) {
  console.log("not mapped data", data);
  return prisma.realEstate.update({
    where: { id: data.id },
    data: mapData(data),
  });
}

function mapData(data: RealEstateFormData) {
  return {
    title: data.title,
    description: data.description,
    price: data.price as number,
    size:
      data.areaOption === "LEBNAH"
        ? FromLebnahtToMeter(data.size as number)
        : (data.size as number),
    advisorType: data.advisorType as AdvisorType,
    userId: "clmjhsx490000ac7g03dkr0zf",
    type: data.type as RealEstateType,
    paymentMethod: data.paymentMethod as PaymentMethodType,
    rentOrSell: data.rentOrSell as RentOrSell,
    overlooking: data.overlooking as OverlookingType,
    details: JSON.stringify(data.details),
  };
}

export function addRealEstateImageUrlAsync(id: string, url: string) {
  return prisma.realEstate.update({
    where: { id: id },
    data: {
      images: {
        push: url,
      },
    },
  });
}
