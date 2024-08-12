import { useState, useCallback } from "react";
import { Queries } from "./type";
import { Databases } from "../components/create-project/utils/type";

import { useSendQuery } from "./query";

export function useClaimsNetworkRequest() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataset, setDataset] = useState(
    ""
  );
  
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const { runQuery } = useSendQuery();

  const fetchResponse = useCallback(async function ({
    payload,
  }: {
    payload: Queries;
  }) {
    setLoading(true);

    try {
      const datasetRes = await runQuery({
        sql_query: payload.claimsQuery?.countQuery ?? "",
        action: "count",
        db_name: Databases.CLAIMS,
      }) as any

      const countRes = await runQuery({
        sql_query: payload.claimsQuery?.countQuery ?? "",
        action: "count",
        db_name: Databases.CLAIMS,
      }) as any

      setSuccess(true);
      setLoading(false);

      if (countRes?.data.count) setCount(countRes.data.count);
      setDataset(datasetRes?.data.dataset);

      setIsDone(true);
    } catch (e) {
      setLoading(false);
      setSuccess(false);
      setIsDone(true);
    }
  },
  []);

  return { loading, dataset, count, success, isDone, fetchResponse };
}
