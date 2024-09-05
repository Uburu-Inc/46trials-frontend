import { QueryActionMode } from "../type";

export type RunQueryPayload =
  | Array<{
      sql: string;
      paid: boolean;
      code: QueryActionMode;
    }>
  | unknown;

export type MainQueryData = {
  code: QueryActionMode;
  dataset: string;
  count: number;
  description: string | undefined;
};

export type QueryResponse = Array<{
  data: MainQueryData;
}>;

export interface RunQueryResponse {
  loading: boolean;
  success: boolean;
  data: QueryResponse;
  sendQuery: (payload: RunQueryPayload) => Promise<void>;
}
