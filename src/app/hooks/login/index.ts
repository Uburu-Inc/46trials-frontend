"use client";

import { useCallback, useContext } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../routes";
import { LoginFuncProps, LoginPayload } from "./type";
import toast from "react-hot-toast";
import { AppContext } from "@/app/context";
import { useRouter } from "next/navigation";

export function useLogin(): LoginFuncProps {
  const router = useRouter();
  const { loading, axios } = useNetworkRequest();
  const { setUser } = useContext(AppContext);

  const handleLogin = useCallback(
    async function (payload: LoginPayload) {
      try {
        const res = await axios.post(routes.LOGIN, payload);

        if (res.data) {
          toast.success("Login successful");
          
          setUser({
            token: res.data.access_token,
            uid: res.data.account.uid
          });

          void router.push("/dashboard/pages/project");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [axios, router, setUser]
  );
  return {
    loading,
    handleLogin,
  };
}
