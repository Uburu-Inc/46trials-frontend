import { useEffect, useState, useRef } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../../routes";
import { TrialsResponseFunc, TrialsResponse } from "./type";

export function useFetch46Trials(): TrialsResponseFunc {
  const [data, setData] = useState<TrialsResponse | null>(null);
  const [success, setSuccess] = useState(false);
  const { axios, loading } = useNetworkRequest({});
  const isRequestMade = useRef(false);

  useEffect(() => {
    // Caches the first request with the use of "ref"
    if (isRequestMade.current) return;
    isRequestMade.current = true;

    async function getTrials() {
      try {
        const res = await axios.get(routes.TRIALS);
        if (res.data) {
          setData(res.data);
          setSuccess(true);
        }

        setSuccess(false);
      } catch (error) {
        setSuccess(false);
        console.error(error);
      }
    }

    getTrials();
  }, [axios]);

  return { loading, success, data };
}
