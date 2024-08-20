"use client";

import { Loader } from "@/components/loader";
import { useFetchProfile } from "../../../hooks/profile/fetch-profile";

export function Detail() {
  const { loading, data } = useFetchProfile();
  return (
    <section>
      {loading || !data ? (
        <div className="flex justify-center">
          <Loader className="w-20 h-20" />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="w-[25%]">
            <div className="bg-[#ebecec] py-10 px-5 rounded-lg flex w-full flex justify-center">
              <div className="flex">
                <div className="bg-[#d1dadd] rounded-full w-28 h-28 flex justify-center items-center">
                  <p className="font-[500] text-4xl uppercase">
                    {data?.email ? data.email[0] : ""}
                    {data?.email ? data.email[1] : ""}
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-[70%]">
            <div>
              <p className="font-bold">Email</p>
              <p>{data?.email ?? ""}</p>
            </div>

            <div className="mt-5">
              <p className="font-bold">Phone</p>
              <p>{data?.phone ?? ""}</p>
            </div>

            <div className="mt-5">
              <p className="font-bold">Location</p>
              <p>{data?.country ?? ""}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
