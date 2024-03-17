import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Barcode from "react-barcode";
import { vatCalculator } from "@/utils/helpers/vatCalculator";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import moment from "moment";
import { totalCalculator } from "@/utils/helpers/totalCalculator";

interface PrintPosProps {
  saleData: any;
  vatAmount: number | string;
  discountAmount: number | string;
}
const PrintSale = React.forwardRef<HTMLDivElement, PrintPosProps>(
  ({ saleData: POSData, vatAmount, discountAmount }, ref) => {
    const { data: accountData } = useGetAccountsQuery("All") as any;

    const paymentsInfo = POSData?.data?.payments.map((singleAccount1: any) => {
      const account = accountData?.data?.find(
        (singleAccount2: any) => singleAccount2.id === singleAccount1?.accountId
      );
      return {
        accountId: singleAccount1?.accountId,
        accountName: account?.accountName,
        paymentAmount: singleAccount1?.paymentAmount,
      };
    });

    return (
      <section ref={ref} className="p-5 w-[294px] mt-6 mx-auto">
        <section className="w-full mx-auto p-4 relative font-anek">
          {/* INVOICE HEADER */}
          <h3 className="text-base font-light text-center uppercase tracking-wide text-black leading-3">
            Invoice
          </h3>
          <div className="flex justify-start mb-2 relative">
            <div className="-my-1 absolute">
              <img
                className="w-10 grayscale"
                // src={CLIENT_DETAILS?.sidebarLogo}
                src="/public/fantabulous_main.png"
                alt={CLIENT_DETAILS?.companyName + "logo"}
              />
            </div>
            <ul className="flex flex-col items-center w-full">
              <li>
                <h4 className="text-lg text-start leading-5 font-[500] uppercase tracking-tighter">
                  {CLIENT_DETAILS?.companyName}
                </h4>
              </li>
              <li>
                <p className="text-[8px] -mt-1 text-center leading-3 w-full ">
                  {CLIENT_DETAILS?.address}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <label className="text-xs leading-snug">Date & Time</label>
            <p className="text-[10px] -mt-1.5">
              {moment().format("DD MMMM, YYYY, hh:mm A")}
            </p>
          </div>

          {/* CUSTOMER INFORMATION */}
          <div className="my-0.5">
            <h3 className="text-sm">Customer Information</h3>
            <Table className="border border-black overflow-hidden">
              <TableBody>
                <TableRow className="hover:bg-white">
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3">
                    Customer Name
                  </TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3">
                    {fullNameConverter(
                      POSData?.data?.sell?.customer?.firstName,
                      POSData?.data?.sell?.customer?.lastName
                    ) || "Not found"}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-white">
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3">
                    Phone Number
                  </TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3">
                    {POSData?.data?.sell?.customer?.phone || "Not found"}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-white">
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3">
                    Membership ID
                  </TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-black text-[10px] px-1 py-0 h-[2px] leading-3 uppercase">
                    {POSData?.data?.sell?.customer?.memberShipId || "Not found"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="my-0.5">
            <h3 className="text-sm">Product Information</h3>
            <Table className="border border-black overflow-hidden">
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                    Index
                  </TableHead>
                  <TableHead className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                    Name
                  </TableHead>
                  <TableHead className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                    Quantity
                  </TableHead>
                  <TableHead className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                    MRP
                  </TableHead>
                  <TableHead className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                    Sub-total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {POSData?.data?.sellProduct &&
                  POSData?.data?.sellProduct?.length > 0 &&
                  POSData?.data?.sellProduct.map(
                    (singleProduct: any, productIndex: number) => (
                      <TableRow key={productIndex} className="hover:bg-white">
                        <TableCell className="text-black text-[8px] px-1 py-0 h-[2px] leading-3 truncate">
                          {productIndex + 1}
                        </TableCell>
                        <TableCell className="text-black text-[8px] px-1 py-0 h-[2px] leading-3 uppercase">
                          {singleProduct?.variation?.productName}
                        </TableCell>
                        <TableCell className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                          {singleProduct?.quantity}
                        </TableCell>
                        <TableCell className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                          {singleProduct?.unitPrice?.toFixed(2) || "0.00"}৳
                        </TableCell>
                        <TableCell className="text-black text-[8px] px-1 py-0 h-[2px] leading-3">
                          {singleProduct?.subTotal?.toFixed(2) || "0.00"}৳
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </div>
          {/* PAYMENT INFORMATION */}
          <div className="my-0.5">
            <h3 className="text-sm">Payment Information</h3>
            <Table className="border border-black overflow-hidden">
              <TableBody>
                {/* TOTAL */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]  text-black px-1 py-0 h-[2px] leading-3">
                    Total
                  </TableCell>
                  <TableCell className="text-[10px]  text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]  text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]  text-black px-1 py-0 h-[2px] leading-3">
                    {totalCalculator(
                      POSData?.data?.sellProduct,
                      "subTotal"
                    ).toFixed(2) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>

                {/* VAT */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    (+VAT)-{vatAmount || "0"}%
                  </TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    {vatCalculator(
                      totalCalculator(POSData?.data?.sellProduct, "subTotal"),
                      +vatAmount
                    ).toFixed(2) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
                {/* DISCOUNT */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    Discount Amount &#40;{discountAmount ? discountAmount : "0"}
                    {POSData?.data?.sell?.discountType === "Fixed" || "%"}&#41;
                    /&#40;
                    {POSData?.data?.sell?.discountType === "Persent"
                      ? "Percentage"
                      : POSData?.data?.sell?.discountType}
                    &#41;
                  </TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    {POSData?.data?.sell?.discount?.toFixed(2) || "0.00"}৳
                  </TableCell>
                </TableRow>
                {/* PAY BILL AMOUNT */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    Pay Bill Amount
                  </TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    {(
                      totalCalculator(POSData?.data?.sellProduct, "subTotal") +
                      vatCalculator(
                        totalCalculator(POSData?.data?.sellProduct, "subTotal"),
                        +vatAmount
                      ) -
                      POSData?.data?.sell?.discount
                    ).toFixed(2) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
                {/* PAYMENT OPTIONS */}
                {paymentsInfo?.length > 0 &&
                  paymentsInfo?.map((singlePayment: any) => (
                    <TableRow
                      key={singlePayment?.accountId}
                      className="hover:bg-white"
                    >
                      <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                        {singlePayment?.accountName}
                      </TableCell>
                      <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                      <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                      <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                        {singlePayment?.paymentAmount.toFixed(2) || "0.00"}৳
                      </TableCell>
                    </TableRow>
                  ))}

                {/* RECEIVED AMOUNT */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    Received Amount
                  </TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    {POSData?.data?.sell?.totalPaymentAmount?.toFixed(2) ||
                      "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
                {/* CHANGE AMOUNT */}
                <TableRow className="hover:bg-white">
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    Change Amount
                  </TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>
                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3"></TableCell>

                  <TableCell className="text-[10px]   text-black px-1 py-0 h-[2px] leading-3">
                    {(
                      POSData?.data?.sell?.totalPaymentAmount -
                      POSData?.data?.sell?.totalPrice -
                      vatCalculator(
                        totalCalculator(POSData?.data?.sellProduct, "subTotal"),
                        +vatAmount
                      )
                    ).toFixed(2) || "0.00"}
                    ৳
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* INVOICE NUMBER AND BARCODE */}
          <div className="flex  justify-between items-center">
            <div className="w-[130px]">
              <ul className="flex flex-col justify-center items-center py-1">
                <li>
                  <h5 className="text-[8px] leading-3 uppercase text-black/80">
                    Invoice Number
                  </h5>
                </li>

                <li className="">
                  <Barcode
                    displayValue={false}
                    value={POSData?.data?.sell?.autoInvoiceNo}
                    width={0.5}
                    height={15}
                    marginTop={1.5}
                    marginBottom={1.5}
                  />
                </li>
                <li>
                  <p className="text-[10px]  leading-3 uppercase text-black">
                    {POSData?.data?.sell?.autoInvoiceNo}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[8px] text-black leading-snug">
                Thank you for choosing {CLIENT_DETAILS?.companyName}. Your
                satisfaction is our priority. If you have any questions or
                concerns, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </section>
      </section>
    );
  }
);

export default PrintSale;
