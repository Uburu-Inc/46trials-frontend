import { Tab } from "@/components/tab";
import { HeaderTitle } from "../../../components/header-title";
import { TagsScrollView } from "../../../components/tags-scroll-view";
import { ProjectSummaryComponent } from "./components/project-summary";
import { Response } from "./components/response";

function ProjectSummary() {
  return (
    <div className="px-10">
      <HeaderTitle
        title={["Projects", "Ebola research"]}
        header="Ebola Reasearch"
      />
      <div className="px-1">
        <TagsScrollView
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
        />

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
              component: <ProjectSummaryComponent />,
            },
            {
              value: "response",
              component: <Response />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ProjectSummary;
