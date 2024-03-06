import DashboardAnalyticsContainerAdmin from "@/components/dashboard/analytics/DashboardAnalyticsContainerAdmin";
import DashboardAnalyticsContainerRest from "@/components/dashboard/analytics/DashboardAnalyticsContainerRest";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { FC } from "react";

interface IDashboardAnalyticsProps {}

const DashboardAnalytics: FC<IDashboardAnalyticsProps> = () => {
  const { role } = shareBranchAndUserInfo();
  return (
    <section>
      {role.toLowerCase() === "admin" ? (
        <DashboardAnalyticsContainerAdmin />
      ) : (
        <DashboardAnalyticsContainerRest />
      )}
    </section>
  );
};

export default DashboardAnalytics;
