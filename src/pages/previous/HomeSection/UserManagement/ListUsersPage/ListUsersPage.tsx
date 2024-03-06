// import { FaRegEdit } from "react-icons/fa";
// import { VscVmActive } from "react-icons/vsc";
// import { RiEyeFill, RiEyeOffLine } from "react-icons/ri";
// import { BsFiletypeCsv } from "react-icons/bs";
// import { VscFilePdf } from "react-icons/vsc";
// import { FaRegFilePdf } from "react-icons/fa";
// import { IoPrintOutline } from "react-icons/io5";
// import { CiViewColumn } from "react-icons/ci";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { AiOutlineLoading } from "react-icons/ai";
// import Button from "@/components/previous/all/Button";
// import Input from "@/components/previous/all/Input";
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import DataLoader from "@/components/common/loader/DataLoader";
// import {
//   TBody,
//   TFooter,
//   THeader,
//   Table,
//   Tbrow,
//   Td,
//   Th,
// } from "@/components/previous/all/Table";
// import Image from "@/components/previous/all/Image";
// import {
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHead,
// } from "@/components/previous/all/Modal";
// import Pagination from "@/components/previous/all/Pagination";
// import { IoIosSearch } from "react-icons/io";
// import { useGetBranchesQuery } from "@/store/branch/branchApi";
// import { useSearchCustomerQuery } from "@/store/customer/customerApi";
// import {
//   useDeleteUserMutation,
//   useGetUserQuery,
//   useUpdateUserMutation,
// } from "@/store/user/userApi";

// const ListUsersPage = () => {
//   const { toast } = useToast() as any;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [modal, setModal] = useState(false);
//   // const { data: branchData } = useGetBranchesQuery(undefined) as any;

//   // GET USERS, SEARCH, SORTING, PAGE
//   const {
//     data: userData,
//     isError,
//     error: errorToGetUsers,
//     isLoading: isLoadingUserGet,
//     isSuccess: isSuccessToGetUsers,
//   } = useGetUserQuery(undefined) as any;
//   const { data: searchUser, isLoading: isSearching } = useSearchCustomerQuery({
//     search,
//     size: 5,
//     page: currentPage,
//   }) as any;

//   // Delete user
//   const [
//     deleteUser,
//     { data: Delete, isLoading: idDeleting, isSuccess: isDeleteUser },
//   ] = useDeleteUserMutation({}) as any;

//   const [updateUserActive, { data: updated, isSuccess: isUpdateUser }] =
//     useUpdateUserMutation({});

//   // User Activate
//   const handleUserActive = async (id: any) => {
//     try {
//       const result = (await updateUserActive({
//         id,
//         data: { active: true },
//       })) as any;
//       if (result?.data?.success === true) {
//         toast({
//           title: "Activation Message",
//           description: result?.data?.message,
//         });
//       }
//     } catch (err) {
//
//     }
//   };

//   // role speacific
//   const user = userData?.data?.filter((role: any) => role?.role === "USERS");
//   const manager = userData?.data?.filter(
//     (role: any) => role?.role === "MANAGER"
//   );
//   const marketOfficer = userData?.data?.filter(
//     (role: any) => role?.role === "MARKETINGOFFICER"
//   );
//   const saleman = userData?.data?.filter(
//     (role: any) => role?.role === "SALESMAN"
//   );
//   const cashier = userData?.data?.filter(
//     (role: any) => role?.role === "CASHIER"
//   );
//   // total active and deactive users
//   const activeStatus = userData?.data?.filter(
//     (status: any) => status?.active === true
//   );
//   const deactiveStatus = userData?.data?.filter(
//     (status: any) => status?.active === false
//   );

//   // Loading user Get
//   if (isLoadingUserGet) {
//     return <DataLoader />;
//   }
//   // Delete user,
//   if (isDeleteUser) {
//     toast({
//       title: "Delete Message",
//       description: Delete?.message,
//     });
//   }
//   // update user,
//   if (isUpdateUser) {
//     toast({
//       title: "Update Message",
//       description: updated?.message,
//     });
//   }

