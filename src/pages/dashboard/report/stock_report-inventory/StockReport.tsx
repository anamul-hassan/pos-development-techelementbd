/* eslint-disable react-refresh/only-export-components */
import { useGetStockReportQuery } from "@/store/dashboard/dashboardApi";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Command } from "@/components/ui/command";
import { useEffect, useState } from "react";
import DataLoader from "@/components/common/loader/DataLoader";
import { useAppContext } from "@/context/hook/useAppContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/previous/all/Pagination";
import StockReportPdf from "./StockReportPdf";
import InfoWrapper from "@/components/common/InfoWrapper";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "productName",
    header: "Products Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "subcategoryName",
    header: "SubCategory",
  },
  {
    accessorKey: "variationIMEI",
    header: "Variation & IMEI",
  },
  {
    accessorKey: "totalPurchase",
    header: "Total Purchase QTY",
  },
  {
    accessorKey: "totalSale",
    header: "Total Sale QTY",
  },
  {
    accessorKey: "totalPurchaseReturn",
    header: "Total Purchase Return QTY",
  },
  {
    accessorKey: "totalSaleReturn",
    header: "Total Sale Return QTY",
  },
  {
    accessorKey: "stock",
    header: "Current Stock",
  },
  {
    accessorKey: "purchaseValue",
    header: "Current Stock Value(Purchase Price)",
  },
  {
    accessorKey: "saleValue",
    header: "Current Stock Value(Sale Price)",
  },
  {
    accessorKey: "totalTransferred",
    header: "Total Transfered",
  },
  {
    accessorKey: "totalAdjusted",
    header: "Total Adjusted",
  },
];

