import React from "react";
import { IRouteProps } from "./route_interface";
import UserList from "@/pages/dashboard/user_management/UserList";
import BranchList from "@/pages/dashboard/user_management/BranchList";

export const user_management_routes: IRouteProps[] = [
  {
    path: "users_list",
    element: React.createElement(UserList),
  },
  {
    path: "branch_list",
    element: React.createElement(BranchList),
  },
];
