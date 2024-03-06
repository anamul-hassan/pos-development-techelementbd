import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import Input from "@/components/previous/all/Input";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useSearchSingleProductQuery } from "@/store/product/productApi";
import { useAddPurchaseMutation } from "@/store/purchase/purchaseApi";
import { useGetSuppliersQuery } from "@/store/supplier/supplierApi";
import { useGetSingleWarrantyQuery } from "@/store/warranty/warrantyApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const AddPurchasePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { branchId } = shareBranchAndUserInfo();
  const [createPurchase, { isLoading: cookingPurchase }] =
    useAddPurchaseMutation({}) as any;
  const [discountAmount, setDiscountAmount] = useState<any>(0);
  // search
  const [productSearch, setProductSearch] = useState("");
  // product
  const { data: productData, isLoading: productLoading } =
    useSearchSingleProductQuery(productSearch) as any;
  // genarate payment field
  const [paymentFields, setPaymentFields] = useState([{ id: 1 }]);

  const [purchaseProducts, setPurchaseProducts] = useState<any[]>([]);

  useEffect(() => {
    const initialPurchaseProduct = productData?.data
      ? productData?.data?.category?.categoryName === "Phone" &&
        productData?.data?.subCategory?.subCategoryName === "Phone"
        ? {
            productId: productData?.data?.id,
            quantity: 1,
            imei: 0,
            ram: 0,
            rom: 0,
            sku: "",
            warrantyId: "",
            price: 0,
            color: "",
            version: "",
            sellingPrice: 0,
            subTotal: 0,
          }
        : {
            productId: productData?.data?.id,
            quantity: 0,
            price: 0,
            sellingPrice: 0,
            subTotal: 0,
            warrantyId: "",
          }
      : (null as any);

    setPurchaseProducts(initialPurchaseProduct);
  }, [productData?.data]);
  // payment array
  const [totalPayment, setTotalPayment] = useState([
    { accountId: "", paymentAmount: 0 },
  ]);
  // total payment amount
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  // show product click btn
  const [showProduct, setShowProduct] = useState<any[]>([]);
  // suppiler
  const [supplierId, setsupplierId] = useState("");
  // total
  const [totalAmount, setTotalAmount] = useState(0);
  // totalAmount - totalPaymentAmount
  const [due, setDue] = useState(0);
  // discount
  const [discount, setDiscount] = useState<any>();
  // discount type
  const [discountType, setDiscountType] = useState("");
  // purchase Status
  const [purchaseStatus, setPurchaseStatus] = useState("");
  // paid able Amount
  const [paidAbleAmount, setPaidAbleAmount] = useState(0);
  const { data: supplier } = useGetSuppliersQuery(undefined) as any;
  const { data: accounts } = useGetAccountsQuery("All") as any;
  const { data: warranty } = useGetSingleWarrantyQuery(undefined) as any;

  const ref = () => {
    const digits = "123478910";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      const randomnum = Math.floor(Math.random() * digits.length);
      otp += digits[randomnum];
    }
    return otp;
  };
  const referenceNo = ref() as any;

  const handleAddField = () => {
    const newId = paymentFields.length + 1;
    setPaymentFields([...paymentFields, { id: newId }]);

    setTotalPayment((prevTotalPayment) => [
      ...prevTotalPayment,
      { accountId: "", paymentAmount: 0 },
    ]);
  };

  useEffect(() => {
    const totalPaymentAmounts = totalPayment?.reduce((acc, tp) => {
      return acc + tp?.paymentAmount;
    }, 0);
    setTotalPaymentAmount(Math.max(0, totalPaymentAmounts));
  }, [totalPayment]);

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

  const handleProductSearch = (data: any) => {
    if (!productLoading) {
      setShowProduct((prev: any[]) => [...prev, data]);
    }
  };

  useEffect(() => {
    if (!showProduct || !productData?.data) return;

    const updatedPurchaseProducts: any = showProduct.map((productItem: any) =>
      productItem.category?.categoryName === "Phone" &&
      productItem.subCategory?.subCategoryName === "Phone"
        ? {
            productId: productItem.id,
            quantity: 1,
            imei: 0,
            ram: 0,
            rom: 0,
            sku: "",
            warrantyId: "",
            price: 0,
            color: "",
            version: "",
            sellingPrice: 0,
            subTotal: 0,
          }
        : {
            productId: productItem.id,
            quantity: 0,
            price: 0,
            sellingPrice: 0,
            subTotal: 0,
            warrantyId: "",
          }
    );

    // Set the updated purchaseProducts array
    setPurchaseProducts(updatedPurchaseProducts);
  }, [showProduct, productData?.data]);

  // const handleColorChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           color: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };

  // const handleColorChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     const productItem = updatedPurchase[index];
  //     if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //       updatedPurchase[index] = { ...productItem, color: eventValue };
  //     }
  //     return updatedPurchase;
  //   });
  // };

  const handleColorChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                color: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };

  // const handleImeiChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     const productItem = updatedPurchase[index];
  //     if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //       updatedPurchase[index] = { ...productItem, imei: eventValue };
  //     }
  //     return updatedPurchase;
  //   });
  // };
  const handleImeiChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                imei: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleImeiChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           imei: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };
  // const handleSkuChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     const productItem = updatedPurchase[index];
  //     if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //       updatedPurchase[index] = { ...productItem, sku: eventValue };
  //     }
  //     return updatedPurchase;
  //   });
  // };
  const handleSkuChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                sku: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleSkuChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           sku: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };
  //   const handleRamChange = (index, eventValue) => {
  //     setPurchaseProducts((prevPurchase) => {
  //       const updatedPurchase = [...prevPurchase];
  //       const productItem = updatedPurchase[index];
  //       if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //         updatedPurchase[index] = { ...productItem, : eventValue };
  //       }
  //       return updatedPurchase;
  //     });
  // };

  const handleRamChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                ram: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleRamChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           ram: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };
  // const handleRomChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     const productItem = updatedPurchase[index];
  //     if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //       updatedPurchase[index] = { ...productItem, rom: eventValue };
  //     }
  //     return updatedPurchase;
  //   });
  // };

  const handleRomChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                rom: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleRomChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           rom: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };
  // const handleVersionChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     const productItem = updatedPurchase[index];
  //
  //     if (showProduct[index].category?.categoryName === "Phone" && showProduct[index].subCategory?.subCategoryName === "Phone") {
  //       updatedPurchase[index] = { ...productItem, version: eventValue };
  //     }
  //     return updatedPurchase;
  //   });
  // };
  const handleVersionChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                version: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleVersionChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           version: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };

  // const handleWarrantyChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] =
  //         {
  //           ...updatedPurchase[i],
  //           warrantyId: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };

  const handleWarrantyChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                warrantyId: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };
  // const handleQuantityChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           quantity: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };

  const handleQuantityChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                quantity: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };

  const handlePurchaseChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                price: eventValue,
                subTotal: purchase.quantity * eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };

  // const handleSellingPriceChange = (index, eventValue) => {
  //   setPurchaseProducts((prevPurchase) => {
  //     const updatedPurchase = [...prevPurchase];
  //     for (let i = 0; i < updatedPurchase.length; i++) {
  //       if (i === index) {
  //         updatedPurchase[i] = {
  //           ...updatedPurchase[i],
  //           sellingPrice: eventValue,
  //         };
  //       }
  //     }
  //     return updatedPurchase;
  //   });
  // };

  const handleSellingPriceChange = (index: any, eventValue: any) => {
    setPurchaseProducts((prevPurchase: any) => {
      const updatedPurchase = prevPurchase.map(
        (purchase: any, currentIndex: any) =>
          currentIndex === index
            ? {
                ...purchase,
                price: eventValue,
              }
            : purchase
      );
      return updatedPurchase;
    });
  };

  useEffect(() => {
    const calculateTotals = () => {
      // Calculate totalAmount
      const totalAmounts = purchaseProducts?.reduce(
        (acc: any, pt: any) => acc + pt?.subTotal,
        0
      );
      setTotalAmount(
        Number.isNaN(totalAmounts) ? 0 : Math.max(0, totalAmounts)
      );

      // // Calculate totalPaymentAmount
      const totalPaymentAmounts = totalPayment?.reduce(
        (acc: any, pt: any) => acc + pt?.paymentAmount,
        0
      );
      setTotalPaymentAmount(
        Number.isNaN(totalPaymentAmounts) ? 0 : Math.max(0, totalPaymentAmounts)
      );

      // Calculate discount
      if (discountType === "Fixed") {
        setDiscountAmount(Number.isNaN(discount) ? 0 : discount);
      } else if (discountType === "Persent") {
        setDiscountAmount(
          Number.isNaN((discount / 100) * totalAmounts)
            ? 0
            : (discount / 100) * totalAmounts
        );
      } else {
        setDiscountAmount(0);
      }

      // Calculate paidAbleAmount
      setPaidAbleAmount(
        Number.isNaN(totalAmount - discountAmount)
          ? 0
          : Math.max(0, Math.round(totalAmount - discountAmount))
      );

      // Calculate dueAmount
      const dueAmount = paidAbleAmount - totalPaymentAmounts;
      setDue(Number.isNaN(dueAmount) ? 0 : Math.max(0, dueAmount));
    };

    calculateTotals();
  }, [
    purchaseProducts,
    setTotalAmount,
    setDiscountAmount,
    setPaidAbleAmount,
    paidAbleAmount,
    totalAmount,
    setTotalPaymentAmount,
    totalPayment,
    setDue,
    discountAmount,
    discountType,
    discount,
  ]);

  const handleRemove = (index: any) => {
    if (showProduct.length > 0) {
      const newItems = [...showProduct];
      const removedItem = newItems.splice(index, 1) as any; // Remove the item at the specified index
      // const newArray = newItems.filter((item) => item.id !== removedItem.id);
      setShowProduct(newItems);
      // Subtract the removed item's subtotal from the total
      const newTotal = (totalAmount - removedItem.subTotal) as any;
      setTotalAmount(newTotal);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleAddProduct = async (data: any) => {
    try {
      if (data?.purchaseDate) {
        data.purchaseDate = new Date(data?.purchaseDate);
      }
      if (data?.paidOn) {
        data.paidOn = new Date(data?.paidOn);
      }

      const puechaseProductsData = {
        ...data,
        branchId: branchId,
        supplierId: supplierId,
        purchaseStatus: purchaseStatus,
        due: due,
        discountType: discountType,
        totalAmount: totalAmount,
        totalPaymentAmount: totalPaymentAmount,
        payments: totalPayment,
        products: purchaseProducts,
        discount: discount,
      };
      const result = await createPurchase(puechaseProductsData);

      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        reset();
        navigate("/list_purchases");
      }
    } catch (err) {
      console.error(err);
      toast({
        description: "Sale Created Unsuccessful",
      });
    }
  };

  if (cookingPurchase) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Add Purchase </span>{" "}
        </h1>
        <div className="text-sm flex items-center mr-0 lg:mr-24 gap-5">
          <h1>Total Amount: {totalAmount}</h1>
          <h1>Paidable Amount: {paidAbleAmount}</h1>
          <h1>Discount Amount: {discountAmount}</h1>
          <h1>Total payment Amount: {totalPaymentAmount} </h1>
          <h1>Due: {due}</h1>
        </div>
      </div>
      <div className="w-[95%] mx-auto mb-10 bg-slate-100 border-t-2 pt-5 border-brand flex lg:flex-row flex-col  pb-10 shadow-xl rounded">
        <div className="flex">
          <div className="flex-1 w-full p-2">
            <div className="my-">
              <Select
                name="supplierId"
                label="Supplier Name"
                setValue={setValue}
                onChange={(value: any) => setsupplierId(value)}
              >
                {supplier?.data?.map((sp: any) => (
                  <Option key={sp?.id} value={sp?.id}>
                    {sp?.firstName} {sp?.lastName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="my-4">
              <Select
                name="purchaseStatus"
                label="Purchase Status"
                setValue={setValue}
                onChange={(value: any) => setPurchaseStatus(value)}
              >
                <Option value="Received">Received</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Ordered">Ordered</Option>
              </Select>
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Reference No."}
                name={"referenceNo"}
                type={"text"}
                errors={errors}
                defaultValue={referenceNo}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"attachDocument"}
                register={register}
                label={"Attach Document"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex-1 w-full p-2 ">
            <div className="mb-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Paid On"}
                name={"paidOn"}
                type={"date"}
                errors={errors}
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-1/2">
                <div className="w-full">
                  <Select
                    name="discountType"
                    setValue={setValue}
                    label="Discount"
                    onChange={(value: any) => setDiscountType(value)}
                  >
                    <Option value="Fixed">Fixed</Option>
                    <Option value="Persent">Persent</Option>
                  </Select>
                </div>
              </div>
              <div className=" w-[50%]">
                <div className="w-full h-10 rounded-md border border-brand">
                  <input
                    {...register("discount")}
                    className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                    type="text"
                    placeholder="0.00"
                    onChange={(e: any) => setDiscount(+e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Purchase Date"}
                name={"purchaseDate"}
                type={"date"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Note"}
                name={"note"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 my-2">
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
                      label="Account"
                      setValue={() => {}}
                      onChange={(value: any) =>
                        handlePaymentTypeChange(index, value)
                      }
                    >
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
                {" "}
                <Input
                  // ref={clearInputRef}
                  Icon={<FaSearch />}
                  name={"search"}
                  placeholder={"Search Product..."}
                  setValues={setProductSearch}
                />
                <div
                  onClick={() => {
                    handleProductSearch(productData?.data);
                    setProductSearch("");
                  }}
                  className={
                    productSearch.trim().length >= 3 && !productLoading
                      ? "absolute top-12 left-0 w-full h-fit p-2 shadow-inner tracking-wider transition-all duration-300 cursor-pointer rounded-md bg-fuchsia-100 shadow-brand8 drop-shadow-md z-[120]"
                      : "hidden"
                  }
                >
                  {productData?.data?.productName}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Product Name</Th>
                <Th>Color</Th>
                <Th>IMEI</Th>
                <Th>SKU</Th>
                <Th>RAM</Th>
                <Th>ROM</Th>
                <Th>Version</Th>
                <Th>Warranty</Th>
                <Th>Quantity</Th>
                <Th>Purchase Price</Th>
                <Th>Selling Price</Th>
                <Th>Sub Total</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {productData &&
                  showProduct?.map((product: any, index) => (
                    <Tbrow key={index}>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          <input
                            className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black cursor-default"
                            type="text"
                            readOnly
                            placeholder={product?.productName}
                            // onI
                          />
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("color")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="Color"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("color")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="Color"
                              onChange={(e) =>
                                handleColorChange(index, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("imei")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="IMEI"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("imei")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="IMEI"
                              onChange={(e) =>
                                handleImeiChange(index, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("sku")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="SKU"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("sku")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="SKU"
                              onChange={(e) =>
                                handleSkuChange(index, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("ram")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="RAM"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("ram")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="RAM"
                              onChange={(e) =>
                                handleRamChange(index, Number(e.target.value))
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("rom")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="ROM"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("rom")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="ROM"
                              onChange={(e) =>
                                handleRomChange(index, Number(e.target.value))
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              // {...register("price")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="Version"
                              disabled
                            />
                          ) : (
                            <input
                              // {...register("price")}
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="Version"
                              onChange={(e) =>
                                handleVersionChange(index, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px]">
                          <Select
                            name="warrantyId"
                            label="Warranty"
                            setValue={() => {}}
                            onChange={(value: any) =>
                              handleWarrantyChange(index, value)
                            }
                          >
                            {warranty?.data?.map((wr: any) => (
                              <Option key={wr?.id} value={wr?.id}>
                                {wr?.warranty}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          {product?.category?.categoryName !== "Phone" &&
                          product?.subCategory?.subCategoryName !== "Phone" ? (
                            <input
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                              type="text"
                              placeholder="Quantity"
                              onInput={(e: any) =>
                                handleQuantityChange(
                                  index,
                                  Number(e.target.value)
                                )
                              }
                            />
                          ) : (
                            <input
                              className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black cursor-default"
                              type="text"
                              placeholder="Quantity"
                              value={1}
                              readOnly
                            />
                          )}
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          <input
                            // {...register("price")}
                            className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                            type="text"
                            placeholder="Purchase Price"
                            onChange={(e: any) =>
                              handlePurchaseChange(index, +e.target.value)
                            }
                          />
                        </div>
                      </Td>
                      <Td>
                        <div className="w-[200px] h-10 rounded-md border border-brand">
                          <input
                            // {...register("sellingPrice")}
                            className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
                            type="text"
                            placeholder="Selling Price"
                            onChange={(e: any) =>
                              handleSellingPriceChange(index, e.target.value)
                            }
                          />
                        </div>
                      </Td>
                      <Td>{purchaseProducts[index]?.subTotal || 0}</Td>
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
        </div>
        {/* table area */}
        <hr className="m-5" />
        {/* {
          searchUnit?.data?.length > 5 &&
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={searchUnit?.data?.length}
              totalPage={Math.ceil(searchUnit?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        } */}
      </div>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handleSubmit(handleAddProduct)}
          className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative uppercase">ADD PRODUCT</span>
        </button>
      </div>
    </div>
  );
};

export default AddPurchasePage;
