import React from "react";
import { IRouteProps } from "./route_interface";
import AddProductPage from "@/pages/previous/HomeSection/Product/Product/AddProductPage/AddProductPage";
import ListProductsPage from "@/pages/previous/HomeSection/Product/Product/ListProductsPage/ListProductsPage";
import BrandPage from "@/pages/previous/HomeSection/Product/BrandPage/BrandPage";
import CategoryPage from "@/pages/previous/HomeSection/Product/CategoryPage/CategoryPage";
import SubCategoryPage from "@/pages/previous/HomeSection/Product/SubCategoryPage/SubCategoryPage";
import UnitPage from "@/pages/previous/HomeSection/Product/UnitPage/UnitPage";
import WarrantyPage from "@/pages/previous/HomeSection/Product/WarrantyPage/WarrantyPage";
import QuotationPage from "@/pages/previous/HomeSection/Product/QuotationPage/QuotationPage";
import ImportProductsPage from "@/pages/previous/HomeSection/Product/ImportProductsPage/ImportProductsPage";
import ImportOpeningStockPage from "@/pages/previous/HomeSection/Product/ImportOpeningStockPage/ImportOpeningStockPage";
import SellingPriceGroupPage from "@/pages/previous/HomeSection/Product/SellingPriceGroupPage/SellingPriceGroupPage";
import EditProductPage from "@/pages/previous/HomeSection/Product/Product/EditProductPage/EditProductPage";
import CategoryEdit from "@/pages/previous/HomeSection/Product/CategoryPage/CategoryEdit";
import SubCategoryEdit from "@/pages/previous/HomeSection/Product/SubCategoryPage/SubCategoryEdit";
import WarrantyEdit from "@/pages/previous/HomeSection/Product/WarrantyPage/WarrantyEdit";
import BrandEdit from "@/pages/previous/HomeSection/Product/BrandPage/BrandEdit";
import UnitEdit from "@/pages/previous/HomeSection/Product/UnitPage/UnitEdit";
import PrintLabel from "@/pages/dashboard/product/PrintLabel";
import Variation from "@/pages/dashboard/product/Variation";

export const products_routes: IRouteProps[] = [
  {
    path: "add_product",
    element: React.createElement(AddProductPage),
  },
  {
    path: "products_list",
    element: React.createElement(ListProductsPage),
  },
  {
    path: "edit_product/:id",
    element: React.createElement(EditProductPage),
  },
  {
    path: "brand_list",
    element: React.createElement(BrandPage),
  },
  {
    path: "edit_brand/:id",
    element: React.createElement(BrandEdit),
  },
  {
    path: "category_list",
    element: React.createElement(CategoryPage),
  },
  {
    path: "edit_category/:id",
    element: React.createElement(CategoryEdit),
  },
  {
    path: "sub_category_list",
    element: React.createElement(SubCategoryPage),
  },
  {
    path: "edit_sub_category/:id",
    element: React.createElement(SubCategoryEdit),
  },
  {
    path: "unit_list",
    element: React.createElement(UnitPage),
  },
  {
    path: "edit_unit/:id",
    element: React.createElement(UnitEdit),
  },
  {
    path: "variation_list",
    element: React.createElement(Variation),
  },
  {
    path: "warranty_list",
    element: React.createElement(WarrantyPage),
  },
  {
    path: "edit_warranty/:id",
    element: React.createElement(WarrantyEdit),
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
