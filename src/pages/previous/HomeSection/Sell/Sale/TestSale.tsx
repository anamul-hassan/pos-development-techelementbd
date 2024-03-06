// import DataLoader from "@/components/common/loader/DataLoader";
// import { useToast } from "@/components/ui/use-toast";
// import { useGetAccountsQuery } from "@/store/account/accountApi";
// import {
//   useAddProductMutation,
//   useGetProductsQuery,
// } from "@/store/product/productApi";
// import { useAddPurchaseMutation } from "@/store/purchase/purchaseApi";
// import {
//   useAddSupplierMutation,
//   useGetSuppliersQuery,
// } from "@/store/supplier/supplierApi";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddPurchase = () => {
//   const { toast } = useToast();
//   const [createPurchase] = useAddPurchaseMutation({}) as any;
//   const { data, isLoading } = useGetProductsQuery(undefined) as any;
//   const [date, setDate] = useState("");
//   const [supplierId, setSupplierId] = useState("");
//   const [supplierAddress, setSupplierAddress] = useState("");
//   const { data: account, isLoading: accountLoading } = useGetAccountsQuery(
//     undefined
//   ) as any;
//   const [createProduct] = useAddProductMutation({}) as any;
//   const [createSupplier] = useAddSupplierMutation({}) as any;
//   const navigate = useNavigate();
//   const [total, setTotal] = useState(0);
//   const [modal, setModal] = useState(false);
//   const [supplierModal, setSupplierModal] = useState(false);
//   const [paymentTotal, setPaymentTotal] = useState(0);
//   const [paymentRows, setPaymentRows] = useState([
//     { method: account?.data[0]?.bankName, price: 0 },
//   ]);
//   const [items, setItems] = useState([
//     {
//       itemName: data?.data[0].name,
//       unit: data?.data[0]?.unit,
//       quantity: 0,
//       price: 0,
//       subTotal: 0,
//     },
//   ]);
//   // const handleAddPaymentRow = () => {
//   //   setPaymentRows([
//   //     ...paymentRows,
//   //     { method: account?.data[0]?.bankName, price: 0 },
//   //   ]);
//   // };
//   const { data: suppliers, isLoading: supplierLoading } = useGetSuppliersQuery(
//     undefined
//   ) as any;
//   // const handleProduct = async (data: any) => {
//   //   try {
//   //     const result = await createProduct(data).unwrap();
//   //     if (result.success) {
//   //       toast({
//   //         description: "Product Added Success",
//   //       });
//   //     }
//   //   } catch (err) {
//   //
//   //   }
//   // };
//   // const handleRemovePaymentRow = (index: any) => {
//   //   if (paymentRows.length > 1) {
//   //     const newPaymentRows = [...paymentRows];
//   //     const remove = newPaymentRows.splice(index, 1)[0];
//   //     setPaymentRows(newPaymentRows);
//   //     const newPaymentTotal = paymentTotal - remove.price;
//   //     setPaymentTotal(newPaymentTotal);
//   //   }
//   // };

//   // const handleChangePaymentRow = (index: any, e: any) => {
//   //   const { name, value } = e.target;
//   //   const newPaymentRows = [...paymentRows] as any;
//   //   const oldPrice = newPaymentRows[index].price as any;
//   //   newPaymentRows[index][name] = value;
//   //   setPaymentRows(newPaymentRows);
//   //   const newPaymentTotal = newPaymentRows.reduce(
//   //     (acc: any, item: any) => Number(acc) + Number(item.price),
//   //     0
//   //   );
//   //   setPaymentTotal(newPaymentTotal) as any;
//   // };

//   useEffect(() => {
//     setItems([
//       {
//         itemName: data?.data[0].name,
//         unit: data?.data[0]?.unit,
//         quantity: 0,
//         price: 0,
//         subTotal: 0,
//       },
//     ]);
//   }, [data?.data]);

//   useEffect(() => {
//     setPaymentRows([{ method: account?.data[0]?.bankName, price: 0 }]);
//   }, [account?.data]);

