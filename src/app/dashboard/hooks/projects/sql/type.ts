export interface DataSetQuery {
  countQuery?: string;
  datasetQuery?: string;
}

export interface Queries {
  laboratoryQuery?: DataSetQuery;
  emrQuery?: DataSetQuery;
  claimsQuery?: DataSetQuery;
}

export type QueryActionMode = "count" | "database";

export interface QueryPayload {
  sql_query: string;
  action: QueryActionMode;
  db_name: "laboratory" | "emr" | "claims";
}

export interface Props {
  loading: boolean;
  count: number;
  success: boolean;
  dataset: {};
  fetchResponse: ({ payload }: { payload: Queries }) => Promise<void>;
}
