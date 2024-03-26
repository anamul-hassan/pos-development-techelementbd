import BranchSelectorInput from "@/components/common/BranchSelectorInput";
import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import InfoWrapper from "@/components/common/InfoWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
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
import { actionManager } from "@/utils/helpers/actionManager";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import moment from "moment";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IAddPurchaseExchangeReturnContainerProps {
  watch: any;
  setValue: any;
  setError: any;
  register: any;
  errors: any;
}

const AddPurchaseExchangeReturnContainer: FC<
  IAddPurchaseExchangeReturnContainerProps
> = ({ watch, setValue, errors, setError }) => {
  const { branchId } = shareBranchAndUserInfo();
  const [branch, setBranch] = useState<number>(branchId);
  const { id: purchaseId } = useParams();

  // GET PREVIOUS DATA MUTATION
  const { data: purchaseData, isLoading: purchaseLoading } =
    useGetSinglePurchaseQuery(purchaseId) as any;

  useEffect(() => {
    setValue("supplierId", purchaseData?.data?.supplierId);
    setValue("purchaseId", purchaseData?.data?.id);
    // SET THE PREVIOUS PRODUCTS AS RETURN PRODUCTS
    setValue(
      "returnProduct",
      purchaseData?.data?.PurchaseProducts?.map((singleProduct: any) => ({
        purchaseProductId: singleProduct?.id,
        quantity: 0,
      }))
    );
  }, [setValue, purchaseData, branchId]);

  // CALCULATE TOTAL RETURN AMOUNT
  const totalReturn = totalCalculator(
    purchaseData?.data?.PurchaseProducts?.map((product: any) => ({
      id: product?.id,
      price:
        product?.price *
        watch("returnProduct")?.find(
          (singleProduct: any) =>
            singleProduct?.purchaseProductId === product?.id
        )?.quantity,
    })),
    "price"
  );

  // HERE USED SEPARATE USE EFFECT DUE TO CALCULATION PROBLEM, DON'T ADD THIS TOGETHER
  useEffect(() => {
    setValue("returnPrice", totalReturn);
    if (branch) {
      setValue("branchId", branch);
    }
  }, [purchaseData?.data, setValue, branchId, watch, totalReturn, branch]);

  if (purchaseLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      {/* PREVIOUS SALE INFORMATION */}
      <InfoWrapper className="mb-0" heading="Previous Purchase Information">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6 -mx-2">
          <li>
            <HeadingParagraph
              heading="Date"
              paragraph={
                moment(purchaseData?.data?.purchaseDate).format(
                  "DD MMMM, YYYY, hh:mm A"
                ) || "Not found"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Reference No"
              paragraph={purchaseData?.data?.referenceNo || "Not found"}
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
              heading="Due Amount"
              paragraph={`${purchaseData?.data?.due?.toFixed(2) || "0.00"}৳`}
            />
          </li>

          <li>
            <HeadingParagraph
              heading="Discount"
              paragraph={`${
                purchaseData?.data?.discount?.toFixed(2) || "0.00"
              }৳`}
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
              heading="Total Amount"
              paragraph={`${
                purchaseData?.data?.totalAmount?.toFixed(2) || "0.00"
              }৳`}
            />
          </li>
        </ul>
      </InfoWrapper>
      {/* BRANCH LIST */}
      <div className="w-full flex justify-between mb-3">
        <div></div>
        {actionManager(["admin"]) && (
          <BranchSelectorInput
            className="w-[300px]"
            error={errors}
            setError={setError}
            branch={branch}
            setBranch={setBranch}
          />
        )}
      </div>
      {/* PREVIOUS PRODUCT LIST */}
      <div className="w-full border rounded-xl bg-accent/5 overflow-hidden">
        <Table className="overflow-hidden">
          <TableCaption className="mt-0 bg-tertiary/5 text-base">
            {purchaseData?.data?.PurchaseProducts &&
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
              {[
                "Index",
                "Product Name",
                "Unit Price",
                "Size",
                "Purchase Quantity",
                "Return Quantity",
                "Return Subtotal",
              ].map((singleHeader: string, headerIndex: number) => (
                <TableHead key={headerIndex} className="custom-table">
                  {singleHeader}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseData?.data?.PurchaseProducts &&
              purchaseData?.data?.PurchaseProducts?.length > 0 &&
              purchaseData?.data?.PurchaseProducts?.map(
                (singleProduct: any, productIndex: any) => (
                  <TableRow className="divide-[0.5px]" key={productIndex}>
                    <TableCell className="custom-table">
                      {productIndex + 1}
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        {singleProduct?.productName || "Not found"}
                      </label>
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        {`${singleProduct?.price?.toFixed(2) || "0.00"}৳`}
                      </label>
                    </TableCell>
                    <TableCell className="custom-table">
                      {`${singleProduct?.size?.toUpperCase() || "Not found"}`}
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        {singleProduct?.quantity || "0"}
                      </label>
                    </TableCell>
                    <TableCell className="custom-table">
                      <Input
                        id={productIndex}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const returnQuantity = +e.target.value;
                          if (returnQuantity > singleProduct?.quantity) {
                            return;
                          }
                          const restTargetProduct =
                            watch()?.returnProduct?.filter(
                              (returnProduct: any) =>
                                returnProduct?.purchaseProductId !==
                                singleProduct?.id
                            );
                          const targetProduct = watch()?.returnProduct?.find(
                            (returnProduct: any) =>
                              returnProduct?.purchaseProductId ===
                              singleProduct?.id
                          );
                          setValue("returnProduct", [
                            ...restTargetProduct,
                            {
                              purchaseProductId:
                                targetProduct?.purchaseProductId,
                              quantity: returnQuantity,
                            },
                          ]);
                        }}
                        value={
                          watch()?.returnProduct?.find(
                            (returnProduct: any) =>
                              returnProduct?.purchaseProductId ===
                              singleProduct?.id
                          ).quantity || ""
                        }
                        className="max-w-[150px] h-8"
                        type="number"
                        placeholder="Enter return quantity"
                        onWheel={(event) => event?.currentTarget.blur()}
                      />
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        <b>
                          {`${
                            isNaN(
                              singleProduct?.price *
                                watch()?.returnProduct?.find(
                                  (returnProduct: any) =>
                                    returnProduct?.purchaseProductId ===
                                    singleProduct?.id
                                ).quantity
                            )
                              ? "0.00"
                              : singleProduct?.price *
                                watch()
                                  ?.returnProduct?.find(
                                    (returnProduct: any) =>
                                      returnProduct?.purchaseProductId ===
                                      singleProduct?.id
                                  )
                                  .quantity?.toFixed(2)
                          }৳`}
                        </b>
                      </label>
                    </TableCell>
                  </TableRow>
                )
              )}
            <TableRow className="hover:bg-transparent !border-b">
              {/* FIVE BLANK CELL */}
              {Array(5)
                .fill(undefined)
                .map((_, index: number) => (
                  <TableCell key={index} className="custom-table"></TableCell>
                ))}

              <TableCell className="custom-table text-lg font-semibold">
                Return Total
              </TableCell>
              <TableCell className="custom-table text-lg font-semibold">{`${
                totalReturn.toFixed(2) || "0.00"
              }৳`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
export default AddPurchaseExchangeReturnContainer;
