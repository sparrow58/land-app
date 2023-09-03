type Props = {
  error: string | undefined;
};
const ErrorLabel = ({ error }: Props) => {
  return <label className="text-sm px-4 text-red-500">{error}</label>;
};

export default ErrorLabel;
