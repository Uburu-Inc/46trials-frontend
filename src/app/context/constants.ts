import { AppInfoParams, GeneralInstitutionProps } from "./type";

export const appParamsState: AppInfoParams = {
  uid: "",
  legal_name: "",
  token: "",
  phone: "",
  email: "",
};

export const institutionPropsState: GeneralInstitutionProps = {
  loading: false,
  success: false,
  institutions: [],
};
