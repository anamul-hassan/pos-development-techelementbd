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
import { FC } from "react";

interface IPurchaseExchangeReturnDetailsProps {
  actionItem: any;
}

const PurchaseExchangeReturnDetails: FC<
  IPurchaseExchangeReturnDetailsProps
> = ({ actionItem }) => {
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary">Purchase Return Details</Heading>
      <div>
        {/* SUPPLIER INFORMATION */}
        <div>
          <Heading variant="secondary">Supplier Information</Heading>
          <h3 className="text-2xl font-semibold mb-2"></h3>
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
                heading="Membership ID"
                paragraph={actionItem?.supplier?.memberShipId || "Not Found"}
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
            <li>
              <HeadingParagraph
                heading="Due Amount"
                paragraph={`${
                  actionItem?.supplier?.dueAmount?.toFixed(2) || "0.00"
                }৳`}
              />
            </li>
          </ul>
        </div>

        {/* PURCHASE INFORMATION */}
        <div>
          <Heading variant="secondary">Purchase Information</Heading>
          <h3 className="text-2xl font-semibold mb-2"></h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
            <li>
              <HeadingParagraph
                heading="Return Price"
                paragraph={`${actionItem?.returnPrice?.toFixed(2) || "0.00"}৳`}
              />
            </li>
          </ul>
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
              {actionItem?.PurchaseReturnProduct &&
                actionItem?.PurchaseReturnProduct.length > 0 &&
                actionItem?.PurchaseReturnProduct?.map(
                  (singleProduct: any, productIndex: any) => (
                    <TableRow key={productIndex}>
                      <TableCell className="custom-table">
                        {singleProduct?.purchaseProduct?.productName ||
                          "Not Found"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.purchaseProduct?.size?.toUpperCase() ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {capitalizeEveryWord(
                          singleProduct?.purchaseProduct?.color
                        ) || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.purchaseProduct?.warranty || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table">
                        {singleProduct?.quantity || "N/A"}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${
                          singleProduct?.purchaseProduct?.sellingPrice?.toFixed(
                            2
                          ) || "0.00"
                        }৳`}
                      </TableCell>
                      <TableCell className="custom-table uppercase">
                        {`${
                          singleProduct?.purchaseProduct?.subTotal?.toFixed(
                            2
                          ) || "0.00"
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
export default PurchaseExchangeReturnDetails;
