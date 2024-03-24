import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InfoWrapper from "@/components/common/InfoWrapper";
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import DataLoader from "@/components/common/loader/DataLoader";
import DayBookExcel from "./DayBookExcel";
import { useGetDayBookReportQuery } from "@/store/dashboard/dashboardApi";
import InputWrapper from "@/components/common/form/InputWrapper";
import PdfTable, {
  IPdfPageHeaderData,
  IPdfTableColumn,
  ITableSummary,
} from "@/components/common/PdfTable";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import moment from "moment";
import { totalCalculator } from "@/utils/helpers/totalCalculator";

interface IDayBookProps {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  profit: number;
}

interface IDayPayablePaymentsProps {
  id: string;
  supplierName: string;
  paymentType: string;
  price: number;
}

const DayBook: React.FC = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const { data: dayBooks, isLoading: dayReportLoading } =
    useGetDayBookReportQuery({
      from: date?.from instanceof Date ? date.from.toISOString() : undefined,
      to: date?.to instanceof Date ? date.to.toISOString() : undefined,
    });

  if (dayReportLoading) {
    return <DataLoader />;
  }

  const columnsProduct: IPdfTableColumn[] = [
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quality",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "profit",
      header: "Profit",
    },
  ];
  const columnsPayment: IPdfTableColumn[] = [
    {
      accessorKey: "paymentType",
      header: "Payment Type",
    },
    {
      accessorKey: "price",
      header: "Payment Amount",
    },
  ];

  const headerProduct: IPdfPageHeaderData = {
    company: CLIENT_DETAILS.companyName,
    heading: "Day-book Report (Product)",
    logo: CLIENT_DETAILS.sidebarLogo,
    date,
  };
  const headerPayment: IPdfPageHeaderData = {
    company: CLIENT_DETAILS.companyName,
    heading: "Day-book Report (Payment)",
    logo: CLIENT_DETAILS.sidebarLogo,
    date,
  };
  const summaryPayment: ITableSummary = {
    totalPrice: dayBooks?.data?.total?.totalPrice,
    totalProfit: dayBooks?.data?.total?.totalProfit,
    totalProduct: dayBooks?.data?.stocks?.length,
    totalQuantity: dayBooks?.data?.total?.totalQuantity,
  };

  return (
    <section className="pb-8">
      <div className="flex justify-between items-end">
        <div className="space-x-3 flex">
          {/* BUTTON & COMPONENT FOR EXCEL */}
          <DayBookExcel data={dayBooks?.data} />
          {/* BUTTON & COMPONENT FOR PDF */}
          <PDFDownloadLink
            document={
              <PdfTable
                columns={columnsProduct}
                data={dayBooks?.data?.stocks}
                headerData={headerProduct}
                summary={summaryPayment}
              />
            }
            fileName={`${CLIENT_DETAILS?.companyName} || ${moment().format(
              "DD MMMM, YYYY, hh:mm A"
            )} || Daybook Report.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button
                  disabled={loading}
                  className=" transition-all duration-150"
                  variant="destructive"
                  size="xs"
                >
                  <ButtonLoader /> Product
                </Button>
              ) : (
                <Button variant="destructive" size="xs">
                  Product
                </Button>
              )
            }
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              <PdfTable
                columns={columnsPayment}
                data={dayBooks?.data?.payments}
                headerData={headerPayment}
              />
            }
            fileName={`${CLIENT_DETAILS?.companyName} || ${moment().format(
              "DD MMMM, YYYY, hh:mm A"
            )} || Daybook Report (Payment).pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button
                  disabled={loading}
                  className=" transition-all duration-150"
                  variant="destructive"
                  size="xs"
                >
                  <ButtonLoader /> Payment
                </Button>
              ) : (
                <Button
                  disabled={!dayBooks?.data?.payments?.length}
                  variant="destructive"
                  size="xs"
                >
                  Payment
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>

        <div className={cn("grid gap-2 mt-7")}>
          <InputWrapper
            label="Select Date Range"
            error=""
            labelFor="date_range"
          >
            <Popover>
              <PopoverTrigger id="date_range" asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </InputWrapper>
        </div>
      </div>

      <div>
        {/* SALE & POS PRODUCTS REPORT */}
        <InfoWrapper className="my-2" heading="Daily Sales Report">
          <section className="-mx-2">
            <Table className="border overflow-hidden">
              <TableCaption className="mt-1.5">
                Sales Report for{" "}
                {date?.from && date?.to
                  ? `${format(date.from, "LLL dd, y")} - ${format(
                      date.to,
                      "LLL dd, y"
                    )}`
                  : "Please select a date range"}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  {["Name", "Quantity", "Price", "Profit"].map(
                    (singleHeader: any, headerIndex: number) => (
                      <TableHead className="custom-table" key={headerIndex}>
                        {singleHeader}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBooks?.data?.stocks?.length > 0 &&
                  dayBooks?.data?.stocks?.map(
                    (dayBook: IDayBookProps, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="custom-table">
                          {dayBook?.productName}
                        </TableCell>
                        <TableCell className="custom-table">
                          {dayBook?.quantity}
                        </TableCell>
                        <TableCell className="custom-table">
                          {dayBook?.price?.toFixed(2) || "0.00"}৳
                        </TableCell>
                        <TableCell className="custom-table">
                          {dayBook?.profit?.toFixed(2) || "0.00"}৳
                        </TableCell>
                      </TableRow>
                    )
                  )}

                <TableRow className="bg-accent hover:bg-accent text-base font-semibold">
                  <TableCell className="custom-table">Total</TableCell>
                  <TableCell className="custom-table">
                    {totalCalculator(dayBooks?.data?.stocks, "quantity") || "0"}
                  </TableCell>
                  <TableCell className="custom-table">
                    {totalCalculator(dayBooks?.data?.stocks, "price")?.toFixed(
                      2
                    ) || "0.00"}
                    ৳
                  </TableCell>
                  <TableCell className="custom-table">
                    {totalCalculator(dayBooks?.data?.stocks, "profit")?.toFixed(
                      2
                    ) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </InfoWrapper>

        {/* PAYABLE PAYMENT TO VENDOR */}
        <InfoWrapper heading="Daily Payment Report">
          <section className="-mx-2">
            <Table className="border overflow-hidden">
              <TableCaption className="mt-1.5">
                Sales Report for{" "}
                {date?.from && date?.to
                  ? `${format(date.from, "LLL dd, y")} - ${format(
                      date.to,
                      "LLL dd, y"
                    )}`
                  : "Please select a date range"}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  {["Vendor Name", "Payment Type", "Amount"].map(
                    (singleHeader: any) => (
                      <TableHead className="custom-table" key={singleHeader}>
                        {singleHeader}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBooks?.data?.payments?.length > 0 &&
                  dayBooks?.data?.payments?.map(
                    (dayBook: IDayPayablePaymentsProps, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="custom-table">
                          {dayBook?.supplierName}
                        </TableCell>
                        <TableCell className="custom-table">
                          {dayBook?.paymentType}
                        </TableCell>
                        <TableCell className="custom-table">
                          {dayBook?.price?.toFixed(2) || "0.00"}৳
                        </TableCell>
                      </TableRow>
                    )
                  )}

                <TableRow className="bg-accent hover:bg-accent text-base font-semibold">
                  <TableCell className="custom-table">Total Payment</TableCell>
                  <TableCell className="custom-table"></TableCell>

                  <TableCell className="custom-table">
                    {totalCalculator(
                      dayBooks?.data?.payments,
                      "price"
                    )?.toFixed(2) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </InfoWrapper>

        {/* CASH ON HAND */}
        <InfoWrapper heading="Cash On Hand">
          <section className="-mx-2">
            <Table className="border overflow-hidden">
              <TableCaption>
                Sales Report for{" "}
                {date?.from && date?.to
                  ? `${format(date.from, "LLL dd, y")} - ${format(
                      date.to,
                      "LLL dd, y"
                    )}`
                  : "Please select a date range"}
              </TableCaption>

              <TableBody>
                <TableRow className="bg-accent hover:bg-accent text-base font-semibold">
                  <TableCell className="custom-table">Cash On Hand</TableCell>

                  <TableCell className="text-right custom-table">
                    {isNaN(
                      totalCalculator(dayBooks?.data?.stocks, "price") -
                        totalCalculator(dayBooks?.data?.payments, "price")
                    )
                      ? "0.00"
                      : Math.abs(
                          totalCalculator(dayBooks?.data?.stocks, "price") -
                            totalCalculator(dayBooks?.data?.payments, "price")
                        )?.toFixed(2)}
                    ৳
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </InfoWrapper>
      </div>
    </section>
  );
};

export default DayBook;
