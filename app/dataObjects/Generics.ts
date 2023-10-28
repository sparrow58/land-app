export interface CreateResult<T> {
  create: (data: T) => void;
  isLoading: boolean;
  error: any;
  responseData: any;
}