//   const handleAdd = () => {
//     setItems([
//       ...items,
//       {
//         itemName: "",
//         unit: data.data[0]?.unit,
//         quantity: 0,
//         price: 0,
//         subTotal: 0,
//       },
//     ]);
//   };

//   // const handleRemove = (index) => {
//   //     if (items.length > 1) {
//   //         const newItems = [...items];
//   //         newItems.splice(index, 1); // Remove the item at the specified index
//   //         setItems(newItems);
//   //     }
//   // };

//   const handleRemove = (index: any) => {
//     if (items.length > 1) {
//       const newItems = [...items];
//       const removedItem = newItems.splice(index, 1)[0]; // Remove the item at the specified index
//       setItems(newItems);

//       // Subtract the removed item's subtotal from the total
//       const newTotal = total - removedItem.subTotal;
//       setTotal(newTotal);
//     }
//   };

//   // const handleChange = (index, e) => {
//   //     const { name, value } = e.target;
//   //     const newItems = [...items];
//   //     newItems[index][name] = value;
//   //     setItems(newItems);
//   // };
//   const handleChange = (index: any, e: any) => {
//     const { name, value } = e.target;
//     const newItems = [...items] as any;
//     if (name === "itemName") {
//       const findUnit = data.data.find((p: any) => p.name === value);
//       newItems[index]["unit"] = findUnit.unit;
//     }
//     newItems[index][name] = value;

//     // Calculate subtotal based on the selected unit, quantity, and price
//     const { unit, quantity, price } = newItems[index];
//     newItems[index].subTotal = unit !== "gm" ? quantity * price : price;

//     setItems(newItems);

//     // Calculate total based on all subtotals
//     const newTotal = newItems.reduce(
//       (acc: any, item: any) => Number(acc) + Number(item.subTotal),
//       0
//     );
//     setTotal(newTotal);
//   };

//   const handleSubmit = async () => {
//     try {
//       const purchase = {
//         items,
//         payments: paymentRows,
//         supplierId,
//         totalAmount: total,
//         totalPayment: paymentTotal,
//       } as any;
//       if (date) {
//         purchase.date = new Date(date);
//       }
//       const result = await createPurchase(purchase).unwrap();
//       if (result.success) {
//         toast({
//           description: "Purchase Added",
//         });
//         navigate("/purchase");
//       }
//
//     } catch (err) {
//
//     }
//   };
//   useEffect(() => {
//     if (!supplierId) {
//       setSupplierId(suppliers?.data[0]?._id);
//     }
//     const filterSupplier = suppliers?.data?.find((s) => s._id === supplierId);
//     setSupplierAddress(filterSupplier?.address);
//
//   }, [data, supplierId]);
//   const handleAddSupplier = async (data: any) => {
//     try {
//       const result = await createSupplier(data).unwrap();
//       if (result.success) {
//         toast({
//           description: "Supplier Added",
//         });
//       }
//
//     } catch (err) {
//
//     }
//   };
//   if (isLoading || accountLoading || supplierLoading) {
//     return <DataLoader />;
//   }

