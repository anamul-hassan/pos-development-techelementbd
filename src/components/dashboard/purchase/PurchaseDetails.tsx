import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import { FC } from "react";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
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
import Heading from "@/components/common/typography/Heading";
import moment from "moment";

interface IPurchaseDetailsProps {
  actionItem: any;
}

const PurchaseDetails: FC<IPurchaseDetailsProps> = ({ actionItem }) => {
  // console.log(actionItem, "ac");
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary">Purchase Details</Heading>
      <div>
        {/* PURCHASE INFORMATION */}
        <div>
          <Heading variant="secondary">Purchase Information</Heading>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Date"
                paragraph={
                  moment(actionItem?.purchaseDate).format(
                    "DD MMMM, YYYY, hh:mm A"
                  ) || "Not Found"
                }
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Purchase Status"
                paragraph={actionItem?.purchaseStatus || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Discount Type"
                paragraph={actionItem?.discountType || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Discount Amount"
                paragraph={`${actionItem?.discount?.toFixed(2) || "0.00"}৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Due Amount"
                paragraph={`${actionItem?.due?.toFixed(2) || "0.00"}৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Total Amount"
                paragraph={`${actionItem?.totalAmount?.toFixed(2) || "0.00"}৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Total Payment Amount"
                paragraph={`${
                  actionItem?.totalPaymentAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
          </ul>
        </div>
        {/* SUPPLIER INFORMATION */}
        <div>
          <Heading variant="secondary">Supplier Information</Heading>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Supplier Name"
                paragraph={
                  fullNameConverter(
                    actionItem?.supplier?.firstName,
                    actionItem?.supplier?.lastName
                  ) || "Not Found"
                }
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Membership ID"
                paragraph={actionItem?.supplier?.memberShipId || "Not found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Email"
                paragraph={actionItem?.supplier?.email || "Not found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Address"
                paragraph={actionItem?.supplier?.address || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="City"
                paragraph={actionItem?.supplier?.city || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Phone"
                paragraph={actionItem?.supplier?.phone || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Advance Amount"
                paragraph={`${
                  actionItem?.supplier?.advanceAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Opening Balance"
                paragraph={`${
                  actionItem?.supplier?.openingBalance?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
          </ul>
        </div>

        {/* PAYMENT INFORMATION */}
        <div>
          <Heading variant="secondary">Purchase Products</Heading>
          <Table className="overflow-hidden border">
            <TableCaption className="mt-0">
              {actionItem?.PurchaseProducts &&
              !actionItem?.PurchaseProducts.length ? (
                <p className="text-center">
                  There is no purchase product here!
                </p>
              ) : (
                <p>A list of the purchase products</p>
              )}
            </TableCaption>
            <TableHeader className="bg-tertiary/5">
              <TableRow>
                <TableHead className="custom-table">Product Name</TableHead>
                <TableHead className="custom-table">Quantity</TableHead>
                <TableHead className="custom-table">Color</TableHead>
                <TableHead className="custom-table">Size</TableHead>
                <TableHead className="custom-table">SKU</TableHead>
                <TableHead className="custom-table">Purchase Price</TableHead>
                <TableHead className="custom-table">Sell Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItem?.PurchaseProducts &&
                actionItem?.PurchaseProducts.length > 0 &&
                actionItem?.PurchaseProducts?.map(
                  (singleProduct: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(singleProduct?.productName)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.quantity}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.color}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.size}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.sku}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.price?.toFixed(2)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.sellingPrice?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>

        {/* PRODUCT INFORMATION */}
        <div>
          <Heading variant="secondary">Purchase Products</Heading>
          <Table className="overflow-hidden border">
            <TableCaption className="mt-0">
              {actionItem?.PurchaseProducts &&
              !actionItem?.PurchaseProducts.length ? (
                <p className="text-center">
                  There is no purchase product here!
                </p>
              ) : (
                <p>A list of the purchase products</p>
              )}
            </TableCaption>
            <TableHeader className="bg-tertiary/5">
              <TableRow>
                <TableHead className="custom-table">Product Name</TableHead>
                <TableHead className="custom-table">Quantity</TableHead>
                <TableHead className="custom-table">Color</TableHead>
                <TableHead className="custom-table">Size</TableHead>
                <TableHead className="custom-table">SKU</TableHead>
                <TableHead className="custom-table">Purchase Price</TableHead>
                <TableHead className="custom-table">Sell Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionItem?.PurchaseProducts &&
                actionItem?.PurchaseProducts.length > 0 &&
                actionItem?.PurchaseProducts?.map(
                  (singleProduct: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(singleProduct?.productName)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.quantity}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.color}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.size}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {singleProduct?.sku}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.price?.toFixed(2)}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.sellingPrice?.toFixed(2)}
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

export default PurchaseDetails;
