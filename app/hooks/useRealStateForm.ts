import { OverlookingType, PaymentMethodType, RealEstate } from "@prisma/client";
import { useFormik } from "formik";
import * as yup from "yup";
import { RealEstateFormData } from "../dataObjects/RealEstateFormData";

export default function useRealEstateForm(
  onSubmit: (values: RealEstateFormData) => void | Promise<any>
) {
  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    overlooking: yup.string().required("overlooking is required"),
    payment_method: yup.string().required("payment_method time is required"),
    price: yup.number().required("price is required"),
    rentOrSell: yup.string().required("rentOrSell is required"),
    type: yup.string().required("type is required"),
    size: yup.string().required("Scheduled  is required"),
  });

  const initialValues: RealEstateFormData = {
    title: "",
    description: "",
    overlooking: "BACK",
    details: JSON.parse("{}"),
    payment_method: "CASH",
    price: 0,
    rentOrSell: "BOTH",
    size: 0,
    type: "APARTMENT",
  };

  const formik = useFormik<RealEstateFormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return formik;
}
