type Props = {
  error: string | undefined;
  touched: boolean;
};
const ErrorLabel = ({ error, touched }: Props) => {
  return error && touched ? (
    <label className="italic text-red-600">{error}</label>
  ) : null;
};

export default ErrorLabel;
