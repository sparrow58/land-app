import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { SelectField, TextField } from "./FormFields";
import {
  RealEstateFormData,
  convertToSquareMeters,
  convertToLebnah,
  AreaOption,
} from "../../../../fromSchemas/realEstateFormSchema";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
import { enumToLocalKeyValues } from "@/app/helpers/converters";
import { OverlookingType, PaymentMethodType, RentOrSell } from "@prisma/client";
interface Props {
  t: RealFormLocalProps;
}
export function Step2({ t }: Props) {
  const { watch, setValue, getValues } = useFormContext<RealEstateFormData>();

  // const sizeUnit = watch("sizeUnit");
  // const size = watch("size");

  function handleUnitChange(sizeUnit: AreaOption): void {
    const size = getValues("size");
    if (size && sizeUnit) {
      const convertedSize =
        sizeUnit === "LEBNAH"
          ? convertToLebnah(size)
          : convertToSquareMeters(size);
      setValue("size", convertedSize);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-evenly">
        <TextField
          name="size"
          label={t.real.fields.size.label}
          placeholder={t.real.fields.size.placeholder}
          type="number"
          autoFocus
        />
        <SelectField
          name="areaOption"
          label={t.real.fields.unitOfmeasure.label}
          onChanged={handleUnitChange}
          options={enumToLocalKeyValues(
            AreaOption,
            t.real.fields.unitOfmeasure.options
          )}
        />
      </div>
      <TextField
        name="price"
        label={t.real.fields.price.label}
        placeholder={t.real.fields.price.placeholder}
        type="number"
      />
      <SelectField
        name="paymentMethod"
        label={t.real.fields.paymentMethod.label}
        placeholder={t.real.fields.paymentMethod.placeholder}
        options={enumToLocalKeyValues(
          PaymentMethodType,
          t.real.fields.paymentMethod.options
        )}
      />
      <SelectField
        name="rentOrSell"
        label={t.real.fields.rentOrSell.label}
        placeholder={t.real.fields.rentOrSell.placeholder}
        options={enumToLocalKeyValues(
          RentOrSell,
          t.real.fields.rentOrSell.options
        )}
      />
      <SelectField
        name="overlooking"
        label={t.real.fields.overlooking.label}
        placeholder={t.real.fields.overlooking.placeholder}
        options={enumToLocalKeyValues(
          OverlookingType,
          t.real.fields.overlooking.options
        )}
      />
    </div>
  );
}
