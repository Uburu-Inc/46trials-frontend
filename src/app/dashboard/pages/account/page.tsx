import { NextServerSideSearchParameterTypes } from "@/app/utils/types";
import { Tab } from "@/components/tab";
import { Detail } from "./components/details";
import { Security } from "./components/security";

function Account({ searchParams }: NextServerSideSearchParameterTypes) {
  const current = searchParams?.current ?? "details";

  return (
    <>
      <div className="px-10 py-10">
        <p className="text-lg font-[500]">My Profile</p>
        <Tab
          className="mt-5"
          current={current as string}
          title={[
            { value: "details", text: "Details" },
            { value: "security", text: "Security" },
          ]}
          interfaceItems={[
            { value: "details", component: <Detail /> },
            { value: "security", component: <Security /> },
          ]}
        />
      </div>
    </>
  );
}

export default Account;
