import { useContext } from "react";
import { db } from "./constant";
import { GlobeIcon } from "./globe-icon";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { Tag } from "../../../../../../components/tag";
import { sqlQueryContext } from "../../../../context";
import { Card } from "@/app/components/reusable-components/shadcn-components/card";

export function SearchFilterMainSection() {
  const { count, setPhase, selectedColumns, lab, emr, claims } =
    useContext(sqlQueryContext);

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
              <ButtonComponent
                onClick={() => {
                  downloadCSV(lab, "lab.xlsx");
                  downloadCSV(emr, "emr.xlsx");
                  downloadCSV(claims, "claims.xlsx");
                }}
              >
                Download
              </ButtonComponent>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
