import React from "react";
import { IRouteProps } from "./route_interface";
import BusinessSettingsPage from "@/pages/previous/HomeSection/Settings/BusinessSettingsPage/BusinessSettingsPage";
import BusinessLocationsPage from "@/pages/previous/HomeSection/Settings/BusinessLocationsPage/BusinessLocationsPage";
import InvoiceSettingsPage from "@/pages/previous/HomeSection/Settings/InvoiceSettingsPage/InvoiceSettingsPage";
import BarcodeSettingsPage from "@/pages/previous/HomeSection/Settings/BarcodeSettingsPage/BarcodeSettingsPage";
import ReceiptPrintersPage from "@/pages/previous/HomeSection/Settings/ReceiptPrintersPage/ReceiptPrintersPage";
import PackageSubscriptionPage from "@/pages/previous/HomeSection/Settings/PackageSubscriptionPage/PackageSubscriptionPage";

export const settings_routes: IRouteProps[] = [
  {
    path: "business_settings",
    element: React.createElement(BusinessSettingsPage),
  },
  {
    path: "business_locations",
    element: React.createElement(BusinessLocationsPage),
  },
  {
    path: "invoice_settings",
    element: React.createElement(InvoiceSettingsPage),
  },
  {
    path: "barcode_settings",
    element: React.createElement(BarcodeSettingsPage),
  },
  {
    path: "receipt_printers",
    element: React.createElement(ReceiptPrintersPage),
  },
  {
    path: "package_subscription",
    element: React.createElement(PackageSubscriptionPage),
  },
];
