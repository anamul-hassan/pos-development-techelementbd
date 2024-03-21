import HeadingParagraph from "@/components/common/HeadingParagraph";
import InfoWrapper from "@/components/common/InfoWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import DataLoader from "@/components/common/loader/DataLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import moment from "moment";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface IAddPurchaseReturnContainerProps {
  watch: any;
  setValue: any;
}

const AddPurchaseReturnContainer: FC<IAddPurchaseReturnContainerProps> = () => {
  const { id: purchaseId } = useParams();
  // const [paymentTable, setPaymentTable] = useState<IPaymentTable[]>([
  //   {
  //     index: 0,
  //     accountId: null,
  //     paymentAmount: "",
  //   },
  // ]);
  // GET SINGLE PURCHASE DATA QUERY
  const { data: purchaseData, isLoading: purchaseLoading } =
    useGetSinglePurchaseQuery(purchaseId) as any;

  // console.log(purchaseData);

  if (purchaseLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      {/* PURCHASE INFORMATION */}
      <InfoWrapper className="mb-2" heading="Purchase Information">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6 -mx-2">
          <li>
            <HeadingParagraph
              heading="Purchase Date"
              paragraph={
                moment(purchaseData?.data?.purchaseDate).format(
                  "DD MMMM, YYYY, hh:mm A"
                ) || "Not found"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Purchase Status"
              paragraph={purchaseData?.data?.purchaseStatus || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Discount Type"
              paragraph={purchaseData?.data?.discountType || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Total Amount"
              paragraph={`${purchaseData?.data?.totalAmount || "Not Found"}`}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Total Payment Amount"
              paragraph={`${
                purchaseData?.data?.totalPaymentAmount?.toFixed(2) || "0.00"
              }৳`}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Due"
              paragraph={`${purchaseData?.data?.due?.toFixed(2) || "0.00"}৳`}
            />
          </li>
        </ul>
      </InfoWrapper>
      {/* SUPPLIER INFORMATION */}
      <InfoWrapper className="my-3" heading="Supplier Information">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6 -mx-2">
          <li>
            <HeadingParagraph
              heading="Supplier Name"
              paragraph={capitalizeEveryWord(
                fullNameConverter(
                  purchaseData?.data?.supplier?.firstName,
                  purchaseData?.data?.supplier?.lastName
                )
              )}
            />
          </li>

          <li>
            <HeadingParagraph
              heading="Activity Status"
              paragraph={
                purchaseData?.data?.supplier?.active
                  ? "Activated"
                  : "Deactivated"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Phone"
              paragraph={purchaseData?.data?.supplier?.phone || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Email"
              paragraph={purchaseData?.data?.supplier?.email || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Membership ID"
              paragraph={`${
                purchaseData?.data?.supplier?.memberShipId?.toUpperCase() ||
                "Not Found"
              }`}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Address"
              paragraph={`${
                purchaseData?.data?.supplier?.address || "Not Found"
              }`}
            />
          </li>
        </ul>
      </InfoWrapper>

      {/* PREVIOUS PRODUCT LIST */}
      <div className="w-full border rounded-xl bg-accent/5">
        <Table className="overflow-hidden">
          <TableCaption className="border-t">
            {!purchaseData?.data?.PurchaseProducts &&
            !purchaseData?.data?.PurchaseProducts.length ? (
              <p className="text-center">
                Unfortunately, it appears that there has been a
                misunderstanding; there has been no product purchased by your
                company.
              </p>
            ) : (
              <p> A list of your purchase products</p>
            )}
          </TableCaption>
          <TableHeader className="bg-tertiary/5">
            <TableRow>
              <TableHead className="custom-table">Index</TableHead>
              <TableHead className="custom-table">Product Name</TableHead>
              <TableHead className="custom-table">Unit Price</TableHead>
              <TableHead className="custom-table">Sale Quantity</TableHead>
              <TableHead className="custom-table">Return Quantity</TableHead>
              <TableHead className="custom-table">Return Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseData?.data?.PurchaseProducts &&
              purchaseData?.data?.PurchaseProducts.length > 0 &&
              purchaseData?.data?.PurchaseProducts?.map(
                (singleProduct: any, productIndex: any) => (
                  <TableRow className="divide-[0.5px]" key={productIndex}>
                    <TableCell className="custom-table">
                      {productIndex + 1}
                    </TableCell>

                    <TableCell className="custom-table">
                      {singleProduct?.productName}
                    </TableCell>
                    <TableCell className="custom-table"></TableCell>
                    <TableCell className="custom-table"></TableCell>
                    <TableCell className="custom-table">
                      <Input
                        className="max-w-[150px] h-8"
                        type="text"
                        name="discount"
                        placeholder="Enter return quantity"
                      />
                    </TableCell>
                    <TableCell className="custom-table"></TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>
      {/* ADD RETURN AND TOTAL AMOUNT */}
      <div className="flex items-center justify-between my-4">
        <p>
          <label className="mr-2 text-lg">Total Amount</label>
          <b>{"0000.00৳"}</b>
        </p>
        <Button disabled size="sm">
          <ButtonLoader /> Return Now
        </Button>
      </div>
    </section>
  );
};

export default AddPurchaseReturnContainer;
