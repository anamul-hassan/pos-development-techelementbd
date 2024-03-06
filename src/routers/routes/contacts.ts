import React from "react";
import { IRouteProps } from "./route_interface";
import AddCustomerPage from "@/pages/previous/HomeSection/Contacts/Customer/AddCustomerPage/AddCustomerPage";
import ListCustomersPage from "@/pages/previous/HomeSection/Contacts/Customer/ListCustomersPage/ListCustomersPage";
import EditCustomerPage from "@/pages/previous/HomeSection/Contacts/Customer/EditCustomerPage/EditCustomerPage";
import AddSupplierPage from "@/pages/previous/HomeSection/Contacts/Supplier/AddSupplierPage/AddSupplierPage";
import ListSuppliersPage from "@/pages/previous/HomeSection/Contacts/Supplier/ListSuppliersPage/ListSuppliersPage";
import EditSupplierPage from "@/pages/previous/HomeSection/Contacts/Supplier/EditSupplierPage/EditSupplierPage";

export const contacts_routes: IRouteProps[] = [
  {
    path: "add_customer",
    element: React.createElement(AddCustomerPage),
  },
  {
    path: "customers_list",
    element: React.createElement(ListCustomersPage),
  },
  {
    path: "edit_customer/:id",
    element: React.createElement(EditCustomerPage),
  },
  {
    path: "add_supplier",
    element: React.createElement(AddSupplierPage),
  },
  {
    path: "supplier_list",
    element: React.createElement(ListSuppliersPage),
  },
  {
    path: "edit_supplier/:id",
    element: React.createElement(EditSupplierPage),
  },
];
