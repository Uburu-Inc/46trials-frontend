export interface TrialsResults {
  id: string;
  name: string;
  sample_size: string;
  start_date: string;
  end_date: string;
  budget: string;
  timeline: string;
  trial_files: Array<{ id: number; file: string }>;
  client: string;
  filfilled: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrialsResponse {
  count: number;
  next: null;
  previous: null;
  results: Array<TrialsResults>;
}

export interface TrialsResponseFunc {
  loading: boolean;
  success: boolean;
  data: TrialsResponse | null;
}

export interface TrialResponseFunc {
  loading: boolean;
  success: boolean;
  data: TrialsResults | null
}
