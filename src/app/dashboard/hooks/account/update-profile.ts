"use client";

import { useCallback, useContext, useState } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../routes";
import { UpdateProfilePayload, UpdatePasswordFuncProps } from "./type";
import toast from "react-hot-toast";
import { AppContext } from "@/app/context";
import { useRouter } from "next/navigation";

export function useUpdateProfile(): UpdatePasswordFuncProps {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { loading, axios } = useNetworkRequest({ hideErrorAlert: true });

  const { setUser } = useContext(AppContext);

  const handleUpdatePassword = useCallback(
    async function (payload: UpdateProfilePayload) {
      try {
        const res = await axios.post(routes.UPDATE_PROFILE, payload);
        toast.success("Profile updated");

        if (res.data) {
          setSuccess(true);
          toast.success("Profile updated");
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
        toast.error("Failed to update profile");
      }
    },
    [axios, router, setUser]
  );
  return {
    loading,
    success,
    handleUpdatePassword,
  };
}
