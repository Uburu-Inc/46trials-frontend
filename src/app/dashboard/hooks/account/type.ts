export interface ProfileData {
  uid?: string;
  email?: string;
  phone?: string;
  country?: string;
  avatar?: string | null;
  account_type?: string;
  city?: string;
  status?: string;
  has_unread_notifications?: boolean;
  links?: string | null;
  kyc_level?: string;
  organization_name?: string;
  organization_type?: string;
}

export interface FetchProfileResponse {
  success: boolean;
  loading: boolean;
  data: ProfileData | null;
}

export interface UpdateProfilePayload {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface UpdatePasswordFuncProps {
  loading: boolean;
  success: boolean;
  handleUpdatePassword: (payload: UpdateProfilePayload) => void;
}
