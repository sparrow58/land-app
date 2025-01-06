import {
  enumToKeyValues,
  enumToLocalKeyValues,
} from "@/app/helpers/converters";
import { SelectField, TextField, AreaField } from "./FormFields";
import { AdvisorType, RealEstateType } from "@prisma/client";
import { RealFormLocalProps } from "@/app/Props/CommonProps";
import { useFormContext } from "react-hook-form";
import { RealEstateFormData } from "@/app/fromSchemas/realEstateFormSchema";

interface Props {
  t: RealFormLocalProps;
}
export function Step1({ t }: Props) {
  const { setValue } = useFormContext<RealEstateFormData>();

  return (
    <div className="space-y-4">
      <SelectField
        name="type"
        label={t.real.fields.type.label}
        placeholder={t.real.fields.type.placeholder}
        onChanged={(value) => {
          setValue("details", {});
        }}
        options={enumToLocalKeyValues(
          RealEstateType,
          t.real.fields.type.options
        )}
        autoFocus
      />
      <SelectField
        name="advisorType"
        label={t.real.fields.advisorType.label}
        placeholder={t.real.fields.advisorType.placeholder}
        options={enumToLocalKeyValues(
          AdvisorType,
          t.real.fields.advisorType.options
        )}
      />
      <TextField
        name="title"
        label={t.real.fields.title.label}
        placeholder={t.real.fields.title.placeholder}
      />
      <AreaField
        name="description"
        label={t.real.fields.Description.label}
        placeholder={t.real.fields.Description.placeholder}
        rows={4}
      />
    </div>
  );
}
