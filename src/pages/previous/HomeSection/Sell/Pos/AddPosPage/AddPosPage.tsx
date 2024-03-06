// import { useCloseOutsideClick } from "@/components/previous/Hooks/useCloseOutsideClick/useCloseOutsideClick";
// import Button from "@/components/previous/all/Button";
// import Input from "@/components/previous/all/Input";
// import InputField from "@/components/previous/all/InputField";
// import {
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHead,
// } from "@/components/previous/all/Modal";
// import { PrintPos } from "@/components/previous/all/PrintPos";
// import { Option, Select } from "@/components/previous/all/Select";
// import {
//   TBody,
//   THeader,
//   Table,
//   Tbrow,
//   Td,
//   Th,
// } from "@/components/previous/all/Table";
// import { useToast } from "@/components/ui/use-toast";
// import { customerSchema } from "@/schemas/customer/customer_schema";
// import { useGetAccountsQuery } from "@/store/account/accountApi";
// import {
//   useAddCustomerMutation,
//   useSearchSingleCustomerQuery,
// } from "@/store/customer/customerApi";
// import { useAddPOSMutation } from "@/store/point_of_sell/posApi";
// import { useSearchSinglePurchaseQuery } from "@/store/purchase/purchaseApi";
// import { shareBranchInfo } from "@/utils/helpers/shareBranchInfo";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { AiOutlineLoading } from "react-icons/ai";
// import { FaPlus, FaSearch } from "react-icons/fa";
// import { FaRegTrashCan } from "react-icons/fa6";

// const AddPosPage = () => {
//   const { toast } = useToast();
//   const productRef = useRef(null);
//   // const customerRef = useRef(null);
//   const { branchId } = shareBranchInfo();
//   const printPosRef = useRef(null);
//   // search
//   const [productSearch, setProductSearch] = useState("");
//   // purchase Data
//   const [
//     addPOS,
//     { data: posData, isLoading: addPOSLoading, isSuccess: addPOSSuccess },
//   ] = useAddPOSMutation({}) as any;
//   // search purchase
//   const { data: purchaseProduct, isLoading: isLoadingPurchase } =
//     useSearchSinglePurchaseQuery(productSearch) as any;
//   // Client Search
//   const [clientSearch, setClientSearch] = useState("");
//   // Clint
//   const { data: client, isLoading: isLoadingClient } =
//     useSearchSingleCustomerQuery(clientSearch);
//   const [addCustomer, { isLoadingCustomer }] = useAddCustomerMutation(
//     {}
//   ) as any;
//   const { data: accounts } = useGetAccountsQuery("All") as any;
//   const [modal, setModal] = useState(false);
//   // total quantity
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   // totalMRP
//   const [totalMrp, setTotalMrp] = useState(0);
//   // products
//   // const [products, setProducts] = useState([]);
//   // Discount amount
//   const [discountAmount, setDiscountAmount] = useState(0);
//   // discount
//   const [discount, setDiscount] = useState(0);
//   // discount type
//   const [discountType, setDiscountType] = useState("");
//   // payment field
//   const [paymentFields, setPaymentFields] = useState([{ id: 1 }]);
//   // payment array
//   const [totalPayment, setTotalPayment] = useState([
//     { accountId: "", paymentAmount: 0 },
//   ]);
//   // pos Products
//   const [posProducts, setPosProducts] = useState([
//     {
//       purchashProductId: purchaseProduct?.data[0]?.id,
//       quantity: 0,
//       subTotal: 0,
//     },
//   ]);
//   useEffect(() => {
//     setPosProducts([
//       {
//         purchashProductId: purchaseProduct?.data[0]?.id,
//         quantity: 0,
//         subTotal: 0,
//       },
//     ]);
//   }, [purchaseProduct?.data]);
//   // total payment amount
//   const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
//   // store Purchase
//   const [storePurchase, setStorePurchase] = useState([]);
//   // show product click btn
//   const [showProduct, setShowProduct] = useState([]);
//   // outside click off product Dropdown
//   const [isShowProduct, setIsShowProduct] = useState(false);
//   // Customer
//   const [customerId, setCustomerId] = useState("");
//   // paid able Amount
//   const [paidAbleAmount, setPaidAbleAmount] = useState(0);
//   // currentDate
//   const displayTodayDate = new Date().toLocaleDateString();
//   // currentTime
//   const displayTime = new Date().toLocaleTimeString();

