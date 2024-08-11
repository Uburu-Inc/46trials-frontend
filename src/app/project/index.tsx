import { useContext } from "react";
import { CreateProject } from "./components/create-project";
import { SearchFilter } from "./components/search-filter";
import { sqlQueryContext } from "./context";

export function CreateProjectViewPage() {
  const { phase } = useContext(sqlQueryContext);
  return (
    <>
      <main>
        <div className={"px-[50px] pt-[2rem] mx-auto w-[996px] px-[20px]"}>
          {phase === 0 && <CreateProject />}
          {phase === 1 && <SearchFilter />}
        </div>
      </main>
    </>
  );
}
