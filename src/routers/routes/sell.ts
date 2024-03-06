import React from "react";
import { IRouteProps } from "./route_interface";
import AddSalesPage from "@/pages/previous/HomeSection/Sell/Sale/AddSalesPage/AddSalesPage";
import ListSalesPage from "@/pages/previous/HomeSection/Sell/Sale/ListSalesPage/ListSalesPage";
import EditSalePage from "@/pages/previous/HomeSection/Sell/Sale/EditSalePage/EditSalePage";
import ListPosPage from "@/pages/previous/HomeSection/Sell/Pos/ListPosPage/ListPosPage";
import EditPosPage from "@/pages/previous/HomeSection/Sell/Pos/EditPosPage/EditPosPage";
import AddDraftPage from "@/pages/previous/HomeSection/Sell/Draft/AddDraftPage/AddDraftPage";
import ListDraftsPage from "@/pages/previous/HomeSection/Sell/Draft/ListDraftsPage/ListDraftsPage";
import EditDraftPage from "@/pages/previous/HomeSection/Sell/Draft/EditDraftPage/EditDraftPage";
import AddQuotationPage from "@/pages/previous/HomeSection/Sell/Quotation/AddQuotationPage/AddQuotationPage";
import ListQuatationPage from "@/pages/previous/HomeSection/Sell/Quotation/ListQuatationPage/ListQuatationPage";
import EditQuatationPage from "@/pages/previous/HomeSection/Sell/Quotation/EditQuatationPage/EditQuatationPage";

import EditSellReturnPage from "@/pages/previous/HomeSection/Sell/SellReturn/EditSellReturnPage/EditSellReturnPage";
import ShipmentsPage from "@/pages/previous/HomeSection/Sell/ShipmentsPage/ShipmentsPage";
import DiscountsPage from "@/pages/previous/HomeSection/Sell/DiscountsPage/DiscountsPage";
import ImportSalePage from "@/pages/previous/HomeSection/Sell/ImportsSalePage/ImportsSalePage";
import ListSellReturnPage from "@/pages/previous/HomeSection/Sell/SellReturn/ListSellReturnPage/ListSellReturnPage";
import AddPointOfSell from "@/pages/dashboard/sell/point_of_sell/AddPointOfSell";

export const sell_routes: IRouteProps[] = [
  {
    path: "add_sell",
    element: React.createElement(AddSalesPage),
  },
  {
    path: "sell_list",
    element: React.createElement(ListSalesPage),
  },
  {
    path: "edit_sell/:id",
    element: React.createElement(EditSalePage),
  },
  {
    path: "add_pos",
    element: React.createElement(AddPointOfSell),
  },
  {
    path: "pos_list",
    element: React.createElement(ListPosPage),
  },
  {
    path: "edit_pos/:id",
    element: React.createElement(EditPosPage),
  },
  {
    path: "add_draft",
    element: React.createElement(AddDraftPage),
  },
  {
    path: "draft_list",
    element: React.createElement(ListDraftsPage),
  },
  {
    path: "edit_draft/:id",
    element: React.createElement(EditDraftPage),
  },
  {
    path: "add_quotation",
    element: React.createElement(AddQuotationPage),
  },
  {
    path: "quotations_list",
    element: React.createElement(ListQuatationPage),
  },
  {
    path: "edit_quotation/:id",
    element: React.createElement(EditQuatationPage),
  },
  {
    path: "sell_return_list",
    element: React.createElement(ListSellReturnPage),
  },
  {
    path: "edit_sell_return/:id",
    element: React.createElement(EditSellReturnPage),
  },
  {
    path: "shipments",
    element: React.createElement(ShipmentsPage),
  },
  {
    path: "discounts",
    element: React.createElement(DiscountsPage),
  },
  {
    path: "imports_sales",
    element: React.createElement(ImportSalePage),
  },
];