//   useCloseOutsideClick(setIsShowProduct, productRef);

//   const handleAddField = () => {
//     const newId = paymentFields.length + 1;
//     setPaymentFields([...paymentFields, { id: newId }]);

//     setTotalPayment((prevTotalPayment) => [
//       ...prevTotalPayment,
//       { accountId: "", paymentAmount: 0 },
//     ]);
//   };

//   useEffect(() => {
//     const totalPaymentAmounts = totalPayment?.reduce((acc: any, tp: any) => {
//       return acc + tp?.paymentAmount;
//     }, 0);
//     setTotalPaymentAmount(Math.max(0, totalPaymentAmounts));
//   }, [totalPayment]);

//   const handleRemoveField = (index: any) => {
//     const updatedFields = [...paymentFields];
//     updatedFields.splice(index, 1);
//     setPaymentFields(updatedFields);

//     setTotalPayment((prevTotalPayment) =>
//       prevTotalPayment.filter((_, currentIndex) => currentIndex !== index)
//     );
//   };

//   const handlePaymentTypeChange = (index: any, paymentAccount: any) => {
//     setTotalPayment((prevTotalPayment) =>
//       prevTotalPayment.map((payment, currentIndex) =>
//         currentIndex === index
//           ? { ...payment, accountId: paymentAccount }
//           : payment
//       )
//     );
//   };

//   const handlePaymentAmountChange = (index: any, amount: any) => {
//     setTotalPayment((prevTotalPayment: any) =>
//       prevTotalPayment.map((payment: any, currentIndex: any) =>
//         currentIndex === index
//           ? { ...payment, paymentAmount: parseFloat(amount) }
//           : payment
//       )
//     );
//   };

//   useEffect(() => {
//     // If products length is greater than sellProducts length
//     if (showProduct?.length > posProducts?.length) {
//       // Add new sellProduct entries to match the products length
//       setPosProducts((prevPosProducts) => [
//         ...prevPosProducts,
//         ...Array(showProduct.length - prevPosProducts.length).fill({
//           purchashProductId: purchaseProduct?.data[0]?.id,
//           quantity: 0,
//           subTotal: 0,
//         }),
//       ]);
//     } else if (showProduct.length < posProducts.length) {
//       // If products length is less than sellProducts length
//       // Remove extra sellProduct entries to match the products length
//       setPosProducts((prevPosProducts) =>
//         prevPosProducts.slice(0, showProduct.length)
//       );
//     }
//   }, [showProduct, purchaseProduct, posProducts]);

//   const handleQuantityChange = (index: any, eventValue: any) => {
//     setPosProducts((prevPos) => {
//       const updatedPos = prevPos.map((pos, currentIndex) =>
//         currentIndex === index
//           ? {
//               ...pos,
//               quantity: eventValue,
//               subTotal: eventValue * purchaseProduct?.data[index]?.sellingPrice,
//             }
//           : pos
//       );
//       return updatedPos;
//     });
//   };

//   useEffect(() => {
//     const calculateTotals = () => {
//       // Calculate totalAmount
//       const totalAmounts = posProducts?.reduce(
//         (acc, pt) => acc + pt?.subTotal,
//         0
//       );
//       setTotalMrp(Number.isNaN(totalAmounts) ? 0 : Math.max(0, totalAmounts));

//       const totalQuantites = posProducts?.reduce(
//         (acc, qt) => acc + qt?.quantity,
//         0
//       );
//       setTotalQuantity(
//         Number.isNaN(totalQuantites) ? 0 : Math.max(0, totalQuantites)
//       );
//       // Calculate totalDiscount

