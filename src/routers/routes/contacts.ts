import React from "react";
import { IRouteProps } from "./route_interface";
import CustomerList from "../../pages/dashboard/contacts/customer/CustomerList";
import SupplierList from "../../pages/dashboard/contacts/supplier/SupplierList";
import EditCustomer from "../../pages/dashboard/contacts/customer/EditCustomer";
import AddCustomer from "../../pages/dashboard/contacts/customer/AddCustomer";

export const contacts_routes: IRouteProps[] = [
  {
    path: "add_customer",
    element: React.createElement(AddCustomer),
  },
  {
    path: "customers_list",
    element: React.createElement(CustomerList),
  },
  {
    path: "edit_customer/:id",
    element: React.createElement(EditCustomer),
  },

  {
    path: "supplier_list",
    element: React.createElement(SupplierList),
  },
];
