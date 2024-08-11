import { AppInfoParams, GeneralInstitutionProps } from "./type";

export const appParamsState: AppInfoParams = {
  token: ""
};

export const institutionPropsState: GeneralInstitutionProps = {
  loading: false,
  success: false,
  institutions: [],
};
