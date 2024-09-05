import { createContext, ReactNode, useCallback, useState } from "react";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { createProjectValidationInitial } from "@/app/dashboard/hooks/projects/sql/utils/constant";
import {
  QueryResponse,
  RunQueryPayload,
} from "@/app/dashboard/hooks/projects/sql/run-query/type";
import { SelectedTags, Props } from "./type";

export const sqlQueryContext = createContext({} as Props);

export function SqlQueryLayoutContext({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState<SelectedTags>([]);
  const [phase2Data, setPhase2Data] = useState<QueryResponse>([]);
  const [lab, setLab] = useState("");
  const [emr, setEmr] = useState("");
  const [claims, setClaims] = useState("");
  const [queryParams, setQueryParams] = useState<RunQueryPayload>();

  type ValidationProps = CreateProjectValidationInitialProps;

  const [projectProps, setProjectProps] = useState<ValidationProps>(
    createProjectValidationInitial
  );

  function handleSetCSV(type: string, csvFile: string) {
    if (type === "laboratory") setLab(csvFile);
    if (type === "emr") setEmr(csvFile);
    if (type === "claims") setClaims(csvFile);
  }

  const setData = useCallback(function (payload: ValidationProps) {
    setProjectProps(payload);
  }, []);

  const setQueryResultPhase2 = useCallback(function (payload: QueryResponse) {
    setPhase2Data(payload);
  }, []);

  const onSetQueryParams = useCallback(function (payload: RunQueryPayload) {
    setQueryParams(payload);
  }, []);

  return (
    <sqlQueryContext.Provider
      value={{
        phase,
        setPhase,
        count,
        setCount,
        selectedColumns,
        setSelectedColumns,
        handleSetCSV,
        lab,
        emr,
        claims,
        projectProps,
        setData,
        phase2Data,
        setQueryResultPhase2,
        queryParams,
        onSetQueryParams,
      }}
    >
      {children}
    </sqlQueryContext.Provider>
  );
}
