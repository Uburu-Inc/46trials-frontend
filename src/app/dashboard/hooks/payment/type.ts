export interface TrialFiles {
  file: Blob | string;
  trial: number;
  institution: string;
}

export interface TrialsResponseProps {
  id: number;
  name: string;
  sample_size: string;
  budget: number | null;
  start_date: number | null;
  end_date: number | null;
  fulfilled: boolean;
  created_at: string;
  updated_at: string;
  client: string;
}
export interface FinalizeTrialPayload {
  name?: string;
  sample_size?: number;
  budget?: number | string;
  start_date?: string;
  end_date?: string;
  fulfilled?: boolean;
  upload_files?: Array<TrialFiles>;
  client?: string;
}

export interface ExchangeRateData {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: "USD";
  target_code: "NGN";
  conversion_rate: number;
}

export interface ExchangeRatePayload {
  data: ExchangeRateData;
}

export interface FinalizeTrialParamsFuncTypes {
  payload: FinalizeTrialPayload;
  trialId: number;
}
