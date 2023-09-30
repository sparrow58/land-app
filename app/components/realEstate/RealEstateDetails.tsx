import {
  Details,
  RealEstateFormData,
} from "@/app/dataObjects/RealEstateFormData";
import {
  AdvisorType,
  OverlookingType,
  PaymentMethodType,
  RealEstateType,
  RentOrSell,
} from "@prisma/client";
import React from "react";

interface Props {
  title: string;
  description: string;
  type: RealEstateType;
  price: number;
  advisorType: AdvisorType | null;
  size: number;
  overlooking: OverlookingType;
  paymentMethod: PaymentMethodType;
  rentOrSell: RentOrSell;
  createdAt: Date;
  details: Details;
}
const parseDetailsKey = (value: string) => {
  switch (value) {
    case "floor":
      return "Floor";
    case "endowmentType":
      return "Endowment Type";
    case "yearOfDelivery":
      return "Year Of Delivery";
    case "numberOfFloors":
      return "Number Of Floors";
    case "finalizationType":
      return "Finalization Type";
    case "numberOfBathRooms":
      return "numberOfBathRooms";
    case "numberOfRooms":
      return "Number Of Rooms";
    case "onMarketType":
      return "On Market Type";

    default:
      return value;
  }
};
const RealEstateDetails = ({
  title,
  description,
  type,
  price,
  advisorType,
  size,
  overlooking,
  paymentMethod,
  rentOrSell,
  createdAt,
  details,
}: Props) => {
  const rentOrSellParsed = (rentOrSell: RentOrSell) => {
    if (rentOrSell === "BOTH") return "Rent or Sell";
    else if (rentOrSell === "RENT") return "Rent";
    else if (rentOrSell === "SELL") return "Sell";
    else return rentOrSell;
  };
  return (
    <div className="relative overflow-x-auto">
      <div className="mx-1 mb-5">
        <p className="text-gray-400">
          {type} for {rentOrSellParsed(rentOrSell)}{" "}
          {createdAt.toLocaleDateString()}
        </p>
        <h1 className="h3 my-3">{price.toLocaleString()} YR</h1>
        <p className=" h4"> {title}</p>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
        <thead>
          <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th className="px-2 py-3">Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {TableRow("Payment Method", paymentMethod)}
          {TableRow("Area", `${size} m\u00B2`)}
          {TableRow("Overlooking", overlooking)}
          {Object.entries(details).map(([key, value]) =>
            TableRow(parseDetailsKey(key), value)
          )}

          {advisorType && TableRow("Advisor Type", advisorType)}
        </tbody>
      </table>
    </div>
  );
};

export default RealEstateDetails;
function TableRow(key: string, value: string) {
  return (
    <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className=" px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {key}
      </th>
      <td className="px-6 py-4"> {value}</td>
    </tr>
  );
}
