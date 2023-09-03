export type BaseProps = {
  onChange: any;
  onBlur: any;
};
export type FormProps = BaseProps & {
  errors: any;
};
export type FieldProps = BaseProps & {
  label: string;
  value: any;
  error: string;
  fieldName: string;
};

// export function handleChange(
//   fieldName: string,
//   updateFields: (data: Record<string, any>) => void
// ) {
//   return (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     updateFields({ [fieldName]: e.target.value });
//   };
// }
