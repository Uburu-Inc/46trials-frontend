import { useEffect, useState, useRef, useContext } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../routes";
import { ProfileData, FetchProfileResponse } from "./type";
import { AppContext } from "@/app/context";

export function useFetchProfile(): FetchProfileResponse {
  const { params } = useContext(AppContext);
  const [data, setData] = useState<ProfileData | null>(null);

  const [success, setSuccess] = useState(false);
  const { axios, loading } = useNetworkRequest();
  const isRequestMade = useRef(false);

  useEffect(() => {
    // Caches the first request with the use of "ref"
    if (isRequestMade.current) return;
    isRequestMade.current = true;

    async function getInstitutions() {
      try {
        const res = await axios.get(routes.FETCH_PROFILE(params.uid));
        if (res.data) setData(res.data);
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }

    getInstitutions();
  }, [params.uid]);

  return { loading, success, data };
}
