import {
  HeaderKeys,
  RequiredColumnMainProps,
  CreateProjectValidationInitialProps,
} from "./type";

export const DatabasesDictionaries = {
  laboratory: "laboratory",
  emr: "emr",
};

export const dictionaryConverter: HeaderKeys = {
  laboratory: {
    test_request: "test",
    age: "age",
    firstname: "firstname",
    lastname: "lastname",
    gender: "gender",
    patient_contact: "patient_contact",
    provider_name: "provider_name",
    diagnosis: "diagnosis",
    region: "region",
    provider_contact: "provider_contact",
  },
  emr: {
    age: "age",
    firstname: "patient_first_name",
    lastname: "patient_last_name",
    gender: "sex",
    provider_name: "provider_name",
    diagnosis: "diagnosis",
    region: "state",
    procedure_desc: "procedure_description",
    provider_contact: "provider_contact",
    facility_name:"name_of_facility",
    facility_location: "facility_region"
  },
  claims: {
    diagnosis: "diagnosis_description",
    firstname: "firstname",
    lastname: "lastname",
    patient_contact: "patient_contact",
    region: "state",
    gender: "gender",
    provider_name: "provider_name",
    provider_contact: "provider_contact",
    procedure_desc: "item",
    age: "dob",
    facility_location: "city",
    facility_name: "facility_name"
  },
};

export const Columns: RequiredColumnMainProps = [
  {
    id: "1",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "diagnosis",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "2",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "Diagnosis_code",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "3",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "gender",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "4",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "age",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "5",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "procedure_desc",
    dictionaryKeys: dictionaryConverter,
  },

  {
    id: "10",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "test_result",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "11",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "test_request",
    dictionaryKeys: dictionaryConverter,
  },

  {
    id: "14",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "region",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "28",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "provider_name",
    dictionaryKeys: dictionaryConverter,
  },

  {
    id: "30",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "patient_contact",
    dictionaryKeys: dictionaryConverter,
  },
  {
    id: "31",
    isSelected: false,
    entries: "",
    exclude: "",
    column: "provider_contact",
    dictionaryKeys: dictionaryConverter,
  },
];

export const createProjectValidationInitial: CreateProjectValidationInitialProps = {
  projectName: "",
  startDate: "",
  endDate: "",
  sampleSize: 0,
};