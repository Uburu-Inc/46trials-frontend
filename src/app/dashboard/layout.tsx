import { AppContextContainer } from "@/app/context";
import { SideBar } from "@/app/components/sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppContextContainer>
      <div className="flex min-h-screen">
        <div className="w-[20%] bg-[#eef0f4]">
          <SideBar />
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </AppContextContainer>
  );
}

export default DashboardLayout;
