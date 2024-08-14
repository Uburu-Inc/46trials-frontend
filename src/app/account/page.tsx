import { Tab } from "@/components/tab";

function Account() {
  return (
    <>
      <div className="px-10 py-10">
        <p className="text-lg font-[500]">My Profile</p>
        <Tab
          current="password"
          title={[{ value: "password", text: "Password" }]}
          interfaceItems={[{ value: "password", component: <p>Hello and test</p> }]}
        />
      </div>
    </>
  );
}

export default Account;