//       // // Calculate totalPaymentAmount
//       const totalPaymentAmounts = totalPayment?.reduce(
//         (acc, pt) => acc + pt?.paymentAmount,
//         0
//       );
//       setTotalPaymentAmount(
//         Number.isNaN(totalPaymentAmounts) ? 0 : Math.max(0, totalPaymentAmounts)
//       );
//       // Calculate discount
//       if (discountType === "Fixed") {
//         setDiscountAmount(Number.isNaN(discount) ? 0 : discount);
//       } else if (discountType === "Persent") {
//         setDiscountAmount(
//           Number.isNaN((discount / 100) * totalAmounts)
//             ? 0
//             : (discount / 100) * totalAmounts
//         );
//       } else {
//         setDiscountAmount(0);
//       }
//       // Calculate paidAbleAmount
//       setPaidAbleAmount(
//         Number.isNaN(totalMrp - discountAmount)
//           ? 0
//           : Math.max(0, Math.round(totalMrp - discountAmount))
//       );
//       // Calculate dueAmount
//       // setChangeAmount(paidAbleAmount - totalPaymentAmount)
//     };

//     calculateTotals();
//   }, [
//     posProducts,
//     setTotalMrp,
//     setDiscountAmount,
//     setPaidAbleAmount,
//     totalMrp,
//     setTotalPaymentAmount,
//     totalPayment,
//     discountAmount,
//     discountType,
//     discount,
//   ]);

//   // Remove Data from table
//   const handleRemove = (index: any) => {
//     if (showProduct.length > 0) {
//       const newItems = [...showProduct];
//       newItems.splice(index, 1); // Remove the item at the specified index
//       setShowProduct(newItems);
//     }
//   };

//   // store data
//   useEffect(() => {
//     if (purchaseProduct) {
//       const nostock = purchaseProduct?.data?.filter(
//         (data: any) => data?.products?.stock === 0
//       );
//       if (nostock && nostock.length > 0) {
//         toast({
//           description: `${nostock[0]?.productName}\nStock not available`,
//         });
//       }
//       console.log(nostock);
//       const newProducts = purchaseProduct?.data?.filter(
//         (data: any) => data?.products?.stock !== 0
//       );
//       setStorePurchase([...newProducts]);
//     }
//   }, [purchaseProduct?.data, purchaseProduct]);
//   // set data in table and remove data from dropdown
//   const handleStoreSinglePurchase = (id: any, index: any) => {
//     const storeData = storePurchase?.find((item: any) => item?.id === id);
//     setShowProduct((prevData: any[]) => [...prevData, storeData]);
//     console.log(storeData);
//     setStorePurchase((store) => {
//       const updatedStore = [...store];
//       updatedStore?.splice(index, 1);
//       return updatedStore;
//     });
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm();
//   const {
//     register: addReg,
//     handleSubmit: handleAdd,
//     formState: { errors: err },
//     reset: addReset,
//   } = useForm({ resolver: yupResolver(customerSchema) });

//   const handleCreateCustomer = async (data: any) => {
//
//     try {
//       if (!data.branchId) {
//         data.branchId = branchId;
//       }
//       const result = await addCustomer(data);

//       if (result?.data?.data && result?.data?.success === true) {
//         toast({
//           description: result?.data?.message,
//         });
//         addReset();
//       }
//     } catch (err) {
//
//       toast({
//         description: "Customer Created Unsuccessful",
//       });
//     }
//   };

//   const handleAddPos = async (data: any) => {
//     try {
//       if (data?.saleDate) {
//         data.saleDate = new Date(data?.saleDate);
//       }
//       const posProduct = {
//         ...data,
//         customerId: customerId,
//         branchId: branchId,
//         totalPrice: paidAbleAmount,
//         totalPaymentAmount: totalPaymentAmount,
//         discount: discountAmount,
//         products: posProducts,
//         payments: totalPayment,
//       };
//       const result = await addPOS(posProduct);
//       if (result?.data?.data && result?.data?.success === true) {
//         toast({
//           description: result?.data?.message,
//         });
//         reset();
//       }
//     } catch (err: any) {
//       console.log(err);
//       toast({
//         description: "Pos have not done",
//       });
//     }
//   };

