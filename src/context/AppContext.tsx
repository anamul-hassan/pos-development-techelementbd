import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { shareWithLocal } from "@/utils/helpers/shareWithLocal";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface IAppContext {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  // DASHBOARD SIDEBAR STATE
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    shareWithLocal("get", `${CLIENT_DETAILS.companyCode}sidebar`)
  );
  // DASHBOARD SIDEBAR GROUP ROUTE STATE
  const [route, setRoute] = useState<string>("");

  // RETRIEVE PREVIOUS ROUTE AFTER LOADING PAGE
  useEffect(() => {
    if (route === "") {
      setRoute(shareWithLocal("get", `${CLIENT_DETAILS.companyCode}route`));
    } else {
      shareWithLocal("set", `${CLIENT_DETAILS.companyCode}route`, route);
    }
    shareWithLocal("set", `${CLIENT_DETAILS.companyCode}sidebar`, sidebarOpen);
  }, [route, sidebarOpen]);

  const state = {
    sidebarOpen,
    setSidebarOpen,
    route,
    setRoute,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
