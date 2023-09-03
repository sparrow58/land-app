import {
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
} from "@prisma/client";

export type RealEstateFormData = {
  title: string;
  description: string;
  overlooking: OverlookingType | "";
  details: JSON;
  payment_method: PaymentMethodType | "";
  price: number;
  rentOrSell: string | "";
  size: number;
  type: RealEstateType | "";
};
