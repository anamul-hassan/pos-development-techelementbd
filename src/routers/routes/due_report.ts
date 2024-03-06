import React from "react";
import { IRouteProps } from "./route_interface";
import DueCollectionPage from "@/pages/previous/HomeSection/DueReport/DueCollectionPage/DueCollectionPage";
import ListDueCollectionsPage from "@/pages/previous/HomeSection/DueReport/ListDueCollectionsPage/ListDueCollectionsPage";
import EditDueCollectionPage from "@/pages/previous/HomeSection/DueReport/EditDueCollectionPage/EditDueCollectionPage";

export const due_report_routes: IRouteProps[] = [
  {
    path: "due_collection",
    element: React.createElement(DueCollectionPage),
  },
  {
    path: "due_collection_list",
    element: React.createElement(ListDueCollectionsPage),
  },
  {
    path: "edit_due_collection/:id",
    element: React.createElement(EditDueCollectionPage),
  },
];
