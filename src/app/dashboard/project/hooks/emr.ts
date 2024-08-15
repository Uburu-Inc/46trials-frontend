import { useState, useCallback } from "react";
import { useSendQuery } from "./query";
import { Queries } from "./type";
import { Databases } from "../components/create-project/utils/type";
import { AxiosResponse } from "axios";

export function useEmrNetworkRequest() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataset, setDataset] = useState<AxiosResponse | undefined | string>("");
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const { runQuery } = useSendQuery();

  const fetchResponse = useCallback(async function ({ payload }: { payload: Queries }) {
    setLoading(true);

    try {
      const datasetRes = await runQuery({
        sql_query: payload.emrQuery?.datasetQuery ?? "",
        action: "dataset",
        db_name: Databases.EMR,
      }) as any

      const countRes = await runQuery({
        sql_query: payload.emrQuery?.countQuery ?? "",
        action: "count",
        db_name: Databases.EMR,
      }) as any

      setSuccess(true);
      setLoading(false);

      if (countRes?.count.count) setCount(countRes.count.count);
      setDataset(datasetRes?.dataset);

      setIsDone(true);
    } catch (e) {
      setLoading(false);
      setSuccess(false);
      setIsDone(true);
    }
  }, []);

  return { loading, dataset, count, success, isDone, fetchResponse };
};
