import { RealEstateFormData } from "@/app/fromSchemas/realEstateFormSchema";
import { convertToMeter as FromLebnahtToMeter } from "@/app/helpers/converters";
import prisma from "@/lib/prisma";
import {
  AdvisorType,
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export function createRealEstateAsync(
  data: RealEstateFormData,
  userId: string
) {
  return prisma.realEstate.create({
    data: mapData(data, userId),
  });
}

export function updateRealEstate(data: RealEstateFormData, userId: string) {
  return prisma.realEstate.update({
    where: { id: data.id },
    data: mapData(data, userId),
  });
}

function mapData(data: RealEstateFormData, userId: string) {
  return {
    title: data.title,
    description: data.description,
    price: data.price,
    size:
      data.areaOption === "LEBNAH"
        ? FromLebnahtToMeter(data.size as number)
        : data.size,
    advisorType: data.advisorType as AdvisorType,
    userId: userId,
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
