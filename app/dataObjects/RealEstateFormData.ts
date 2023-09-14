import {
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export interface RealEstateStep1Data {
  title: string;
  description: string;
  type: RealEstateType | "";
}

export interface RealEstateStep2Data {
  price: number | "";
  size: number | "";
  overlooking: OverlookingType | "";
  paymentMethod: PaymentMethodType | "";
  rentOrSell: RentOrSell | "";
}

export interface RealEstateStep3Data {
  paymentMethod: PaymentMethodType | "";
  rentOrSell: RentOrSell | "";
}

export type RealEstateFormData = RealEstateStep1Data & RealEstateStep2Data & {};
