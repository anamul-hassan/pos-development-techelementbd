import DataLoader from "@/components/common/loader/DataLoader";
import {
  DropAction,
  DropActionList,
} from "@/components/previous/all/DropAction";
import InputField from "@/components/previous/all/InputField";
import Pagination from "@/components/previous/all/Pagination";
// import ReportSelector from "@/components/previous/all/ReportSelector";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { useGetCustomersQuery } from "@/store/customer/customerApi";
import {
  useDeletePOSMutation,
  // useDeletePosMutation,
  useGetAllPOSQuery,
} from "@/store/point_of_sell/posApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import {
  FaArrowAltCircleUp,
  FaEdit,
  FaEye,
  FaRegFilePdf,
} from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { IoPrintOutline, IoTrashBin } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ListPosPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posData, isLoading } = useGetAllPOSQuery(undefined) as any;
  const [deletePos, { data: Delete, isSuccess: isDeleted }] =
    useDeletePOSMutation({}) as any;
  const { data: customers } = useGetCustomersQuery(undefined) as any;
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  if (isLoading) {
    return <DataLoader />;
  }

  if (isDeleted) {
    toast({
      description: Delete?.message,
    });
  }

  const posDetails = posData?.data?.map((pos: any) => {
    const findCustomer = customers?.data?.find(
      (customer: any) => customer?.id === pos?.customerId
    );
    return {
      ...pos,
      customer: findCustomer || null,
    };
  });

  return (
    <div>
      <div>
        <h1 className="my-5 ml-12">
          <span className="text-2xl font-bold">POS</span>{" "}
          {/* <span className="font-light">Manage your Customers</span> */}
        </h1>
      </div>
      <div className="w-[95%] mx-auto mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>Business Location:</option>
                <option value={"Months"}>Bkish</option>
                <option value={"Days"}>Rocket</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>User:</option>
                <option value={"Months"}>Bkish</option>
                <option value={"Days"}>Rocket</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="mt-3">{/* <ReportSelector /> */}</div>
          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>Sales Commission Agent:</option>
                <option value={"Months"}>Bkish</option>
                <option value={"Days"}>Rocket</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>Payment Statuse:</option>
                <option value={"Months"}>Paid</option>
                <option value={"Days"}>Due</option>
                <option value={"Days"}>Partial</option>
                <option value={"Days"}>Overdue</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>{" "}
          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>Shipping Status:</option>
                <option value={"Months"}>Ordered</option>
                <option value={"Days"}>Packed</option>
                <option value={"Days"}>Shipped</option>
                <option value={"Days"}>Delivered</option>
                <option value={"Days"}>Cancelled</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-3">
            <InputField
              isPassword={false}
              isIcon={false}
              // placeholder="Point:"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              // label={"Point:"}
              name={"lastName"}
              type={"date"}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex mt-4 ml-3">
            <div>
              <button className="flex text-lg bg-[#163020] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <BsFiletypeCsv className="mt-1 mr-1" />
                CSV
              </button>
            </div>
            <div>
              <button className="flex text-lg bg-[#097640] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <FaRegFilePdf className="mt-1 mr-1" />
                Excel
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#0069D9] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <IoPrintOutline className="mt-1 mr-1" />
                Pribt
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#18B294] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <CiViewColumn className="mt-1 mr-1" />
                Column
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#527853] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <VscFilePdf className="mt-1 mr-1" />
                PDF
              </button>
            </div>
          </div>
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-3">
              {" "}
              <InputField
                isPassword={false}
                isIcon={false}
                // placeholder="Point:"
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={"Search:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div>
              <Link
                to={"/add_pos"}
                className="relative inline-block text-lg group mt-2"
              >
                <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">+ADD</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </Link>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>#</Th>
                <Th>Action</Th>
                <Th>Date</Th>
                {/* <Th>
                  Invoice <br />
                  No.
                </Th> */}
                <Th>
                  Customer <br />
                  Name
                </Th>
                <Th>
                  Contact <br />
                  Number
                </Th>
                <Th>Location</Th>
                {/* <Th>
                  Payment <br />
                  Status
                </Th>
                <Th>
                  Payment <br />
                  Mehtod
                </Th> */}
                <Th>
                  Total <br /> amount
                </Th>
                <Th>
                  Total <br />
                  Paid
                </Th>
                {/* <Th>
                  sell <br />
                  Due
                </Th>
                <Th>
                  Sell <br />
                  Return <br />
                  Due
                </Th>
                <Th>
                  Shipping <br />
                  Status
                </Th>
                <Th>
                  Total <br />
                  Items
                </Th>
                <Th>Added by</Th>
                <Th>Sell note</Th>
                <Th>Staff note</Th>
                <Th>
                  shipping <br />
                  Details
                </Th> */}
              </THeader>
              <TBody>
                {posData &&
                  posDetails
                    ?.slice(currentPage * 5 - 5, currentPage * 5)
                    ?.map((pos: any, index: any) => (
                      <Tbrow key={pos?.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <DropAction>
                            <DropActionList>
                              Pay
                              <MdOutlinePayment className="text-base" />
                            </DropActionList>
                            <DropActionList
                            // onClick={() => setModal(true)}
                            >
                              View
                              <FaEye className="text-base" />
                            </DropActionList>
                            <DropActionList
                            // onClick={() => setModal2(pt?.id)}
                            >
                              Edit
                              <FaEdit className="text-base" />
                            </DropActionList>
                            <DropActionList onClick={() => deletePos(pos?.id)}>
                              Delete
                              <IoTrashBin className="text-base" />
                            </DropActionList>
                            {/* <DropActionList onClick={() => handleUpdateStatus(pt?.id)}>
                            {pt?.status === false ? <>
                              Deactive
                              <RiEyeOffLine className="text-base" />
                            </>
                              :
                              <>
                                Active
                                <VscVmActive />
                              </>
                            }
                          </DropActionList> */}
                            <DropActionList>
                              Ledger
                              <IoIosPrint className="text-base" />
                            </DropActionList>
                            <DropActionList>
                              Sales
                              <FaArrowAltCircleUp className="text-base" />
                            </DropActionList>
                            <DropActionList>
                              Documents & Note
                              <SiGoogledocs className="text-base" />
                            </DropActionList>
                          </DropAction>
                        </Td>
                        {/* <Td>{moment(pos?.saleDate).format("L")}</Td> */}
                        {/* <Td></Td> */}
                        <Td>
                          {pos?.customer?.firstName} {pos?.customer?.lastName}
                        </Td>
                        <Td>{pos?.customer?.phone}</Td>
                        <Td>{pos?.customer?.address}</Td>
                        {/* <Td></Td>
                      <Td>{pos?.payment?.paymentType}</Td> */}
                        <Td>{pos?.totalPrice}</Td>
                        <Td>{pos?.totalPaymentAmount}</Td>
                        {/* <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td> */}
                      </Tbrow>
                    ))}
              </TBody>
              {/* <TFooter>
                <Td row={1} column={1}>
                  All Users:4
                </Td>
                <Td row={1} column={1}>
                  All Name:4
                </Td>
                <Td row={1} column={1}>
                  All Roll:4
                </Td>
                <Td row={1} column={1}>
                  All Email: 4
                </Td>
              </TFooter> */}
            </Table>
          </div>
        </div>
        {/* table area */}
        {posDetails?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={posDetails?.length}
              totalPage={Math.ceil(posDetails?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPosPage;
