import { RequiredColumnProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { QueryResponse } from "@/app/dashboard/hooks/projects/sql/run-query/type";
import { RunQueryPayload } from "@/app/dashboard/hooks/projects/sql/run-query/type";

export type SelectedTags = Array<RequiredColumnProps>;

export interface Props {
  phase: number;
  count: number;
  selectedColumns: SelectedTags;
  lab: string;
  emr: string;
  claims: string;
  queryParams: RunQueryPayload;
  phase2Data: QueryResponse;
  projectProps: CreateProjectValidationInitialProps;
  onSetQueryParams: (sqlQueryParams: RunQueryPayload) => void;
  setPhase: (currentPhase: number) => void;
  setCount: (currentCount: number) => void;
  setSelectedColumns: (currentTags: SelectedTags) => void;
  handleSetCSV: (type: string, csvFile: string) => void;
  setData: (payload: CreateProjectValidationInitialProps) => void;
  setQueryResultPhase2: (payload: QueryResponse) => void;
}
