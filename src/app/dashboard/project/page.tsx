"use client";

import { CreateProjectViewPage } from ".";
import { SqlQueryLayoutContext } from "./context";

function CreateProjectPage() {
  return (
    <SqlQueryLayoutContext>
      <CreateProjectViewPage />
    </SqlQueryLayoutContext>
  );
}

export default CreateProjectPage;
