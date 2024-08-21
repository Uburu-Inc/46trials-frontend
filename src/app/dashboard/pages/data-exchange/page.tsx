import { NextServerSideSearchParameterTypes } from "@/app/utils/types";
import { Tab } from "@/app/components/reusable-components/tab";
import { OneRecord } from "./components/onerecord";
import { HeaderTitle } from "../../components/header-title"

function DataExchange({ searchParams }: NextServerSideSearchParameterTypes) {
  const current = searchParams?.current ?? "onerecord";
  return (
    <div className="px-10">
      <HeaderTitle title={['Projects']} header="All Projects" />
      <Tab
        className="mt-5"
        current={current as string}
        title={[
          { value: "onerecord", text: "One Record" },
        ]}
        interfaceItems={[
          { value: "onerecord", component: <OneRecord /> },
        ]}
      />
    </div>
  );
}

export default DataExchange;
