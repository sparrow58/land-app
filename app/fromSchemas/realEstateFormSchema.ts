import {
  AdvisorType,
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";
import { z } from "zod";

export const errorMessages = {
  required: "This field is required",
  invalidType: "Invalid input type",
  positiveNumber: "Must be a positive number",
  minDescription: "Description must be at least 10 characters",
};

export enum FinalizationType {
  SUPERLUX = "SUPERLUX",
  LUX = "LUX",
  HALF = "HALF",
  NONE = "NONE",
}
export enum OnMarketType {
  NEW = "NEW",
  RESELL = "RESELL",
}
export enum RentType {
  COMMERCIAL = "COMMERCIAL",
  PERSONAL = "PERSONAL",
  BOTH = "BOTH",
}
export enum EndowmentType {
  ENDOWED = "ENDOWED",
  FREELAND = "FREELAND",
  MIXED = "MIXED",
}
export enum AreaOption {
  METER = "METER",
  LEBNAH = "LEBNAH",
}

export const realEstateSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(RealEstateType, {
    required_error: errorMessages.required,
  }),
  title: z.string().min(1, errorMessages.required),
  description: z.string().min(10, errorMessages.minDescription),
  paymentMethod: z.nativeEnum(PaymentMethodType, {
    required_error: errorMessages.required,
  }),
  rentOrSell: z.nativeEnum(RentOrSell, {
    required_error: errorMessages.required,
  }),
  price: z
    .number({
      required_error: errorMessages.required,
      invalid_type_error: errorMessages.invalidType,
    })
    .positive(errorMessages.positiveNumber),
  size: z
    .number({
      required_error: errorMessages.required,
      invalid_type_error: errorMessages.invalidType,
    })
    .positive(errorMessages.positiveNumber),
  overlooking: z.nativeEnum(OverlookingType, {
    required_error: errorMessages.required,
  }),
  advisorType: z.nativeEnum(AdvisorType, {
    required_error: errorMessages.required,
  }),
  areaOption: z.nativeEnum(AreaOption),
  details: z
    .object({
      floor: z.number().optional(),
      endowmentType: z.nativeEnum(EndowmentType).optional().nullable(),
      yearOfDelivery: z.date().optional().nullable(),
      finalizationType: z.nativeEnum(FinalizationType).optional().nullable(),
      onMarketType: z.nativeEnum(OnMarketType).optional().nullable(),
      numberOfBathRooms: z.number().optional().nullable(),
      numberOfFloors: z.number().optional().nullable(),
      numberOfRooms: z.number().optional().nullable(),
      rentType: z.nativeEnum(RentType).optional().nullable(),
    })
    .optional(),
});

export type RealEstateFormData = z.infer<typeof realEstateSchema>;

export function convertToSquareMeters(size: number) {
  console.log("converting to square meters");
  return Math.round(size * 44.44 * 100) / 100;
}

export function convertToLebnah(size: number) {
  console.log("converting to lebnah");
  return Math.round((size / 44.44) * 100) / 100;
}
