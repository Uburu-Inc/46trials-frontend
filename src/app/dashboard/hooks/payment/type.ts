import exp from "constants";

export interface PaymentPayload {
  name?: string;
  sample_size?: number;
  budget?: number;
  start_date?: string;
  end_date?: string;
  fulfilled?: boolean;
  uploaded_files: string;
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
