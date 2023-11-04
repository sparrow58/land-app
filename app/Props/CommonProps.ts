export type FieldProps = {
  label?: string;
  placeholder?: string;
  name: string;
  autoFocus?: boolean;
  required?: boolean;
  fullWidth?: boolean;
};
export interface FileBase {
  url: string;
  progress: number | undefined;
  isDone: boolean;
}
export interface FileProps {
  url: string;
  progress: number | undefined;
  file: File | null;
  isDone: boolean;
}

export interface Dimensions {
  width: number;
  height: number;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
export interface ApiEvents {
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
}
interface FieldLableProps {
  label: string;
  placeholder?: string;
}
interface FieldValidationProps {
  required: string;
  min?: string;
}
export interface RealFormLocalProps {
  real: {
    fields: {
      squareMeter: FieldLableProps;
      lebnah: FieldLableProps;
      title: FieldLableProps;
      Description: FieldLableProps;
      type: FieldLableProps;
      rentOrSell: FieldLableProps;
      advisorType: FieldLableProps;
      size: FieldLableProps;
      price: FieldLableProps;
      overlooking: FieldLableProps;
      floor: FieldLableProps;
      numberOfFloors: FieldLableProps;
      numberOfRooms: FieldLableProps;
      numberOfBathRooms: FieldLableProps;
      finalizationType: FieldLableProps;
      onMarketType: FieldLableProps;
      yearOfDelivery: FieldLableProps;
      rentType: FieldLableProps;
      endowmentType: FieldLableProps;
      paymentMethod: FieldLableProps;
    };
  };
  validations: {
    real: {
      title: FieldValidationProps;
      description: FieldValidationProps;
      type: FieldValidationProps;
      rentOrSell: FieldValidationProps;
      advisorType: FieldValidationProps;
      overlooking: FieldValidationProps;
      price: FieldValidationProps;
      size: FieldValidationProps;
      paymentMethod: FieldValidationProps;
    };
  };
}
