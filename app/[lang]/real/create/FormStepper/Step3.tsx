import { RealFormLocalProps } from "@/app/Props/CommonProps";
import { DateField, SelectField, TextField } from "./FormFields";
import { RentOrSell } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { enumToLocalKeyValues } from "@/app/helpers/converters";
import {
  EndowmentType,
  FinalizationType,
  OnMarketType,
  RentType,
} from "../../../../fromSchemas/realEstateFormSchema";

interface Props {
  t: RealFormLocalProps;
}

export function Step3({ t }: Props) {
  const { getValues } = useFormContext();
  const type = getValues("type");
  const rentOrSell = getValues("rentOrSell") as RentOrSell;

  const rentOrSellParsed = (rentOrSell: RentOrSell) => {
    const mappings = {
      BOTH: "Rent or Sell",
      RENT: "Rent",
      SELL: "Sell",
    };
    return mappings[rentOrSell] || rentOrSell;
  };

  const renderApartmentFields = () => (
    <TextField
      name="details.floor"
      label={t.real.fields.floor.label}
      placeholder={t.real.fields.floor.placeholder}
      type="number"
    />
  );

  const renderBuildingOrVillaFields = () => (
    <TextField
      name="details.numberOfFloors"
      label={t.real.fields.numberOfFloors.label}
      placeholder={t.real.fields.numberOfFloors.placeholder}
      type="number"
    />
  );

  const renderHouseFields = () => (
    <>
      <TextField
        name="details.numberOfRooms"
        label={t.real.fields.numberOfRooms.label}
        placeholder={t.real.fields.numberOfRooms.placeholder}
        type="number"
      />
      <TextField
        name="details.numberOfBathRooms"
        label={t.real.fields.numberOfBathRooms.label}
        placeholder={t.real.fields.numberOfBathRooms.placeholder}
        type="number"
      />
      <SelectField
        name="details.finalizationType"
        label={t.real.fields.finalizationType.label}
        placeholder={t.real.fields.finalizationType.label}
        options={enumToLocalKeyValues(
          FinalizationType,
          t.real.fields.finalizationType.options
        )}
      />
      <SelectField
        name="details.onMarketType"
        label={t.real.fields.onMarketType.label}
        placeholder={t.real.fields.onMarketType.label}
        options={enumToLocalKeyValues(
          OnMarketType,
          t.real.fields.onMarketType.options
        )}
      />
      <DateField
        name="details.yearOfDelivery"
        label={t.real.fields.yearOfDelivery.label}
        placeholder={t.real.fields.yearOfDelivery.placeholder}
      />
    </>
  );

  const renderRentOrSellFields = () => (
    <>
      {rentOrSell !== "SELL" && (
        <SelectField
          name="details.rentType"
          label={t.real.fields.rentType.label}
          placeholder={t.real.fields.rentType.placeholder}
          options={enumToLocalKeyValues(
            RentType,
            t.real.fields.rentType.options
          )}
        />
      )}
      {rentOrSell !== "RENT" && (
        <SelectField
          name="details.endowmentType"
          label={t.real.fields.endowmentType.label}
          placeholder={t.real.fields.endowmentType.placeholder}
          options={enumToLocalKeyValues(
            EndowmentType,
            t.real.fields.endowmentType.options
          )}
        />
      )}
    </>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Add more details</h2>
      <h3 className="text-xl font-semibold capitalize mt-2">
        {getValues("title")} {type?.toLowerCase()} for{" "}
        {rentOrSellParsed(rentOrSell)}
      </h3>

      {type === "APARTMENT" && renderApartmentFields()}
      {(type === "BUILDING" || type === "VILLA") &&
        renderBuildingOrVillaFields()}
      {(type === "APARTMENT" || type === "BUILDING" || type === "VILLA") &&
        renderHouseFields()}
      {renderRentOrSellFields()}
    </div>
  );
}