const StockReport = () => {
  const { sidebarOpen } = useAppContext();
  // POPOVER STATES
  const [stockOpen, setStockOpen] = useState(false);

  // STOCK LIST DATA
  const [stockList, setStockList] = useState<any>([]);

  // SEARCH STOCK REPORT STATE
  // const [stockSearch, setStockSearch] = useState("");

  const stockSearch = "";

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);

  // STOCK REPORT QUERY
  const { data: stockReports, isLoading: isStockReportLoading } =
    useGetStockReportQuery({ search: stockSearch, size: 5, page: currentPage });

  // MAPING STOCK REPORT TO SHOW THE DATA IN TABLE
  // useEffect(() => {
  //   if (stockReports?.result?.length > 0) {
  //     const customizeStockData = stockReports?.result?.map((report: any) => {
  //       return {
  //         productName: report?.productName,
  //         brand: report?.brand,
  //         categoryName: report?.categoryName,
  //         subcategoryName: report?.subcategoryName,
  //         variationIMEI: report?.variationIMEI,
  //         totalPurchase: report?.totalPurchase,
  //         totalSale: report?.totalSale,
  //         totalPurchaseReturn: report?.totalPurchaseReturn,
  //         totalSaleReturn: report?.totalSaleReturn,
  //         stock: report?.stock,
  //         purchaseValue: report?.purchaseValue,
  //         saleValue: report?.saleValue,
  //         totalTransferred: report?.totalTransferred,
  //         totalAdjusted: report?.totalAdjusted,
  //       };
  //     });
  //     setStockList(customizeStockData);
  //   }
  // }, [stockReports]);

  useEffect(() => {
    if (stockReports?.result?.length > 0) {
      const customizeStockData = stockReports?.result?.map((report: any) => {
        return {
          productName: report?.productName,
          brand: report?.brand,
          categoryName: report?.categoryName,
          subcategoryName: report?.subcategoryName,
          variationIMEI: report?.variationIMEI || "N/A",
          totalPurchase: report?.totalPurchase,
          totalSale: report?.totalSale,
          totalPurchaseReturn: report?.totalPurchaseReturn,
          totalSaleReturn: report?.totalSaleReturn,
          stock: report?.stock,
          purchaseValue: report?.purchaseValue,
          saleValue: report?.saleValue,
          totalTransferred: report?.totalTransferred,
          totalAdjusted: report?.totalAdjusted,
        };
      });

      // Compute totals
      let totalPurchaseValueTemp = 0;
      let totalSaleValueTemp = 0;
      let totalSaleTemp = 0;
      let totalPurchaseTemp = 0;
      let totalStock = 0;
      let totalPurchaseReturn = 0;
      let totalSaleReturn = 0;

      customizeStockData.forEach((report: any) => {
        totalPurchaseValueTemp += report.purchaseValue || 0;
        totalSaleValueTemp += report.saleValue || 0;
        totalSaleTemp += report.totalSale || 0;
        totalPurchaseTemp += report.totalPurchase || 0;
        totalStock += report?.stock || 0;
        totalPurchaseReturn += report?.totalPurchaseReturn || 0;
        totalSaleReturn += report?.totalSaleReturn || 0;
      });

      // ADD TOTALS ROW TO THE STOCKLIST ARRAY
      const totalsRow: any = {
        productName: "Total",
        brand: "",
        categoryName: "",
        subcategoryName: "",
        variationIMEI: "",
        totalPurchase: totalPurchaseTemp,
        totalSale: totalSaleTemp,
        totalPurchaseReturn: totalPurchaseReturn,
        totalSaleReturn: totalSaleReturn,
        stock: totalStock,
        purchaseValue: totalPurchaseValueTemp,
        saleValue: totalSaleValueTemp,
        totalTransferred: 0,
        totalAdjusted: 0,
      };

      setStockList([...customizeStockData, totalsRow]);
    }
  }, [stockReports]);

  // STOCK REPORT QUERY LOADER
  if (isStockReportLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH USER FIELD */}
      <div className="flex justify-between items-end w-full">
        {/* UTILITY BUTTONS */}
        <ul className="flex space-x-3 w-full">
          <li>
            <Button variant="tertiary" size="sm">
              EXCEL
            </Button>
          </li>
          <li>
            <Button variant="destructive" size="sm">
              <PDFDownloadLink
                document={<StockReportPdf data={stockReports?.result} />}
                fileName="stock_report.pdf"
              >
                {({ loading }) => (loading ? "Loading Pdf..." : "PDF")}
              </PDFDownloadLink>
            </Button>
          </li>
        </ul>

        {/* SEARCH REPORT FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Variation Size"
            labelFor="search_supplier"
            error=""
          >
            <Popover open={stockOpen} onOpenChange={setStockOpen}>
              <PopoverTrigger
                id="search_supplier"
                asChild
                className={`w-full

            ${
              sidebarOpen
                ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
            }

            `}
              >
                <Button
                  variant="outline"
                  role="search_supplier"
                  aria-expanded={stockOpen}
                  className="w-full justify-between"
                >
                  {/* {selectedSupplier?.firstName
              ? selectedSupplier?.firstName +
                " " +
                selectedSupplier?.lastName
              : generalInfo?.search_supplier.placeholder[locale]} */}
                  Write Product Name for searching
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className={`w-full  ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }`}
              >
                <Command>
                  <div className="flex justify-center p-2">
                    {/* SUPPLIER SEARCH INPUT */}
                    <Input
                      // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      //   setSupplierSearch(e.target.value)
                      // }
                      placeholder="Write variation size for searching"
                    />
                  </div>
                  {/* {isSearching && (
                <div className="my-5 flex justify-center opacity-90">
                  <ButtonLoader />
                </div>
              )} */}
                </Command>
              </PopoverContent>
            </Popover>
          </InputWrapper>
        </div>
      </div>
      {/*  STOCK REPORT TABLE CONTAINER */}

      <InfoWrapper heading="Stock Report Information">
        <DataTable columns={columns} data={stockList} />
      </InfoWrapper>

      {/* STOCK REPORT PAGINATION */}
      <div className="">
        {/* table area */}
        {stockReports?.meta?.total >= 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={isStockReportLoading}
              // totalItems={searchStockReport?.meta?.total}
              // totalPage={searchStockReport?.meta?.totalPage}
              // pageLength={searchStockReport?.meta?.size}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default StockReport;
