// import { useFormik } from "formik";
// import * as yup from "yup";
// import { RealEstateStep1Data } from "../dataObjects/RealEstateFormData";

// export default function useRealEstate1Form(
//   onSubmit: (values: RealEstateStep1Data) => void | Promise<any>
// ) {
//   const validationSchema = yup.object().shape({
//     title: yup
//       .string()
//       .min(5, "Title must be at least 5 characters")
//       .required("Title is required"),
//     description: yup
//       .string()
//       .min(10, "Description must be at least 10 characters")
//       .required("Description is required"),
//     type: yup.string().min(1).required("type is required"),
//   });

//   const initialValues: RealEstateStep1Data = {
//     title: "",
//     description: "",
//     type: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return formik;
// }
