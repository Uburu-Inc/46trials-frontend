import { useContext } from "react";
import { CreateProject } from "./components/create-project";
import { SearchFilter } from "./components/search-filter";
import { sqlQueryContext } from "./context";
import { useLogout } from "@/app/hooks/logout";

export function CreateProjectViewPage() {
  const { phase } = useContext(sqlQueryContext);
  const { logout } = useLogout();
  return (
    <>
      <main>
        <div className="flex justify-end px-10 py-5">
          <button className="underline" onClick={logout}>
            Logout
          </button>
        </div>
        <div className={"px-[50px] pt-[2rem] mx-auto w-[1000px] px-[20px]"}>
          {phase === 0 && <CreateProject />}
          {phase === 1 && <SearchFilter />}
        </div>
      </main>
    </>
  );
}
