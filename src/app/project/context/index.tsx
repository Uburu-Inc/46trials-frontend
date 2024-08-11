import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { SelectedTags, Props } from "./type";
import { AxiosResponse } from "axios";

export const sqlQueryContext = createContext({} as Props);

export function SqlQueryLayoutContext({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState<SelectedTags>([]);
  const [lab, setLab] = useState("");
  const [emr, setEmr] = useState("");
  const [claims, setClaims] = useState("");
  

  function handleSetCSV(type: string, csvFile: string) {
    if (type === "laboratory") setLab(csvFile);
    if (type === "emr") setEmr(csvFile);
    if (type === "claims") setClaims(csvFile);
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
      }}
    >
      {children}
    </sqlQueryContext.Provider>
  );
}
