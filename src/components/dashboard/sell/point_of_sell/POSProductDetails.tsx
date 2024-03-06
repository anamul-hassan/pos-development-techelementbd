import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FC } from "react";
import { LuMinus, LuPlus, LuTrash } from "react-icons/lu";
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
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";

interface IPOSProductDetailsProps {
  productDetails: any;
  selectedProduct: any;
  setSelectedProduct: any;
  watch: any;
  setValue: any;
}

const POSProductDetails: FC<IPOSProductDetailsProps> = ({
  productDetails,
  selectedProduct,
  setSelectedProduct,
  watch,
  setValue,
}) => {
  // GET THE PREVIOUS PRODUCTS DATA ON THE FORM
  const previousProducts = watch("products");

  return (
    <div
      className={`rounded flex flex-col lg:flex-row w-full px-4 py-2 bg-tertiary/5 border relative ${
        watch().customerId || "opacity-40 select-none pointer-events-none"
      }`}
    >
      {/* BUTTON FOR DELETING PRODUCT */}
      <div className="absolute right-2 top-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="relative group"
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
              <AlertDialogTitle>Product Removal Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this product from the Point of
                Sale &#40;POS&#41; screen? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  // REMOVE PRODUCT FROM THE STATE
                  const updateProductList = selectedProduct?.filter(
                    (product: any) => product?.id !== productDetails?.id
                  );
                  setSelectedProduct(updateProductList);
                  // REMOVE PRODUCT FROM THE POS FORM
                  const formUpdateProducts = previousProducts?.filter(
                    (product: any) =>
                      product?.variationProductId !== productDetails?.id
                  );
                  setValue("products", formUpdateProducts);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* PRODUCT DETAILS UI */}
      <ul className="w-full lg:w-5/12">
        <li className="flex items-center">
          <label className="font-semibold mr-2">Name</label>
          <p>{capitalizeEveryWord(productDetails?.productName) || "N/A"}</p>
        </li>
        {/* <li className="flex items-center ">
          <label className="font-semibold mr-2">IMEI Number</label>
          <p>{productDetails?.imei || "N/A"}</p>
        </li> */}
        {/* <li className="flex items-center ">
          <label className="font-semibold mr-2 ">Product Warranty</label>
          <p>{productDetails?.warranty?.warranty || "N/A"}</p>
        </li> */}

        <li className="flex items-center ">
          <label className="font-semibold mr-2">Size</label>
          <p>{capitalizeEveryWord(productDetails?.size) || "N/A"}</p>
        </li>
        <li className="flex items-center ">
          <label className="font-semibold mr-2">Color</label>
          <p>{capitalizeEveryWord(productDetails?.color) || "N/A"}</p>
        </li>
        <li className="flex items-center">
          <label className="font-semibold mr-2">Available Stock</label>
          <p>
            {productDetails?.product?.stock || "0"}
            {productDetails?.product?.stock > 1 ? " Units" : " Unit"}
          </p>
        </li>
      </ul>
      <div className="w-full lg:w-7/12">
        <div className="grid gap-4">
          <div className="flex gap-x-1 w-1/2 pr-1.5  justify-between">
            {/* QUANTITY DECREASE BUTTON */}
            <Button
              disabled={
                previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                )?.quantity === 1
              }
              onClick={() => {
                const restProducts = previousProducts?.filter(
                  (product: any) =>
                    product?.variationProductId !== productDetails?.id
                );
                const currentProduct = previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                );
                setValue("products", [
                  ...restProducts,
                  {
                    ...currentProduct,
                    quantity: --currentProduct.quantity,
                    subTotal:
                      currentProduct?.subTotal - currentProduct?.unitPrice,
                  },
                ]);
              }}
              variant="outline"
              size="icon"
              type="button"
            >
              <LuMinus className="button-icon-size" />
            </Button>
            <Input
              onWheel={(event) => event.currentTarget.blur()}
              value={
                previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                )?.quantity || ""
              }
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (+e.target.value <= productDetails?.products?.stock) {
                  const restProducts = previousProducts?.filter(
                    (product: any) =>
                      product?.variationProductId !== productDetails?.id
                  );
                  const currentProduct = previousProducts?.find(
                    (product: any) =>
                      product?.variationProductId === productDetails?.id
                  );
                  setValue("products", [
                    ...restProducts,
                    {
                      variationProductId: currentProduct?.variationProductId,
                      quantity: +e.target.value,
                      unitPrice: currentProduct?.unitPrice,
                      subTotal:
                        +e.target.value * +currentProduct?.unitPrice > 0
                          ? +e.target.value * +currentProduct?.unitPrice
                          : 0,
                    },
                  ]);
                }
              }}
              className={`w-1/2 text-center`}
              placeholder="Quantity"
            />
            {/* QUANTITY INCREASE BUTTON */}
            <Button
              type="button"
              disabled={
                previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                )?.quantity >= productDetails?.products?.stock
              }
              onClick={() => {
                const restProducts = previousProducts?.filter(
                  (product: any) =>
                    product?.variationProductId !== productDetails?.id
                );
                const currentProduct = previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                );
                setValue("products", [
                  ...restProducts,
                  {
                    ...currentProduct,
                    quantity: ++currentProduct.quantity,
                    subTotal:
                      currentProduct.subTotal + currentProduct?.unitPrice,
                  },
                ]);
              }}
              variant="outline"
              size="icon"
            >
              <LuPlus className="button-icon-size" />
            </Button>
          </div>

          {/* PRICE INPUT AND SHOW SUBTITLE */}

          <div className="flex justify-between gap-x-4">
            <Input
              defaultValue={
                previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                )?.unitPrice
              }
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const restProducts = previousProducts?.filter(
                  (product: any) =>
                    product?.variationProductId !== productDetails?.id
                );
                const currentProduct = previousProducts?.find(
                  (product: any) =>
                    product?.variationProductId === productDetails?.id
                );
                setValue("products", [
                  ...restProducts,
                  {
                    variationProductId: currentProduct?.variationProductId,
                    quantity: currentProduct?.quantity,
                    unitPrice: +e.target.value,
                    subTotal:
                      +e.target.value * +currentProduct?.quantity > 0
                        ? +e.target.value * +currentProduct?.quantity
                        : 0,
                  },
                ]);
              }}
              className="w-1/2"
              onWheel={(event) => event.currentTarget.blur()}
              placeholder="MRP Per-unit"
            />
            <div className="flex flex-col items-start w-1/2">
              <label className="font-semibold mr-2 leading-5">Subtotal</label>
              <b className="block leading-6">
                {previousProducts
                  ?.find(
                    (currentProduct: any) =>
                      currentProduct?.variationProductId === productDetails?.id
                  )
                  ?.subTotal?.toFixed(2) > 0
                  ? previousProducts
                      ?.find(
                        (currentProduct: any) =>
                          currentProduct?.variationProductId ===
                          productDetails?.id
                      )
                      ?.subTotal?.toFixed(2)
                  : 0}
                ৳
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSProductDetails;
