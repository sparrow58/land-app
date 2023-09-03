import React, { ReactNode } from "react";
import { FormProps } from "../Props/FormProps";

type Props = {
  children: ReactNode;
};
const FormPageContainer = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default FormPageContainer;
