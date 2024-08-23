"use client";

import { useCallback, useState } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../routes";
import toast from "react-hot-toast";
import { PaymentPayload } from "./type";

export function useRegisterPayment() {
  const [success, setSuccess] = useState(false);
  const { loading, axios } = useNetworkRequest({});

  const registerPayment = useCallback(
    async function (payload: PaymentPayload) {
      try {
        const formData = new FormData();
        const blob = new Blob([payload.uploaded_files], { type: 'text/csv' });
        formData.append("name", String(payload.name));
        formData.append("sample_size", String(payload.sample_size));
        formData.append("budget", String(payload.budget));
        formData.append("start_date", String(payload.start_date));
        formData.append("end_date", String(payload.end_date))
        formData.append("fulfilled", String(payload.fulfilled));
        formData.append("client", String(payload.client));
        formData.append("uploaded_files", blob)

        const res = await axios.post(routes.TRIALS, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data) {
          setSuccess(true);
          toast.success("Success");
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
      }
    },
    [axios]
  );

  return {
    loading,
    success,
    registerPayment,
  };
}
