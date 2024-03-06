import DataLoader from "@/components/common/loader/DataLoader";
import {
  DropAction,
  DropActionList,
} from "@/components/previous/all/DropAction";
import Input from "@/components/previous/all/Input";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import { Option, Select } from "@/components/previous/all/Select";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { toast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useSearchCustomerQuery,
} from "@/store/customer/customerApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaFileAlt, FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosPrint } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { RiEyeFill } from "react-icons/ri";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ListCustomersPage = () => {
  // const { taost } = useToast();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  // const { data: branchData } = useGetBranchQuery();
  const { data: accounts, isLoading: isLoadingGetAcc } =
    useGetAccountsQuery("All");
  const {
    // data: customerData,
    // isError,
    isLoading,
    // isSuccess: customerSuccess,
  } = useGetCustomersQuery(undefined);
  const { data: customerSearch } = useSearchCustomerQuery(search);

  const {
    register,
    // handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [
    deleteCustomer,
    {
      // isError: isDeleteError,
      // error: deleteError,
      isSuccess: isDeleteCustomer,
    },
  ] = useDeleteCustomerMutation({});
  if (isDeleteCustomer) {
    toast({
      description: "Customer Deleted Successfully",
    });
  }

  // const customer = customerSearch?.data?.map((da) => {
  //   const findBranch = branchData?.data?.find(
  //     (branch) => branch?.id === da?.branchId
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

  if (isLoadingGetAcc || isLoading) {
    return <DataLoader />;
  }
  return (
    <div>
      <div>
        <h1 className="my-5 ml-12">
          <span className="text-3xl font-bold">Customers List</span>{" "}
          <span className="font-light text-lg">Manage your Customers List</span>
        </h1>
      </div>
      {/* <div className="w-[95%] mx-auto mb-10 bg-slate-100 border-t-2 pt-5 border-brand flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Client/Company"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Name: Client/Company"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Number"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Mobile Number:"}
            name={"number"}
            type={"number"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Member ID"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Member ship ID:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Point:"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Point:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Point Amount:"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Point Amount:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
      </div> */}
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
            {actionManager(["manager"]) && (
              <Link
                to={"/add_customer"}
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
                <Th>Action</Th>
                <Th>Email</Th>
                {/* <Th>Brach ID</Th> */}
                <Th>FirstName</Th>
                <Th> LastName</Th>
                <Th> Phone </Th>
                <Th>PayTerm</Th>
                <Th> Credit Limit</Th>
                <Th>Opening Balance </Th>
                <Th>Member Ship Id</Th>
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
                {customerSearch?.data?.map((Customer: any) => (
                  <Tbrow key={Customer?.id}>
                    <Td>
                      <DropAction>
                        <DropActionList onClick={() => setModal(true)}>
                          View
                          <RiEyeFill className="text-base" />
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/edit_customer/${Customer?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Edit
                            <FaRegEdit className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList
                          onClick={() => deleteCustomer(Customer?.id)}
                        >
                          Delete
                          <FaRegTrashCan className="text-base" />
                        </DropActionList>
                        <DropActionList onClick={() => setModal2(true)}>
                          Pay
                          <RiEyeFill className="text-base" />
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${Customer?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Ledger
                            <IoIosPrint className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${Customer?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Purchases
                            <BiSolidPurchaseTagAlt className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${Customer?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Sales
                            <MdSell className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${Customer?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Documents & Note
                            <FaFileAlt className="text-base" />
                          </Link>
                        </DropActionList>
                      </DropAction>
                    </Td>
                    <Td>{Customer?.email}</Td>
                    {/* <Td>{Customer?.branch?.branchName} </Td> */}
                    <Td>{Customer?.firstName}</Td>
                    <Td>{Customer?.lastName}</Td>
                    <Td>{Customer?.phone}</Td>
                    <Td>{Customer?.peyTerm}</Td>
                    <Td>{Customer?.creditLimit}</Td>
                    <Td>{Customer?.openingBalance}</Td>
                    <Td>{Customer?.memberShiprId}</Td>
                    <Td>{Customer?.point}</Td>
                    <Td>{Customer?.pointAmount}</Td>
                    <Td>{Customer?.department}</Td>
                    <Td>{Customer?.address}</Td>
                    <Td>{Customer?.city}</Td>
                    <Td>{Customer?.state}</Td>
                    <Td>{Customer?.zipCode}</Td>
                    <Td>{Customer?.alternatePhone}</Td>
                    <Td>{Customer?.familyPhone}</Td>
                    <Td>{Customer?.tax}</Td>
                    <Modal isModal={modal} width="50vw" height="95vh">
                      <ModalHead
                        title="View Customer"
                        setIsModal={() => setModal(false)}
                      />
                      <ModalBody>
                        <h1 className="text-lg font-bold">
                          Customer Information
                        </h1>
                        <div className="flex justify-around flex-row-reverse gap-5">
                          <div>
                            <h2 className="text-sm font-semibold text-left">
                              City: {Customer?.city}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              State: {Customer?.state}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Zip Code: {Customer?.zipCode}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Tax: {Customer?.tax}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Point Amout: {Customer?.pointAmount}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Point: {Customer?.point}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Credit Limit: {Customer?.creditLimit}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Pay Term: {Customer?.peyTerm}
                            </h2>

                            <h2 className="text-sm font-semibold text-left">
                              Opening Balance: {Customer?.permanentAddress}
                            </h2>
                            <h2 className="text-sm font-semibold text-left mb-5">
                              Current Address: {Customer?.address}
                            </h2>
                          </div>
                          <div>
                            <div className="text-left text-sm mt-4 flex flex-col gap-2">
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Name: {Customer?.firstName} {Customer?.lastName}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                E-mail: {Customer?.email}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Branch ID: {Customer?.branchId}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Phone Number: {Customer?.phone}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Alternate contact number:{" "}
                                {Customer?.alternatePhone}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Family contact number: {Customer?.familyPhone}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter></ModalFooter>
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
        <ModalHead title="View Customer" setIsModal={() => setModal2(false)} />
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
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default ListCustomersPage;
