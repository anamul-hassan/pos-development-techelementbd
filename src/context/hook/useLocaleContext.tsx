import { useContext } from "react";
import { LocaleContext } from "../LocaleContext";

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error(
      "useLocaleContext must be used within a LocaleContextProvider"
    );
  }
  return context;
};
