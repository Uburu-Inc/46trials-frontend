"use client";

import { useCallback, useState } from "react";
import { useNetworkRequest } from "@/lib/axios";
import { routes } from "../routes";
import toast from "react-hot-toast";
import {
  FinalizeTrialPayload,
  TrialsResponseProps,
  FinalizeTrialParamsFuncTypes,
} from "./type";

export function useFinalizeTrials() {
  const [success, setSuccess] = useState(false);
  const [trials, setTrials] = useState<TrialsResponseProps | null>(null);
  const [trialSuccess, setTrialSuccess] = useState(false);

  const { loading, axios } = useNetworkRequest({});

  const createTrial = useCallback(
    async function (payload: FinalizeTrialPayload) {
      try {
        const response = await axios.post(routes.TRIALS, {
          name: payload.name,
          sample_size: payload.sample_size,
          budget: payload.budget,
          start_date: payload.start_date,
          fulfilled: payload.fulfilled,
          client: payload.client,
        });
        if (!response.data) return;
        setTrials(response.data);
        setTrialSuccess(true);
      } catch (error) {
        console.log(error);
        toast.error("An error occured");
        setTrialSuccess(false);
      }
    },
    [axios]
  );

  const finalizeTrialCreation = useCallback(
    async function ({ payload, trialId }: FinalizeTrialParamsFuncTypes) {
      try {
        const response = await axios.post(routes.UPLOAD_TRIAL_FILES, {
          trial_files: payload.upload_files,
        });

        if (response.data) {
          await axios.put(`${routes.TRIALS}${trialId}/`, {
            name: payload.name,
            sample_size: payload.sample_size,
            budget: payload.budget,
            start_date: payload.start_date,
            end_date: payload.end_date,
            fulfilled: payload.fulfilled,
            client: payload.client,
          });

          setSuccess(true);
          toast.success("Successs");
          return;
        }

        setSuccess(false);
      } catch (error) {
        console.log(error);
        toast.error("An error occured");
      }
    },
    [axios]
  );

  return {
    loading,
    success,
    trials,
    trialSuccess,
    finalizeTrialCreation,
    createTrial,
  };
}
