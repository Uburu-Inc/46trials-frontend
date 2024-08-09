"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import {
  AppContainerProps,
  ContextPayload,
  AppInfoParams,
  UserPaymentInfoPayload,
  GeneralInstitutionProps,
} from "./type";
import { appParamsState, institutionPropsState } from "./constants";

export const AppContext = createContext({} as ContextPayload);

export function AppContextContainer({ children }: AppContainerProps) {
  const [appParams, setAppParams] = useState<AppInfoParams>(appParamsState);

  const [institutionInfo, setInstitutionInfo] =
    useState<GeneralInstitutionProps>(institutionPropsState);

  const [userPaymentInfo, setUserPaymentInfo] =
    useState<UserPaymentInfoPayload | null>(null);

  const [recordId, setRecordId] = useState<number>();

  const setUser = useCallback(function (payload: AppInfoParams) {
    setAppParams(payload);
    sessionStorage.setItem("app_info", JSON.stringify(payload));
  }, []);

  const setInstitutions = useCallback(function (data: GeneralInstitutionProps) {
    setInstitutionInfo(data);
  }, []);


  useEffect(() => {
    const storedAppParams = sessionStorage.getItem("app_info");
    if (storedAppParams) {
      const appUserInformation = JSON.parse(storedAppParams) as AppInfoParams;
      setAppParams(appUserInformation);
      setUserPaymentInfo({
        username: appUserInformation.legal_name,
        phone_number: appUserInformation.phone,
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        params: appParams,
        recordId,
        userPaymentInfo: userPaymentInfo ?? {},
        setRecordId,
        setUser,
        institutionInfo,
        setInstitutions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
