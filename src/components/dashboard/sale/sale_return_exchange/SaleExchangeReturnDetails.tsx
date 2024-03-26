import Heading from "@/components/common/typography/Heading";
import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import moment from "moment";
import { FC } from "react";

interface ISaleExchangeReturnDetailsProps {
  actionItem: any;
}

const SaleExchangeReturnDetails: FC<ISaleExchangeReturnDetailsProps> = ({
  actionItem,
}) => {
  console.log(actionItem, "ac");
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary">Sale Exchange/ Return Details</Heading>
      <div>
        {/* CUSTOMER INFORMATION */}
        <div>
          <Heading variant="secondary">Customer Information</Heading>
          <h3 className="text-2xl font-semibold mb-2"></h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Customer Name"
                paragraph={
                  fullNameConverter(
                    actionItem?.customer?.firstName,
                    actionItem?.customer?.lastName
                  ) || "Not Found"
                }
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Email"
                paragraph={actionItem?.customer?.email || "Not found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Membership ID"
                paragraph={actionItem?.customer?.memberShipId || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Phone"
                paragraph={actionItem?.customer?.phone || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Alternative Phone"
                paragraph={actionItem?.customer?.alternatePhone || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Family Phone"
                paragraph={actionItem?.customer?.familyPhone || "Not Found"}
              />
            </li>

            <li>
              <HeadingParagraph
                heading="Address"
                paragraph={actionItem?.customer?.address || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="City"
                paragraph={actionItem?.customer?.city || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Advance Amount"
                paragraph={`${
                  actionItem?.customer?.advanceAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Opening Balance"
                paragraph={`${
                  actionItem?.customer?.openingBalance?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Due Amount"
                paragraph={`${
                  actionItem?.customer?.dueAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Point"
                paragraph={`${actionItem?.customer?.point || "0.00"}৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Point Amount"
                paragraph={`${
                  actionItem?.customer?.pointAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
          </ul>
        </div>

        {/* SALE INFORMATION */}
        <div>
          <Heading variant="secondary">Sale Information</Heading>
          <h3 className="text-2xl font-semibold mb-2"></h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Invoice Number"
                paragraph={
                  actionItem?.sell?.autoInvoiceNo?.toUpperCase() || "Not Found"
                }
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Sale Date"
                paragraph={
                  moment(actionItem?.sell?.saleDate).format(
                    "DD MMMM, YYYY, hh:mm A"
                  ) || "Not Found"
                }
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Sale Type"
                paragraph={actionItem?.sell?.sellType || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Discount Type"
                paragraph={actionItem?.sell?.discountType || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Total Payment Amount"
                paragraph={`${
                  actionItem?.sell?.totalPaymentAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Total Amount"
                paragraph={`${
                  actionItem?.sell?.totalPrice?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
          </ul>
        </div>

        {/* PAYMENT INFORMATION */}
        <div>
          <Heading variant="secondary">Payments Information</Heading>
          <h3 className="heading-tertiary"></h3>
          <Table className="overflow-hidden border">
            <TableCaption className="mt-0">
              {actionItem?.Payment && !actionItem?.Payment.length ? (
                <p className="text-center">There is no payment here!</p>
              ) : (
                <p>A list of the payments</p>
              )}
            </TableCaption>
            <TableHeader className="bg-tertiary/5">
              <TableRow>
                {[
                  "Bank Name",
                  "Payment Type",
                  "Payment For",
                  "Payment Amount",
                ].map((item: any) => (
                  <TableHead key={item} className="custom-table">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItem?.Payment &&
                actionItem?.Payment.length > 0 &&
                actionItem?.Payment?.map(
                  (singlePayment: any, paymentIndex: any) => (
                    <TableRow key={paymentIndex}>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(singlePayment?.account?.bankName)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(singlePayment?.type)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singlePayment?.subject}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${
                          singlePayment?.paymentAmount?.toFixed(2) || "0.00"
                        }৳`}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
        {/* SALE PRODUCT INFORMATION */}
        <div>
          <Heading variant="secondary"> Sale Product Information</Heading>
          <Table className="overflow-hidden border">
            <TableCaption className="mt-0">
              {actionItem?.SellProduct && !actionItem?.SellProduct.length ? (
                <p className="text-center">There is no sale product here!</p>
              ) : (
                <p>There are sale products here</p>
              )}
            </TableCaption>
            <TableHeader className="bg-tertiary/5">
              <TableRow>
                {[
                  "Product Name",
                  "Size",
                  "Color",
                  "Warranty",
                  "Quantity",
                  "Unit Price",
                  "Subtotal",
                ].map((item: any) => (
                  <TableHead key={item} className="custom-table">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItem?.SellProduct &&
                actionItem?.SellProduct.length > 0 &&
                actionItem?.SellProduct?.map(
                  (singleProduct: any, productIndex: any) => (
                    <TableRow key={productIndex}>
                      <TableCell className="custom-table">
                        {singleProduct?.variation?.productName || "Not Found"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.variation?.size?.toUpperCase() || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(singleProduct?.variation?.color) ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.warranty || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.quantity || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${singleProduct?.unitPrice?.toFixed(2) || "0.00"}৳`}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${singleProduct?.subTotal?.toFixed(2) || "0.00"}৳`}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>

        {/* RETURN PRODUCT INFORMATION */}
        <div>
          <Heading variant="secondary"> Return Product Information</Heading>
          <h3 className="text-2xl font-semibold mb-2"></h3>
          <Table className="overflow-hidden border">
            <TableCaption className="mt-0">
              {actionItem?.ReturnProduct &&
              !actionItem?.ReturnProduct.length ? (
                <p className="text-center">There is no return product here!</p>
              ) : (
                <p>There are return products here</p>
              )}
            </TableCaption>
            <TableHeader className="bg-tertiary/5">
              <TableRow>
                {[
                  "Product Name",
                  "Size",
                  "Color",
                  "Warranty",
                  "Quantity",
                  "Unit Price",
                  "Subtotal",
                ].map((item: any) => (
                  <TableHead key={item} className="custom-table">
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItem?.ReturnProduct &&
                actionItem?.ReturnProduct.length > 0 &&
                actionItem?.ReturnProduct?.map(
                  (singleProduct: any, productIndex: any) => (
                    <TableRow key={productIndex}>
                      <TableCell className="custom-table">
                        {singleProduct?.SellProduct?.variation?.productName ||
                          "Not Found"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.SellProduct?.variation?.size?.toUpperCase() ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(
                          singleProduct?.SellProduct?.variation?.color
                        ) || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.SellProduct?.warranty || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.quantity || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${
                          singleProduct?.SellProduct?.unitPrice?.toFixed(2) ||
                          "0.00"
                        }৳`}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${
                          (
                            singleProduct?.quantity *
                            singleProduct?.SellProduct?.unitPrice
                          )?.toFixed(2) || "0.00"
                        }৳`}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default SaleExchangeReturnDetails;
