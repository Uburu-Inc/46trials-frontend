"use client";

import { Tab } from "@/app/components/reusable-components/tab";
import { Loader } from "@/app/components/reusable-components/loader";
import { HeaderTitle } from "@/app/dashboard/components/header-title";
import { TagsScrollView } from "@/app/dashboard/components/tags-scroll-view";
import { ProjectSummaryComponent } from "./project-summary";
import { Response } from "./response";
import { useFetch46TrialById } from "@/app/dashboard/hooks/projects/46trials/fetch-trial-by-id";

interface Props {
  id: string;
  slug: string;
}

export function ViewProjectSummary({ id, slug }: Props) {
  const { loading, data } = useFetch46TrialById(Number(id));
  const projectName = slug.replaceAll("-", " ");
  return (
    <div className="px-10">
      <HeaderTitle title={["Projects", projectName]} header={projectName} />
      <div className="px-1">
        {/* <TagsScrollView
          className="mt-3 w-[70rem]"
          items={[
            "Diagnosis",
            "First Name",
            "Last Name",
            "Region",
            "Age",
            "Gender",
            "Procedure Description",
            "Test",
          ]}
        /> */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <Loader className="h-14 w-14" />
          </div>
        ) : (
          <>
            <Tab
              className="mt-5"
              current="project-summary"
              title={[
                { value: "project-summary", text: "Project Summary" },
                { value: "response", text: "Response" },
              ]}
              interfaceItems={[
                {
                  value: "project-summary",
                  component: (
                    <ProjectSummaryComponent
                      sampleSize={data?.sample_size ?? ""}
                      budget={data?.budget ?? ""}
                      startDate={new Date(
                        data?.start_date ?? ""
                      ).toLocaleDateString()}
                      endDate={new Date(
                        data?.end_date ?? ""
                      ).toLocaleDateString()}
                    />
                  ),
                },
                {
                  value: "response",
                  component: (
                    <Response
                      name={data?.name ?? ""}
                      date={data?.start_date ?? ""}
                      list={data?.trial_files ?? []}
                    />
                  ),
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
