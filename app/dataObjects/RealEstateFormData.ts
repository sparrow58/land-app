import {
  AdvisorType,
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export interface RealEstateStep1Data {
  title: string;
  description: string;
  type: RealEstateType | "";
  price: number | "";
  advisorType: AdvisorType | "";
}

export interface RealEstateStep2Data {
  size: number | "";
  overlooking: OverlookingType | "";
  paymentMethod: PaymentMethodType | "";
  rentOrSell: RentOrSell | "";
}

export interface RealEstateStep3Data {
  paymentMethod: PaymentMethodType | "";
  rentOrSell: RentOrSell | "";
}
export interface Details {
  floor?: number | "";
  numberOfFloors?: number | "";
  finalizationType?: FinalizationType | "";
  numberOfRooms?: number | "";
  numberOfBathRooms?: number | "";
  yearOfDelivery?: number;
  onMarketType?: OnMarketType | "";
  rentType?: RentType | ""; // rent
  endowmentType?: EndowmentType | ""; // sell
}

export type RealEstateFormData = RealEstateStep1Data &
  RealEstateStep2Data & {
    details: Details;
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
