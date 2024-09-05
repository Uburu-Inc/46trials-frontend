import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../../../routes";
import { RunQueryResponse, RunQueryPayload, QueryResponse } from "./type";
import { useState } from "react";

export function useSqlQueryRequest(): RunQueryResponse {
  const { axios, loading } = useNetworkRequest({});
  const [data, setData] = useState<QueryResponse>([]);
  const [success, setSuccess] = useState(false);

  async function sendQuery(payload: RunQueryPayload) {
    try {
      const res = await axios.post(routes.RUN_SQL_QUERY, payload);
      setData(res.data.results)
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  }

  return {
    success,
    loading,
    data,
    sendQuery,
  };
}