//   // const handlePrint = useReactToPrint({
//   //   content: () => printPosRef.current,
//   //   documentTitle: "Bill Info",
//   // });

//   return (
//     <>
//       <div className="-mt-8">
//         <div className="lg:flex lg:items-center lg:justify-between grid grid-cols-2 lg:text-base text-sm font-medium my-3">
//           <h2>OutLet Name: D0060-Dhaka</h2>
//           <h2>User: L39983</h2>
//           <div className="flex items-center gap-5">
//             <span>Date: {displayTodayDate}</span>
//             <span>Time: {displayTime}</span>
//           </div>
//         </div>
//         {/* client search */}

//         <div className="grid grid-cols-1 mb-2 lg:grid-cols-4 gap-3">
//           <div className="w-full h-full relative flex">
//             <Input
//               // ref={clearInputRef}
//               Icon={<FaSearch />}
//               name={"search"}
//               placeholder={"Search Product..."}
//               setValues={setProductSearch}
//             />
//             <div
//               ref={productRef}
//               className={
//                 productSearch.trim().length >= 3 ||
//                 !isLoadingPurchase ||
//                 !isShowProduct
//                   ? "block"
//                   : ""
//               }
//             >
//               <ul
//                 className={`absolute top-12 left-0 w-full ${
//                   storePurchase.length > 5 ? "h-48" : "h-fit"
//                 } bg-fuchsia-100 rounded-md shadow-md shadow-brand8 drop-shadow-md z-[120]`}
//               >
//                 {purchaseProduct &&
//                   storePurchase?.map((data, index) => (
//                     <li
//                       key={data?.id}
//                       onClick={() => {
//                         handleStoreSinglePurchase(data?.id, index);
//                       }}
//                       className="p-2 shadow-inner tracking-wider transition-all duration-300 cursor-pointer mb-1 rounded-md"
//                     >
//                       IMEI : {data?.imei}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>
//           {/* Client search */}
//           <div className="w-full h-full flex gap-1">
//             <div className="w-full h-full relative">
//               <Input
//                 Icon={<FaSearch />}
//                 name={"search"}
//                 placeholder={"Search Client..."}
//                 setValues={setClientSearch}
//               />

//               <div
//                 onClick={() => {
//                   setCustomerId(client?.data?.id);
//                   setClientSearch("");
//                 }}
//                 className={
//                   clientSearch.trim().length >= 1 && !isLoadingClient
//                     ? "bg-fuchsia-100 p-2 text-base font-medium tracking-widerounded-md shadow-md shadow-brand8 drop-shadow-md z-[120] cursor-pointer absolute top-12 right-0 w-full  transition-all delay-500"
//                     : "hidden"
//                 }
//               >
//                 {client?.data?.firstName}
//               </div>
//             </div>
//             <div>
//               <Button
//                 handleClick={() => setModal(true)}
//                 bgColor="bg-indigo-800"
//                 bgHoverColor="hover:bg-indigo-900"
//                 rounded="rounded-md"
//               >
//                 <FaPlus className="text-base h-6" />
//               </Button>
//               <Modal
//                 isModal={modal}
//                 width={"lg:w-[45vw] w-full"}
//                 height={"lg:h-fit h-full"}
//               >
//                 <ModalHead
//                   title="Add Customer"
//                   setIsModal={() => setModal(false)}
//                 />
//                 <ModalBody>
//                   <div className="space-y-3">
//                     <div className="w-full ">
//                       <InputField
//                         isPassword={false}
//                         isIcon={false}
//                         name={"firstName*"}
//                         register={addReg}
//                         label={"First name"}
//                         type={"text"}
//                         errors={err}
//                       />{" "}
//                     </div>

