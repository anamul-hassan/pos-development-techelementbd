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
import { PDFDownloadLink } from "@react-pdf/renderer";
import DayBookExcel from "./DayBookExcel";
import SalesReportPDF from "./SalesReportPDF";
import { useGetDayBookReportQuery } from "@/store/dashboard/dashboardApi";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";

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
      startDate:
        date?.from instanceof Date ? date.from.toISOString() : undefined,
      endDate: date?.to instanceof Date ? date.to.toISOString() : undefined,
    });

  // CALCULATE TOTAL PROFIT
  const totalProfit = dayBooks?.data?.stocks?.reduce(
    (total: number, stock: IDayBookProps) => total + stock.profit,
    0
  );

  // CALCULATE TOTAL SALES PRICES
  const totalSalePrice = dayBooks?.data?.stocks?.reduce(
    (total: number, stock: IDayBookProps) => total + stock.price,
    0
  );

  // CALCULATE TOTAL PAYMENT
  const totalPayment = dayBooks?.data?.payments?.reduce(
    (total: number, payment: IDayPayablePaymentsProps) => total + payment.price,
    0
  );

  if (dayReportLoading) {
    return <DataLoader />;
  }
  return (
    <section className="pb-8">
      <div className="flex justify-between items-end">
        <div className="space-x-3">
          {/* BUTTON & COMPONENT FOR EXCEL */}
          <DayBookExcel data={dayBooks?.data} />
          {/* BUTTON & COMPONENT FOR PDF */}
          <PDFDownloadLink
            document={<SalesReportPDF data={dayBooks?.data} />}
            fileName="day_book.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button variant="destructive" size="sm">
                  <ButtonLoader />
                </Button>
              ) : (
                <Button variant="destructive" size="sm">
                  PDF
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
                        {format(date.from, "LLL dd, y")} -{" "}
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
              <PopoverContent className="w-auto p-0" align="start">
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
        <InfoWrapper heading="Daily Sales Report">
          <section className="-mx-2">
            <Table className="border">
              <TableCaption>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBooks?.data?.stocks?.length > 0 &&
                  dayBooks?.data?.stocks?.map(
                    (dayBook: IDayBookProps, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{dayBook?.productName}</TableCell>
                        <TableCell>{dayBook?.quantity}</TableCell>
                        <TableCell>{dayBook?.price}৳</TableCell>
                        <TableCell>{dayBook?.profit}৳</TableCell>
                      </TableRow>
                    )
                  )}

                <TableRow>
                  <TableCell>Total Sale</TableCell>

                  <TableCell>{totalSalePrice}৳</TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell>Total Profit</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell>{totalProfit}৳</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </InfoWrapper>

        {/* PAYEABLE PAYMENT TO VENDOR */}
        <InfoWrapper heading="Daily Payment Report">
          <section className="-mx-2">
            <Table className="border">
              <TableCaption>
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
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBooks?.data?.payments?.length > 0 &&
                  dayBooks?.data?.payments?.map(
                    (dayBook: IDayPayablePaymentsProps, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{dayBook?.supplierName}</TableCell>
                        <TableCell>{dayBook?.paymentType}</TableCell>
                        <TableCell>{dayBook?.price}৳</TableCell>
                      </TableRow>
                    )
                  )}

                <TableRow className="bg-accent">
                  <TableCell>Total Payment</TableCell>
                  <TableCell></TableCell>

                  <TableCell>{totalPayment}৳</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </InfoWrapper>

        {/* CASH ON HAND */}
        <InfoWrapper heading="Cash On Hand">
          <section className="-mx-2">
            <Table className="border">
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
                <TableRow className="bg-secondary ">
                  <TableCell>Cash On Hand</TableCell>

                  <TableCell className="text-right">
                    {totalSalePrice - totalPayment}৳
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
