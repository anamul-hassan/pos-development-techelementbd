import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
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
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import DataLoader from "@/components/common/loader/DataLoader";
import DayBookExcel from "./DayBookExcel";
import { useGetDayBookReportQuery } from "@/store/dashboard/dashboardApi";
import InputWrapper from "@/components/common/form/InputWrapper";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { actionManager } from "@/utils/helpers/actionManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import PdfDaybook, {
  IDaybookSummary,
  IPdfDaybookColumn,
  IPdfDaybookPageHeaderData,
} from "@/components/pdf/PdfDaybook";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";

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
  const [branch, setBranch] = useState<number | undefined>();
  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } = useGetBranchesQuery(
    {}
  );
  const [products, setProducts] = useState<any>([]);
  const [payments, setPayments] = useState<any>([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const { data: dayBooks, isLoading: dayReportLoading } =
    useGetDayBookReportQuery({
      from:
        date?.from instanceof Date
          ? format(date.from, "yyyy-MM-dd")
          : undefined,
      to: date?.to instanceof Date ? format(date.to, "yyyy-MM-dd") : undefined,
    });

  useEffect(() => {
    if (dayBooks?.data?.stocks?.length > 0) {
      const products = dayBooks?.data?.stocks?.map((singleItem: any) => ({
        ...singleItem,
        price: singleItem?.price?.toFixed(2) || "0.00",
        profit: singleItem?.profit?.toFixed(2) || "0.00",
      }));

      setProducts(products);
    }
    if (dayBooks?.data?.payments?.length > 0) {
      const payments = dayBooks?.data?.payments?.map((singlePayment: any) => ({
        ...singlePayment,
        price: singlePayment?.price?.toFixed(2) || "0.00",
      }));
      setPayments(payments);
    }
  }, [dayBooks?.data]);

  const columnsProduct: IPdfDaybookColumn[] = [
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
  const columnsPayment: IPdfDaybookColumn[] = [
    {
      accessorKey: "paymentType",
      header: "Payment By",
    },
    {
      accessorKey: "price",
      header: "Payment Amount",
    },
  ];

  const fromDate = date?.from
    ? moment(date?.from).format("DD MMMM, YYYY")
    : null;
  const toDate = date?.to ? moment(date?.to).format("DD MMMM, YYYY") : null;

  const dateRange = toDate
    ? toDate === fromDate
      ? fromDate
      : `${fromDate} to ${toDate}`
    : fromDate;

  const headerProduct: IPdfDaybookPageHeaderData = {
    company: CLIENT_DETAILS.companyName,
    heading: "Day-book Report (Product)",
    logo: CLIENT_DETAILS.sidebarLogo,
    date: dateRange || "",
  };
  const headerPayment: IPdfDaybookPageHeaderData = {
    company: CLIENT_DETAILS.companyName,
    heading: "Day-book Report (Payment)",
    logo: CLIENT_DETAILS.sidebarLogo,
    date: dateRange || "",
  };
  const summaryPayment: IDaybookSummary = {
    totalPrice: dayBooks?.data?.total?.totalPrice,
    totalProfit: dayBooks?.data?.total?.totalProfit,
    totalProduct: dayBooks?.data?.stocks?.length,
    totalQuantity: dayBooks?.data?.total?.totalQuantity,
  };

  if (dayReportLoading) {
    return <DataLoader />;
  }

  return (
    <section className="pb-8">
      <div className="flex justify-between items-end">
        <div className="space-x-3 flex">
          {/* BUTTON & COMPONENT FOR EXCEL */}
          <DayBookExcel data={dayBooks?.data} />
          {/* BUTTON & COMPONENT FOR PDF */}
          <PDFDownloadLink
            document={
              <PdfDaybook
                columns={{ columnsProduct, columnsPayment }}
                headerData={{ headerProduct, headerPayment }}
                data={{ products, payments }}
                summary={summaryPayment}
                itemsPerPage={30}
              />
            }
            fileName={`${CLIENT_DETAILS?.companyName} ◉ ${dateRange} ◉ Daybook Report (Product, Payment).pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button
                  disabled={loading}
                  className=" transition-all duration-150"
                  variant="destructive"
                  size="xs"
                >
                  <ButtonLoader /> Pdf
                </Button>
              ) : (
                <Button variant="destructive" size="xs">
                  Pdf
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>

        <div className="grid gap-2 mt-7 gir">
          {/* BRANCH LIST */}
          {actionManager(["admin"]) && (
            <InputWrapper label="Select Branch" labelFor="branch">
              <Select
                value={branch?.toString()}
                onValueChange={(value: string) => {
                  setBranch(+value);
                }}
              >
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {branchList?.data?.length > 0 &&
                    branchList?.data?.map((singleBranch: any) => (
                      <SelectItem
                        key={singleBranch?.id}
                        value={singleBranch?.id?.toString()}
                      >
                        {capitalizeEveryWord(singleBranch?.branchName)}
                      </SelectItem>
                    ))}
                  {!branchList?.data?.length && branchLoading && (
                    <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                      <ButtonLoader />
                    </div>
                  )}
                </SelectContent>
              </Select>
            </InputWrapper>
          )}
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
                  ? dateRange
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
                  ? dateRange
                  : "Please select a date range"}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  {["Payment By", "Amount"].map((singleHeader: any) => (
                    <TableHead className="custom-table" key={singleHeader}>
                      {singleHeader}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBooks?.data?.payments?.length > 0 &&
                  dayBooks?.data?.payments?.map(
                    (dayBook: IDayPayablePaymentsProps, index: number) => (
                      <TableRow key={index}>
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
              <TableCaption className="mt-1.5">
                Sales Report for{" "}
                {date?.from && date?.to
                  ? dateRange
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
