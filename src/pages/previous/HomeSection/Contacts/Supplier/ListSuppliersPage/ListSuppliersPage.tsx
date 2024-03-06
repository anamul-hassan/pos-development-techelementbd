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
import { useToast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import {
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
  useSearchSupplierQuery,
} from "@/store/supplier/supplierApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { useEffect, useState } from "react";
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

const ListSuppliersPage = () => {
  const { toast } = useToast();
  const { isLoading: supplierLoading } = useGetSuppliersQuery(undefined) as any;

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const { data: supplierSearch } = useSearchSupplierQuery(search) as any;

  const {
    register,
    // handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { data: accounts, isLoading: isLoadingGetAcc } = useGetAccountsQuery(
    "All"
  ) as any;

  const [deleteUser, { isSuccess: isDeleteUser }] = useDeleteSupplierMutation(
    {}
  ) as any;

  useEffect(() => {
    if (isDeleteUser) {
      toast({
        description: "User deleted successfully",
      });
    }
  }, [isDeleteUser, toast]);

  // const user = supplierSearch?.data?.map((da) => {
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

  if (supplierLoading || isLoadingGetAcc) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-5 ml-12">
          <span className="text-3xl font-bold">Supplier List</span>{" "}
          <span className="font-light">Manage your Supplier List</span>
        </h1>
      </div>
      {/* <div className="w-[95%] mx-auto mb-10 bg-slate-100 border-t-2 pt-5 border-brand flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Supplier"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={" Supplier Name:"}
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
            placeholder="Company "
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Company Name:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Email"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Email:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            placeholder="Due Amount"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            label={"Due Amount:"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
      </div> */}
      <div className="w-[95%] mx-auto bg-slate-100  border-t-2 pt-3 border-brand pb-10 shadow-xl rounded">
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
            <div className=" ml-2 mt-4">
              {" "}
              <Input
                Icon={<FaSearch />}
                name={"search"}
                placeholder={"Search user..."}
                setValues={setSearch}
              />
            </div>
            {actionManager(["manager"]) && (
              <Link
                to={"/add_supplier"}
                className="relative inline-block text-lg group mt-[16px] ml-2 "
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
                {/* <Th>Branch</Th> */}
                <Th>FirstName</Th>
                <Th> LastName</Th>
                <Th> Phone </Th>
                <Th> Tax </Th>
                <Th>OpeningBalance </Th>
                <Th>Advance Balance</Th>

                <Th>PeyTerm </Th>

                <Th>Address</Th>
                <Th> City</Th>
                <Th>State </Th>
                <Th>ZipCode </Th>

                <Th>MemberShiprId</Th>

                <Th>Paid Status</Th>
              </THeader>
              <TBody>
                {supplierSearch?.data?.map((user: any) => (
                  <Tbrow key={user.id}>
                    <Td>
                      <DropAction>
                        <DropActionList onClick={() => setModal(true)}>
                          View
                          <RiEyeFill className="text-base" />
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/edit_supplier/${user?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Edit
                            <FaRegEdit className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList onClick={() => deleteUser(user?.id)}>
                          Delete
                          <FaRegTrashCan className="text-base" />
                        </DropActionList>
                        <DropActionList onClick={() => setModal2(true)}>
                          Pay
                          <RiEyeFill className="text-base" />
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${user?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Ledger
                            <IoIosPrint className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${user?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Purchases
                            <BiSolidPurchaseTagAlt className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${user?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Sales
                            <MdSell className="text-base" />
                          </Link>
                        </DropActionList>
                        <DropActionList>
                          <Link
                            to={`/view/${user?.id}`}
                            className="flex items-center justify-between w-full h-full"
                          >
                            Documents & Note
                            <FaFileAlt className="text-base" />
                          </Link>
                        </DropActionList>
                      </DropAction>
                    </Td>
                    <Td>{user?.email} </Td>
                    {/* <Td>{user?.branch?.branchName} </Td> */}
                    <Td>{user?.firstName}</Td>
                    <Td>{user?.lastName}</Td>
                    <Td>{user?.phone}</Td>
                    <Td>{user?.tax}</Td>
                    <Td>{user?.openingBalance}</Td>
                    <Td>{user?.advanceAmount}</Td>
                    <Td>{user?.peyTerm}</Td>

                    <Td>{user?.address}</Td>
                    <Td>{user?.city}</Td>
                    <Td>{user?.state}</Td>
                    <Td>{user?.zipCode}</Td>

                    <Td>{user?.memberShipId}</Td>
                    <Td>{user?.paidStatus}</Td>
                    <Modal isModal={modal} width="50vw" height="95vh">
                      <ModalHead
                        title="View Supplier"
                        setIsModal={() => setModal(false)}
                      />
                      <ModalBody>
                        <h1 className="text-lg font-bold">
                          Supplier Information
                        </h1>
                        <div className="flex justify-around flex-row-reverse gap-5">
                          <div>
                            <h2 className="text-sm font-semibold text-left">
                              City: {user?.city}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              State: {user?.state}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Zip Code: {user?.zipCode}
                            </h2>
                            <h2 className="text-sm font-semibold text-left">
                              Tax: {user?.tax}
                            </h2>

                            <h2 className="text-sm font-semibold text-left">
                              Pay Term: {user?.peyTerm}
                            </h2>

                            <h2 className="text-sm font-semibold text-left">
                              Opening Balance: {user?.permanentAddress}
                            </h2>
                            <h2 className="text-sm font-semibold text-left mb-5">
                              Current Address: {user?.address}
                            </h2>
                          </div>
                          <div>
                            <div className="text-left text-sm mt-4 flex flex-col gap-2">
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Name: {user?.firstName} {user?.lastName}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                E-mail: {user?.email}
                              </h2>
                              <h2 className="px-1 py-1 bg-[#f7f7f7cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                Branch ID: {user?.branchId}
                              </h2>
                              <h2 className="text-sm font-semibold text-left">
                                Phone Number: {user?.phone}
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
        <ModalHead title="View user Pay" setIsModal={() => setModal2(false)} />
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

export default ListSuppliersPage;
