import { useContext, useRef } from "react";
import { db } from "./constant";
import { GlobeIcon } from "./globe-icon";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { Tag } from "../../../../../../components/tag";
import { sqlQueryContext } from "../../../../context";
import {
  Card,
  CardContent,
} from "@/app/components/reusable-components/shadcn-components/card";
import { SuccessIcon } from "@/app/components/reusable-components/icons/success-icon"
import Drawer from "@/app/components/reusable-components/drawer";
import Modal from "@/app/components/reusable-components/modal";

export function SearchFilterMainSection() {
  const { count, setPhase, selectedColumns, lab, emr, claims } =
    useContext(sqlQueryContext);

  const drawerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLButtonElement>(null);

  function downloadCSV(csv: string, filename: string) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  function showDrawer() {
    if (drawerRef.current) {
      drawerRef.current.click();
    }
  }

  function showModal() {
    if (modalRef.current) {
      modalRef.current.click();
    }
  }

  return (
    <>
      <div className={"w-full flex justify-between h-[80vh] mt-[1.3rem]"}>
        <Card
          className={
            "w-[30%] bg-white shadow-xl rounded-[0.5rem] h-full overflow-auto"
          }
        >
          {db.map(({ dbName, description }, index) => (
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
                <p>{dbName}</p>
                <p>{description}</p>
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
              {/* <ButtonComponent
                onClick={() => {
                  downloadCSV(lab, "lab.xlsx");
                  downloadCSV(emr, "emr.xlsx");
                  downloadCSV(claims, "claims.xlsx");
                }}
              >
                Download
              </ButtonComponent> */}
              <ButtonComponent className="bg-black" onClick={showDrawer} disabled>
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
        onProceed={showModal}
      >
        <Card>
          <CardContent className="pt-5">
            <p className="text-[0.7rem] text-[#697681]">NUMBER OF RECORD</p>
            <p className="text-sm text-[#051823]">1</p>

            <p className="text-[0.7rem] text-[#697681] mt-2">BANK NAME</p>
            <p className="text-sm text-[#051823]">Sterling Bank</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">ACCOUNT NUMBER</p>
            <p className="text-sm text-[#051823]">0080088328</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">ACCOUNT NAME</p>
            <p className="text-sm text-[#051823]">Uburu Health</p>

            <p className="text-[0.7rem] text-[#697681] mt-4">TOTAL COST</p>
            <p className="text-sm text-[#051823]">₦ 159000.00</p>
          </CardContent>
        </Card>
      </Drawer>
      <Modal
        ref={modalRef}
        modalIcon={<SuccessIcon />}
        title="Request successful"
        closeButtonTitle="Return to Home"
      >
        <p className="text-[#525A6E] text-sm">
          Your request was sent successfully. You would receive a feedback
          within 24 working hours. Thanks for your patience!
        </p>
      </Modal>
    </>
  );
}
