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
import { useGetSingleSaleQuery } from "@/store/sale/saleApi";
import moment from "moment";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SaleProductDetails from "../SaleProductDetails";
import AddPaymentTable, {
  IPaymentTable,
} from "@/components/common/payment/AddPaymentTable";
import InputWrapper from "@/components/common/form/InputWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { cn } from "@/lib/utils";
import { useSearchSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import CopyButton from "@/components/common/button/CopyButton";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import SyncedContainer from "@/components/common/container/SyncedContainer";

interface IAddSaleExchangeReturnContainerProps {
  watch: any;
  setValue: any;
  setError: any;
  register: any;
}

const AddSaleExchangeReturnContainer: FC<
  IAddSaleExchangeReturnContainerProps
> = ({ watch, setValue, setError, register }) => {
  const { branchId } = shareBranchAndUserInfo();

  // PRODUCT POPOVER STATE
  const [productOpen, setProductOpen] = useState<boolean>(false);
  const [productValue, setProductValue] = useState<string>("");
  const { id: saleId } = useParams();

  // PERMISSION FOR EXCHANGE COMPONENT
  const [exchange, setExchange] = useState(false);

  // PAYMENT TABLE STATE
  const [paymentTable, setPaymentTable] = useState<IPaymentTable[]>([
    {
      index: 0,
      accountId: null,
      paymentAmount: "",
    },
  ]);

  // INITIAL PRODUCT FOR POPOVER
  const [productList, setProductList] = useState<object[]>([]);

  // SELECTED PRODUCT STATE FOR EXCHANGING
  const [selectedProduct, setSelectedProduct] = useState<any>([]);

  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState<string>("");

  // GET SINGLE PRODUCT INFORMATION QUERY
  const { data: productData, isLoading: isProductLoading } =
    useSearchSinglePurchaseQuery(productSearch) as any;

  // GET PREVIOUS DATA MUTATION
  const { data: saleData, isLoading: saleLoading } = useGetSingleSaleQuery(
    saleId
  ) as any;

  useEffect(() => {
    // SET THE PREVIOUS PRODUCTS AS RETURN PRODUCTS
    setValue(
      "returnProduct",
      saleData?.data?.products?.map((singleProduct: any) => ({
        sellProductId: singleProduct?.id,
        quantity: 0,
      }))
    );
    // SET CUSTOMER ID TO THE FORM
    setValue("customerId", saleData?.data?.customerId);
    // SET THE SELL ID TO THE FORM
    setValue("sellId", saleData?.data?.id);
    // SET BRANCH ID TO THE FORM
    setValue("branchId", branchId);
  }, [setValue, saleData, branchId]);

  useEffect(() => {
    // LOGIC FOR ADD PRODUCT DATA
    if (productSearch) {
      const idsToRemove = selectedProduct?.map(
        (product: any) => product.id
      ) as any;
      const availableProduct = productData?.data
        ?.filter((product: any) => !idsToRemove.includes(product.id))
        .filter((singleProduct: any) => singleProduct?.stock !== 0);
      setProductList(availableProduct);
    } else {
      setProductList([]);
    }
  }, [productData?.data, productSearch, selectedProduct]);

  // CALCULATE TOTAL RETURN AMOUNT
  const totalReturn = totalCalculator(
    saleData?.data?.products?.map((product: any) => ({
      id: product?.id,
      price:
        product?.unitPrice *
        watch("returnProduct")?.find(
          (singleProduct: any) => singleProduct?.sellProductId === product?.id
        )?.quantity,
    })),
    "price"
  );

  // CALCULATION CUSTOMER PAY AMOUNT
  const productSubTotal = totalCalculator(watch("products"), "subTotal");
  const customerPayAmount =
    totalReturn - productSubTotal > 0
      ? 0
      : Math.abs(totalReturn - productSubTotal);

  // CALCULATION SELLER PAY AMOUNT
  const sellerPayAmount = Math.max(totalReturn - productSubTotal, 0);

  // CALCULATION TOTAL PAYMENTS
  const totalPaymentAmount = totalCalculator(
    watch("payments"),
    "paymentAmount"
  );

  useEffect(() => {
    // SET THE PAYMENT DATA ON THE FORM
    setValue(
      "payments",
      paymentTable.map((account: any) => {
        return {
          accountId: account.accountId,
          paymentAmount: +account.paymentAmount,
        };
      })
    );

    // SET THE CUSTOMER PAY AMOUNT
    setValue("customerPay", customerPayAmount);

    // SET THE SELLER PAY AMOUNT
    setValue("sellerPay", sellerPayAmount);

    setValue("totalPrice", totalCalculator(watch("products"), "subTotal"));
    setValue("totalPaymentAmount", customerPayAmount);
    setValue("returnPrice", totalReturn);
  }, [
    saleData?.data,
    setValue,
    paymentTable,
    customerPayAmount,
    branchId,
    sellerPayAmount,
    watch,
    totalReturn,
  ]);

  if (saleLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      {/* PREVIOUS SALE INFORMATION */}
      <InfoWrapper className="mb-4" heading="Previous Sale Information">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6 -mx-2">
          <li>
            <HeadingParagraph
              heading="Invoice Number"
              paragraph={
                saleData?.data?.autoInvoiceNo?.toUpperCase() || "Not Found"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Date"
              paragraph={
                moment(saleData?.data?.saleDate).format(
                  "DD MMMM, YYYY, hh:mm A"
                ) || "Not found"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Sell Type"
              paragraph={saleData?.data?.sellType || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Customer Name"
              paragraph={saleData?.data?.customer?.name || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Customer Phone"
              paragraph={saleData?.data?.customer?.phone || "Not Found"}
            />
          </li>

          <li>
            <HeadingParagraph
              heading="Discount Types"
              paragraph={saleData?.data?.discountType || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Discount"
              paragraph={saleData?.data?.discount || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Total Payment Amount"
              paragraph={`${
                saleData?.data?.totalPaymentAmount?.toFixed(2) || "0.00"
              }৳`}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Total Price"
              paragraph={`${saleData?.data?.totalPrice?.toFixed(2) || "0.00"}৳`}
            />
          </li>
        </ul>
      </InfoWrapper>
      {/* PREVIOUS PRODUCT LIST */}
      <div className="w-full border rounded-xl bg-accent/5 overflow-hidden">
        <Table className="overflow-hidden">
          <TableCaption className="mt-0 bg-tertiary/5 text-base">
            {saleData?.data?.products && !saleData?.data?.products.length ? (
              <p className="text-center">
                Unfortunately, it appears that there has been a
                misunderstanding; there has been no product sold by your
                company.
              </p>
            ) : (
              <p> A list of your sale products</p>
            )}
          </TableCaption>
          <TableHeader className="bg-tertiary/5">
            <TableRow>
              {[
                "Index",
                "Product Name",
                "Unit Price",
                "Size",
                "Sale Quantity",
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
            {saleData?.data?.products &&
              saleData?.data?.products?.length > 0 &&
              saleData?.data?.products?.map(
                (singleProduct: any, productIndex: any) => (
                  <TableRow className="divide-[0.5px]" key={productIndex}>
                    <TableCell className="custom-table">
                      {productIndex + 1}
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        {singleProduct?.variation?.productName || "Not found"}
                      </label>
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        {`${singleProduct?.unitPrice?.toFixed(2) || "0.00"}৳`}
                      </label>
                    </TableCell>
                    <TableCell className="custom-table">
                      {`${
                        singleProduct?.variation?.size?.toUpperCase() ||
                        "Not found"
                      }`}
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
                                returnProduct?.sellProductId !==
                                singleProduct?.id
                            );
                          const targetProduct = watch()?.returnProduct?.find(
                            (returnProduct: any) =>
                              returnProduct?.sellProductId === singleProduct?.id
                          );
                          setValue("returnProduct", [
                            ...restTargetProduct,
                            {
                              sellProductId: targetProduct?.sellProductId,
                              quantity: returnQuantity,
                            },
                          ]);
                        }}
                        value={
                          watch()?.returnProduct?.find(
                            (returnProduct: any) =>
                              returnProduct?.sellProductId === singleProduct?.id
                          ).quantity || ""
                        }
                        className="max-w-[150px] h-8"
                        type="number"
                        placeholder="Enter return quantity"
                      />
                    </TableCell>
                    <TableCell className="custom-table">
                      <label htmlFor={productIndex}>
                        <b>
                          {`${
                            isNaN(
                              singleProduct?.unitPrice *
                                watch()?.returnProduct?.find(
                                  (returnProduct: any) =>
                                    returnProduct?.sellProductId ===
                                    singleProduct?.id
                                ).quantity
                            )
                              ? "0.00"
                              : singleProduct?.unitPrice *
                                watch()
                                  ?.returnProduct?.find(
                                    (returnProduct: any) =>
                                      returnProduct?.sellProductId ===
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

      <div className="grid grid-flow-col justify-between items-center">
        {/* PRODUCT SEARCH INPUT */}
        <InputWrapper
          className={exchange ? "visible" : "invisible"}
          label="Write Product Name/ Barcode"
          labelFor="search_product"
        >
          <Popover open={productOpen} onOpenChange={setProductOpen}>
            <PopoverTrigger id="search_product" asChild className="w-full">
              <Button
                variant="outline"
                aria-expanded={productOpen}
                className="w-full justify-between"
              >
                {selectedProduct && selectedProduct?.length > 0
                  ? selectedProduct?.find(
                      (product: any) => product.id === productValue
                    )?.productName
                    ? selectedProduct?.find(
                        (product: any) => product.id === productValue
                      )?.productName
                    : "Write product name/ barcode"
                  : "Write product name/ barcode"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-full ">
              <Command>
                <div className="flex justify-center p-2">
                  {/* PRODUCT SEARCH INPUT */}
                  <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setProductSearch(e.target.value)
                    }
                    placeholder="Write product name/ barcode"
                  />
                </div>
                {isProductLoading && (
                  <div className="my-5 flex justify-center opacity-90">
                    <ButtonLoader />
                  </div>
                )}
                <CommandGroup className="max-h-52 overflow-y-auto">
                  {productList?.length > 0 ? (
                    productList?.map((singleProduct: any) => (
                      <CommandItem
                        className="my-1 cursor-pointer border border-transparent hover:border-tertiary transition-all duration-300 bg-accent/80 overflow-hidden"
                        key={singleProduct.id}
                        value={singleProduct?.id}
                        onSelect={(currentValue) => {
                          setProductValue(
                            currentValue === productValue ? "" : currentValue
                          );

                          // GET SELECTED PRODUCT FROM THE LIST
                          setSelectedProduct([
                            ...selectedProduct,
                            singleProduct,
                          ]);

                          // GET THE PREVIOUS PRODUCTS
                          const previousProducts = watch("products");

                          // ADD NEW PRODUCTS PRODUCT WITH NEW PRODUCTS
                          const updateProducts = [
                            ...previousProducts,
                            {
                              variationProductId: singleProduct?.id,
                              quantity: 1,
                              unitPrice: singleProduct?.sellPrice,
                              subTotal: singleProduct?.sellPrice,
                            },
                          ];
                          // SET UPDATED PRODUCTS IN THE PRODUCTS LIST
                          setValue("products", updateProducts);
                          setProductOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            productValue === singleProduct?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />

                        <ul>
                          <li>{singleProduct?.productName}</li>
                          <li className="flex">
                            <span className="uppercase text-xs">
                              {singleProduct?.size}
                            </span>
                            <b className="uppercase ml-1 text-xs">
                              {singleProduct?.sellPrice.toFixed(2)}
                            </b>
                          </li>
                        </ul>
                      </CommandItem>
                    ))
                  ) : (
                    <div>
                      {!isProductLoading && (
                        <CommandItem>
                          <Check className={"mr-2 h-4 w-4 opacity-0"} />
                          Product not found
                        </CommandItem>
                      )}
                    </div>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </InputWrapper>
        {/* ADD EXCHANGE AND REMOVE BUTTON */}
        <Button
          type="button"
          onClick={() => setExchange(true)}
          className={exchange ? "hidden" : "block"}
          size="xs"
        >
          Add Exchange
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className={exchange ? "block" : "hidden"}
              variant={exchange ? "destructive" : "default"}
              size="xs"
            >
              Remove Exchange
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove your data from the store.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => {
                  setExchange(false);
                  setSelectedProduct([]);
                  setValue("products", []);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <section
        className={`flex items-start ${
          exchange && "gap-x-3 lg:gap-x-6"
        }  gap-y-3 `}
      >
        {/* EXCHANGE PRODUCT INFORMATION INFORMATION */}
        <SyncedContainer
          trigger={
            exchange
              ? paymentTable?.length
              : exchange
              ? selectedProduct?.length
              : exchange
          }
          height
          referenceId="add_sale_exchange_container"
          className={`transition-all duration-150 ${
            exchange ? "lg:w-7/12" : "w-0 !h-0"
          }`}
        >
          <InfoWrapper
            className={`flex flex-col overflow-y-auto ${
              exchange ? "visible h-full my-0" : "invisible my-0"
            }`}
            heading="Exchange Product Information"
          >
            {selectedProduct?.length > 0 ? (
              selectedProduct.map(
                (singleProduct: any, productIndex: number) => (
                  <div className="mb-1" key={productIndex}>
                    <SaleProductDetails
                      setValue={setValue}
                      watch={watch}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      productDetails={singleProduct}
                    />
                  </div>
                )
              )
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-center">
                  <b>Product hasn't selected yet,</b> <br /> You can add new
                  product.
                </p>
              </div>
            )}
          </InfoWrapper>
        </SyncedContainer>
        {/* ACCOUNT & PAY MANAGEMENT */}
        <aside
          id="add_sale_exchange_container"
          className={`w-full transition-all duration-150 ${
            exchange ? "lg:w-5/12" : "w-full flex justify-between"
          } `}
        >
          <div className={`my-3 ${exchange || "w-1/2 mr-3"}`}>
            <ul className="flex flex-col gap-1 my-2 font-[600]">
              {/* NUMBER OF ITEMS */}
              <li className="flex justify-between text-lg border-b-[1px] border-border/30">
                <label>Number Of Items</label>
                <p>{watch("products")?.length}</p>
              </li>
              {/* TOTAL QUANTITY */}
              <li className="flex justify-between text-lg border-b-[1px] border-border/30">
                <label>Total Items Quantity</label>
                <p>{totalCalculator(watch("products"), "quantity")}</p>
              </li>
              {/* TOTAL RETURN AMOUNT */}
              <li className="flex justify-between text-lg border-b-[1px] border-border/30">
                <label>Total Return Amount</label>
                <p>{totalReturn?.toFixed(2) || "0.00"}৳</p>
              </li>
              {/* TOTAL PRICE */}
              <li className="flex justify-between text-lg border-b-[1px] border-border/30">
                <label>Total Payable Amount</label>
                <p>
                  {totalCalculator(watch("products"), "subTotal")?.toFixed(2) ||
                    "0.00"}
                  ৳
                </p>
              </li>
              {/* CUSTOMER PAY AMOUNT */}
              <li
                className={`flex justify-between text-lg border-b-[1px] border-border/30 ${
                  customerPayAmount && "text-success dark:text-green-500"
                }`}
              >
                <label>Customer Will Pay</label>
                <p>
                  {customerPayAmount && (
                    <CopyButton className="mr-2" copyItem={customerPayAmount} />
                  )}
                  {customerPayAmount?.toFixed(2) || "0.00"}৳
                </p>
              </li>
              {/* SELLER PAY AMOUNT */}
              <li
                className={`flex justify-between text-lg  border-b-[1px] border-border/30 ${
                  sellerPayAmount && "text-destructive dark:text-red-500"
                }`}
              >
                <label>Seller Will Pay</label>

                <p>
                  {sellerPayAmount && (
                    <CopyButton className="mr-2" copyItem={sellerPayAmount} />
                  )}
                  {sellerPayAmount?.toFixed(2) || "0.00"}৳
                </p>
              </li>
              {/* CHANGE */}
              <li className="flex justify-between text-lg">
                <label>Change</label>
                <p>
                  {customerPayAmount > 0 &&
                  totalPaymentAmount - customerPayAmount > 0
                    ? (totalPaymentAmount - customerPayAmount)?.toFixed(2)
                    : "0.00"}
                  ৳
                </p>
              </li>
            </ul>
          </div>
          <InfoWrapper
            className={`mt-2 mb-0 ${exchange || "w-1/2 ml-3"}`}
            heading="Payment Information"
          >
            {/* PAYMENT METHOD TABLE */}
            <AddPaymentTable
              scrollable
              paymentTable={paymentTable}
              setPaymentTable={setPaymentTable}
              watch={watch}
              property="payments"
              setError={setError}
              register={register}
              className="-mx-2"
            />
          </InfoWrapper>
        </aside>
      </section>
    </section>
  );
};

export default AddSaleExchangeReturnContainer;
