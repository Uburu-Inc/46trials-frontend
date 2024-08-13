export interface DataBaseColumns {
  test_request?: string;
  age?: string;
  firstname: string;
  lastname: string;
  gender: string;
  patient_contact?: string;
  provider_name: string;
  diagnosis: string;
  region: string;
  procedure_desc?: string;
  provider_contact: string;
  facility_name?: string;
  facility_location?: string;
}

export interface HeaderKeys {
  laboratory: DataBaseColumns;
  emr: DataBaseColumns;
  claims: DataBaseColumns;
}

export interface RequiredColumnProps {
  id: string;
  isSelected?: boolean;
  column?: string;
  entries?: string;
  exclude?: string;
  dictionaryKeys: HeaderKeys;
}

export type RequiredColumnMainProps = Array<RequiredColumnProps>;

export interface CreateProjectValidationInitialProps {
  projectName?: string;
  startDate?: string;
  endDate?: string;
  sampleSize?: number;
}
export interface Props {
  entries?: CreateProjectValidationInitialProps;
  selection: Array<RequiredColumnProps>;
  action: "count" | "dataset";
}

export enum Databases {
  LABORATORY = "laboratory",
  EMR = "emr",
  CLAIMS = "claims",
}

export enum HeaderDefinedKeysEnum {
  diagnosis = "diagnosis",
  test_request = "test_request",
  age = "age",
  firstname = "firstname",
  lastname = "lastname",
  gender = "gender",
  patient_contact = "patient_contact",
  provider_name = "provider_name",
  region = "region",
}
