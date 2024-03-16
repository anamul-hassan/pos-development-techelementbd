import React from "react";
import { IRouteProps } from "./route_interface";
import CustomerList from "../../pages/dashboard/contacts/CustomerList";
import SupplierList from "../../pages/dashboard/contacts/SupplierList";

export const contacts_routes: IRouteProps[] = [
  {
    path: "customers_list",
    element: React.createElement(CustomerList),
  },
  {
    path: "supplier_list",
    element: React.createElement(SupplierList),
  },
];
