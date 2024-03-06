import { FaArrowAltCircleUp, FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";
import { FaRegFilePdf } from "react-icons/fa";
import { IoPrintOutline, IoTrashBin } from "react-icons/io5";
import { CiViewColumn } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { SiGoogledocs } from "react-icons/si";
import {
  useDeleteSellMutation,
  useGetSellQuery,
  useSearchSellQuery,
} from "@/store/sell/sellApi";
import { useGetCustomersQuery } from "@/store/customer/customerApi";
import DataLoader from "@/components/common/loader/DataLoader";
import { useToast } from "@/components/ui/use-toast";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import {
  DropAction,
  DropActionList,
} from "@/components/previous/all/DropAction";
import Pagination from "@/components/previous/all/Pagination";
import Input from "@/components/previous/all/Input";
import { actionManager } from "@/utils/helpers/actionManager";

const ListSalesPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    // data: sellData,
    // isError,
    isLoading,
    // isSuccess,
  } = useGetSellQuery(undefined) as any;
  const { data: customers } = useGetCustomersQuery(undefined) as any;
  const [search, setSearch] = useState("");
  // const [modal, setModal] = useState(false);
  const { data: sellSearch } = useSearchSellQuery(search) as any;
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm("");
  const [deleteSell, { data: Delete, isSuccess: isDeleteSell }] =
    useDeleteSellMutation();
  if (isDeleteSell) {
    toast({
      description: Delete?.message,
    });
  }
  if (isLoading) {
    return <DataLoader />;
  }

  const sellDetails = sellSearch?.data?.map((sell: any) => {
    const findCustomer = customers?.data?.find(
      (customer: any) => customer?.id === sell?.customerId
    );
    return {
      ...sell,
      customer: findCustomer || null,
    };
  });

  return (
    <div>
      <div>
        <h1 className="my-3 ml-4 ">
          <span className="text-3xl font-bold">All Sell</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      {/* <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Business Location:"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder="Customer"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={"Customer:"}
              name={"lastName"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Payment Status:"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder="Sources"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={"Sources:"}
              name={"lastName"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Subcriptions:"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder=""
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={""}
              name={"lastName"}
              type={"date"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"sell:"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder=""
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={"Shipping Status:"}
              name={"lastName"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
      </div> */}
      <div className="w-[98%] mx-auto bg-slate-100 border-t-2 border-brand pb-10 shadow-xl rounded">
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
            <div className="mt-4">
              <Input
                Icon={<FaSearch />}
                name={"search"}
                placeholder={"Search Sell..."}
                setValues={setSearch}
              />
            </div>
            {actionManager(["manager"]) && (
              <Link
                to={"/add_sell"}
                className="relative inline-block text-lg group mt-[16px]"
              >
                <button className="relative rounded px-5 py-2 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">+ADD</span>
                </button>
              </Link>
            )}
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
                <Th>Product</Th>
                <Th>Invoice</Th>
                <Th>Customer Name</Th>
                <Th>Contact Number</Th>
                <Th>Location</Th>
                <Th>Total Items</Th>
                <Th>Total Amount</Th>
                {/* <Th>Payent Status</Th>
                <Th>Payment Method</Th>
                <Th>Total Paid</Th>

                <Th>Sell Due</Th>
                <Th>Sell Return Due</Th>
                <Th>Shipping Status</Th>
                <Th>Added By</Th>
                <Th>Sell Note</Th>
                <Th>Staff note</Th>
                <Th>Shipping Details</Th> */}
              </THeader>
              <TBody>
                {/* slice((currentPage * 5) - 5, (currentPage * 5)) */}
                {sellDetails
                  ?.slice(currentPage * 5 - 5, currentPage * 5)
                  ?.map((sell: any, index: any) => (
                    <Tbrow key={sell.id}>
                      <Td>{index + 1} </Td>
                      <Td>
                        <DropAction>
                          <DropActionList>
                            Pay
                            <MdOutlinePayment className="text-base" />
                          </DropActionList>
                          <DropActionList
                          //  onClick={() => setModal(true)}
                          >
                            View
                            <FaEye className="text-base" />
                          </DropActionList>
                          <DropActionList>
                            <Link
                              className="flex items-center justify-between w-full h-full"
                              to={`/edit_sale/${sell?.id}`}
                            >
                              Edit
                              <FaEdit className="text-base" />
                            </Link>
                          </DropActionList>
                          <DropActionList onClick={() => deleteSell(sell?.id)}>
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
                      <Td>{sell?.products[0]?.product?.productName}</Td>
                      <Td>{sell?.invoiceNo}</Td>
                      <Td>
                        {sell?.customer?.firstName} {sell?.customer?.lastName}
                      </Td>
                      <Td>{sell?.customer?.phone}</Td>
                      <Td>{sell?.customer?.address}</Td>
                      <Td>{sell?.products?.length}</Td>
                      <Td>{sell?.totalPrice}</Td>
                      {/* <Td>
                      <div className="flex">
                        <div className="mr-2">
                          <Button
                            bgColor="bg-indigo-500"
                            bgHoverColor="hover:bg-indigo-600"
                          >
                            <Link
                              className="flex items-center gap-2"
                              to={`/edit_sell/${sell?.id}`}
                            >
                              <FaRegEdit />
                              Edit
                            </Link>
                          </Button>
                        </div>
                        <div className="mr-2">
                          <>
                            <Button
                              bgColor="bg-sky-500"
                              bgHoverColor="hover:bg-sky-600"
                              handleClick={() => setModal(true)}
                            >
                              <RiEyeFill />
                              View
                            </Button>
                            <Modal isModal={modal} width="50vw" height="95vh">
                              <ModalHead
                                title="View sell"
                                setIsModal={() => setModal(false)}
                              />
                              <ModalBody>
                                <h1 className="text-lg font-bold">
                                  sell Information
                                </h1>
                                <div className="flex justify-around flex-row-reverse gap-5">
                                  <div>
                                    <h2 className="text-sm font-semibold text-left">
                                      City: {sell?.city}
                                    </h2>
                                    <h2 className="text-sm font-semibold text-left">
                                      State: {sell?.state}
                                    </h2>
                                    <h2 className="text-sm font-semibold text-left">
                                      Zip Code: {sell?.zipCode}
                                    </h2>
                                    <h2 className="text-sm font-semibold text-left">
                                      Tax: {sell?.tax}
                                    </h2>

                                    <h2 className="text-sm font-semibold text-left">
                                      Pay Term: {sell?.peyTerm}
                                    </h2>

                                    <h2 className="text-sm font-semibold text-left">
                                      Opening Balance: {sell?.permanentAddress}
                                    </h2>
                                    <h2 className="text-sm font-semibold text-left mb-5">
                                      Current Address: {sell?.address}
                                    </h2>
                                  </div>
                                  <div>
                                    <div className="text-left text-sm mt-4 flex flex-col gap-2">
                                      <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                        Name: {sell?.firstName} {sell?.lastName}
                                      </h2>
                                      <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                        E-mail: {sell?.email}
                                      </h2>
                                      <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                        Branch ID: {sell?.branchId}
                                      </h2>
                                      <h2 className="text-sm font-semibold text-left">
                                        Phone Number: {sell?.phone}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter></ModalFooter>
                            </Modal>
                          </>
                        </div>
                        <div>
                          <div>
                            <Button
                              handleClick={() => deletesell(sell?.id)}
                              bgColor="bg-red-500"
                              bgHoverColor="hover:bg-red-600"
                            >
                              <FaRegTrashCan />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Td> */}
                    </Tbrow>
                  ))}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        {sellDetails?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={sellDetails?.length}
              totalPage={Math.ceil(sellDetails?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListSalesPage;
