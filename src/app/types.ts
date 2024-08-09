export type InstitutionsProps = {
  uid?: string;
  name?: string;
  email?: string;
};

export type SearchDropdownList = {
  value: string;
  text: string;
};

export type ServiceCatalogue = {
  name: string;
  cost: number;
};

export type ReferralType = {
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  phone_number: string;
  referral_comment: string;
  entry: File | null;
  to_institution: InstitutionsProps;
  state_of_origin: string;
  from_institution?: InstitutionsProps;
  service_cost?: string;
};

export type FetchInstitutionPropsResults = {
  authorizing_signatories: null;
  avatar?: string | null;
  city: string;
  code?: string;
  country: string;
  email: string;
  institution_services: Array<string>;
  institution_type: string;
  is_wallet_active: boolean | null;
  legal_name: string;
  links: Array<string>;
  owner: string;
  phone: string;
  project_count: number;
  status: string;
  uid: string;
};

export type InstitutionArray = Array<FetchInstitutionPropsResults>;
export type ServiceCatalogueList = Array<ServiceCatalogue>;
