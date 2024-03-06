import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { shareWithCookies } from "@/utils/helpers/shareWithCookies";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IAdminRouteProps {
  children: ReactNode;
}
const AdminRoute: FC<IAdminRouteProps> = ({ children }) => {
  const location = useLocation();

  const user_token = shareWithCookies(
    "get",
    `${CLIENT_DETAILS.companyCode}token`
  );
  if (!user_token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AdminRoute;
