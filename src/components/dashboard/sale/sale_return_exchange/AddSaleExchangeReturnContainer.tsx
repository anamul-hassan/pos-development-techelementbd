import HeadingParagraph from "@/components/common/HeadingParagraph";
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

interface IAddSaleExchangeReturnContainerProps {
  watch: any;
  setValue: any;
}

const AddSaleExchangeReturnContainer: FC<
  IAddSaleExchangeReturnContainerProps
> = ({ watch, setValue }) => {
  const { id: saleId } = useParams();
  const [paymentTable, setPaymentTable] = useState<IPaymentTable[]>([
    {
      index: 0,
      accountId: null,
      paymentAmount: "",
    },
  ]);

  const { data: saleData, isLoading: saleLoading } = useGetSingleSaleQuery(
    saleId
  ) as any;

  // console.log(saleData);

  // INITIAL PRODUCT & CLIENT LIST STATE
  const [productList, setProductList] = useState<object[]>([]);

  const [productOpen, setProductOpen] = useState<boolean>(false);
  const [productValue, setProductValue] = useState<string>("");
  const [discountType, setDiscountType] = useState([
    {
      label: "Fixed",
      key: "Fixed",
    },
    {
      label: "Percentage",
      key: "Persent",
    },
  ]);
  // SELECTED PRODUCT & CLIENT LIST
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState<string>("");
  // GET SINGLE PRODUCT INFORMATION QUERY
  const { data: productData, isLoading: isProductLoading } =
    useSearchSinglePurchaseQuery(productSearch) as any;

  useEffect(() => {
    // LOGIC FOR ADD PRODUCT DATA
    if (productSearch) {
      const idsToRemove = selectedProduct?.map(
        (product: any) => product.id
      ) as any;
      const availableProduct = productData?.data
        ?.filter((product: any) => !idsToRemove.includes(product.id))
        .filter((singleProduct: any) => singleProduct?.products?.stock !== 0);
      setProductList(availableProduct);
    } else {
      setProductList([]);
    }
  }, [productData?.data, productSearch, selectedProduct]);

  if (saleLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      {/* PREVIOUS SALE INFORMATION */}
      <InfoWrapper heading="Previous Product Information">
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
              heading="Total Payment Amount"
              paragraph={
                `${saleData?.data?.totalPaymentAmount?.toFixed(2)}৳` || "0.00৳"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Total Price"
              paragraph={
                `${saleData?.data?.totalPrice?.toFixed(2)}৳` || "0.00৳"
              }
            />
          </li>
        </ul>
      </InfoWrapper>
      {/* PREVIOUS PRODUCT LIST */}
      <div className="w-full border rounded-xl bg-accent/5">
        <Table className="overflow-hidden">
          <TableCaption className="border-t">
            {selectedProduct && !selectedProduct.length ? (
              <p className="text-center">
                Product hasn't selected yet. You can add new product for
                printing label.
              </p>
            ) : (
              <p> A list of your products label</p>
            )}
          </TableCaption>
          <TableHeader className="bg-tertiary/5">
            <TableRow>
              <TableHead className="custom-table">Product Name</TableHead>
              <TableHead className="custom-table">Unit Price</TableHead>
              <TableHead className="custom-table">Sale Quantity</TableHead>
              <TableHead className="custom-table">Return Quantity</TableHead>
              <TableHead className="custom-table">Return Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProduct &&
              selectedProduct.length > 0 &&
              selectedProduct?.map((labelProduct: any, index: any) => (
                <TableRow className="divide-[0.5px]" key={index}>
                  <TableCell className="custom-table">
                    {labelProduct?.productName}
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
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-flow-col justify-between">
        {/* PRODUCT SEARCH INPUT */}
        <InputWrapper
          label="Write Product Name/ Barcode"
          labelFor="search_product"
          error=""
        >
          <Popover open={productOpen} onOpenChange={setProductOpen}>
            <PopoverTrigger id="search_product" asChild className="w-full">
              <Button
                variant="outline"
                role="search_product"
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
      </div>

      <section className="flex items-start gap-x-3 lg:gap-x-6 gap-y-3">
        {/* EXCHANGE PRODUCT INFORMATION INFORMATION */}
        <div className="w-full lg:w-7/12">
          <InfoWrapper heading="Exchange Product Information">
            <div className={`flex flex-col gap-3 overflow-y-auto `}>
              {selectedProduct?.length > 0 ? (
                selectedProduct.map(
                  (singleProduct: any, productIndex: number) => (
                    <div key={productIndex}>
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
                <div className="flex items-center justify-center h-[550px] w-full">
                  <p className="text-center">
                    <b>Product hasn't selected yet,</b> <br /> You can add new
                    product.
                  </p>
                </div>
              )}
            </div>
          </InfoWrapper>
        </div>
        {/* ACCOUNT & PAY MANAGEMENT */}
        <aside className="w-full lg:w-5/12">
          <InfoWrapper heading="Payment Information">
            {/* PAYMENT METHOD TABLE */}
            <AddPaymentTable
              paymentTable={paymentTable}
              setPaymentTable={setPaymentTable}
              watch={watch}
              property="payments"
            />
          </InfoWrapper>
        </aside>
      </section>
    </section>
  );
};

export default AddSaleExchangeReturnContainer;

//  <Select>
//    <SelectTrigger>
//      <SelectValue placeholder="Select a Group" />
//    </SelectTrigger>
//    <SelectContent>
//      <SelectGroup>
//        <SelectLabel>None</SelectLabel>
//        <SelectItem value="none">None</SelectItem>
//        <SelectItem value="wholesale">Wholesale Price</SelectItem>
//        <SelectItem value="paikari">Paikari Dam</SelectItem>
//      </SelectGroup>
//    </SelectContent>
//  </Select>;
