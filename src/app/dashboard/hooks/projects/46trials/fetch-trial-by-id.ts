import { useEffect, useState, useRef } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../../routes";
import { TrialResponseFunc, TrialsResults } from "./type";

export function useFetch46TrialById(id: number): TrialResponseFunc {
  const [data, setData] = useState<TrialsResults | null>(null);
  const [success, setSuccess] = useState(false);
  const { axios, loading } = useNetworkRequest({});
  const isRequestMade = useRef(false);

  useEffect(() => {
    // Caches the first request with the use of "ref"
    if (isRequestMade.current) return;
    isRequestMade.current = true;

    async function getTrialById() {
      try {
        const res = await axios.get(routes.TRIAL(id));
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

    getTrialById();
  }, [axios]);

  return { loading, success, data };
}
