"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { AppContainerProps, ContextPayload, AppInfoParams } from "./type";
import { appParamsState } from "./constants";

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
      {children}
    </AppContext.Provider>
  );
}
