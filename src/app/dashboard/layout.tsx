import { AppContextContainer } from "@/app/context";
import { SideBar } from "@/app/components/sidebar";
import { Navigation } from "./components/navigation"

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppContextContainer>
      <div className="flex min-h-screen">
        <div className="w-[20rem] bg-[#eef0f4]">
          <SideBar />
        </div>
        <div className="w-full">
          <Navigation />
          {children}
        </div>
      </div>
    </AppContextContainer>
  );
}

export default DashboardLayout;
