// import { FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
// import { BsFiletypeCsv } from "react-icons/bs";
// import { IoPrintOutline } from "react-icons/io5";
// import { CiViewColumn } from "react-icons/ci";
// import { VscFilePdf } from "react-icons/vsc";

// import { FaRegTrashCan } from "react-icons/fa6";
// import { AiOutlineLoading } from "react-icons/ai";
// import { useEffect, useState } from "react";
// import {
//   useAddExpenseMutation,
//   useDeleteExpenseMutation,
//   useGetCategoryExpensesQuery,
//   useGetExpenseQuery,
//   useGetSubCategoryExpensesQuery,
//   useSearchExpenseQuery,
//   useUpdateExpenseMutation,
// } from "@/store/expense/expenseApi";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { addExpenseSchema } from "@/schemas/expense/expense_schema";
// import { useToast } from "@/components/ui/use-toast";
// import DataLoader from "@/components/common/loader/DataLoader";
// import Button from "@/components/previous/all/Button";
// import Input from "@/components/previous/all/Input";
// import {
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHead,
// } from "@/components/previous/all/Modal";
// import InputField from "@/components/previous/all/InputField";
// import { Option, Select } from "@/components/previous/all/Select";
// import {
//   TBody,
//   THeader,
//   Table,
//   Tbrow,
//   Td,
//   Th,
// } from "@/components/previous/all/Table";
// import Image from "@/components/previous/all/Image";

// const AddExpensePage = () => {
//   const { toast } = useToast() as any;

//   const [modal1, setModal1] = useState(false);
//   const [modal2, setModal2] = useState(null);
//   // const [currentPage, setCurrentPage] = useState(1);

//   return (
//     <div>
//       <div>
//         <h1 className="my-3 ml-2 lg:ml-[60px]">
//           <span className="text-2xl font-bold">Add Expense </span>{" "}
//           {/* <span className="font-light"></span> */}
//         </h1>
//       </div>

//       <div className="w-[94%] mx-auto border-t-2 pt-5 border-brand bg-slate-100 pb-10 shadow-xl rounded">
//         {/* top side area */}
//         <div className="lg:flex justify-between">
//           <div className="flex items-center justify-center lg:justify-normal lg:flex-row flex-col gap-3 ml-6 mt-8">
//             <div>
//               <Button
//                 bgColor="bg-[#163020]"
//                 bgHoverColor="hover:bg-[#255f3c]"
//                 rounded="rounded-md"
//               >
//                 <BsFiletypeCsv />
//                 CSV
//               </Button>
//             </div>
//             <div>
//               <Button
//                 bgColor="bg-[#097640]"
//                 bgHoverColor="hover:bg-[#287647]"
//                 rounded="rounded-md"
//               >
//                 <FaRegFilePdf />
//                 Excel
//               </Button>
//             </div>{" "}
//             <div>
//               <Button
//                 bgColor="bg-[#0069D9]"
//                 bgHoverColor="hover:bg-[#2466ac]"
//                 rounded="rounded-md"
//               >
//                 <IoPrintOutline />
//                 Pribt
//               </Button>
//             </div>{" "}
//             <div>
//               <Button
//                 bgColor="bg-[#18B294]"
//                 bgHoverColor="hover:bg-[#2d9d87]"
//                 rounded="rounded-md"
//               >
//                 <CiViewColumn />
//                 Column
//               </Button>
//             </div>{" "}
//             <div>
//               <Button
//                 bgColor="bg-[#527853]"
//                 bgHoverColor="hover:bg-[#70ae71]"
//                 rounded="rounded-md"
//               >
//                 <VscFilePdf />
//                 PDF
//               </Button>
//             </div>
//           </div>
//           <div className="mt-4 mr-5">
//             <div className="mt-4 mr-5 flex">
//               <div className="mr-5">
//                 {" "}
//                 <Input
//                   Icon={<FaSearch />}
//                   name={"search"}
//                   placeholder={"Search Expense..."}
//                   setValues={setSearch}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Top side area */}
//         {/* tabel area */}
//         <div></div>
//         {/* table area */}
//         <hr className="m-5" />
//         {/* {
//           searchUnit?.data?.length > 5 &&
//           <div className="mt-5 mr-8 flex justify-end">
//             <Pagination
//               currPage={currentPage}
//               setCurrPage={setCurrentPage}
//               isLoading={null}
//               totalItems={searchUnit?.data?.length}
//               totalPage={Math.ceil(searchUnit?.data?.length / 5)}
//               pageLength={5}
//             />
//           </div>
//         } */}
//       </div>
//     </div>
//   );
// };

// export default AddExpensePage;
