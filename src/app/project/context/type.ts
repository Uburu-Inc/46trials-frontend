import { RequiredColumnProps } from "../components/create-project/utils/type";

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
}
