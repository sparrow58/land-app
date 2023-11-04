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
interface FieldLocalProps {
  label: string;
  placeholder?: string;
}
interface SelectLocalProps extends FieldLocalProps {
  options: any;
}
interface FieldValidationProps {
  required: string;
  min?: string;
}
export interface RealFormLocalProps {
  real: {
    fields: {
      squareMeter: FieldLocalProps;
      lebnah: FieldLocalProps;
      title: FieldLocalProps;
      Description: FieldLocalProps;
      type: SelectLocalProps;
      rentOrSell: SelectLocalProps;
      advisorType: SelectLocalProps;
      size: FieldLocalProps;
      price: FieldLocalProps;
      overlooking: SelectLocalProps;
      floor: FieldLocalProps;
      numberOfFloors: FieldLocalProps;
      numberOfRooms: FieldLocalProps;
      numberOfBathRooms: FieldLocalProps;
      finalizationType: SelectLocalProps;
      onMarketType: SelectLocalProps;
      yearOfDelivery: FieldLocalProps;
      rentType: SelectLocalProps;
      endowmentType: SelectLocalProps;
      paymentMethod: SelectLocalProps;
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
