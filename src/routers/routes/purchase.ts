import React from "react";
import { IRouteProps } from "./route_interface";
import EditReturnPurchasePage from "@/pages/previous/HomeSection/Purchase/ReturnPurchase/EditReturnPurchasePage/EditReturnPurchasePage";
import AddPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/AddPurchaseOrderPage/AddPurchaseOrderPage";
import ListPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/ListPurchaseOrderPage/ListPurchaseOrderPage";
import EditPurchaseOrderPage from "@/pages/previous/HomeSection/Purchase/PurchaseOrder/EditPurchaseOrderPage/EditPurchaseOrderPage";
import AddPurchase from "@/pages/dashboard/purchase/AddPurchase";
import PurchaseList from "@/pages/dashboard/purchase/PurchaseList";
import AddPurchaseExchangeReturn from "@/pages/dashboard/purchase/purchase_exchange_return/AddPurchaseExchangeReturn";
import PurchaseExchangeReturnList from "@/pages/dashboard/purchase/purchase_exchange_return/PurchaseExchangeReturnList";

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
    element: React.createElement(AddPurchaseExchangeReturn),
  },
  {
    path: "purchase_exchange_return_list",
    element: React.createElement(PurchaseExchangeReturnList),
  },
  {
    path: "add_purchase_exchange_return/:id",
    element: React.createElement(AddPurchaseExchangeReturn),
  },

  // {
  //   path: "edit_purchase/:id",
  //   element: React.createElement(EditPurchasePage),
  // },

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
