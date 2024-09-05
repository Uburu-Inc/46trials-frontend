export interface FetchDataDictionaryResult {
  created_at: string;
  data_dictionary: Record<string, string>;
  id: number;
  code: string;
  postgresql_connection: number;
  table_name: string;
}

export interface FetchDataDictionaryData {
  count: number;
  results: Array<FetchDataDictionaryResult>;
}

export interface FetchDataDictionaryProps {
  loading: boolean;
  success: boolean;
  data: FetchDataDictionaryData | null;
}
