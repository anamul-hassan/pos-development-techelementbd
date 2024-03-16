import React from "react";
import { IRouteProps } from "./route_interface";
import QuotationPage from "@/pages/previous/HomeSection/Product/QuotationPage/QuotationPage";
import ImportProductsPage from "@/pages/previous/HomeSection/Product/ImportProductsPage/ImportProductsPage";
import ImportOpeningStockPage from "@/pages/previous/HomeSection/Product/ImportOpeningStockPage/ImportOpeningStockPage";
import SellingPriceGroupPage from "@/pages/previous/HomeSection/Product/SellingPriceGroupPage/SellingPriceGroupPage";
import PrintLabel from "@/pages/dashboard/product/PrintLabel";
import Variation from "@/pages/dashboard/product/Variation";
import ProductList from "@/pages/dashboard/product/ProductList";
import ProductSubCategoryList from "@/pages/dashboard/product/ProductSubCategoryList";
import ProductCategoryList from "@/pages/dashboard/product/ProductCategoryList";
import BrandList from "@/pages/dashboard/product/BrandList";
import ProductUnitList from "@/pages/dashboard/product/ProductUnitList";
import WarrantyList from "@/pages/dashboard/product/WarrantyList";

export const products_routes: IRouteProps[] = [
  {
    path: "products_list",
    element: React.createElement(ProductList),
  },
  {
    path: "brand_list",
    element: React.createElement(BrandList),
  },

  {
    path: "category_list",
    element: React.createElement(ProductCategoryList),
  },

  {
    path: "sub_category_list",
    element: React.createElement(ProductSubCategoryList),
  },

  {
    path: "unit_list",
    element: React.createElement(ProductUnitList),
  },

  {
    path: "variation_list",
    element: React.createElement(Variation),
  },
  {
    path: "warranty_list",
    element: React.createElement(WarrantyList),
  },

  {
    path: "quotation_list",
    element: React.createElement(QuotationPage),
  },
  {
    path: "print_labels",
    element: React.createElement(PrintLabel),
  },
  {
    path: "import_product_list",
    element: React.createElement(ImportProductsPage),
  },
  {
    path: "import_opening_stock",
    element: React.createElement(ImportOpeningStockPage),
  },
  {
    path: "selling_price_group",
    element: React.createElement(SellingPriceGroupPage),
  },
];
