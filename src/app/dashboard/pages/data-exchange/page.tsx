import { NextServerSideSearchParameterTypes } from "@/app/utils/types";
import { Tab } from "@/app/components/reusable-components/tab";
import { FortySixTrials } from "./components/onerecord";
import { HeaderTitle } from "../../components/header-title"

function DataExchange({ searchParams }: NextServerSideSearchParameterTypes) {
  const current = searchParams?.current ?? "46trials";
  return (
    <div className="px-10">
      <HeaderTitle title={['Projects']} header="All Projects" />
      <Tab
        className="mt-5"
        current={current as string}
        title={[
          { value: "46trials", text: "46 Trials" },
        ]}
        interfaceItems={[
          { value: "46trials", component: <FortySixTrials /> },
        ]}
      />
    </div>
  );
}

export default DataExchange;
