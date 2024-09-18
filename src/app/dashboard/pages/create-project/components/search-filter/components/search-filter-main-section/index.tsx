import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "./globe-icon";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { Tag } from "@/app/dashboard/components/tag";
import { sqlQueryContext } from "@/app/dashboard/context";
import {
  Card,
  CardContent,
} from "@/app/components/reusable-components/shadcn-components/card";
import { SuccessIcon } from "@/app/components/reusable-components/icons/success-icon";
import Drawer from "@/app/components/reusable-components/drawer";
import Modal from "@/app/components/reusable-components/modal";
import { useRegisterPayment } from "@/app/dashboard/hooks/payment/register-payment";
import { useFetchExchangeRate } from "@/app/dashboard/hooks/payment/fetch-exchange-rate";
import { AppContext } from "@/app/context";
import { useSqlQueryRequest } from "@/app/dashboard/hooks/projects/sql/run-query";

export function SearchFilterMainSection() {
  const { push } = useRouter();
  const { params } = useContext(AppContext);
  
  const {
    loading,
    success: querySuccess,
    data,
    sendQuery,
  } = useSqlQueryRequest();

  const {
    count,
    setPhase,
    selectedColumns,
    phase2Data,
    queryParams,
    projectProps,
  } = useContext(sqlQueryContext);

  const {
    registerPayment,
    loading: registeringPayment,
    success: isPaymentRegistered,
  } = useRegisterPayment();

  const { loading: fetchingRate, success, rate } = useFetchExchangeRate();

  const drawerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLButtonElement>(null);

  const costPrice = useMemo(() => {
    if (!fetchingRate && success && rate && count) {
      const cost = rate * 100 * count;
      if (cost) return cost;
    }
  }, [fetchingRate, success, rate, count]);

  console.log(data.map((csv) => csv.data.dataset));

  const onRegisterPayment = useCallback(function () {
    void sendQuery(queryParams);
  }, []);

  useEffect(() => {
    if (!loading && querySuccess && data) {
      void registerPayment({
        name: projectProps.projectName,
        sample_size: projectProps.sampleSize,
        budget: costPrice,
        start_date: projectProps.startDate,
        end_date: projectProps.endDate,
        fulfilled: true,
        uploaded_files: `${data.map((csv) => csv.data.dataset)}`,
        client: params.uid,
      });
    }
  }, [loading, querySuccess, data]);

  function showDrawer() {
    if (drawerRef.current) {
      drawerRef.current.click();
    }
  }

  useEffect(() => {
    if (!registeringPayment && isPaymentRegistered) {
      if (modalRef.current) {
        modalRef.current.click();
      }
    }
  }, [registeringPayment, isPaymentRegistered]);

  return (
    <>
      <div className={"w-full flex justify-between h-[80vh] mt-[1.3rem]"}>
        <Card
          className={
            "w-[30%] bg-white shadow-xl rounded-[0.5rem] h-full overflow-auto"
          }
        >
          {phase2Data.map(({ data: { description, code } }, index) => (
            <div
              key={index}
              className={
                "bg-transparent hover:bg-[#fff2e9] flex px-1 py-4 border-b border-[gray] cursor-pointer"
              }
            >
              <div className="px-3">
                <GlobeIcon />
              </div>
              <div>
                <p>{code}</p>
                <p>{description ?? ""}</p>
              </div>
            </div>
          ))}
        </Card>

        <Card
          className={
            "w-[68%] bg-white shadow-xl rounded-[0.5rem] h-full flex flex-col justify-between px-5 py-5 border"
          }
        >
          <div>
            <p className={"text-black text-[1.1rem] font-[500]"}>
              Search Data Source
            </p>
            <p className={"text-[#a2a7b4] text-[0.9rem] mt-[0.4rem]"}>
              Search/select the diagnosis relating to your study below to see
              volume of records and data available
            </p>
            <p className={"font-[0.9rem] mt-[0.4rem]"}>Your Tags</p>
            <div className={"flex flex-wrap gap-[0.5rem] mt-[0.7rem]"}>
              {selectedColumns.map(({ column }, index) => (
                <Tag
                  key={index}
                  label={column ?? ""}
                  className={"bg-[#A2A7B4] text-[.7rem] p-[0.6rem] font-[500]"}
                />
              ))}
            </div>

            <p className={"text-black text-[0.9rem] mt-[1rem]"}>
              Available Unique Records
            </p>
            <div className={"bg-[#F6F7FC] w-[10rem] p-[1rem] mt-[.8rem]"}>
              <p className={"text-center text-[1rem] font-[500]"}>{count}</p>
            </div>
          </div>

          <div className={"flex justify-end"}>
            <div className={"flex gap-[1rem]"}>
              <ButtonComponent
                onClick={() => {
                  setPhase(0);
                }}
              >
                Back
              </ButtonComponent>
              <ButtonComponent
                className="bg-black"
                onClick={showDrawer}
                disabled={fetchingRate}
              >
                Proceed to Payment
              </ButtonComponent>
            </div>
          </div>
        </Card>
      </div>
      <Drawer
        title="Make Payment"
        description="Kindly view the cost details of your request and proceed to payment."
        proceedText="Confirm Payment"
        ref={drawerRef}
        loading={loading || registeringPayment}
        onProceed={onRegisterPayment}
      >
        <Card>
          <CardContent className="pt-5">
            <p className="text-[0.7rem] text-[#697681]">NUMBER OF RECORD</p>
            <p className="text-sm text-[#051823]">{count}</p>

            <p className="text-[0.7rem] text-[#697681] mt-2">BANK NAME</p>
            <p className="text-sm text-[#051823]">Sterling Bank</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">ACCOUNT NUMBER</p>
            <p className="text-sm text-[#051823]">0080088328</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">ACCOUNT NAME</p>
            <p className="text-sm text-[#051823]">Uburu Health</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">TOTAL COST</p>
            <p className="text-sm text-[#051823]">
              ₦ {costPrice?.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </Drawer>
      <Modal
        ref={modalRef}
        modalIcon={<SuccessIcon />}
        title="Request successful"
        closeButtonTitle="Return to Home"
        onProceed={() => void push("/dashboard/pages/projects")}
      >
        <p className="text-[#525A6E] text-sm">
          Your request was sent successfully. You would receive a feedback
          within 24 working hours. Thanks for your patience!
        </p>
      </Modal>
    </>
  );
}
