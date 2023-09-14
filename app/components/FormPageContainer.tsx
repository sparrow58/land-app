import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const FormPageContainer = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default FormPageContainer;
