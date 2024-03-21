import HeadingParagraph from "@/components/common/HeadingParagraph";
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

interface IPurchaseDetailsProps {
  actionItem: any;
}

const PurchaseDetails: FC<IPurchaseDetailsProps> = ({ actionItem }) => {
  console.log(actionItem, "exchange list");

  return (
    <section className="space-y-4 font-anek">
      <div>
        {/* SUPPLIER INFORMATION */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Supplier Information</h3>
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
                heading="Email"
                paragraph={actionItem?.supplier?.email || "Not found"}
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
                heading="Address"
                paragraph={actionItem?.supplier?.address || "Not Found"}
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
                paragraph={actionItem?.supplier?.advanceAmount || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Opening Balance"
                paragraph={actionItem?.supplier?.openingBalance || "Not Found"}
              />
            </li>
          </ul>
        </div>

        {/* PAYMENT INFORMATION */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Payment Information</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Total Amount"
                paragraph={actionItem?.totalAmount || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Total Payment Amount"
                paragraph={actionItem?.totalPaymentAmount || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Due Amount"
                paragraph={actionItem?.dueAmount || "Not Found"}
              />
            </li>
            <li>
              <HeadingParagraph
                heading="Purchase Date"
                paragraph={actionItem?.date || "Not Found"}
              />
            </li>
          </ul>
        </div>

        {/* PRODUCT INFORMATION */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Purchase Products</h3>
          <Table className="overflow-hidden border">
            <TableCaption>
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
