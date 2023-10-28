export type FieldProps = {
  label?: string;
  placeholder?: string;
  name: string;
  autoFocus?: boolean;
  required?: boolean;
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
