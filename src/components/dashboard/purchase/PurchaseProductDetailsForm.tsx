import { ChangeEvent, FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuPlus, LuTrash } from "react-icons/lu";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputWrapper from "@/components/common/form/InputWrapper";
import { ADD_PURCHASE_FORM } from "@/utils/constants/purchase/add_purchase_form";
import { useGetWarrantiesQuery } from "@/store/warranty/warrantyApi";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { useGetVariationSizeQuery } from "@/store/variation/variationSizeApi";
import { useGetVariationColorQuery } from "@/store/variation/variationColorApi";
interface IPurchaseProductDetailsFormProps {
  setSelectedProduct: any;
  addProductTableHandler: (productName: string, productId: string) => void;
  removeProductTableHandler: (productId: string) => void;
  productDetails: any;
  productIndex: number;
  selectedProduct: any;
  error: any;
}

const PurchaseProductDetailsForm: FC<IPurchaseProductDetailsFormProps> = ({
  productDetails,
  setSelectedProduct,
  addProductTableHandler,
  removeProductTableHandler,
  productIndex,
  selectedProduct,
  error,
}) => {
  const locale = "en";
  const { productInfo } = ADD_PURCHASE_FORM;

  // GET ALL WARRANTY QUERY
  const { data: warrantyData, isLoading: warrantyLoading } =
    useGetWarrantiesQuery({}) as any;

  // GET VARIATION SIZE, SEARCH, SORTING, PAGE
  const { data: sizeData, isLoading: sizeLoading } = useGetVariationSizeQuery(
    {}
  ) as any;

  // GET VARIATION COLOR, SEARCH, SORTING, PAGE
  const { data: colorData, isLoading: colorLoading } =
    useGetVariationColorQuery({}) as any;

  return (
    <Accordion
      collapsible
      type="single"
      className="rounded w-full px-4 bg-tertiary/5 border"
    >
      {/* PRODUCT PURCHASE FORM */}
      <AccordionItem className="border-b-0" value={"item" + productIndex}>
        <div className="flex justify-between py-2 ">
          <div className="flex items-center gap-3 w-full ">
            {/* ADD ANOTHER FILED BUTTON */}
            <div className="flex items-center space-x-3">
              <span className="size-6 border flex items-center justify-center rounded-full">
                {productIndex + 1}
              </span>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() =>
                  addProductTableHandler(
                    productDetails?.productName,
                    productDetails?.productId
                  )
                }
                className="group relative"
              >
                <LuPlus />
                <span className="sr-only">Add Same Product Field Button</span>
                <span className="custom-tooltip-right">
                  Add Same Product Again
                </span>
              </Button>
            </div>
            <ul className="flex flex-col sm:flex-row items-start md:items-center  justify-between w-full px-0 md:px-4">
              <li className="flex items-center space-x-1">
                <label className="font-semibold text-sm md:text-base hidden sm:block">
                  Product Name
                </label>
                <p className="max-w-[120px] md:max-w-full truncate text-sm md:text-base">
                  {productDetails?.productName}
                </p>
              </li>
              <li className="flex items-center space-x-1">
                <label className="font-semibold text-sm md:text-base">
                  Quantity
                </label>
                <p className="text-sm md:text-base">
                  {productDetails?.quantity}
                </p>
              </li>
              <li className="flex items-center space-x-1 text-sm md:text-base">
                <label className="font-semibold text-sm md:text-base">
                  Subtotal
                </label>
                <p>{productDetails?.subTotal}৳</p>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="group relative"
                  variant="destructive"
                  size="icon"
                >
                  <LuTrash className="button-icon-size" />
                  <span className="custom-tooltip-left">Remove Product</span>
                  <span className="sr-only">Product Delete Button</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Product Removal Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove this product from the
                    purchase &#40;POS&#41; screen? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      removeProductTableHandler(productDetails?.id)
                    }
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button type="button" asChild variant="outline" size="icon">
              <AccordionTrigger className="flex py-2 border-opacity-0"></AccordionTrigger>
            </Button>
          </div>
        </div>

        <AccordionContent className=" border-opacity-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 px-1">
            {/*PRODUCT QUANTITY INPUT */}
            <InputWrapper
              label={productInfo?.quantity.label[locale]}
              labelFor={`product_quantity${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.quantity?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? {
                          ...item,
                          quantity: +e.target.value,
                          subTotal: +item.price * +e.target.value,
                        }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                defaultValue={productDetails?.quantity}
                type="number"
                id={`product_quantity${productIndex}`}
                placeholder={productInfo.quantity.placeholder[locale]}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </InputWrapper>
            {/*PRODUCT SIZE INPUT */}
            <InputWrapper
              label={productInfo?.size.label[locale]}
              labelFor={`product_size${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.size?.message
              }
            >
              <Select
                onValueChange={(value: string) => {
                  const updatedTable = selectedProduct?.map((item: any) =>
                    item.index === productIndex
                      ? { ...item, size: value?.toLowerCase() }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                value={productDetails?.size?.toLowerCase() || ""}
              >
                <SelectTrigger id={`product_size${productIndex}`}>
                  <SelectValue
                    placeholder={productInfo?.size?.placeholder[locale]}
                  />
                </SelectTrigger>
                <SelectContent>
                  {sizeLoading && !sizeData && !sizeData?.data?.length && (
                    <div className="flex items-center justify-center h-24">
                      <ButtonLoader />
                    </div>
                  )}
                  {!sizeLoading &&
                    sizeData &&
                    sizeData?.data?.length > 0 &&
                    sizeData?.data?.map(
                      (singleSize: any, sizeIndex: number) => (
                        <SelectItem
                          key={sizeIndex}
                          value={singleSize?.size?.toLowerCase()}
                        >
                          {singleSize?.size}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </InputWrapper>
            {/*PRODUCT COLOR INPUT */}
            <InputWrapper
              label={productInfo?.color.label[locale]}
              labelFor={`product_color${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.color?.message
              }
            >
              <Select
                onValueChange={(value: string) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? { ...item, color: value?.toLowerCase() }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                value={productDetails?.color?.toLowerCase() || ""}
              >
                <SelectTrigger id={`product_color${productIndex}`} className="">
                  <SelectValue
                    placeholder={productInfo?.color.placeholder[locale]}
                  />
                </SelectTrigger>
                <SelectContent>
                  {colorLoading && !colorData && !colorData?.data?.length && (
                    <div className="flex items-center justify-center h-24">
                      <ButtonLoader />
                    </div>
                  )}
                  {!colorLoading &&
                    colorData &&
                    colorData?.data?.length > 0 &&
                    colorData?.data?.map(
                      (singleColor: any, colorIndex: number) => (
                        <SelectItem
                          key={colorIndex}
                          value={singleColor?.color?.toLowerCase()}
                        >
                          {singleColor?.color}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </InputWrapper>

            {/*PRODUCT SKU INPUT */}
            <InputWrapper
              label={productInfo?.sku.label[locale]}
              labelFor={`product_sku${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.sku?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? {
                          ...item,
                          sku: e.target.value,
                        }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                type="text"
                id={`product_sku${productIndex}`}
                placeholder={productInfo.sku.placeholder[locale]}
              />
            </InputWrapper>

            {/* WARRANTY SELECT OPTIONS */}
            <InputWrapper
              label={productInfo.warranty.label[locale]}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.warrantyId?.message
              }
              labelFor={`accessories_warranty_selection${productIndex}`}
            >
              <Select
                onValueChange={(value: string) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? { ...item, warrantyId: +value }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                value={productDetails?.warrantyId || ""}
              >
                <SelectTrigger
                  id={`accessories_warranty_selection${productIndex}`}
                  className=""
                >
                  <SelectValue
                    placeholder={productInfo.warranty.placeholder[locale]}
                  />
                </SelectTrigger>
                <SelectContent>
                  {warrantyLoading &&
                    !warrantyData &&
                    !warrantyData?.data?.length && (
                      <div className="flex items-center justify-center h-24">
                        <ButtonLoader />
                      </div>
                    )}
                  {!warrantyLoading &&
                    warrantyData &&
                    warrantyData?.data?.length > 0 &&
                    warrantyData?.data?.map(
                      (singleWarranty: any, warrantyIndex: number) => (
                        <SelectItem
                          key={warrantyIndex}
                          value={singleWarranty?.id}
                        >
                          {singleWarranty?.warranty}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
            </InputWrapper>

            {/* PRODUCT PURCHASE PRICE INPUT */}
            <InputWrapper
              label={productInfo.price.label[locale]}
              labelFor={`accessories_purchase_price${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.price?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? {
                          ...item,
                          price: +e.target.value,
                          subTotal: +item.quantity * +e.target.value,
                          sellingPrice:
                            +productDetails?.profitMargin * +e.target.value,
                        }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                onWheel={(event) => event.currentTarget.blur()}
                defaultValue={productDetails?.price}
                type="number"
                id={`accessories_purchase_price${productIndex}`}
                placeholder={productInfo.price.placeholder[locale]}
              />
            </InputWrapper>
            {/* PRODUCT PROFIT MARGIN INPUT */}
            <InputWrapper
              label={productInfo.profit_margin.label[locale]}
              labelFor={`profit_margin${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.sellingPrice?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newValue = +e.target.value;
                  if (newValue <= 100) {
                    const updatedTable = selectedProduct.map((item: any) =>
                      item.index === productIndex
                        ? {
                            ...item,
                            profitMargin: newValue,
                            sellingPrice: newValue * +productDetails?.price,
                          }
                        : item
                    );
                    setSelectedProduct(updatedTable);
                  }
                }}
                value={
                  productDetails?.profitMargin === 0
                    ? ""
                    : productDetails?.profitMargin
                }
                onWheel={(event) => event.currentTarget.blur()}
                type="number"
                id={`profit_margin${productIndex}`}
                placeholder={productInfo.profit_margin.placeholder[locale]}
              />
            </InputWrapper>
            {/* PRODUCT SELLING PRICE INPUT */}
            {/* <InputWrapper
              label={productInfo.selling_price.label[locale]}
              labelFor={`product_selling_price${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.sellingPrice?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? {
                          ...item,
                          sellingPrice: +e.target.value,
                          profitMargin:
                            +e.target.value / +productDetails?.price,
                        }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                onWheel={(event) => event.currentTarget.blur()}
                value={
                  productDetails?.sellingPrice === 0
                    ? ""
                    : Math.ceil(
                        productDetails?.profitMargin * +productDetails?.price
                      )
                }
                type="number"
                id={`product_selling_price${productIndex}`}
                placeholder={productInfo.selling_price.placeholder[locale]}
              />
            </InputWrapper> */}

            <InputWrapper
              label={productInfo.selling_price.label[locale]}
              labelFor={`product_selling_price${productIndex}`}
              error={
                error?.products?.length > 0 &&
                error?.products[productIndex]?.sellingPrice?.message
              }
            >
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newValue = +e.target.value;
                  const updatedTable = selectedProduct.map((item: any) =>
                    item.index === productIndex
                      ? {
                          ...item,
                          sellingPrice: newValue,
                          profitMargin: newValue / +productDetails?.price,
                        }
                      : item
                  );
                  setSelectedProduct(updatedTable);
                }}
                onWheel={(event) => event.currentTarget.blur()}
                value={
                  productDetails?.sellingPrice === 0
                    ? ""
                    : productDetails?.sellingPrice
                }
                type="number"
                id={`product_selling_price${productIndex}`}
                placeholder={productInfo.selling_price.placeholder[locale]}
              />
            </InputWrapper>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PurchaseProductDetailsForm;
