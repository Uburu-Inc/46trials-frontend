import { useCallback } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { QueryPayload } from "./type";

export function useSendQuery() {
  const { axios } = useNetworkRequest({ hideErrorAlert: true });

  const runQuery = useCallback(
    async function (payload: QueryPayload) {
      try {
        const response = await axios.post("", payload);
        if (payload.action === "count") return { count: response.data };
        if (payload.action === "dataset") return { dataset: response };
      } catch (error) {
        console.error(error);
      }
    },
    [axios]
  );

  return { runQuery };
}