//   return (
//     <div>
//       <div>
//         <h1 className="my-3 ml-5">
//           <span className="text-3xl font-bold">User List</span>{" "}
//           <span className="font-light text-lg">Manage user List</span>
//         </h1>
//       </div>
//       <div className="w-[98%] mx-auto bg-slate-100 pb-10 pt-4 shadow-xl rounded">
//         {/* top side area */}
//         <div className="lg:flex items-center justify-between">
//           <div className="lg:flex items-center gap-3 ml-3">
//             <div className="my-2">
//               <Button
//                 bgColor="bg-[#163020]"
//                 bgHoverColor="hover:bg-[#255f3c]"
//                 rounded="rounded-md"
//               >
//                 <BsFiletypeCsv />
//                 CSV
//               </Button>
//             </div>
//             <div className="my-2">
//               <Button
//                 bgColor="bg-[#097640]"
//                 bgHoverColor="hover:bg-[#287647]"
//                 rounded="rounded-md"
//               >
//                 <FaRegFilePdf />
//                 Excel
//               </Button>
//             </div>{" "}
//             <div className="my-2">
//               <Button
//                 bgColor="bg-[#0069D9]"
//                 bgHoverColor="hover:bg-[#2466ac]"
//                 rounded="rounded-md"
//               >
//                 <IoPrintOutline />
//                 Pribt
//               </Button>
//             </div>{" "}
//             <div className="my-2">
//               <Button
//                 bgColor="bg-[#18B294]"
//                 bgHoverColor="hover:bg-[#2d9d87]"
//                 rounded="rounded-md"
//               >
//                 <CiViewColumn />
//                 Column
//               </Button>
//             </div>{" "}
//             <div className="my-2">
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
//           <div className="mr-4 lg:flex items-center gap-5">
//             <div className="w-[300px] my-2 sm:ml-3">
//               <Input
//                 Icon={<IoIosSearch className="text-2xl" />}
//                 name={"search-user"}
//                 placeholder={"Searching User..."}
//                 setValues={setSearch}
//               />
//             </div>
//             <Link
//               to={"/add_user"}
//               className="relative inline-block text-lg group my-2 sm:ml-3"
//             >
//               <button className="relative rounded px-5 py-2 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
//                 <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
//                 <span className="relative">+ADD</span>
//               </button>
//             </Link>
//           </div>
//         </div>
//         {/* Top side area */}
//         {/* tabel area */}
//         <div>
//           <div className="w-[98%] mx-auto mt-5 h-fit">
//             <Table>
//               <THeader>
//                 <Th>Avatar</Th>
//                 <Th>Phone</Th>
//                 <Th>Name</Th>
//                 <Th>Role</Th>
//                 <Th>Email</Th>
//                 <Th>Action</Th>
//               </THeader>
//               <TBody>
//                 {isSearching ? (
//                   <div className="text-indigo-500 text-base">Searching...</div>
//                 ) : (
//                   <>
//                     {!isError &&
//                       !errorToGetUsers &&
//                       isSuccessToGetUsers &&
//                       searchUser?.data?.map((user: any) => (
//                         <Tbrow key={user?.id}>
//                           <Td>
//                             <Image
//                               divClass={
//                                 "w-10 h-10 rounded-[50%] shadow-md shadow-brand4 drop-shadow-md"
//                               }
//                               imgClass={"w-full h-full rounded-[50%]"}
//                               src={user?.avatar}
//                               alt="user Avater"
//                             />
//                           </Td>
//                           <Td>{user?.phone}</Td>
//                           <Td>{user?.firstName}</Td>
//                           <Td>{user?.role} </Td>
//                           <Td>{user?.email}</Td>
//                           <Td>
//                             {" "}
//                             <div className="flex items-center justify-between gap-2">
//                               <div>
//                                 <Button
//                                   bgColor="bg-indigo-500"
//                                   bgHoverColor="hover:bg-indigo-600"
//                                 >
//                                   <Link
//                                     className="flex items-center gap-2"
//                                     to={`/edit_user/${user?.id}`}
//                                   >
//                                     <FaRegEdit />
//                                     Edit
//                                   </Link>
//                                 </Button>
//                               </div>
//                               <div>
//                                 <>
//                                   <Button
//                                     bgColor="bg-sky-500"
//                                     bgHoverColor="hover:bg-sky-600"
//                                     handleClick={() => setModal(true)}
//                                   >
//                                     <RiEyeFill />
//                                     View
//                                   </Button>
//                                   <Modal
//                                     isModal={modal}
//                                     width="50vw"
//                                     height="95vh"
//                                   >
//                                     <ModalHead
//                                       title="View User"
//                                       setIsModal={() => setModal(false)}
//                                     />
//                                     <ModalBody>
//                                       <h1 className="text-lg font-bold">
//                                         User Information
//                                       </h1>
//                                       <div className="flex justify-around flex-row-reverse gap-5">
//                                         <div>
//                                           <h2 className="text-sm font-semibold text-left mt-3">
//                                             Sales Commission Percentage (%):
//                                             0.00%
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Allowed Contacts: All
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             More Informations
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Date of birth: {user?.dateOfBirth}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Gender: {user?.gender}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Marital Status:{" "}
//                                             {user?.maritialStatus}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Blood Group: {user?.bloodGroup}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Mobile Number: {user?.phone}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Alternate contact number:{" "}
//                                             {user?.alternatePhone}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Family contact number:{" "}
//                                             {user?.familyPhone}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Facebook Link:{" "}
//                                             <a
//                                               className="text-blue-600 hover:text-blue-400 duration-300 transition-colors"
//                                               href={user?.facebook}
//                                             >
//                                               {user?.facebook?.slice(0, 20)}...
//                                             </a>
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Twitter Link:{" "}
//                                             <a
//                                               className="text-blue-600 hover:text-blue-400 duration-300 transition-colors"
//                                               href={user?.twitter}
//                                             >
//                                               {user?.twitter?.slice(0, 20)}...
//                                             </a>
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Permanent Address:{" "}
//                                             {user?.permanentAddress}
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left mb-5">
//                                             Current Address:{" "}
//                                             {user?.currentAddress}
//                                           </h2>
//                                           <hr />
//                                           <h2 className="text-xl font-semibold text-left mt-5">
//                                             HRM Details:
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Department:
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Designation:
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Basic salary:
//                                           </h2>
//                                           <h2 className="text-sm font-semibold text-left">
//                                             Pay Cycle:
//                                           </h2>
//                                         </div>
//                                         <div>
//                                           <Image
//                                             divClass="w-[200px] h-[200px] rounded-[50%] shadow-md shadow-brand4 drop-shadow-md ml-5 mt-10"
//                                             imgClass="w-full h-full rounded-[50%]"
//                                             src={user?.avatar}
//                                             alt={"user avatar"}
//                                           />
//                                           <div className="text-left text-sm mt-4 flex flex-col gap-2">
//                                             <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
//                                               Name: {user?.firstName}{" "}
//                                               {user?.lastName}
//                                             </h2>
//                                             <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
//                                               E-mail: {user?.email}
//                                             </h2>
//                                             <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
//                                               Role: {user?.role}
//                                             </h2>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </ModalBody>
//                                     <ModalFooter></ModalFooter>
//                                   </Modal>
//                                 </>
//                               </div>
//                               <div>
//                                 <Button
//                                   bgColor={
//                                     user?.active === false
//                                       ? "bg-gray-500"
//                                       : "bg-green-500"
//                                   }
//                                   bgHoverColor={
//                                     user?.active === false
//                                       ? "hover:bg-gray-600"
//                                       : "hover:bg-green-600"
//                                   }
//                                   handleClick={() => handleUserActive(user?.id)}
//                                 >
//                                   {user?.active === false ? (
//                                     <>
//                                       <RiEyeOffLine />
//                                       Dective
//                                     </>
//                                   ) : (
//                                     <>
//                                       <VscVmActive />
//                                       Active
//                                     </>
//                                   )}
//                                 </Button>
//                               </div>
//                               <div>
//                                 <Button
//                                   handleClick={() => deleteUser(user?.id)}
//                                   bgColor="bg-red-500"
//                                   bgHoverColor="hover:bg-red-600"
//                                 >
//                                   <FaRegTrashCan />
//                                   Delete
//                                   {idDeleting && (
//                                     <span className="animate-spin text-lg flex items-center justify-center">
//                                       <AiOutlineLoading />
//                                     </span>
//                                   )}
//                                 </Button>
//                               </div>
//                             </div>
//                           </Td>
//                         </Tbrow>
//                       ))}
//                   </>
//                 )}
//               </TBody>
//             </Table>
//           </div>
//           <div className="w-[98%] mx-auto mt-2">
//             <Table>
//               <TFooter>
//                 <Td row={1} column={1}></Td>
//                 <Td row={1} column={1}>
//                   <div className="whitespace-nowrap">
//                     Total Users: {userData?.meta?.total}
//                   </div>
//                 </Td>
//                 <Td row={1} column={1}>
//                   <div className="whitespace-nowrap">
//                     Total Name: {userData?.meta?.total}
//                   </div>
//                 </Td>
//                 <Td row={1} column={1}>
//                   <div className="text-left whitespace-nowrap">
//                     Total Role: {userData?.meta?.total} <br />
//                     Total USER: {user?.length} <br />
//                     Total MANAGER: {manager?.length} <br />
//                     Total CASHIER: {cashier?.length} <br />
//                     Total SALESMAN: {saleman?.length} <br />
//                     Total MARKETINGOFFICER: {marketOfficer?.length} <br />
//                   </div>
//                 </Td>
//                 <Td row={1} column={1}>
//                   <div className="whitespace-nowrap">
//                     All Email: {userData?.meta?.total}
//                   </div>
//                 </Td>
//                 <Td row={1} column={1}>
//                   <div className="text-left whitespace-nowrap">
//                     Total Active: {activeStatus?.length} <br />
//                     Total Deactive: {deactiveStatus?.length} <br />
//                   </div>
//                 </Td>
//               </TFooter>
//             </Table>
//           </div>
//         </div>
//         {/* table area */}
//         {userData?.meta?.total >= 5 && (
//           <div className="mt-5 mr-8 flex justify-end">
//             <Pagination
//               currPage={currentPage}
//               setCurrPage={setCurrentPage}
//               isLoading={isLoadingUserGet}
//               totalItems={searchUser?.meta?.total}
//               totalPage={searchUser?.meta?.totalPage}
//               pageLength={searchUser?.meta?.size}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListUsersPage;