//                     <div className="w-full">
//                       <InputField
//                         isPassword={false}
//                         isIcon={false}
//                         name={"lastName"}
//                         register={addReg}
//                         label={"Last Name"}
//                         type={"text"}
//                         errors={err}
//                       />{" "}
//                     </div>
//                     <div className="w-full">
//                       <InputField
//                         isPassword={false}
//                         isIcon={false}
//                         name={"email"}
//                         register={addReg}
//                         label={"Email*"}
//                         type={"email"}
//                         errors={err}
//                       />{" "}
//                     </div>
//                     <div className="w-full">
//                       <InputField
//                         isPassword={false}
//                         isIcon={false}
//                         name={"phone"}
//                         register={addReg}
//                         label={"Phone*"}
//                         type={"number"}
//                         errors={err}
//                       />{" "}
//                     </div>
//                     {/* <div className="w-full">
//                       <InputField
//                         isPassword={false}
//                         isIcon={false}
//                         name={"membershipId"}
//                         register={addReg}
//                         label={"Membership Id"}
//                         type={"text"}
//                         errors={err}
//                       />{" "}
//                     </div> */}
//                   </div>{" "}
//                 </ModalBody>
//                 <ModalFooter>
//                   <div className="flex gap-3">
//                     <Button
//                       handleClick={handleAdd(handleCreateCustomer)}
//                       bgColor="bg-indigo-500"
//                       bgHoverColor="hover:bg-indigo-600"
//                       rounded="rounded-md"
//                     >
//                       CREATE
//                       {isLoadingCustomer && (
//                         <span className="animate-spin text-lg flex items-center justify-center">
//                           <AiOutlineLoading />
//                         </span>
//                       )}
//                     </Button>
//                     <Button
//                       bgColor="bg-rose-500"
//                       bgHoverColor="hover:bg-rose-600"
//                       rounded="rounded-md"
//                       handleClick={() => setModal(false)}
//                     >
//                       CLOSE
//                     </Button>
//                   </div>
//                 </ModalFooter>
//               </Modal>
//             </div>
//           </div>
//           {/* discount type */}
//           <div className="w-full">
//             <Select
//               name="discountType"
//               setValue={setValue}
//               label="Discount"
//               onChange={(value: any) => setDiscountType(value)}
//             >
//               <Option value="Fixed">Fixed</Option>
//               <Option value="Persent">Persent</Option>
//             </Select>
//           </div>
//           {/* discount amount */}
//           <div className=" w-full">
//             <div className="w-full h-10 rounded-md border border-brand">
//               <input
//                 // {...register("discount")}
//                 className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//                 type="text"
//                 placeholder="Discount"
//                 onChange={(e) => setDiscount(Number(e.target.value))}
//               />
//             </div>
//           </div>

//           {/* client phone number */}
//           <div className="w-full h-10 rounded-md border border-brand">
//             <input
//               type="text"
//               // {...register("clientNumber")}
//               readOnly
//               required
//               name="Phone"
//               placeholder="Client Number"
//               defaultValue={client?.data?.phone}
//               className="w-full h-full outline-0 cursor-default border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//             />
//           </div>

//           {/* client membership id */}
//           <div className="w-full h-10 rounded-md border border-brand">
//             <input
//               type="text"
//               // {...register("clientMembershipId")}
//               readOnly
//               placeholder="Client Membership"
//               defaultValue={client?.data?.memberShipId}
//               className="w-full h-full outline-0 cursor-default border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//             />
//           </div>
//           {/* client Points */}
//           <div className="w-full h-10 rounded-md border border-brand">
//             <input
//               type="text"
//               // {...register("clientPoint")}
//               readOnly
//               defaultValue={client?.data?.point}
//               placeholder="Point"
//               className="w-full h-full outline-0 border-none text-base cursor-default text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//             />
//           </div>

//           {/* client Points amount */}
//           <div className="w-full h-10 rounded-md border border-brand">
//             <input
//               type="text"
//               // {...register("clientPointsAmount")}
//               readOnly
//               placeholder="Point Amount"
//               defaultValue={client?.data?.pointAmount}
//               className="w-full h-full outline-0 border-none text-base cursor-default text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//             />
//           </div>
//         </div>

