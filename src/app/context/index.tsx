"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { AppContainerProps, ContextPayload, AppInfoParams } from "./type";
import { appParamsState } from "./constants";
import { SideBar } from "../components/sidebar";

export const AppContext = createContext({} as ContextPayload);

export function AppContextContainer({ children }: AppContainerProps) {
  const [appParams, setAppParams] = useState<AppInfoParams>(appParamsState);

  const setUser = useCallback(function (payload: AppInfoParams) {
    setAppParams(payload);
    sessionStorage.setItem("app_info", JSON.stringify(payload));
  }, []);

  useEffect(() => {
    const storedAppParams = sessionStorage.getItem("app_info");
    if (storedAppParams) {
      const appUserInformation = JSON.parse(storedAppParams) as AppInfoParams;
      setAppParams(appUserInformation);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        params: appParams,
        setUser,
      }}
    >
      <div className="flex min-h-screen">
        <div className="w-[20%] bg-[#EDF0F4]">
          <SideBar />
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </AppContext.Provider>
  );
}
