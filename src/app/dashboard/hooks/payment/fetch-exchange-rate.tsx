import { useEffect, useRef, useState } from "react";
import { routes } from "../routes";
import axios from "axios";
import { ExchangeRatePayload } from "./type";

export function useFetchExchangeRate() {
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const isRequestMade = useRef(false);

  useEffect(() => {
    // Caches the first request with the use of "ref"
    if (isRequestMade.current) return;
    isRequestMade.current = true;

    async function getAccount() {
      setLoading(true);
      try {
        const res: ExchangeRatePayload = await axios.get(
          routes.FETCH_EXCHANGE_RATE
        );
        if (res.data.conversion_rate) setRate(res.data.conversion_rate);
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getAccount();
  }, [axios]);

  return { loading, success, rate };
}
