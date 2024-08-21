import { AxiosInstance } from 'axios';

// Replace with the actual format of the api (This will also be standardized)
export interface ApiResponse<T = unknown> {
  error: any;
  success: boolean;
  message: string;
  data?: T;
}

export interface UseAxiosResponse {
  axios: AxiosInstance;
  loading: boolean;
}

export interface AxiosFuncParams {
  hideErrorAlert?: boolean
}
