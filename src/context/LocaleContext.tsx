import i18n from "@/i18n";
import { FC, ReactNode, createContext, useState } from "react";

interface ILocaleContext {
  locale: string;
  setLocale: (locale: string) => void; // Corrected parameter name
}

export const LocaleContext = createContext<ILocaleContext | undefined>(
  undefined
);

interface ILocaleWrapperProps {
  children: ReactNode;
}

export const LocaleProvider: FC<ILocaleWrapperProps> = ({ children }) => {
  const [locale, setLocale] = useState(i18n.language);

  const state = {
    locale,
    setLocale,
  };

  return (
    <LocaleContext.Provider value={state}>{children}</LocaleContext.Provider>
  );
};
