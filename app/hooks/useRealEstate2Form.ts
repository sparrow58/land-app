// import { useFormik } from "formik";
// import * as yup from "yup";
// import { RealEstateStep2Data } from "../dataObjects/RealEstateFormData";

// export default function useRealEstate2Form(
//   onSubmit: (values: RealEstateStep2Data) => void | Promise<any>
// ) {
//   const validationSchema = yup.object().shape({
//     overlooking: yup.string().required("overlooking is required"),
//     price: yup.number().min(1).required("price is required"),
//     size: yup.string().required("Scheduled  is required"),
//   });

//   const initialValues: RealEstateStep2Data = {
//     overlooking: "",
//     price: "",
//     size: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return formik;
// }
