import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { IoPrintOutline } from "react-icons/io5";
import { CiViewColumn } from "react-icons/ci";
import { VscFilePdf } from "react-icons/vsc";

import { Link } from "react-router-dom";

import { RiEyeFill } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
// import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useToast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "@/store/customer/customerApi";
import Input from "@/components/previous/all/Input";
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
import { Modal, ModalBody, ModalHead } from "@/components/previous/all/Modal";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";

const DueCollectionPage = () => {
  const { toast } = useToast() as any;
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  // const { data: branchData } = useGetBranchesQuery(undefined);
  const { data: accounts } = useGetAccountsQuery("All") as any;

  const { data: customerSearch } = useGetCustomersQuery({
    search,
  }) as any;

  const {
    register,
    // handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [
    deletecustomer,
    {
      // isError: isDeleteError,
      // error: deleteError,
      isSuccess: isDeletecustomer,
    },
  ] = useDeleteCustomerMutation() as any;
  if (isDeletecustomer) {
    toast({
      description: "customer Deleted Successfully",
    });
  }

  // const customer = customerSearch?.data?.map((da: any) => {
  //   const findBranch = branchData?.data?.find(
  //     (branch: any) => branch?.id === da?.branchId
  //   );
  //   return {
  //     ...da,
  //     branch: findBranch,
  //   };
  // });
  // Payment area add and remove
  const [paymentFields, setPaymentFields] = useState([{ id: 1 }]);
  const handleAddField = () => {
    const newId = paymentFields.length + 1;
    setPaymentFields([...paymentFields, { id: newId }]);
  };
  const handleRemoveField = (index: any) => {
    const updatedFields = [...paymentFields];
    updatedFields.splice(index, 1);
    setPaymentFields(updatedFields);
  };
  return (
    <div>
      <div>
        <h1 className="my-3 ml-4 ">
          <span className="text-3xl font-bold">Due Collection</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      <div className="w-[95%] mx-auto bg-slate-100 border-t-2 border-brand pt-3 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="lg:flex mt-4 ml-3">
            <div className="my-2">
              <button className="flex text-lg bg-[#163020] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <BsFiletypeCsv className="mt-1 mr-1" />
                CSV
              </button>
            </div>
            <div className="my-2">
              <button className="flex text-lg bg-[#097640] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <FaRegFilePdf className="mt-1 mr-1" />
                Excel
              </button>
            </div>{" "}
            <div className="my-2">
              <button className="flex text-lg bg-[#0069D9] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <IoPrintOutline className="mt-1 mr-1" />
                Pribt
              </button>
            </div>{" "}
            <div className="my-2">
              <button className="flex text-lg bg-[#18B294] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <CiViewColumn className="mt-1 mr-1" />
                Column
              </button>
            </div>{" "}
            <div className="my-2">
              <button className="flex text-lg bg-[#527853] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <VscFilePdf className="mt-1 mr-1" />
                PDF
              </button>
            </div>
          </div>
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-4">
              {" "}
              <Input
                Icon={<FaSearch />}
                name={"search"}
                placeholder={"Search customer..."}
                setValues={setSearch}
              />
            </div>
            <Link
              to={"/add_customer"}
              className="relative inline-block text-lg group mt-[16px]"
            >
              <button className="relative rounded px-5 py-2 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">+ADD</span>
              </button>
            </Link>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Email</Th>
                <Th>Brach ID</Th>
                <Th>Due Payment</Th>

                <Th>FirstName</Th>
                <Th> LastName</Th>
                <Th> Phone </Th>
                <Th>PayTerm</Th>
                <Th> Credit Limit</Th>
                <Th>Opening Balance </Th>
                <Th>Member ShiprId</Th>
                <Th> Point</Th>
                <Th>PointAmount </Th>
                <Th>Department</Th>
                <Th>Address</Th>
                <Th> City</Th>
                <Th>State </Th>
                <Th>ZipCode </Th>
                <Th>Alternate Phone</Th>
                <Th>Family Phone </Th>
                <Th> Tax </Th>
              </THeader>
              <TBody>
                {customerSearch?.data?.map((customer: any) => (
                  <Tbrow key={customer.id}>
                    <Td>
                      <DropAction>
                        <DropActionList>
                          <Link
                            to={""}
                            className="transition-all  delay-100 hover:text-xl"
                            data-container=".view_modal"
                          >
                            <div className="mr-2">
                              <>
                                <button
                                  onClick={() => setModal(true)}
                                  className="flex  items-center"
                                >
                                  <RiEyeFill className="mr-2" />
                                  View
                                </button>
                              </>
                            </div>
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            className="flex items-center gap-2"
                            to={`/edit_customer/${customer?.id}`}
                          >
                            <FaRegEdit />
                            Edit
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={""}
                            className="transition-all  delay-100 hover:text-xl flex"
                            onClick={() => deletecustomer(customer?.id)}
                          >
                            <FaRegTrashCan className="mr-2 mt-[2px]" /> Delete
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={""}
                            className="transition-all  delay-100 hover:text-xl"
                          >
                            <i className="fas fa-truck" aria-hidden="true" />

                            <button
                              onClick={() => setModal2(true)}
                              className="flex  items-center"
                            >
                              <RiEyeFill className="mr-2" />
                              Pay
                            </button>
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${customer?.id}`}
                            className="transition-all  delay-100 hover:text-xl"
                          >
                            <i className="fas fa-print" aria-hidden="true" />{" "}
                            Ledger
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${customer?.id}`}
                            className="transition-all  delay-100 hover:text-xl"
                          >
                            <i className="fas fa-file-alt" aria-hidden="true" />{" "}
                            Sales
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${customer?.id}`}
                            className="transition-all  delay-100 hover:text-xl"
                          >
                            <i className="fas fa-file-alt" aria-hidden="true" />{" "}
                            Documents & Note
                          </Link>
                        </DropActionList>
                      </DropAction>
                    </Td>
                    <Td>{customer?.email}</Td>
                    <Td>{customer?.branch?.branchName} </Td>
                    <Td> </Td>
                    <Td>{customer?.firstName}</Td>
                    <Td>{customer?.lastName}</Td>
                    <Td>{customer?.phone}</Td>
                    <Td>{customer?.peyTerm}</Td>
                    <Td>{customer?.creditLimit}</Td>
                    <Td>{customer?.openingBalance}</Td>

                    <Td>{customer?.memberShiprId}</Td>
                    <Td>{customer?.point}</Td>
                    <Td>{customer?.pointAmount}</Td>
                    <Td>{customer?.department}</Td>
                    <Td>{customer?.address}</Td>
                    <Td>{customer?.city}</Td>
                    <Td>{customer?.state}</Td>
                    <Td>{customer?.zipCode}</Td>
                    <Td>{customer?.alternatePhone}</Td>
                    <Td>{customer?.familyPhone}</Td>
                    <Td>{customer?.tax}</Td>
                    <Modal isModal={modal} width="50vw" height="95vh">
                      <ModalHead
                        title="View customer"
                        setIsModal={() => setModal(false)}
                      />
                      <ModalBody>
                        <h1 className="text-lg font-bold">
                          customer Information
                        </h1>
                        <div className="flex justify-around flex-row-reverse gap-5">
                          <div>
                            <h2 className="text-sm font-semibold text-left">
                              City: {customer?.city}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              State: {customer?.state}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Zip Code: {customer?.zipCode}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Tax: {customer?.tax}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Point Amout: {customer?.pointAmount}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Point: {customer?.point}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Credit Limit: {customer?.creditLimit}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Pay Term: {customer?.peyTerm}
                            </h2>

                            <h2 className="text-sm font-semibold text-left">
                              Opening Balance: {customer?.permanentAddress}
                            </h2>
                            <h2 className="text-sm font-semibold text-left mb-5">
                              Current Address: {customer?.address}
                            </h2>
                          </div>
                          <div>
                            <div className="text-left text-sm mt-4 flex flex-col gap-2">
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Name: {customer?.firstName} {customer?.lastName}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                E-mail: {customer?.email}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Branch ID: {customer?.branchId}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Phone Number: {customer?.phone}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Alternate contact number:{" "}
                                {customer?.alternatePhone}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Family contact number: {customer?.familyPhone}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  </Tbrow>
                ))}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>

      <Modal isModal={modal2} width="50vw" height="95vh">
        <ModalHead title="View customer" setIsModal={() => setModal2(false)} />
        <ModalBody>
          <h1 className="text-lg font-bold">Add Payment</h1>
          <form>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={""}
                name={"saleDate"}
                type={"date"}
                errors={errors}
              />
            </div>
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
                      <div className="">
                        <Select
                          name="payments"
                          setValue={setValue}
                          label="Payment Type"
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
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        placeholder="Pay term"
                        labelColor="text-black"
                        name={"paymentTaka"}
                        register={register}
                        label={"0.00"}
                        type={"number"}
                        required
                        errors={errors}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-red-700 text-white py-2 px-3 rounded-md ml-1"
                      onClick={() => handleRemoveField(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setModal2(false)}
              className="bg-brand text-white py-2 px-3 rounded-md mr-1"
            >
              Pay
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DueCollectionPage;
