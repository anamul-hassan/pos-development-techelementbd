import { FC, useState } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useAppContext } from "@/context/hook/useAppContext";
import DashboardContentField from "@/components/dashboard/DashboardContentField";

interface IDashboardLayoutProps {}

const DashboardLayout: FC<IDashboardLayoutProps> = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const [mouseEnter, setMouseEnter] = useState(false);
  const lang = "en";

  return (
    <section
      className={`w-full h-screen flex overflow-hidden ${
        lang === "en" ? "font-poppins" : "font-anek"
      } `}
    >
      <DashboardSidebar setMouseEnter={setMouseEnter} mouseEnter={mouseEnter} />
      <section
        className={` ${
          sidebarOpen
            ? "w-[calc(100%-260px)] md:w-[calc(100%-280px)] 2xl:w-[calc(100%-300px)] justify-start"
            : "sm:w-full md:w-[94%] lg:w-[94.5%] xl:w-[95.5%] 2xl:w-[95.8%] 3xl:w-[96.5%] max-w-full !fixed right-0 top-0 z-50 "
        } h-screen duration-200 ease-linear transition-all flex flex-col relative overflow-visible bg-background`}
      >
        <DashboardContentField
          setMouseEnter={setMouseEnter}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        ></DashboardContentField>
      </section>
    </section>
  );
};

export default DashboardLayout;
