import React from "react";
import { IRouteProps } from "./route_interface";

import ListPurchasesPage from "@/pages/previous/HomeSection/Purchase/Purchases/ListPurchasesPage/ListPurchasesPage";
import EditPurchasePage from "@/pages/previous/HomeSection/Purchase/Purchases/EditPurchasePage/EditPurchasePage";
import AddReturnPurchasePage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/AddReturnPurchasePage/AddReturnPurchasePage";
import ListReturnPurchasesPage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/ListReturnPurchasesPage/ListReturnPurchasesPage";
import EditReturnPurchasePage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/EditReturnPurchasePage/EditReturnPurchasePage";
import AddPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/AddPurchaseOrderPage/AddPurchaseOrderPage";
import ListPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/ListPurchaseOrderPage/ListPurchaseOrderPage";
import EditPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/EditPurchaseOrderPage/EditPurchaseOrderPage";
import AddPurchase from "@/pages/dashboard/purchase/AddPurchase";

export const purchase_routes: IRouteProps[] = [
  {
    path: "add_purchase",
    element: React.createElement(AddPurchase),
  },
  {
    path: "purchase_list",
    element: React.createElement(ListPurchasesPage),
  },
  {
    path: "edit_purchase/:id",
    element: React.createElement(EditPurchasePage),
  },
  {
    path: "add_return_purchase",
    element: React.createElement(AddReturnPurchasePage),
  },
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
