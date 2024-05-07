import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="mb-2 text-red-600">{children}</p>;
};

export default ErrorMessage;
