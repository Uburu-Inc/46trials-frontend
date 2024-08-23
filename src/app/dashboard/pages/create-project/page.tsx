"use client";

import { CreateProjectViewPage } from "./view";
import { SqlQueryLayoutContext } from "../../context";

function CreateProjectPage() {
  return (
    <SqlQueryLayoutContext>
      <CreateProjectViewPage />
    </SqlQueryLayoutContext>
  );
}

export default CreateProjectPage;
