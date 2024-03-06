import { FC } from "react";
import DashboardUpperNav from "./DashboardUpperNav";
import { Outlet } from "react-router-dom";

interface IDashboardContentFieldProps {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  setMouseEnter: (mouseEnter: boolean) => void;
}

const DashboardContentField: FC<IDashboardContentFieldProps> = ({
  sidebarOpen,
  setSidebarOpen,
  setMouseEnter,
}) => {
  // overflow - hidden;
  return (
    <main className="w-screen md:w-full overflow-y-auto overscroll-y-contain mx-auto scroll-hidden h-full">
      <DashboardUpperNav
        setMouseEnter={setMouseEnter}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <section
        className={`scroll-hidden overscroll-y-contain pt-[41px] md:pt-[55px] mx-2 md:mx-8 h-full duration-100 transition-all ease-linear ${
          sidebarOpen && "blur-[2px] md:blur-none "
        }`}
      >
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardContentField;
