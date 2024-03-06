/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";

import { FaFileAlt, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaFileInvoice, FaRegTrashCan } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";

import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { useGetCustomersQuery } from "@/store/customer/customerApi";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useAddSellMutation } from "@/store/sell/sellApi";
import { useSearchSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
import { useCloseOutsideClick } from "@/components/previous/Hooks/useCloseOutsideClick/useCloseOutsideClick";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import { Option, Select } from "@/components/previous/all/Select";
import InputField from "@/components/previous/all/InputField";
import Button from "@/components/previous/all/Button";
import Input from "@/components/previous/all/Input";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const AddSalesPage = () => {
  const { toast } = useToast();
  const productRef = useRef(null);
  // const sellingPriceRef = useRef(null);
  const { branchId } = shareBranchAndUserInfo();
  const { data: customer } = useGetCustomersQuery(undefined) as any;
  const { data: accounts } = useGetAccountsQuery("All") as any;
  const [createSale, { isLoading: cookingSale }] = useAddSellMutation(
    {}
  ) as any;
  // search
  const [productSearch, setProductSearch] = useState("");
  // CustomerId
  const [customerId, setCustomerId] = useState("");
  // Products
  const { data: purchase, isLoading } = useSearchSinglePurchaseQuery(
    productSearch
  ) as any;
  // store product
  // const [products, setProducts] = useState([]);
  // sellProducts
  const [sellProducts, setSellProducts] = useState([
    {
      productId: purchase?.data[0]?.productId,
      quantity: 0,
      unitPrice: purchase?.data?.sellingPrice,
      discount: 0,
      warranty: purchase?.data[0]?.warranty?.warranty,
      subTotal: 0,
    },
  ]);
  useEffect(() => {
    setSellProducts([
      {
        productId: purchase?.data[0]?.productId,
        quantity: 0,
        unitPrice: purchase?.data[0]?.sellingPrice,
        discount: 0,
        warranty: purchase?.data[0]?.warranty?.warranty,
        subTotal: 0,
      },
    ]);
  }, [purchase?.data]);
  // genarate payment field
  const [paymentFields, setPaymentFields] = useState([{ id: 1 }]);
  // payment array
  const [totalPayment, setTotalPayment] = useState([
    { accountId: "", paymentAmount: 0 },
  ]);
  // total payment amount
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  // store Purchase
  const [storePurchase, setStorePurchase] = useState<any>([]);
  // show product click btn
  const [showProduct, setShowProduct] = useState<any>([]);
  // outside click off product Dropdown
  const [isShowProduct, setIsShowProduct] = useState(false);
  // total
  const [totalAmount, setTotalAmount] = useState(0);
  // totalAmount - totalPaymentAmount
  const [due, setDue] = useState(0);
  // sellType
  const [sellType, setSellType] = useState("");
  // status
  const [status, setStatus] = useState("");
  // petTerm
  const [peyTerm, setPeyTerm] = useState("");
  // discount Amount
  const [discountAmount, setDiscountAmount] = useState(0);
  //
  const [paidAbleAmount, setPaidAbleAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();
  useCloseOutsideClick(setIsShowProduct, productRef);

  const handleAddField = () => {
    const newId = paymentFields.length + 1;
    setPaymentFields([...paymentFields, { id: newId }]);

    setTotalPayment((prevTotalPayment) => [
      ...prevTotalPayment,
      { accountId: "", paymentAmount: 0 },
    ]);
  };

  const handleRemoveField = (index: any) => {
    const updatedFields = [...paymentFields];
    updatedFields.splice(index, 1);
    setPaymentFields(updatedFields);
    setTotalPayment((prevTotalPayment) =>
      prevTotalPayment.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const handlePaymentTypeChange = (index: any, paymentAccount: any) => {
    setTotalPayment((prevTotalPayment) =>
      prevTotalPayment.map((payment, currentIndex) =>
        currentIndex === index
          ? { ...payment, accountId: paymentAccount }
          : payment
      )
    );
  };

  const handlePaymentAmountChange = (index: any, amount: any) => {
    setTotalPayment((prevTotalPayment) =>
      prevTotalPayment.map((payment, currentIndex) =>
        currentIndex === index
          ? { ...payment, paymentAmount: parseFloat(amount) }
          : payment
      )
    );
  };

  useEffect(() => {
    // If products length is greater than sellProducts length
    if (showProduct?.length > sellProducts?.length) {
      // Add new sellProduct entries to match the products length
      setSellProducts((prevSellProducts) => [
        ...prevSellProducts,
        ...Array(showProduct.length - prevSellProducts.length).fill({
          productId: purchase?.data[0]?.productId,
          quantity: 0,
          unitPrice: purchase?.data[0]?.sellingPrice,
          discount: 0,
          warranty: purchase?.data[0]?.warranty?.warranty,
          subTotal: 0,
        }),
      ]);
    } else if (showProduct.length < sellProducts.length) {
      // If products length is less than sellProducts length
      // Remove extra sellProduct entries to match the products length
      setSellProducts((prevSellProducts) =>
        prevSellProducts.slice(0, showProduct.length)
      );
    }
  }, [showProduct, purchase]);

  const handleQuantityChange = (index: any, eventValue: any) => {
    setSellProducts((prevSell) => {
      const updatedSell = prevSell.map((sell, currentIndex) =>
        currentIndex === index
          ? {
              ...sell,
              quantity: Number(eventValue),
              subTotal:
                purchase?.data[index]?.sellingPrice * Number(eventValue),
            }
          : sell
      );
      return updatedSell;
    });
  };

  const handleDiscountChange = (index: any, eventValue: any) => {
    setSellProducts((prevSell) => {
      const updatedSell = [...prevSell];
      for (let i = 0; i < updatedSell.length; i++) {
        if (i === index) {
          updatedSell[i] = {
            ...updatedSell[i],
            discount: Number(eventValue),
          };
        }
      }
      return updatedSell;
    });
  };

  useEffect(() => {
    const calculateTotals = () => {
      // Calculate totalAmount
      const totalAmounts = sellProducts?.reduce(
        (acc, pt) => acc + pt?.subTotal,
        0
      );
      setTotalAmount(
        Number.isNaN(totalAmounts) ? 0 : Math.max(0, totalAmounts)
      );

      // Calculate totalDiscount
      const totalDiscount = sellProducts?.reduce(
        (acc, pt) => acc + pt?.discount,
        0
      );
      setDiscountAmount(
        Number.isNaN(totalDiscount) ? 0 : Math.max(0, totalDiscount)
      );

      // // Calculate totalPaymentAmount
      const totalPaymentAmounts = totalPayment?.reduce(
        (acc, pt) => acc + pt?.paymentAmount,
        0
      );
      setTotalPaymentAmount(
        Number.isNaN(totalPaymentAmounts) ? 0 : Math.max(0, totalPaymentAmounts)
      );

      // Calculate paidAbleAmount
      setPaidAbleAmount(totalAmount - totalDiscount);

      // Calculate dueAmount
      const dueAmount = paidAbleAmount - totalPaymentAmounts;
      setDue(Number.isNaN(dueAmount) ? 0 : Math.max(0, dueAmount));
    };

    calculateTotals();
  }, [
    sellProducts,
    setTotalAmount,
    setDiscountAmount,
    setPaidAbleAmount,
    paidAbleAmount,
    totalAmount,
    setTotalPaymentAmount,
    totalPayment,
    setDue,
  ]);

  const handleRemove = (index: any) => {
    if (showProduct.length > 0) {
      const newSells = [...showProduct];
      const removedSell = newSells?.splice(index, 1) as any;
      const newTotalAmount = totalAmount - removedSell?.subTotal;
      setShowProduct(newSells);
      setTotalAmount(Math.max(0, newTotalAmount));
    }
  };

  // store data
  useEffect(() => {
    if (purchase) {
      const nostock = purchase?.data?.filter(
        (data: any) => data?.products?.stock === 0
      );
      if (nostock && nostock.length > 0) {
        toast({
          description: `${nostock[0]?.productName}\n Stock not available`,
        });
      }
      const newProducts = purchase?.data?.filter(
        (data: any) => data?.products?.stock !== 0
      );
      setStorePurchase([...newProducts]);
    }
  }, [purchase?.data]);
  // set data in table and remove data from dropdown
  const handleStoreSinglePurchase = (id: any, index: any) => {
    const storeData: any = storePurchase?.find((item: any) => item?.id === id);
    setShowProduct((prevData: any) => [...prevData, storeData]);
    setStorePurchase((store: any) => {
      const updatedStore = [...store];
      updatedStore?.splice(index, 1);
      return updatedStore;
    });
  };

  const handleAddSale = async (data: any) => {
    try {
      if (data?.saleDate) {
        data.saleDate = new Date(data?.saleDate);
      }

      const product = {
        ...data,
        branchId: branchId,
        customerId: customerId,
        peyTerm: peyTerm,
        status: status,
        sellType: sellType,
        totalPrice: totalAmount,
        totalPaymentAmount: totalPaymentAmount,
        payments: totalPayment,
        products: sellProducts,
      };

      const result = await createSale(product);

      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        reset();
        navigate("/list_sales");
      }
    } catch (err: any) {
      toast({
        description: "Sale Created Unsuccessful",
      });
    }
  };

  if (cookingSale) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">ADD SALE </span>{" "}
          {/* <span className="font-light"></span> */}
        </h1>
        <div className="text-sm flex items-center mr-0 lg:mr-24 gap-5">
          <h1>Total Amount: {totalAmount}</h1>
          <h1>Paidable Amount: {paidAbleAmount}</h1>
          <h1>Discount Amount: {discountAmount}</h1>
          <h1>Total payment Amount: {totalPaymentAmount} </h1>
          <h1>Due: {due}</h1>
        </div>
      </div>

      <div className="w-[95%] mx-auto mb-10 bg-slate-100 border-t-2 pt-5 border-brand flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2">
          <div className="my-4">
            <Select
              name="sellType"
              setValue={setValue}
              label="Sell Type"
              onChange={(value: any) => setSellType(value)}
            >
              <Option value="Wholsale">Wholsale</Option>
              <Option value="Retail">Retail</Option>
            </Select>
          </div>
          <div className="my-4">
            <Select
              name="status"
              setValue={setValue}
              label="Sell Status"
              onChange={(value: any) => setStatus(value)}
            >
              <Option value="Final">Final</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Quotation">Quotation</Option>
            </Select>
          </div>{" "}
          <div className="my-4">
            <Select
              name="peyTerm"
              setValue={setValue}
              label="Pay Term"
              onChange={(value: any) => setPeyTerm(value)}
            >
              <Option value="Months">Months</Option>
              <Option value="Days">Days</Option>
            </Select>
          </div>
          <div className="my-4">
            <Select
              name="customerId"
              setValue={setValue}
              label="Customer"
              onChange={(value: any) => setCustomerId(value)}
            >
              {customer &&
                customer?.data?.map((cm: any) => (
                  <Option key={cm?.id} value={cm?.id}>
                    {cm?.firstName} {cm?.lastName}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              label={"Sale Date"}
              name={"saleDate"}
              type={"date"}
              errors={errors}
            />
          </div>
          {/* <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              label={"auto Invoice No"}
              name={"autoInvoiceNo"}
              type={"text"}
              errors={errors}
            />
          </div> */}
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={true}
              Icon={<FaFileInvoice className="text-lg" />}
              register={register}
              label={"invoice No"}
              name={"invoiceNo"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={true}
              Icon={<FaFileAlt className="text-lg" />}
              name={"document"}
              register={register}
              label={"Docoment Attachments"}
              errors={errors}
              type="text"
            />{" "}
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <div className="w-full">
              {paymentFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-center items-center mb-4"
                >
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="bg-brand text-white py-2 px-3 rounded-md mr-1"
                  >
                    +
                  </button>
                  <div className="w-full mr-2">
                    <div className="w-full h-10 border border-brand rounded-md">
                      <Select
                        name={`${index}`}
                        // onChange={(e) => handlePaymentTypeChange(index, e.target.value)}
                        label="Account"
                        setValue={() => {}}
                        onChange={(value: any) =>
                          handlePaymentTypeChange(index, value)
                        }
                      >
                        {/* <option value="">Select Payment Type</option> */}
                        {accounts &&
                          accounts?.data?.map((account: any) => (
                            <Option key={account?.id} value={account?.id}>
                              {account?.accountName}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="w-full h-10 border border-brand rounded-md">
                    <input
                      name={`${index}`}
                      className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                      type="text"
                      placeholder="Amount"
                      onChange={(e) =>
                        handlePaymentAmountChange(index, Number(e.target.value))
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-red-700 text-white py-2 px-3 rounded-md ml-1"
                    onClick={() => handleRemoveField(index)}
                    hidden={index === 0}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[94%] mx-auto border-t-2 pt-5 border-brand bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center lg:flex-row flex-col gap-3 ml-6 mt-8">
            <div>
              <Button
                bgColor="bg-[#163020]"
                bgHoverColor="hover:bg-[#255f3c]"
                rounded="rounded-md"
              >
                <BsFiletypeCsv />
                CSV
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#097640]"
                bgHoverColor="hover:bg-[#287647]"
                rounded="rounded-md"
              >
                <FaRegFilePdf />
                Excel
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#0069D9]"
                bgHoverColor="hover:bg-[#2466ac]"
                rounded="rounded-md"
              >
                <IoPrintOutline />
                Pribt
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#18B294]"
                bgHoverColor="hover:bg-[#2d9d87]"
                rounded="rounded-md"
              >
                <CiViewColumn />
                Column
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#527853]"
                bgHoverColor="hover:bg-[#70ae71]"
                rounded="rounded-md"
              >
                <VscFilePdf />
                PDF
              </Button>
            </div>
          </div>
          <div className="mt-4 mr-5">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5 relative">
                <Input
                  // ref={clearInputRef}
                  Icon={<FaSearch />}
                  name={"search"}
                  placeholder={"Search Product..."}
                  setValues={setProductSearch}
                />
                <div
                  ref={productRef}
                  className={
                    productSearch.trim().length >= 3 ||
                    !isLoading ||
                    !isShowProduct
                      ? "block"
                      : ""
                  }
                >
                  <ul
                    className={`absolute top-12 left-0 w-full ${
                      storePurchase?.length > 5 ? "h-48" : "h-fit"
                    } bg-fuchsia-100 rounded-md shadow-md shadow-brand8 drop-shadow-md z-[120]`}
                  >
                    {purchase &&
                      storePurchase?.map((data: any, index: any) => (
                        <li
                          key={data?.id}
                          onClick={() => {
                            handleStoreSinglePurchase(data?.id, index);
                          }}
                          className="p-2 shadow-inner tracking-wider transition-all duration-300 cursor-pointer mb-1 rounded-md"
                        >
                          IMEI : {data?.imei}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        {/* <div> */}
        <div className="w-[96%] h-fit mx-auto mt-5">
          <Table>
            <THeader>
              <Th>Product Name</Th>
              <Th>IMEI</Th>
              <Th>Stock</Th>
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Discount Price</Th>
              <Th>Warranty</Th>
              <Th>Sub Total</Th>
              <Th>Action</Th>
            </THeader>
            <TBody>
              {purchase &&
                showProduct?.map((sellProduct: any, index: any) => (
                  <Tbrow key={index}>
                    <Td>{sellProduct?.productName}</Td>
                    <Td>{sellProduct?.imei}</Td>
                    <Td>{sellProduct?.products?.stock}</Td>
                    <Td>
                      <div className="w-full h-10 rounded-md border border-brand">
                        <input
                          className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                          type="text"
                          name="quantity"
                          placeholder="0.00"
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </div>
                    </Td>
                    <Td>
                      {/* <div className="w-full h-10 rounded-md border border-brand">
                        <input
                          ref={sellingPriceRef}
                          className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                          type="text"
                          name="unitPrice"
                          placeholder="0.00"
                          defaultValue={sellProduct?.sellingPrice}
                          // value={sellProduct?.sellingPrice}
                          // onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                          readOnly
                        />
                      </div> */}
                      {sellProduct?.sellingPrice}
                    </Td>
                    <Td>
                      <div className="w-full h-10 rounded-md border border-brand">
                        <input
                          className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                          type="text"
                          name="discount"
                          placeholder="0.00"
                          onChange={(e) =>
                            handleDiscountChange(index, e.target.value)
                          }
                        />
                      </div>
                    </Td>
                    <Td>
                      {/* <div className="w-[150px] h-10 rounded-md border border-brand">
                        <input
                          className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                          type="text"
                          name="warranty"
                          placeholder="Warranty"
                          defaultValue={sellProduct?.warranty}
                          onChange={(e) => handleWarrantyChange(index, e.target.value)}
                        />
                      </div> */}
                      {sellProduct?.warranty?.warranty}
                    </Td>
                    <Td>{sellProducts[index]?.subTotal || 0}</Td>
                    <Td>
                      <span className="flex items-center justify-center cursor-pointer">
                        <FaRegTrashCan onClick={() => handleRemove(index)} />
                      </span>
                    </Td>
                  </Tbrow>
                ))}
            </TBody>
          </Table>
        </div>
        {/* </div> */}
        {/* table area */}
        <hr className="m-5" />
      </div>
      <div className="flex justify-center items-center mt-7">
        <button
          onClick={handleSubmit(handleAddSale)}
          className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">ADD NEW SALE</span>
        </button>
      </div>
    </div>
    // </div>
  );
};

export default AddSalesPage;