//   return (
//     <div className="bg-white p-5">
//       <button
//         className="text-white bg-primary font-semibold px-5  py-1 rounded-md mr-1"
//         onClick={() => navigate("/purchash")}
//       >
//         Back
//       </button>
//       <button
//         className="text-white bg-gray-700 font-semibold px-5  py-1 rounded-md ml-1"
//         onClick={() => setModal(true)}
//       >
//         Add Product
//       </button>
//       <button
//         className="text-white bg-gray-700 font-semibold px-5  py-1 rounded-md ml-1"
//         onClick={() => setSupplierModal(true)}
//       >
//         Add Supplier
//       </button>
//       <div className="flex justify-between py-4">
//         <p>Pyment Total : {paymentTotal}</p>
//         <p>Due : {total - paymentTotal}</p>
//         <p>Total : {total}</p>
//       </div>
//       <div className="flex justify-between">
//         <div className="rounded-md px-2 my-3">
//           <label htmlFor="Date">Date</label>
//           <input
//             type="date"
//             className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div className="rounded-md px-2 my-3">
//           <label htmlFor="Date">Supplier Name</label>
//           {/* <input type="text" className='w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded' placeholder='supplier name' /> */}
//           <select
//             className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//             defaultValue={suppliers[0]?._id}
//             name=""
//             id=""
//             onChange={(e) => setSupplierId(e.target.value)}
//           >
//             {suppliers?.data?.map((supplier: any) => (
//               <option value={supplier._id}>{supplier.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="rounded-md px-2 my-3">
//           <label htmlFor="Date">Supplier Address</label>
//           <input
//             disabled
//             type="text"
//             className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//             placeholder="supplier address"
//             value={supplierAddress}
//           />
//         </div>
//       </div>
//       <div></div>
//       <div>
//         {modal && (
//           <ProductModal handleProduct={handleProduct} setModal={setModal} />
//         )}
//         {supplierModal && (
//           <SupplierModal
//             setModal={setSupplierModal}
//             handleSubmit={handleAddSupplier}
//           />
//         )}
//         {items.map((item, index) => (
//           <div key={index} className="flex gap-4">
//             <div className="rounded-md px-2 my-3 flex items-center">
//               <span>{index + 1}</span>
//             </div>
//             <div className="rounded-md px-2 my-3">
//               <label htmlFor={`itemName-${index}`}>Item Name</label>
//               <select
//                 className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//                 name="itemName"
//                 value={item.itemName}
//                 onChange={(e) => handleChange(index, e)}
//               >
//                 {data?.data?.map((p) => (
//                   <option key={p.id} value={p.name}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="rounded-md px-2 my-3">
//               <label htmlFor={`unit-${index}`}>Unit</label>
//               <input
//                 className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//                 type="text"
//                 disabled
//                 name="unit"
//                 value={item.unit}
//                 onChange={(e) => handleChange(index, e)}
//                 placeholder="unit"
//               />
//             </div>
//             <div className="rounded-md px-2 my-3">
//               <label htmlFor={`quantity-${index}`}>Quantity</label>
//               <input
//                 className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//                 type="number"
//                 name="quantity"
//                 value={item.quantity}
//                 onChange={(e) => handleChange(index, e)}
//                 placeholder="quantity"
//               />
//             </div>
//             <div className="rounded-md px-2 my-3">
//               <label htmlFor={`price-${index}`}>Price</label>
//               <input
//                 className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//                 type="number"
//                 name="price"
//                 value={item.price}
//                 onChange={(e) => handleChange(index, e)}
//                 placeholder="price"
//               />
//             </div>
//             <div className="rounded-md px-2 my-3">
//               <label htmlFor={`subTotal-${index}`}>Sub Total</label>
//               <input
//                 className="w-full shadow-sm px-3 border focus:border-primary py-2 focus:outline-none rounded"
//                 type="number"
//                 disabled
//                 name="subTotal"
//                 value={item.subTotal}
//                 onChange={(e) => handleChange(index, e)}
//                 placeholder="sub total"
//               />
//             </div>
//             <div
//               className="flex items-center mt-4 cursor-pointer group"
//               onClick={
//                 items.length - 1 === index
//                   ? handleAdd
//                   : () => handleRemove(index)
//               }
//             >
//               <span className="text-white group-hover:bg-gray-600 rounded bg-primary px-3 py-1">
//                 {items.length - 1 === index ? "+" : "-"}
//               </span>
//             </div>
//           </div>
//         ))}
//         {paymentRows.map((paymentRow, index) => (
//           <div key={index} className="flex gap-4">
//             {/* Payment Rows JSX */}
//           </div>
//         ))}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-primary text-white text-center hover:bg-gray-600 duration-200 py-1 px-4 rounded-md my-5 font-semibold"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPurchase;
