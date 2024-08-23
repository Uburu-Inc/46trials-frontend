import { createContext, ReactNode, useState } from "react";
import { CreateProjectValidationInitialProps } from "@/app/dashboard/hooks/projects/sql/utils/type";
import { createProjectValidationInitial } from "@/app/dashboard/hooks/projects/sql/utils/constant";
import { SelectedTags, Props } from "./type";

export const sqlQueryContext = createContext({} as Props);

export function SqlQueryLayoutContext({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState<SelectedTags>([]);
  const [lab, setLab] = useState("");
  const [emr, setEmr] = useState("");
  const [claims, setClaims] = useState("");

  const [projectProps, setProjectProps] =
    useState<CreateProjectValidationInitialProps>(
      createProjectValidationInitial
    );

  function handleSetCSV(type: string, csvFile: string) {
    if (type === "laboratory") setLab(csvFile);
    if (type === "emr") setEmr(csvFile);
    if (type === "claims") setClaims(csvFile);
  }

  function handleSetProjectData(payload: CreateProjectValidationInitialProps) {
    setProjectProps(payload)
  }

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
        handleSetProjectData
      }}
    >
      {children}
    </sqlQueryContext.Provider>
  );
}
