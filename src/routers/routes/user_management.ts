import React from "react";
import { IRouteProps } from "./route_interface";
import UserRolePage from "@/pages/previous/HomeSection/UserManagement/UserRolePage/UserRolePage";
import AddUserPage from "@/pages/previous/HomeSection/UserManagement/AddUserPage/AddUserPage";
import EditUserPage from "@/pages/previous/HomeSection/UserManagement/EditUserPage/EditUserPage";
import BranchPage from "@/pages/previous/HomeSection/UserManagement/BranchPage/BranchPage";
import UserList from "@/pages/dashboard/user_management/UserList";

export const user_management_routes: IRouteProps[] = [
  {
    path: "add_user", //  href: "add_user", NAVIGATION LINKS REFERENCE
    element: React.createElement(AddUserPage),
  },
  {
    path: "users_list", //  href: "users_list",  NAVIGATION LINKS REFERENCE
    element: React.createElement(UserList),
  },
  {
    path: "user_role",
    element: React.createElement(UserRolePage),
  },
  {
    path: "edit_user/:id",
    element: React.createElement(EditUserPage),
  },

  {
    path: "branch_list", //  href: "branch_list", NAVIGATION LINKS REFERENCE
    element: React.createElement(BranchPage),
  },
];
