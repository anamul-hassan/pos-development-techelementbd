import InputWrapper from "@/components/common/form/InputWrapper";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { AlertCircle, Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ADD_EDIT_SALE_FORM,
  IAddEditSaleForm,
} from "@/utils/constants/sale/add_point_of_sell_form";
import FormWrapper from "@/components/common/form/FormWrapper";
import { Input } from "@/components/ui/input";
import InfoWrapper from "@/components/common/InfoWrapper";
import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useAppContext } from "@/context/hook/useAppContext";
import SaleProductDetails from "./SaleProductDetails";
import { useSearchSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddClientFormContainer from "./AddClientFormContainer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { percentageCalculator } from "@/utils/helpers/percentageCalculator";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { useGetCustomersQuery } from "@/store/customer/customerApi";
import SyncedContainer from "@/components/common/container/SyncedContainer";
import AddPaymentTable, {
  IPaymentTable,
} from "@/components/common/payment/AddPaymentTable";
import CopyButton from "@/components/common/button/CopyButton";
import { useDispatch } from "react-redux";

interface IAddSaleProps {
  register: any;
  error: any;
  setValue: any;
  watch: any;
  loading: boolean;
  clear: boolean;
  setClear: (clear: boolean) => void;
  totalVat: number;
  vatAmount: number;
  setVatAmount: (vatAmount: number) => void;
  discountAmount: string;
  setDiscountAmount: (discountAmount: string) => void;
  totalPrice: number | string;
  setError: any;
}

const AddSaleContainer: FC<IAddSaleProps> = ({
  error,
  setValue,
  watch,
  loading,
  clear,
  setClear,
  discountAmount,
  setDiscountAmount,
  vatAmount,
  setVatAmount,
  totalPrice,
  totalVat,
  setError,
}) => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useAppContext();
  const locale = "en";
  const {
    search_product,
    search_client,
    discount_type,
    discount_amount,
    vat_amount,
  } = ADD_EDIT_SALE_FORM as IAddEditSaleForm;

  // CLIENT ADD DIALOG STATE
  const [clientAddOpen, setClientAddOpen] = useState<boolean>(false);
  // STATE FOR POPOVER COMBOBOX
  const [productOpen, setProductOpen] = useState<boolean>(false);
  const [productValue, setProductValue] = useState<string>("");
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [clientValue, setClientValue] = useState<string>("");

  // INITIAL PRODUCT & CLIENT LIST STATE
  const [productList, setProductList] = useState<object[]>([]);
  const [clientList, setClientList] = useState<object[]>([]);
  // STATE FOR ADDING NEW PAYMENT OPTION
  const [paymentTable, setPaymentTable] = useState<IPaymentTable[]>([
    {
      index: 0,
      accountId: null,
      paymentAmount: "",
    },
  ]);

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
  const [selectedClient, setSelectedClient] = useState<any>({});

  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState<string>("");

  // CLIENT SEARCH INPUT STATE
  const [clientSearch, setClientSearch] = useState<string>("");

  // GET SINGLE PRODUCT INFORMATION QUERY
  const { data: productData, isLoading: isProductLoading } =
    useSearchSinglePurchaseQuery(productSearch) as any;

  // GET SINGLE CLIENT INFORMATION QUERY
  const { data: clientData, isLoading: isClientLoading } = useGetCustomersQuery(
    {
      search: clientSearch,
      page: 1,
      size: 10,
    }
  );

  const totalDiscount =
    watch("discountType") === "Fixed"
      ? +discountAmount
      : watch("discountType") === "Persent"
      ? percentageCalculator(
          +discountAmount,
          totalCalculator(watch("products"), "subTotal")
        )
      : 0;

  useEffect(() => {
    // LOGIC FOR ADD PRODUCT DATA
    if (productSearch) {
      const idsToRemove = selectedProduct?.map(
        (product: any) => product.id
      ) as any;
      const availableProduct = productData?.data
        ?.filter((product: any) => !idsToRemove.includes(product.id))
        .filter((singleProduct: any) => singleProduct?.stock !== 0);
      if (!clear) {
        setProductList(availableProduct);
      }
    } else {
      setProductList([]);
    }
    // LOGIC FOR ADD CLIENT DATA
    if (clientSearch) {
      setClientList(clientData?.data);
    } else {
      setClientList([]);
    }
    // SET CUSTOMER ID WHEN CUSTOMER IS SELECTED
    setValue("customerId", selectedClient?.id);
    // SET THE PAYMENT DATA ON THE FORM
    setValue(
      "payments",
      paymentTable.map((account: any) => {
        return {
          accountId: account.accountId,
          paymentAmount: account.paymentAmount,
        };
      })
    );

    setValue("discount", +totalDiscount);

    // SET totalPaymentAmount ON THE FORM
    setValue(
      "totalPaymentAmount",
      totalCalculator(watch("payments"), "paymentAmount")
    );
    // SET totalPrice ON THE FORM
    setValue("totalPrice", +totalPrice);

    // AFTER ADDING THE POS
  }, [
    productSearch,
    productData?.data,
    productValue,
    clientSearch,
    selectedClient,
    clientData?.data,
    selectedProduct,
    setValue,
    paymentTable,
    watch,
    totalPrice,
    totalDiscount,
    clear,
  ]);

  useEffect(() => {
    if (clear) {
      setProductList([]);
      setClientList([]);
      setPaymentTable([
        {
          index: 0,
          accountId: null,
          paymentAmount: "",
        },
      ]);
      setSelectedProduct([]);
      setSelectedClient({});
      setDiscountType([
        {
          label: "Fixed",
          key: "Fixed",
        },
        {
          label: "Percentage",
          key: "Persent",
        },
      ]);
      setProductSearch("");
      setClientSearch("");

      setClear(false);
    }
  }, [clear, setClear, setValue, dispatch]);

  return (
    <section>
      {/* CLIENT AND PRODUCT SEARCH CONTAINER & CLIENT INFORMATION CONTAINER */}
      <section className="w-full flex flex-col lg:flex-row gap-6 items-center">
        {/* ADD POS FORM PART 01 */}
        <aside className="w-full lg:w-7/12 xl:6/12 ">
          <FormWrapper size="full" heading="Product & Client Navigation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              {/* PRODUCT NAME */}
              <div className="grid grid-flow-col justify-between">
                {/* PRODUCT SEARCH INPUT */}
                <InputWrapper
                  label={search_product.label[locale]}
                  labelFor="search_product"
                  error=""
                >
                  <Popover open={productOpen} onOpenChange={setProductOpen}>
                    <PopoverTrigger
                      id="search_product"
                      asChild
                      className={`w-full  ${
                        sidebarOpen
                          ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                          : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                      }`}
                    >
                      <Button
                        variant="outline"
                        role="search_product"
                        className="w-full justify-between"
                      >
                        {selectedProduct && selectedProduct.length > 0
                          ? (() => {
                              const foundProduct = selectedProduct.find(
                                (product: any) => product.id === +productValue
                              );
                              if (foundProduct && foundProduct.productName) {
                                return foundProduct.productName.length > 30
                                  ? foundProduct.productName.slice(0, 30)
                                  : foundProduct.productName;
                              } else {
                                return search_product.placeholder[locale];
                              }
                            })()
                          : search_product.placeholder[locale]}
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
                            placeholder={search_product.placeholder[locale]}
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
                                    currentValue === productValue
                                      ? ""
                                      : singleProduct?.id
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
              {/* CLIENT NAME */}
              <div className="grid grid-flow-col justify-between">
                <InputWrapper
                  label={search_client.label[locale]}
                  labelFor="client_name"
                  error=""
                  className={sidebarOpen ? "w-40" : ""}
                >
                  <Popover open={clientOpen} onOpenChange={setClientOpen}>
                    <PopoverTrigger
                      id="client_name"
                      asChild
                      className={`w-full  ${
                        sidebarOpen
                          ? "md:w-[140px] lg:w-[151px] xl:w-[206px]  2xl:!w-[272px] truncate"
                          : "md:w-[250px] lg:w-[196px] xl:w-[266px] 2xl:!w-[313px]"
                      }`}
                    >
                      <Button
                        variant="outline"
                        role="client_name"
                        aria-expanded={clientOpen}
                        className="w-full justify-between"
                      >
                        {selectedClient?.firstName
                          ? selectedClient?.firstName?.toLowerCase() === "n/a"
                            ? selectedClient?.phone
                            : fullNameConverter(
                                selectedClient?.firstName,
                                selectedClient?.lastName
                              )
                          : search_client.placeholder[locale]}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className={`w-full max-h-[250px] overflow-y-auto  ${
                        sidebarOpen
                          ? "md:w-[250px] lg:w-[151px] xl:w-[206px]  2xl:!w-[272px] truncate"
                          : "md:w-[250px] lg:w-[196px] xl:w-[266px] 2xl:!w-[313px]"
                      }`}
                    >
                      <Command>
                        <div className="flex justify-center p-2">
                          {/* CLIENT SEARCH INPUT */}
                          <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setClientSearch(e.target.value)
                            }
                            placeholder={search_client.placeholder[locale]}
                          />
                        </div>
                        {isClientLoading && (
                          <div className="my-5 flex justify-center opacity-90">
                            <ButtonLoader />
                          </div>
                        )}
                        <CommandGroup>
                          {clientList?.map(
                            (singleClient: any, clientIndex: number) => (
                              <CommandItem
                                key={clientIndex}
                                value={singleClient?.id}
                                onSelect={(currentValue) => {
                                  setClientValue(
                                    currentValue === clientValue
                                      ? ""
                                      : currentValue
                                  );
                                  setSelectedClient(singleClient);
                                  setClientOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    clientValue === singleClient?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <ul>
                                  <li>
                                    <b>{singleClient?.phone}</b>
                                  </li>
                                  <li className="text-sm">
                                    {singleClient?.firstName &&
                                    singleClient?.firstName?.toLowerCase() !==
                                      "n/a"
                                      ? fullNameConverter(
                                          singleClient?.firstName,
                                          singleClient?.lastName
                                        )
                                      : "Not Found"}
                                  </li>
                                </ul>
                              </CommandItem>
                            )
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </InputWrapper>
                {/* ADD NEW CLIENT FORM */}
                <InputWrapper label="#" error="" labelFor="add_new_method">
                  <Dialog open={clientAddOpen} onOpenChange={setClientAddOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="group relative"
                        variant="outline"
                        size="icon"
                      >
                        <LuPlus className="h-4 w-4" />
                        <span className="sr-only">Add New Client Button</span>
                        <span className="custom-tooltip-top">
                          Add New Client
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* ADD NEW CLIENT FORM CONTAINER */}
                      <AddClientFormContainer
                        setSelectedClient={setSelectedClient}
                        setClientAddOpen={setClientAddOpen}
                      />
                    </DialogContent>
                  </Dialog>
                </InputWrapper>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
              {/* DISCOUNT TYPE */}
              <InputWrapper
                label={discount_type.label[locale]}
                labelFor="discount_type"
                error=""
                className=""
              >
                <Select
                  value={watch("discountType")}
                  defaultValue={"Fixed"}
                  onValueChange={(value: string) =>
                    setValue("discountType", value)
                  }
                >
                  <SelectTrigger id="discount_type" className="w-full">
                    <SelectValue
                      placeholder={discount_type.placeholder[locale]}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {discountType &&
                      discountType?.length > 0 &&
                      discountType?.map(
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
                label={discount_amount.label[locale]}
                labelFor="discount_amount"
                error=""
              >
                <Input
                  id="discount_amount"
                  value={discountAmount}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setDiscountAmount(e.target.value);
                  }}
                  onWheel={(event) => event.currentTarget.blur()}
                  placeholder={discount_amount.placeholder[locale]}
                />
              </InputWrapper>
              {/* VAT AMOUNT */}
              <InputWrapper
                label={vat_amount.label[locale]}
                labelFor="vat_amount"
                error=""
              >
                <Input
                  id="vat_amount"
                  type="number"
                  value={vatAmount === 0 ? "" : vatAmount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (+e.target.value <= 100) {
                      setVatAmount(+e.target.value);
                    }
                  }}
                  onWheel={(event) => event.currentTarget.blur()}
                  placeholder={vat_amount.placeholder[locale]}
                />
              </InputWrapper>
            </div>
          </FormWrapper>
        </aside>

        {/* CLIENT INFORMATION CONTAINER */}
        <aside className="w-full lg:w-5/12 xl:6/12">
          <InfoWrapper heading="Client's Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
              {/* CLIENT PHONE NUMBER */}
              <HeadingParagraph
                heading="Phone"
                paragraph={selectedClient?.phone || "N/A"}
              />
              {/* CLIENT MEMBERSHIP ID */}
              <HeadingParagraph
                heading="Membership ID"
                paragraph={selectedClient?.memberShipId || "N/A"}
              />
              {/* CLIENT COLLECTED POINT */}
              <HeadingParagraph
                heading="Point"
                paragraph={selectedClient?.point || "00"}
              />
              {/* CLIENT AMOUNT BY POINT */}
              <HeadingParagraph
                heading="Point Amount"
                paragraph={
                  selectedClient?.pointAmount
                    ? selectedClient?.pointAmount?.toFixed(2) + "৳"
                    : "0.00৳"
                }
              />
            </div>
          </InfoWrapper>
        </aside>
      </section>
      {/* PRODUCT INFORMATION & ACCOUNT & PAY MANAGEMENT */}
      <section className="w-full flex flex-col lg:flex-row items-start gap-6 pb-8">
        {/* PRODUCT INFORMATION */}
        <div className="w-full lg:w-8/12">
          <SyncedContainer
            trigger={paymentTable?.length + Object.keys(error)?.length}
            className="flex flex-col gap-3 overflow-y-aut transition-all duration-150"
            referenceId="add_sale_container"
            height
          >
            <InfoWrapper
              heading="Products Information"
              className="mt-0 mb-0 w-full h-full"
            >
              {selectedProduct?.length > 0 ? (
                selectedProduct.map((singleProduct: any) => (
                  <div className="my-1" key={singleProduct?.id}>
                    <SaleProductDetails
                      setValue={setValue}
                      watch={watch}
                      selectedProduct={selectedProduct}
                      setSelectedProduct={setSelectedProduct}
                      productDetails={singleProduct}
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center mt-32 justify-center w-full h-full">
                  <p className="text-center">
                    <b>Product hasn't selected yet,</b> <br /> You can add new
                    product.
                  </p>
                </div>
              )}
            </InfoWrapper>
          </SyncedContainer>
        </div>
        {/* ACCOUNT & PAY MANAGEMENT */}
        <aside className="w-full lg:w-4/12">
          <div id="add_sale_container">
            <div>
              {/* PRICE & VAT&TAX & DISCOUNT & ITEMS NUMBER & ITEMS QUANTITY & TOTAL AMOUNT INFORMATION */}
              <ul className="flex flex-col gap-1">
                {/* TOTAL PRICE */}
                <li className="flex justify-between border-b-[1px]">
                  <label>Maximum Retail Price &#40;MRP&#41;</label>
                  <b>
                    {totalCalculator(watch("products"), "subTotal") > 0
                      ? totalCalculator(watch("products"), "subTotal")?.toFixed(
                          2
                        )
                      : "0"}
                    ৳
                  </b>
                </li>
                {/* VAT & TAX */}
                <li className="flex justify-between border-b-[1px]">
                  <label>
                    &#40;
                    <LuPlus className="inline" />
                    &#41; Vat/Tax
                  </label>
                  <b>{totalVat.toFixed(2) || "0.00"}৳</b>
                </li>
                {/* DISCOUNT */}
                <li className="flex justify-between border-b-[1px]">
                  <label>
                    &#40;
                    <LuMinus className="inline" />
                    &#41; Discount
                  </label>
                  <b>{totalDiscount.toFixed(2)}৳</b>
                </li>
                {/* NUMBER OF ITEMS */}
                <li className="flex justify-between border-b-[1px]">
                  <label>Number Of Items</label>
                  <b>{watch("products")?.length}</b>
                </li>
                {/* TOTAL QUANTITY */}
                <li className="flex justify-between border-b-2">
                  <label>Total Items Quantity</label>
                  <b>{totalCalculator(watch("products"), "quantity")}</b>
                </li>
                {/* TOTAL PRICE */}
                <li className="flex justify-between py-1">
                  <label className="font-[500]">Total Payable Amount</label>
                  <b className="flex items-center gap-x-2">
                    <CopyButton
                      tooltipSide="left"
                      copyItem={+totalPrice + +totalVat}
                    />
                    {(+totalPrice + +totalVat).toFixed(2) || "0.00"}৳
                  </b>
                </li>
              </ul>
              {/* PAYMENT METHOD */}

              <AddPaymentTable
                shrink
                scrollable
                paymentTable={paymentTable}
                setPaymentTable={setPaymentTable}
                watch={watch}
                property="payments"
                setError={setError}
              />

              {/* PAYMENT ADDITIONAL INFORMATION */}
              <div className="my-3">
                <h4 className="heading-tertiary">Addition Information</h4>
                <ul className="flex flex-col gap-1">
                  {/* PAYABLE AMOUNT */}
                  <li className="flex justify-between border-b-[1px]">
                    <label>Payable Amount</label>
                    <b>{(+totalVat + +totalPrice).toFixed(2) || "0.00"}৳</b>
                  </li>
                  {/* RECEIVED CASH  */}
                  <li className="flex justify-between border-b-[1px]">
                    <label>Received Cash</label>
                    <b>
                      {totalCalculator(
                        watch("payments"),
                        "paymentAmount"
                      ).toFixed(2)}
                      ৳
                    </b>
                  </li>
                  {/* CHANGE */}
                  <li className="flex justify-between border-b-[1px]">
                    <label>Change</label>
                    <b>
                      {totalCalculator(watch("payments"), "paymentAmount") -
                        (+totalPrice + +totalVat) >
                      0
                        ? (
                            totalCalculator(
                              watch("payments"),
                              "paymentAmount"
                            ) -
                            (+totalPrice + +totalVat)
                          ).toFixed(2)
                        : "0.00"}
                      ৳
                    </b>
                  </li>
                </ul>
              </div>
              {/* SALE ACTION BUTTON*/}
              <div className="my-3 flex justify-around">
                <Button size="sm" type="button" variant="destructive">
                  Cancel & Clear
                </Button>
                <Button
                  size="sm"
                  disabled={loading}
                  type="submit"
                  variant="success"
                >
                  {loading && <ButtonLoader />}
                  Add Sale
                </Button>
              </div>
              <div>
                {Object.keys(error)?.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Add Sale Error</AlertTitle>
                    <AlertDescription>
                      {error[Object.keys(error)[0]].message ||
                        "Something went wrong! try again"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3  mt-3">
              <Button type="button" variant="default" size="sm">
                Draft
              </Button>
              <Button type="button" variant="tertiary" size="sm">
                Quotation
              </Button>
              <Button type="button" variant="destructive" size="sm">
                Suspend
              </Button>
              <Button type="button" variant="warning" size="sm">
                Reattempt
              </Button>
              <Button type="button" variant="success" size="sm">
                SMS
              </Button>
              <Button type="button" variant="default" size="sm">
                Reprint
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
};

export default AddSaleContainer;
