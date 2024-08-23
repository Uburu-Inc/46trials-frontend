import { RequiredColumnProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";

export type SelectedTags = Array<RequiredColumnProps>;

export interface Props {
  phase: number;
  setPhase: (currentPhase: number) => void;
  count: number;
  setCount: (currentCount: number) => void;
  selectedColumns: SelectedTags;
  setSelectedColumns: (currentTags: SelectedTags) => void;
  handleSetCSV: (type: string, csvFile: string) => void;
  lab: string;
  emr: string;
  claims: string;
  projectProps: CreateProjectValidationInitialProps
  handleSetProjectData: (payload: CreateProjectValidationInitialProps) => void
}
