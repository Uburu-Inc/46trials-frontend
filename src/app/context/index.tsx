"use client";

import { createContext, useState, useCallback } from "react";
import { AppContainerProps, ContextPayload, AppInfoParams } from "./type";
import { appParamsState } from "./constants";

export const AppContext = createContext({} as ContextPayload);

export function AppContextContainer({ children }: AppContainerProps) {
  const [appParams, setAppParams] = useState<AppInfoParams>(appParamsState);
  const [userInfo, setUserInfo] = useState<string>("")

  const setUser = useCallback(function (payload: AppInfoParams) {
    if (payload) {
      setAppParams(payload);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("app_info", JSON.stringify(payload));
      }
    }
  }, []);

  const setProfile = useCallback(function(payload: string) {
    setUserInfo(payload)
  }, [])

  const getAppParams = useCallback(
    function () {
      if (typeof window !== "undefined") {
        const storedAppParams = sessionStorage.getItem("app_info") ?? "{}";
        const appUserInformation = JSON.parse(storedAppParams) as AppInfoParams;
        return appUserInformation;
      }
      return appParams;
    },
    [appParams]
  );

  return (
    <AppContext.Provider
      value={{
        params: getAppParams(),
        userInfo,
        setUser,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
