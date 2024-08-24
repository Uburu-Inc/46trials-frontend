import { ViewProjectSummary } from "./components";
import { NextServerSideSearchParameterTypes } from "@/app/utils/types";

function ProjectSummary({ params }: NextServerSideSearchParameterTypes) {
  return <ViewProjectSummary id={params.id ?? ""} slug={params.slug ?? ""} />;
}

export default ProjectSummary;
