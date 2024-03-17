import React from "react";
import { IRouteProps } from "./route_interface";
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
import AddSale from "@/pages/dashboard/sale/AddSale";
import SaleList from "@/pages/dashboard/sale/SaleList";
import EditSale from "@/pages/dashboard/sale/EditSale";
import AddSaleExchangeReturn from "@/pages/dashboard/sale/exchange_return/AddSaleExchangeReturn";

export const sale_routes: IRouteProps[] = [
  {
    path: "add_sale",
    element: React.createElement(AddSale),
  },
  {
    path: "sale_list",
    element: React.createElement(SaleList),
  },
  {
    path: "edit_sale/:id",
    element: React.createElement(EditSale),
  },

  {
    path: "sale_exchange_return/:id",
    element: React.createElement(AddSaleExchangeReturn),
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