//         <div className="lg:flex justify-between gap-5">
//           {/* table area  */}
//           <div className="lg:col-span-2 col-span-1 lg:w-2/3 w-full">
//             <div className="">
//               <div className="h-fit mx-auto">
//                 <Table>
//                   <THeader>
//                     <Th>Product Name</Th>
//                     <Th>Stock</Th>
//                     <Th>IMEI</Th>
//                     <Th>Warranty</Th>
//                     <Th>Quantity</Th>
//                     <Th>MRP</Th>
//                     <Th>Subtotal</Th>
//                     <Th>X</Th>
//                   </THeader>
//                   <TBody>
//                     {purchaseProduct &&
//                       showProduct?.map((pos: any, index: any) => (
//                         <Tbrow key={index}>
//                           <Td>{pos?.products?.productName}</Td>
//                           <Td>{pos?.products?.stock}</Td>
//                           <Td>{pos?.imei}</Td>
//                           <Td>{pos?.warranty?.warranty}</Td>
//                           {/* quantity field */}
//                           <Td>
//                             <div className="w-full h-10 rounded-md border border-brand">
//                               {pos?.products?.stock === 0 ? (
//                                 <input
//                                   className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//                                   type="text"
//                                   placeholder="Quantity"
//                                   disabled // Disabling input field if stock is zero
//                                 />
//                               ) : (
//                                 <input
//                                   className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//                                   type="text"
//                                   placeholder="Quantity"
//                                   onChange={(e) =>
//                                     handleQuantityChange(
//                                       index,
//                                       Number(e.target.value)
//                                     )
//                                   }
//                                 />
//                               )}
//                             </div>
//                           </Td>
//                           {/* unit Price field */}
//                           <Td>
//                             {/* <div className="w-full h-10 rounded-md border border-brand">
//                             <input
//                               // {...register("price")}
//                               className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//                               type="text"
//                               placeholder="MRP"
//                               readOnly
//                               value={}
//                             // onChange={(e) =>
//                             //   handleUnitPriceChange(
//                             //     index,
//                             //     Number(e.target.value)
//                             //   )
//                             // }
//                             />
//                           </div> */}
//                             {pos?.sellingPrice}
//                           </Td>

//                           {/* sub total field */}
//                           <Td>{posProducts[index]?.subTotal || 0}</Td>
//                           <Td>
//                             <span className="flex items-center justify-center cursor-pointer">
//                               <FaRegTrashCan
//                                 onClick={() => handleRemove(index)}
//                               />
//                             </span>
//                           </Td>
//                         </Tbrow>
//                       ))}
//                   </TBody>
//                 </Table>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:mt-[73px] mt-5">
//                 <button className="bg-[#16A4B5] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   Draft
//                 </button>
//                 <button className="bg-[#FFC005] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   Quotation
//                 </button>
//                 <button className="bg-red-600 py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   Suspend
//                 </button>
//                 <button className="bg-[#007AFF] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   ReTransactions
//                 </button>
//                 <button className="bg-[#29A844] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   SMS
//                 </button>
//                 <button className="bg-[#18A2B4] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   Reprint List
//                 </button>
//                 <button className="bg-[#6C747F] py-2 px-2 text-lg font-medium rounded-sm text-white tracking-wider">
//                   RePrint
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* table area */}

//           {/* table payment area  */}
//           <div className="lg:w-1/3 w-full">
//             <div className="my-2">
//               <div className="mt-1">
//                 <div className="flex justify-between">
//                   <h2>MRP:</h2>
//                   <h2>{totalMrp}</h2>
//                 </div>
//                 <div className="flex justify-between">
//                   <h2>(+)Vat/Tax:</h2>
//                   <h2>0.00</h2>
//                 </div>
//                 <div className="flex justify-between">
//                   <h2>(-)Discount</h2>
//                   <h2>{discountAmount}</h2>
//                 </div>
//                 <div className="flex justify-between">
//                   <h2>No of Items:</h2>
//                   <h2>{posProducts?.length}</h2>
//                 </div>
//                 <div className="flex justify-between">
//                   <h2>Total Quantity:</h2>

