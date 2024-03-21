import React from "react";
import { IRouteProps } from "./route_interface";
import ListReturnPurchasesPage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/ListReturnPurchasesPage/ListReturnPurchasesPage";
import EditReturnPurchasePage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/EditReturnPurchasePage/EditReturnPurchasePage";
import AddPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/AddPurchaseOrderPage/AddPurchaseOrderPage";
import ListPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/ListPurchaseOrderPage/ListPurchaseOrderPage";
import EditPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/EditPurchaseOrderPage/EditPurchaseOrderPage";
import AddPurchase from "@/pages/dashboard/purchase/AddPurchase";
import PurchaseList from "@/pages/dashboard/purchase/PurchaseList";
import AddPurchaseReturn from "@/pages/dashboard/purchase/return/AddPurchaseReturn";

export const purchase_routes: IRouteProps[] = [
  {
    path: "add_purchase",
    element: React.createElement(AddPurchase),
  },
  {
    path: "purchase_list",
    element: React.createElement(PurchaseList),
  },

  {
    path: "purchase_return/:id",
    element: React.createElement(AddPurchaseReturn),
  },
  // {
  //   path: "edit_purchase/:id",
  //   element: React.createElement(EditPurchasePage),
  // },

  {
    path: "return_purchase_list",
    element: React.createElement(ListReturnPurchasesPage),
  },
  {
    path: "edit_return_purchase/:id",
    element: React.createElement(EditReturnPurchasePage),
  },
  {
    path: "add_purchase_order",
    element: React.createElement(AddPurchaseOrderPage),
  },
  {
    path: "purchase_order_list",
    element: React.createElement(ListPurchaseOrderPage),
  },
  {
    path: "edit_purchase_order/:id",
    element: React.createElement(EditPurchaseOrderPage),
  },
];
