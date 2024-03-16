import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import { ADD_PURCHASE_FORM } from "@/utils/constants/purchase/add_purchase_form";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { LuPlus, LuTrash } from "react-icons/lu";

import ButtonLoader from "@/components/common/loader/ButtonLoader";
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
import { useGetAccountsQuery } from "@/store/account/accountApi";
import InfoWrapper from "@/components/common/InfoWrapper";
import PurchaseProductDetailsForm from "./PurchaseProductDetailsForm";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useSearchSingleProductQuery } from "@/store/product/productApi";
import { useAppContext } from "@/context/hook/useAppContext";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import uniqueIdGenerator from "@/utils/helpers/uniqueIdGenerator";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { percentageCalculator } from "@/utils/helpers/percentageCalculator";
import { useGetSuppliersQuery } from "@/store/supplier/supplierApi";
import { DISCOUNT_TYPES } from "@/utils/constants/common/discount_type";
import { PURCHASE_STATUS } from "@/utils/constants/common/purchase_status";

interface IAddPurchaseContainerProps {
  setValue: any;
  watch: any;
  register: any;
  error: any;
  clear: boolean;
}

const AddPurchaseContainer: FC<IAddPurchaseContainerProps> = ({
  setValue,
  watch,
  register,
  error,
  clear,
}) => {
  // APP CONTEXT
  const { sidebarOpen } = useAppContext();
  // GET BRANCH INFORMATION
  const { branchId } = shareBranchAndUserInfo();
  // POPOVER STATES
  const [productOpen, setProductOpen] = useState(false);
  const [productValue, setProductValue] = useState("");
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [supplierValue, setSupplierValue] = useState("");

  // INITIAL PRODUCT & SUPPLIER LIST STATE
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  // SELECTED PRODUCT AND SUPPLIER LIST STATE
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<any>({});

  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState<string>("");
  // SUPPLIER SEARCH INPUT STATE
  const [supplierSearch, setSupplierSearch] = useState<string>("");
  // INITIAL DISCOUNT AMOUNT
  const [discountAmount, setDiscountAmount] = useState<string>("");

  // LOCALE DECLARATION
  const locale = "en";

  // PURCHASE FORM LABEL AND PLACEHOLDER
  const { generalInfo } = ADD_PURCHASE_FORM;

  // GET ALL SUPPLIER LIST AND QUERY
  const { data: supplierData, isLoading: isSupplierLoading } =
    useGetSuppliersQuery({
      search: supplierSearch,
      page: 1,
      size: 10000000,
    }) as any;
  // GET ALL THE BANK ACCOUNT QUERY
  const { data: accountsData, isLoading: accountLoading } = useGetAccountsQuery(
    "All"
  ) as any;
  // GET PRODUCT DATA BY SEARCH QUERY
  const { data: productData, isLoading: isProductLoading } =
    useSearchSingleProductQuery(productSearch) as any;

  // TIME STATE
  const [date, setDate] = useState<Date>();
  // SELECT UPDATE STATE
  const [update, setUpdate] = useState(false);

  // PURCHASE STATUS OPTIONS STATE

  // DISCOUNT TYPE STATE
  // const [discountType, setDiscountType] = useState(

  // STATE FOR ADDING NEW PAYMENT OPTION
  const [paymentMethodTable, setPaymentMethodTable] = useState<any>([
    {
      index: 0,
      accountId: 0,
      paymentAmount: 0,
    },
  ]);

  // CALCULATE TOTAL PRICE
  const totalPrice: number | string =
    watch("discountType") === "Fixed"
      ? totalCalculator(watch("products"), "subTotal") - watch("discount")
      : watch("discountType") === "Persent"
      ? totalCalculator(watch("products"), "subTotal") -
        percentageCalculator(
          +discountAmount,
          totalCalculator(watch("products"), "subTotal")
        )
      : totalCalculator(watch("products"), "subTotal");
  // CALCULATE TOTAL DISCOUNT
  const totalDiscount =
    watch("discountType") === "Fixed"
      ? +discountAmount
      : watch("discountType") === "Persent"
      ? percentageCalculator(
          +discountAmount,
          totalCalculator(watch("products"), "subTotal")
        )
      : 0;
  // TOTAL PAYMENT AMOUNT
  const totalPaymentAmount = totalCalculator(
    watch("payments"),
    "paymentAmount"
  );

  useEffect(() => {
    if (supplierData?.data?.length > 0) {
      setSupplierList(supplierData?.data);
    }
    if (productData?.data?.length > 0) {
      setProductList(productData?.data);
    }
    // SET THE UPDATED PURCHASE DATE ON THE FORM
    setValue(
      "purchaseDate",
      date ? date.toISOString() : new Date().toISOString()
    );
    // SET BRANCH ID
    setValue("branchId", branchId);

    // SET THE PAYMENT DATA ON THE FORM
    setValue(
      "payments",
      paymentMethodTable.map((account: any) => {
        return {
          accountId: account.accountId,
          paymentAmount: account.paymentAmount ? account.paymentAmount : 0,
        };
      })
    );
    // SET PRODUCT DATA
    setValue(
      "products",
      selectedProduct.map((product: any) => {
        return {
          color: product?.color,
          sku: product?.sku,
          productId: product?.productId,
          quantity: product?.quantity,
          warrantyId: product?.warrantyId,
          price: product?.price,
          size: product?.size,
          sellingPrice: product?.sellingPrice,
          subTotal: +product?.price * +product?.quantity,
        };
      })
    );
    // SET DISCOUNT AMOUNT
    setValue("discount", totalDiscount);
    // SET TOTAL AMOUNT
    setValue("totalAmount", totalPrice);
    // SET TOTAL PAYMENT AMOUNT
    setValue("totalPaymentAmount", totalPaymentAmount);
    // DUE AMOUNT
    setValue("due", totalPrice - totalPaymentAmount);
  }, [
    totalPaymentAmount,
    totalPrice,
    supplierData,
    productData,
    date,
    setValue,
    branchId,
    paymentMethodTable,
    selectedProduct,
    totalDiscount,
  ]);

  // REMOVE PAYMENT TABLE HANDLER
  const removePaymentTableHandler = (index: number) => {
    // FILTER OUT THE TABLE WITH THE SPECIFIC INDEX
    const updatedPaymentMethodTable = paymentMethodTable.filter(
      (table: any) => table.index !== index
    );

    // UPDATE THE INDEX OF THE REMAINING ITEMS
    updatedPaymentMethodTable.forEach((table: any, idx: number) => {
      table.index = idx;
    });
    // SET THE UPDATED TABLE IN THE STATE
    setPaymentMethodTable(updatedPaymentMethodTable);
  };
  // ADD NEW PAYMENT TABLE HANDLER
  const addPaymentTableHandler = () => {
    // GET THE HIGHEST INDEX NUMBER
    const maxIndex = Math.max(
      ...paymentMethodTable.map((account: any) => +account.index)
    );
    // CREATE A NEW OBJECT WITH THE REQUIRE PROPERTIES
    const newItem = {
      index: +maxIndex + 1,
      accountId: 0,
      paymentAmount: "",
    };
    // UPDATE THE DATA ON THE STATE
    setPaymentMethodTable([...paymentMethodTable, newItem]);
  };

  // // REMOVE PRODUCT TABLE HANDLER
  const removeProductTableHandler = (productId: string) => {
    // FILTER OUT THE TABLE WITH THE SPECIFIC INDEX
    const updatedProductTable = selectedProduct.filter(
      (table: any) => table.id !== productId
    );

    // UPDATE THE INDEX OF THE REMAINING ITEMS
    updatedProductTable.forEach((table: any, idx: number) => {
      table.index = idx;
    });
    // SET THE UPDATED TABLE IN THE STATE
    setSelectedProduct(updatedProductTable);
  };

  // ADD PRODUCT HANDLER
  const addProductTableHandler = (productName: string, productId: string) => {
    // GET THE HIGHEST INDEX NUMBER
    const maxIndex = Math.max(
      ...selectedProduct.map((product: any) => +product.index)
    );
    // CREATE A NEW OBJECT WITH THE REQUIRE PROPERTIES
    const newItem = {
      // CONTROLLER DATA
      id: uniqueIdGenerator(),
      productName,
      index: +maxIndex + 1,
      // PRODUCT DATA
      productId,
      quantity: 1,
      warrantyId: 0,
      price: 0,
      size: "",
      sellingPrice: 0,
      subTotal: 0,
      color: "",
      sku: "",
      profitMargin: 1,
    };
    // UPDATE THE DATA ON THE STATE
    setSelectedProduct([...selectedProduct, newItem]);
  };

  useEffect(() => {
    if (clear) {
      // RESET THE SELECTED PRODUCTS
      setSelectedProduct([]);
      // RESET THE PAYMENT TABLE
      setPaymentMethodTable([
        {
          index: 0,
          accountId: 0,
          paymentAmount: 0,
        },
      ]);
      // RESET THE PRODUCT LIST
      setProductList([]);
      // RESET THE SUPPLIER LIST
      setSupplierList([]);
      // RESET SUPPLIER LIST
      setSelectedSupplier([]);
      // RESET PRODUCT SEARCH
      setProductSearch("");
      // RESET SUPPLIER SEARCH
      setSupplierSearch("");
      // RESET DISCOUNT AMOUNT
      setDiscountAmount("");
    }
  }, [clear]);

  return (
    <section>
      {/* PRODUCT PRICE CALCULATION SUMMARY */}
      <ul className="grid grid-cols-1 justify-items-start lg:grid-cols-5 md:grid-cols-3 md:justify-items-start lg:justify-items-center my-4 border py-1 rounded-md px-2 lg:px-0">
        <li>
          <label className="text-sm md:text-base">Total Amount</label>
          <b className="ml-2 text-sm md:text-base">
            {totalPrice.toFixed(2) || "0.00"}৳
          </b>
        </li>
        <li>
          <label className="text-sm md:text-base">Payable Amount</label>
          <b className="ml-2 text-sm md:text-base">
            {totalPrice.toFixed(2) || "0.00"}৳
          </b>
        </li>
        <li>
          <label className="text-sm md:text-base">Discount Amount</label>
          <b className="ml-2 text-sm md:text-base">
            {totalDiscount.toFixed(2) || "0.00"}৳
          </b>
        </li>
        <li>
          <label className="text-sm md:text-base">Total Payment Amount</label>
          <b className="ml-2 text-sm md:text-base">
            {totalPaymentAmount.toFixed(2) || "0.00"}৳
          </b>
        </li>
        <li>
          <label className="text-sm md:text-base">Due</label>
          <b className="ml-2 text-sm md:text-base">
            {(totalPrice - totalPaymentAmount).toFixed(2) || "0.00"}৳
          </b>
        </li>
      </ul>
      <section>
        <FormWrapper heading="Add Purchase" size="full">
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="w-full lg:w-7/12 grid">
              <div className="flex flex-col">
                {/* SELECT DISCOUNT TYPE AND AMOUNT */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* DISCOUNT TYPE */}
                  <InputWrapper
                    className="w-full"
                    labelFor={`discount_type`}
                    label={generalInfo?.discount_type?.label[locale]}
                    error={error?.discountType?.message}
                  >
                    <Select
                      value={watch("discountType")}
                      // defaultValue={"Fixed"}
                      onValueChange={(value: string) =>
                        setValue("discountType", value)
                      }
                    >
                      <SelectTrigger id="discount_type" className="">
                        <SelectValue
                          placeholder={
                            generalInfo?.discount_type?.placeholder[locale]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {DISCOUNT_TYPES &&
                          DISCOUNT_TYPES?.length > 0 &&
                          DISCOUNT_TYPES?.map(
                            (singleOption: any, optionIndex: number) => (
                              <SelectItem
                                key={optionIndex + singleOption.key}
                                value={singleOption?.key}
                              >
                                {singleOption?.label}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                  </InputWrapper>
                  {/* DISCOUNT AMOUNT */}
                  <InputWrapper
                    labelFor="discount_amount"
                    label={generalInfo?.discount_amount?.label[locale]}
                    error={error?.discount?.message}
                  >
                    <Input
                      onWheel={(event) => event.currentTarget.blur()}
                      type="number"
                      id="discount_amount"
                      value={discountAmount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDiscountAmount(e.target.value);
                      }}
                      placeholder={
                        generalInfo?.discount_amount?.placeholder[locale]
                      }
                    />
                  </InputWrapper>
                </div>
                {/* PURCHASE DATE INPUT AND ATTACH DOCUMENTS */}
                <div className="flex gap-4 flex-col md:flex-row">
                  {/* PURCHASE DATE */}
                  <InputWrapper
                    error={error?.purchaseDate?.message}
                    labelFor="purchase_date"
                    label={generalInfo?.purchase_date?.label[locale]}
                  >
                    <Popover>
                      <PopoverTrigger id="purchase_date" asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            " justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>
                              {generalInfo?.purchase_date?.placeholder[locale]}
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </InputWrapper>
                  {/* ATTACH DOCUMENT */}
                  <InputWrapper
                    className="overflow-hidden"
                    error={error?.attachDocument?.message}
                    labelFor="attach_document"
                    label={generalInfo?.attach_documents?.label[locale]}
                  >
                    <Input
                      placeholder={
                        generalInfo?.attach_documents?.placeholder[locale]
                      }
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (
                          event.target.files &&
                          event.target.files.length > 0
                        ) {
                          const reader = new FileReader();
                          reader.readAsDataURL(event.target.files[0]);
                          reader.onload = function () {
                            setValue("attachDocument", reader?.result);
                          };
                        }
                      }}
                      id="attach_document"
                      type="file"
                    />
                  </InputWrapper>
                </div>
                {/* PURCHASE STATUS AND PURCHASE NOTE */}
                <div className="flex gap-4 flex-col md:flex-row">
                  {/* PURCHASE NOTE */}
                  <InputWrapper
                    label={generalInfo?.purchase_note?.label[locale]}
                    labelFor="purchase_note"
                    error={error?.note?.message}
                  >
                    <Textarea
                      {...register("note")}
                      rows={5}
                      id="purchase_note"
                      placeholder={
                        generalInfo?.purchase_note?.placeholder[locale]
                      }
                    />
                  </InputWrapper>
                  {/* SELECT PURCHASE STATUS & REFERENCE NUMBER */}
                  <div className="flex w-full flex-col">
                    {/* PURCHASE STATUS */}
                    <InputWrapper
                      labelFor="purchase_status"
                      label={generalInfo?.purchase_status?.label[locale]}
                      error={error?.purchaseStatus?.message}
                    >
                      <Select
                        value={watch("purchaseStatus")}
                        onValueChange={(value: string) =>
                          setValue("purchaseStatus", value)
                        }
                      >
                        <SelectTrigger id="purchase_status" className="">
                          <SelectValue
                            placeholder={
                              generalInfo?.purchase_status?.placeholder[locale]
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {PURCHASE_STATUS.length > 0 &&
                            PURCHASE_STATUS.map((singleStatus: any) => (
                              <SelectItem
                                key={singleStatus?.key}
                                value={singleStatus?.key}
                              >
                                {singleStatus?.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </InputWrapper>
                    {/* REFERENCE NUMBER */}
                    <InputWrapper
                      label={generalInfo.reference_number.label[locale]}
                      labelFor="ref_number"
                      error={error?.referenceNo?.message}
                    >
                      <Input
                        {...register("referenceNo")}
                        type="text"
                        id="ref_number"
                        placeholder={
                          generalInfo.reference_number.placeholder[locale]
                        }
                      />
                    </InputWrapper>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/12">
              {/* PAYMENT METHOD */}
              <div className="max-h-[220px] overflow-y-auto scroll-hidden pb-1">
                {paymentMethodTable?.map(
                  (singleAccount: any, accountIndex: number) => (
                    <ul
                      key={accountIndex}
                      className="grid grid-flow-row md:grid-flow-col gap-3 px-1"
                    >
                      <li>
                        {accountIndex === 0 ? (
                          <InputWrapper
                            label="#"
                            error=""
                            labelFor="add_new_method"
                          >
                            {/* ADD PAYMENT METHOD TABLE */}
                            <Button
                              type="button"
                              onClick={() => addPaymentTableHandler()}
                              variant="outline"
                              size="icon"
                              className="group relative"
                              disabled={
                                watch("payments")?.length ===
                                accountsData?.data?.length
                              }
                            >
                              <LuPlus className="h-4 w-4" />

                              <span className="sr-only">
                                Add Another Pay Method Button
                              </span>
                              <span className="custom-tooltip-right">
                                Add Another Payment Method
                              </span>
                            </Button>
                          </InputWrapper>
                        ) : (
                          <InputWrapper label="#" error="" labelFor="#">
                            {/* REMOVE PAYMENT METHOD TABLE */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  type="button"
                                  className="group relative"
                                  variant="destructive"
                                  size="icon"
                                >
                                  <LuTrash className="h-4 w-4" />
                                  {/* TOOLTIP TEXT */}
                                  <span className="custom-tooltip-right">
                                    Remove Payment Method
                                  </span>
                                  <span className="sr-only">
                                    Remove Pay Method Button
                                  </span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Payment Method Removal Confirmation
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove this payment
                                    method? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      removePaymentTableHandler(accountIndex)
                                    }
                                  >
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </InputWrapper>
                        )}
                      </li>
                      <li className="w-full">
                        <InputWrapper
                          className={`${
                            sidebarOpen
                              ? "lg:w-[95px] xl:w-[150px] 2xl:w-[160px] truncate"
                              : "lg:w-[130px] xl:w-full"
                          }`}
                          labelFor={`paying_method${accountIndex}`}
                          label={generalInfo?.payment_method?.label[locale]}
                          error={
                            error?.payments?.length > 0 &&
                            error?.payments[accountIndex]?.accountId?.message
                          }
                          // className={`w-full ${
                          //   sidebarOpen
                          //     ? "lg:w-[90px] xl:w-[120px] truncate"
                          //     : "lg:w-[130px] xl:w-full"
                          // }`}
                        >
                          <Select
                            onOpenChange={(open: boolean) => setUpdate(open)}
                            onValueChange={(value: any) => {
                              // THIS CONDITION PREVENT THE UPDATE DATA AUTOMATICALLY
                              if (update) {
                                const updatedTable = paymentMethodTable.map(
                                  (item: any) =>
                                    item.index === accountIndex
                                      ? { ...item, accountId: +value }
                                      : item
                                );
                                setPaymentMethodTable(updatedTable);
                              }
                            }}
                            value={singleAccount.accountId || ""}
                          >
                            <SelectTrigger
                              id={`paying_method${accountIndex}`}
                              className={`w-full focus:ring-0 `}
                            >
                              <SelectValue
                                placeholder={
                                  generalInfo?.payment_method?.placeholder[
                                    locale
                                  ]
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {!accountsData?.data?.length &&
                                accountLoading && (
                                  <div className="w-full h-24 flex items-center justify-center">
                                    {accountLoading && <ButtonLoader />}
                                  </div>
                                )}
                              {accountLoading ||
                                (accountsData?.data &&
                                  accountsData?.data?.length > 0 &&
                                  accountsData?.data.map(
                                    (singleAccount: any) => (
                                      <SelectItem
                                        disabled={watch("payments").some(
                                          (accountItem2: any) =>
                                            accountItem2.accountId ===
                                            singleAccount?.id
                                        )}
                                        className="cursor-pointer"
                                        key={singleAccount?.id}
                                        value={singleAccount?.id}
                                      >
                                        {singleAccount?.accountName}
                                      </SelectItem>
                                    )
                                  ))}
                            </SelectContent>
                          </Select>
                        </InputWrapper>
                      </li>
                      <li className="w-full">
                        <InputWrapper
                          className={`${
                            sidebarOpen
                              ? "lg:w-[95px] xl:w-[150px] 2xl:w-[160px] truncate"
                              : "lg:w-[130px] xl:w-full"
                          }`}
                          label={generalInfo?.payment_amount?.label[locale]}
                          error={
                            error?.payments?.length > 0 &&
                            error?.payments[accountIndex]?.paymentAmount
                              ?.message
                          }
                          labelFor={`enter_amount${accountIndex}`}
                        >
                          {/* ENTER AMOUNT FILED */}
                          <Input
                            type="number"
                            value={singleAccount.paymentAmount || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const updatedTable = paymentMethodTable.map(
                                (item: any) =>
                                  item.index === accountIndex
                                    ? {
                                        ...item,
                                        paymentAmount: +e.target.value,
                                      }
                                    : item
                              );
                              setPaymentMethodTable(updatedTable);
                            }}
                            onWheel={(event) => event.currentTarget.blur()}
                            id={`enter_amount${accountIndex}`}
                            placeholder={
                              generalInfo?.payment_amount.placeholder[locale]
                            }
                          />
                        </InputWrapper>
                      </li>
                    </ul>
                  )
                )}
              </div>
            </div>
          </div>
        </FormWrapper>
      </section>
      <section className="flex justify-start  md:justify-end items-center mt-6">
        <div className="flex space-x-0 md:space-x-3 flex-col md:flex-row">
          {/* SUPPLIER SEARCH INPUT FIELD */}
          <InputWrapper
            label={generalInfo.search_supplier.label[locale]}
            labelFor="search_supplier"
            error={error?.supplierId?.message}
            className="w-full md:w-1/2"
          >
            <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
              <PopoverTrigger
                id="search_supplier"
                asChild
                className={`w-full

                ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }

                `}
              >
                <Button
                  type="button"
                  variant="outline"
                  role="search_supplier"
                  aria-expanded={productOpen}
                  className="w-full justify-between"
                >
                  {selectedSupplier?.firstName
                    ? selectedSupplier?.firstName +
                      " " +
                      selectedSupplier?.lastName
                    : generalInfo?.search_supplier.placeholder[locale]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className={`w-full  ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }`}
              >
                <Command>
                  <div className="flex justify-center p-2">
                    {/* SUPPLIER SEARCH INPUT */}
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSupplierSearch(e.target.value)
                      }
                      placeholder={generalInfo.search_supplier.label[locale]}
                    />
                  </div>
                  {isSupplierLoading && (
                    <div className="my-5 flex justify-center opacity-90">
                      <ButtonLoader />
                    </div>
                  )}

                  <CommandGroup className="max-h-52 overflow-y-auto">
                    {supplierList?.map((singleSupplier: any) => (
                      <CommandItem
                        className="my-1 cursor-pointer border border-transparent hover:border-tertiary transition-all duration-300 bg-accent/80"
                        key={singleSupplier.id}
                        value={singleSupplier?.id}
                        onSelect={(currentValue) => {
                          setSupplierValue(
                            currentValue === supplierValue ? "" : currentValue
                          );
                          setValue("supplierId", singleSupplier.id);
                          setSelectedSupplier(singleSupplier);
                          setSupplierOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            productValue === singleSupplier?.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {singleSupplier?.firstName +
                          " " +
                          singleSupplier?.lastName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </InputWrapper>
          {/* PRODUCT SEARCH INPUT FILED */}
          <InputWrapper
            label={generalInfo.search_product.label[locale]}
            labelFor="search_product"
            error=""
            className="w-full md:w-1/2"
          >
            <Popover open={productOpen} onOpenChange={setProductOpen}>
              <PopoverTrigger
                asChild
                className={`w-full

                ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }

                `}
              >
                <Button
                  type="button"
                  variant="outline"
                  role="search_product"
                  aria-expanded={productOpen}
                  className="w-full justify-between"
                >
                  {selectedProduct && selectedProduct?.length > 0
                    ? selectedProduct?.find(
                        (product: any) => product.productId === productValue
                      )?.productName
                      ? selectedProduct?.find(
                          (product: any) => product.productId === productValue
                        )?.productName
                      : generalInfo?.search_product.placeholder[locale]
                    : generalInfo?.search_product.placeholder[locale]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className={`w-full  ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }`}
              >
                <Command>
                  <div className="flex justify-center p-2">
                    {/* PRODUCT SEARCH INPUT */}
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProductSearch(e.target.value)
                      }
                      placeholder={
                        generalInfo.search_supplier.placeholder[locale]
                      }
                    />
                  </div>
                  {isProductLoading && (
                    <div className="my-5 flex justify-center opacity-90">
                      <ButtonLoader />
                    </div>
                  )}
                  <CommandGroup className="max-h-52 overflow-y-auto">
                    {productList?.map((singleProduct: any) => (
                      <CommandItem
                        className={`my-1 cursor-pointer border border-transparent hover:border-tertiary transition-all duration-300 bg-accent/80`}
                        key={singleProduct.id}
                        value={singleProduct?.id}
                        onSelect={(currentValue) => {
                          // SET PRODUCT VALUE
                          setProductValue(
                            currentValue === productValue ? "" : currentValue
                          );
                          const maxIndex = Math.max(
                            ...selectedProduct.map(
                              (product: any) => +product.index
                            )
                          );
                          // FORM DATA FOR OTHER CATEGORIES
                          const formData = {
                            // FORM CONTROLLER DATA
                            id: uniqueIdGenerator(),
                            productName: singleProduct.productName,
                            index:
                              +selectedProduct.length === 0 ? 0 : +maxIndex + 1,
                            // PRODUCT DATA
                            productId: singleProduct?.id,
                            quantity: 1,
                            warrantyId: 0,
                            price: 0,
                            size: "",
                            sellingPrice: 0,
                            subTotal: 0,
                            color: "",
                            sku: "",
                            profitMargin: 1,
                          };
                          // ADD SELECTED PRODUCT TO THE LIST
                          setSelectedProduct([...selectedProduct, formData]);
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
                        <p className={`max-w-[180px] md:max-w-full truncate`}>
                          {singleProduct?.productName}
                        </p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </InputWrapper>
        </div>
      </section>

      {/* PURCHASE PRODUCT FORM CONTAINER */}
      <section>
        <InfoWrapper heading="Add Product For Purchasing" className="">
          <div className="flex flex-col gap-2">
            {selectedProduct.length > 0 ? (
              selectedProduct?.map(
                (singleProduct: any, productIndex: number) => (
                  <div key={singleProduct?.id} className="-mx-2">
                    <PurchaseProductDetailsForm
                      error={error}
                      removeProductTableHandler={removeProductTableHandler}
                      addProductTableHandler={addProductTableHandler}
                      productDetails={singleProduct}
                      productIndex={productIndex}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                    />
                  </div>
                )
              )
            ) : (
              <div className="flex items-center justify-center h-[150px] w-full">
                <p className="text-center">
                  <b>Product hasn't selected yet,</b> <br /> You can add new
                  product for purchasing.
                </p>
              </div>
            )}
          </div>
        </InfoWrapper>
      </section>
    </section>
  );
};

export default AddPurchaseContainer;
