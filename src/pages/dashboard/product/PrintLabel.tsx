import InputWrapper from "@/components/common/form/InputWrapper";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
import { useAppContext } from "@/context/hook/useAppContext";
import { useSearchSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { useReactToPrint } from "react-to-print";
import InfoWrapper from "@/components/common/InfoWrapper";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarCode from "@/components/common/BarCode";

const BARCODE_SETTING_OPTIONS = [
  {
    option: `20 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 4" x1", Labels per sheet: 20`,
  },
  {
    option: `30 Labels per sheet, Sheet Size: 8.5" x 11", Label Size: 2.625"
                x 1", Labels per sheet: 30`,
  },
  {
    option: `32 Labels per sheet, Sheet Size: 8.5" x 11", Label Size: 2" x
                1.25", Labels per sheet: 32`,
  },
  {
    option: `40 Labels per sheet, Sheet Size: 8.5" x 11", Label Size: 2" x
                1", Labels per sheet: 40`,
  },
  {
    option: `50 Labels per Sheet, Sheet Size: 8.5" x 11", Label Size: 1.5" x
                1", Labels per sheet: 50`,
  },
  {
    option: `Continuous Rolls - 31.75mm x 25.4mm, Label Size: 31.75mm x25.4mm, Gap: 3.18mm`,
  },
  { option: `Label Sticker 38x25mm` },
  { option: `30X15 mm` },
  { option: `Level` },
];

const PrintLabel = () => {
  const { companyName } = CLIENT_DETAILS;
  const { sidebarOpen } = useAppContext();
  const locale = "en";
  const { search_product } = ADD_EDIT_SALE_FORM as IAddEditSaleForm;

  // STATE FOR POPOVER COMBOBOX
  const [productOpen, setProductOpen] = useState<boolean>(false);
  const [productValue, setProductValue] = useState<string>("");

  // INITIAL PRODUCT & CLIENT LIST STATE
  const [productList, setProductList] = useState<object[]>([]);

  // SELECTED PRODUCT & CLIENT LIST
  const [selectedProduct, setSelectedProduct] = useState<any>([]);

  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState<string>("");

  //  DATE SELECTION STATE
  const [date, setDate] = useState<Date>();

  const labelPrintRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => labelPrintRef.current,
  });

  // GET SINGLE PRODUCT INFORMATION QUERY
  const { data: productData, isLoading: isProductLoading } =
    useSearchSinglePurchaseQuery(productSearch) as any;

  // HERE CALCULATE TOTAL PRICE

  useEffect(() => {
    // LOGIC FOR ADD PRODUCT DATA
    if (productSearch) {
      const idsToRemove = selectedProduct?.map(
        (product: any) => product.id
      ) as any;
      setProductList(
        productData?.data?.filter(
          (product: any) => !idsToRemove.includes(product.id)
        )
      );
    } else {
      setProductList([]);
    }
  }, [productData?.data, productSearch, selectedProduct]);

  return (
    <section className="pb-8">
      <FormWrapper size="full" heading="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1  my-5">
          {/* PRODUCT NAME & SELECTED PRODUCT LIST */}
          <div className="grid grid-flow-col justify-between">
            {/* PRODUCT SEARCH INPUT */}
            <InputWrapper
              label={search_product.label[locale]}
              labelFor="search_product"
              error=""
            >
              <Popover open={productOpen} onOpenChange={setProductOpen}>
                <PopoverTrigger
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
                    aria-expanded={productOpen}
                    className="w-full justify-between"
                  >
                    {selectedProduct?.length > 0
                      ? selectedProduct?.find(
                          (product: any) => product.id === productValue
                        )?.productName
                        ? selectedProduct?.find(
                            (product: any) => product.id === productValue
                          )?.productName
                        : search_product.placeholder[locale]
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
                        placeholder={search_product.label[locale]}
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
                          className="my-1 cursor-pointer border border-transparent hover:border-tertiary transition-all duration-300 bg-accent/80 overflow-hidden"
                          key={singleProduct.id}
                          value={singleProduct?.id}
                          onSelect={(currentValue: any) => {
                            setProductValue(
                              currentValue === productValue ? "" : currentValue
                            );

                            // GET SELECTED PRODUCT FROM THE LIST
                            setSelectedProduct([
                              ...selectedProduct,
                              singleProduct,
                            ]);

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
                              <b>{singleProduct?.price?.toFixed()}</b>
                              <span className="uppercase ml-1">
                                {singleProduct?.sku}
                              </span>
                            </li>
                          </ul>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </InputWrapper>
          </div>
        </div>
      </FormWrapper>
      <section className="w-full flex flex-col lg:flex-row gap-6 items-center">
        {/* PRODUCT LIST TABLE FOR LABEL PRINT */}
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
                <TableHead>Products</TableHead>
                <TableHead>No. of labels</TableHead>
                <TableHead>Lot Number</TableHead>
                <TableHead>Packing Date</TableHead>
                <TableHead>Selling Price Group</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProduct &&
                selectedProduct.length > 0 &&
                selectedProduct?.map((labelProduct: any, index: any) => (
                  <TableRow className="divide-[0.5px]" key={index}>
                    <TableCell>{labelProduct?.productName}</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        name="quantity"
                        placeholder="Enter number of labels"
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Input
                        type="text"
                        name="discount"
                        placeholder="Enter the lot number"
                      />
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>None</SelectLabel>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="wholesale">
                              Wholesale Price
                            </SelectItem>
                            <SelectItem value="paikari">Paikari Dam</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* BARCODE CUSTOMIZE SETTING */}
      <InfoWrapper heading="Information to show in labels">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3 my-4">
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="product_name" />
              <Label htmlFor="product_name">Product Name</Label>
            </li>
            <li>
              <Input
                type="number"
                defaultValue={15}
                placeholder="Enter font size for product name"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="product_variation" />
              <Label htmlFor="product_variation">
                Product Variation (Recommended)
              </Label>
            </li>
            <li>
              <Input
                type="number"
                defaultValue={17}
                placeholder="Enter font size for product variation"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="product_price" />
              <Label htmlFor="product_price">Product Price</Label>
            </li>
            <li>
              <Input
                type="number"
                defaultValue={17}
                placeholder="Enter font size for product price"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="business_name" />
              <Label htmlFor="business_name">Business Name</Label>
            </li>
            <li>
              <Input
                defaultValue={20}
                type="number"
                placeholder="Enter font size for business name"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="packing_data" />
              <Label htmlFor="packing_data">Packing Date</Label>
            </li>
            <li>
              <Input
                defaultValue={12}
                type="number"
                placeholder="Enter font size for packing date"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1 pl-2">
              <Checkbox id="lot_number" />
              <Label htmlFor="lot_number">Lot Number</Label>
            </li>
            <li>
              <Input
                defaultValue={12}
                type="number"
                placeholder="Enter font size for lot number"
              />
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-1 mb-1.5 pl-2">
              <Label htmlFor="show_price_type">Show Price Types</Label>
            </li>
            <li>
              <Select>
                <SelectTrigger id="show_price_type" className="w-[280px]">
                  <SelectValue placeholder="Show price with including or excluding tax" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="inc_tax">Including Tax</SelectItem>
                    <SelectItem value="exc_tax">Excluding Tax</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </li>
          </ul>
        </div>
      </InfoWrapper>

      {/* BARCODE SETTING OPTION */}
      <div className="">
        <InputWrapper
          label="Barcode Settings"
          error=""
          labelFor="barcode_setting"
        >
          <Select>
            <SelectTrigger id="barcode_setting" className="w-[280px]">
              <SelectValue placeholder="Barcode Setting" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BARCODE_SETTING_OPTIONS.length > 0 &&
                  BARCODE_SETTING_OPTIONS.map(
                    (singleOption: any, optionIndex: number) => (
                      <SelectItem
                        key={optionIndex}
                        value={singleOption?.option}
                      >
                        {singleOption?.option}
                      </SelectItem>
                    )
                  )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputWrapper>
      </div>
      {/* LABEL PRINT BUTTON */}
      <div className="flex justify-end mt-4">
        <div className="space-x-3">
          <Dialog>
            {selectedProduct.length > 0 && (
              <DialogTrigger asChild>
                <Button>Preview</Button>
              </DialogTrigger>
            )}

            <DialogContent className="max-y-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="mb-4">Label Print Preview</DialogTitle>
                <div>
                  {selectedProduct.length > 0 &&
                    selectedProduct.map(
                      (singleProduct: any, productIndex: number) => (
                        <div
                          key={productIndex}
                          className="flex justify-center items-center"
                        >
                          <BarCode
                            singleProduct={singleProduct}
                            companyName={companyName}
                          />
                        </div>
                      )
                    )}
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button variant="tertiary" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>

      <div className="hidden">
        <div ref={labelPrintRef}>
          {selectedProduct.length > 0 &&
            selectedProduct.map((singleProduct: any, productIndex: number) => (
              <div
                key={productIndex}
                className="flex justify-center items-center"
              >
                <BarCode
                  singleProduct={singleProduct}
                  companyName={companyName}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PrintLabel;