//                   <h2>{totalQuantity}</h2>
//                 </div>
//                 <div className="border-brand border-[1px] mt-2 mb-1"></div>
//                 <div className="flex justify-between mb-2">
//                   <h2 className="text-lg font-semibold">Total :</h2>

//                   <h2 className="text-lg font-semibold">{paidAbleAmount}</h2>
//                 </div>
//               </div>

//               <div className="w-full">
//                 <div>
//                   {paymentFields.map((field, index) => (
//                     <div
//                       key={field.id}
//                       className="flex justify-center items-center mb-4"
//                     >
//                       <button
//                         type="button"
//                         onClick={handleAddField}
//                         className="bg-brand3 text-white py-2 px-3 rounded-md mr-1"
//                       >
//                         +
//                       </button>
//                       <div className="w-full mr-2">
//                         <div className="w-full h-10 border border-brand3 rounded-md">
//                           <Select
//                             name={`${index}`}
//                             label="Account"
//                             setValue={() => {}}
//                             onChange={(value: any) =>
//                               handlePaymentTypeChange(index, value)
//                             }
//                           >
//                             {/* <option value="">Select Payment Type</option> */}

//                             {accounts &&
//                               accounts?.data?.map((account: any) => (
//                                 <Option key={account?.id} value={account?.id}>
//                                   {account?.accountName}
//                                 </Option>
//                               ))}
//                           </Select>
//                         </div>
//                       </div>
//                       <div className="w-full h-10 border border-brand3 rounded-md">
//                         <input
//                           name={`${index}`}
//                           className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 rounded-md placeholder:text-black"
//                           type="text"
//                           placeholder="Amount"
//                           onChange={(e) =>
//                             handlePaymentAmountChange(
//                               index,
//                               Number(e.target.value)
//                             )
//                           }
//                         />
//                       </div>
//                       <button
//                         type="button"
//                         className="bg-red-700 text-white py-2 px-3 rounded-md ml-1"
//                         onClick={() => handleRemoveField(index)}
//                         hidden={index === 0}
//                       >
//                         -
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-sm font-medium bg-slate-200 h-fit p-3 leading-6 rounded-md">
//                   <h3>Paidable amount: {paidAbleAmount} </h3>
//                   <h3>Received cash: {totalPaymentAmount} </h3>
//                   <h3>Change: {paidAbleAmount - totalPaymentAmount} </h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-5 h-[50px] mt-6">
//                   {/* <PrintPos ref={printPosRef} /> */}
//                   <button className="bg-red-500 hover:bg-red-600  py-2 px-5 text-lg font-semibold rounded text-white tracking-wider transition-colors duration-500">
//                     Cancel
//                   </button>
//                   {addPOSSuccess ? (
//                     <button
//                       // onClick={() => handlePrint()}
//                       className="bg-emerald-500 hover:bg-emerald-600 w-full py-2 px-5 text-lg font-semibold rounded text-white tracking-wider transition-colors duration-500"
//                     >
//                       Print
//                     </button>
//                   ) : (
//                     <button
//                       onClick={handleSubmit(handleAddPos)}
//                       className="bg-emerald-500 hover:bg-emerald-600 w-full py-2 px-5 text-lg font-semibold rounded text-white tracking-wider transition-colors duration-500 flex items-center justify-center gap-3"
//                     >
//                       Create Pos
//                       {addPOSLoading && (
//                         <span className="animate-spin text-lg flex items-center justify-center">
//                           <AiOutlineLoading />
//                         </span>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* table payment area  */}
//         </div>
//       </div>
//       <div className="absolute invisible -left-full">
//         <PrintPos ref={printPosRef} props={posData} />
//       </div>
//     </>
//   );
// };

// export default AddPosPage;
