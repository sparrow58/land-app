// import { useFormik } from "formik";
// import * as yup from "yup";
// import { RealEstateStep3Data } from "../dataObjects/RealEstateFormData";

// export default function useRealEstate3Form(
//   onSubmit: (values: RealEstateStep3Data) => void | Promise<any>
// ) {
//   const validationSchema = yup.object().shape({
//     payment_method: yup.string().required("payment_method time is required"),
//     rentOrSell: yup.string().required("rentOrSell is required"),
//   });

//   const initialValues: RealEstateStep3Data = {
//     paymentMethod: "",
//     rentOrSell: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return formik;
// }
