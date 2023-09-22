import {
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";

export interface RealEstateStep1Data {
  title: string;
  description: string;
  type: RealEstateType | undefined;
}

export interface RealEstateStep2Data {
  price: number | undefined;
  size: number | undefined;
  overlooking: OverlookingType | undefined;
  paymentMethod: PaymentMethodType | undefined;
  rentOrSell: RentOrSell | undefined;
}

export interface RealEstateStep3Data {
  paymentMethod: PaymentMethodType | undefined;
  rentOrSell: RentOrSell | undefined;
}

export type RealEstateFormData = RealEstateStep1Data & RealEstateStep2Data & {};
