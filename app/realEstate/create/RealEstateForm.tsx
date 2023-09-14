// "use client";
// import { useMultistepForm } from "@/app/hooks/useMultistepFrom";
// import { FormEvent } from "react";
// import {
//   OverlookingType,
//   PaymentMethodType,
//   RealEstate,
//   RealEstateType,
//   RentOrSell,
// } from "@prisma/client";
// import useRealEstate1Form from "@/app/hooks/useRealState1Form";
// import FormPageContainer from "@/app/components/FormPageContainer";
// import TextField from "@/app/components/TextField";
// import TexAreaField from "@/app/components/TexAreaField";
// import { enumToKeyValues } from "@/app/helpers/converters";
// import SelectField from "@/app/components/SelectField";
// import useRealEstate2Form from "@/app/hooks/useRealEstate2Form";

// const RealEstateForm = () => {
//   const formHandlerStep1 = useRealEstate1Form((values) => {});
//   const formHandlerStep2 = useRealEstate2Form((values) => {});
//   const formHandlerStep3 = useRealEstate2Form((values) => {});
//   const { steps, step, isFirstStep, isLastStep, currentStepIndex, back, next } =
//     useMultistepForm([
//       <FormPageContainer key={0}>
//         <TextField
//           name="title"
//           label="Title"
//           formHandler={formHandlerStep1}
//           autoFocus={true}
//         />

//         <TexAreaField
//           name="description"
//           label="Description"
//           formHandler={formHandlerStep1}
//         />
//         <SelectField
//           name="type"
//           label="Type"
//           formHandler={formHandlerStep1}
//           options={enumToKeyValues(RealEstateType)}
//         />
//       </FormPageContainer>,

//       <FormPageContainer key={1}>
//         <TextField
//           name="price"
//           label="Price"
//           type="number"
//           formHandler={formHandlerStep1}
//           autoFocus={true}
//         />
//         <TextField
//           name="size"
//           label="Size"
//           formHandler={formHandlerStep1}
//           type="number"
//         />
//         <SelectField
//           name="overlooking"
//           label="Overlooking"
//           formHandler={formHandlerStep1}
//           options={enumToKeyValues(OverlookingType)}
//         />
//       </FormPageContainer>,
//       <FormPageContainer key={2}>
//         <SelectField
//           name="payment_method"
//           label="Payment Method"
//           formHandler={formHandlerStep1}
//           options={enumToKeyValues(PaymentMethodType)}
//           autoFocus={true}
//         />
//         <SelectField
//           name="rentOrSell"
//           label="Rent or Sell"
//           formHandler={formHandlerStep1}
//           options={enumToKeyValues(RentOrSell)}
//         />
//       </FormPageContainer>,
//     ]);

//   const onSubmitHandler = (e: FormEvent) => {
//     e.preventDefault();
//     if (!isLastStep) next();
//   };
//   return (
//     <div className="relative bg-white rounded-sm p-8 m-4 ">
//       <div className="absolute top-2 right-2">
//         {currentStepIndex + 1}/ {steps.length}
//       </div>
//       <form onSubmit={onSubmitHandler}>
//         {step}
//         <div className="mt-4 flex justify-end  gap-2">
//           {!isFirstStep && (
//             <button className="btn-primary" type="button" onClick={back}>
//               Back
//             </button>
//           )}
//           <button className="btn-primary" type="submit">
//             {isLastStep ? "Finish" : "Next"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RealEstateForm;
