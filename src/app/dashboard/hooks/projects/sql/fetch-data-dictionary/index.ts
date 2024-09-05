import { useNetworkRequest } from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { routes } from "../../../routes";
import { FetchDataDictionaryProps, FetchDataDictionaryData } from "./type";

export function useFetchDataDictionary(): FetchDataDictionaryProps {
  const [data, setData] = useState<FetchDataDictionaryData | null>(null);
  const [success, setSuccess] = useState(false);
  const isRequestMade = useRef(false);
  const { axios, loading } = useNetworkRequest({});

  useEffect(() => {
    // Caches the first request with the use of "ref"
    if (isRequestMade.current) return;
    isRequestMade.current = true;

    async function getDataDictionary() {
      try {
        const res = await axios.get(routes.FETCH_DATA_DICTIONARY);

        if (res.data) {
          setData(res.data);
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
      }
    }

    getDataDictionary();
  }, [axios]);

  return { loading, success, data };
}
