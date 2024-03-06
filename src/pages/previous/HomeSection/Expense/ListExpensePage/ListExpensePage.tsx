import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import InputField from "@/components/previous/all/InputField";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useEffect, useState } from "react";
import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoryExpensesQuery,
  useGetExpenseQuery,
  useGetSubCategoryExpensesQuery,
  useSearchExpenseQuery,
  useUpdateExpenseMutation,
} from "@/store/expense/expenseApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { addExpenseSchema } from "@/schemas/expense/expense_schema";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/previous/all/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import { Option, Select } from "@/components/previous/all/Select";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "@/components/previous/all/Image";
import DataLoader from "@/components/common/loader/DataLoader";
import { FaRegTrashCan } from "react-icons/fa6";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { actionManager } from "@/utils/helpers/actionManager";

const ListExpensePage = () => {
  const { branchId } = shareBranchAndUserInfo();
  // const [search, setSearch] = useState("");
  const search = "";
  const { toast } = useToast();
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(null);
  const [createExpense, { isLoading: isLoadingAddExpense }] =
    useAddExpenseMutation() as any;

  const { data: getCategoryExpense } = useGetCategoryExpensesQuery(
    undefined
  ) as any;
  const { data: getSubCategoryExpense } = useGetSubCategoryExpensesQuery(
    undefined
  ) as any;

  const { data: getExpense, isLoading: isLoadingExpense } =
    useGetExpenseQuery(undefined);

  const {
    register: AddReg,
    handleSubmit: handleAdd,
    formState: { errors: err },
    setValue: setValues,
    reset: addReset,
  } = useForm({ resolver: yupResolver(addExpenseSchema) });
  const {
    register: editReg,
    handleSubmit: handleEdit,
    formState: { errors: error },
    setValue: setEditValues,
    reset: editReset,
  } = useForm({ resolver: yupResolver(addExpenseSchema) });
  const handleAddExpense = async (data: any) => {
    if (data?.date) {
      data.date = new Date(data?.date);
    }
    data.branchId = branchId;

    try {
      const result = await createExpense(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal1(false);
        toast({
          description: result?.data?.message,
        });
        addReset();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const { data: searchExpense, isLoading: isSearching } = useSearchExpenseQuery(
    search
  ) as any;
  const [
    deleteExpense,
    { data: Delete, isLoading: isDeleting, isSuccess: isDelete },
  ] = useDeleteExpenseMutation({}) as any;
  const [
    editExpense,
    { data: editData, isLoading: isEditing, isSuccess: isEdited },
  ] = useUpdateExpenseMutation({}) as any;

  useEffect(() => {}, []);

  const expense = searchExpense?.data?.map((ex: any) => {
    const findSubCategoryExpense = getSubCategoryExpense?.data?.find(
      (sep: any) => sep?.id === ex?.expenseSubcategoryId
    );
    const findCategoryExpense = getCategoryExpense?.data?.find(
      (p: any) => p?.id === ex?.expenseCategoryId
    );
    return {
      ...ex,
      subCategoryExpense: findSubCategoryExpense,
      categoryExpense: findCategoryExpense,
    };
  });

  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  const handleEditExpense = async (data: any) => {
    if (data?.date) {
      data.date = new Date(data?.date);
    }
    try {
      const result = await editExpense({ id: modal2, data });
      if (result?.data?.data && result?.data?.success === true) {
        setModal2(null);
        toast({
          description: result?.data?.message,
        });
        editReset();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isDelete) {
      toast({
        description: Delete?.message,
      });
    }
    if (isEdited) {
      toast({
        description: editData?.message,
      });
    }
  }, [isDelete, isEdited, toast, Delete?.message, editData?.message]);

  if (isLoadingExpense) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-4 ">
          <span className="text-3xl font-bold">Expense List</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
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
              label={"Sub category"}
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
              label={"Expense for"}
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
              label={"Contact"}
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
              label={"Payment Status"}
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
              label={"Expense Category"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="mb-10"></div>
        </div>
      </div>
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

            <div className="">
              {actionManager(["manager"]) && (
                <Button handleClick={() => setModal1(true)}>+Add</Button>
              )}
              <Modal
                modal_bg="bg-[#ffffff7e]"
                isModal={modal1}
                width={"w-[100vw] lg:w-[50vw]"}
                height={"h-[100vh] lg:h-fit"}
              >
                <ModalHead
                  title="Add Expense"
                  setIsModal={() => setModal1(false)}
                />
                <ModalBody>
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"name"}
                        register={AddReg}
                        label={"Name*"}
                        type={"text"}
                        errors={err}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"date"}
                        register={AddReg}
                        label={"Expense Date"}
                        type={"date"}
                        errors={err}
                      />{" "}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"image"}
                        register={AddReg}
                        label={"Image"}
                        type={"text"}
                        errors={err}
                      />{" "}
                    </div>
                    <div className="w-full">
                      <Select
                        setValue={setValues}
                        name="expenseCategoryId"
                        label="Select Expense Category*"
                      >
                        {getCategoryExpense?.data?.map((ce: any) => (
                          <Option key={ce?.id} value={ce?.id}>
                            {ce?.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col">
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"totalAmount"}
                        register={AddReg}
                        label={"Total Amount*"}
                        type={"number"}
                        errors={err}
                      />
                    </div>
                    <div className="w-full">
                      <Select
                        setValue={setValues}
                        name="expenseSubcategoryId"
                        label="Select Expense Sub Category*"
                      >
                        {getSubCategoryExpense?.data?.map((sce: any) => (
                          <Option key={sce?.id} value={sce?.id}>
                            {sce?.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex gap-3">
                    <Button
                      handleClick={handleAdd(handleAddExpense)}
                      bgColor="bg-indigo-500"
                      bgHoverColor="hover:bg-indigo-600"
                      rounded="rounded-md"
                    >
                      CREATE
                      {isLoadingAddExpense && (
                        <span className="animate-spin text-lg flex items-center justify-center">
                          <AiOutlineLoading />
                        </span>
                      )}
                    </Button>
                    <Button
                      bgColor="bg-rose-500"
                      bgHoverColor="hover:bg-rose-600"
                      rounded="rounded-md"
                      handleClick={() => setModal1(false)}
                    >
                      CLOSE
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Expense Name</Th>
                <Th>Image</Th>
                <Th>Purchase Date</Th>
                <Th>Sub Expense Category</Th>
                <Th>Expense Category</Th>
                <Th>Total Amount</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {isSearching ? (
                  <div className="flex items-center gap-4 text-center text-blue-500 transition-colors">
                    Searching ...
                  </div>
                ) : (
                  <>
                    {getExpense &&
                      expense?.map((ex: any) => (
                        <Tbrow key={ex?.id}>
                          <Td>
                            <div className="text-left">{ex?.name}</div>
                          </Td>
                          <Td>
                            <div className="flex items-center justify-center">
                              <Image
                                divClass={
                                  "w-10 h-10 p-[2px] rounded-lg shadow-md shadow-brand4 drop-shadow-md"
                                }
                                imgClass={"w-full h-full rounded-lg"}
                                src={ex?.image}
                                alt="product image"
                              />
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">
                              {/* {moment(ex?.date).format("L")} */}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">
                              {ex?.subCategoryExpense?.name}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">
                              {ex?.categoryExpense?.name}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">{ex?.totalAmount}</div>
                          </Td>
                          <Td>
                            {" "}
                            <div className="flex items-center justify-around">
                              <div>
                                <Button
                                  handleClick={() => setModal2(ex?.id)}
                                  bgColor="bg-indigo-500"
                                  bgHoverColor="hover:bg-indigo-600"
                                >
                                  <FaRegEdit />
                                  Edit
                                </Button>
                                <Modal
                                  modal_bg="bg-[#ffffff7e]"
                                  isModal={modal2}
                                  width={"w-[100vw] lg:w-[50vw]"}
                                  height={"h-[100vh] lg:h-fit"}
                                >
                                  <ModalHead
                                    title="Edit Expense"
                                    setIsModal={() => setModal2(null)}
                                  />
                                  <ModalBody>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          name={"name"}
                                          register={editReg}
                                          label={"Name*"}
                                          type={"text"}
                                          errors={error}
                                        />
                                      </div>
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          name={"date"}
                                          register={editReg}
                                          label={"Expense Date"}
                                          type={"date"}
                                          errors={error}
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          name={"image"}
                                          register={editReg}
                                          label={"Image"}
                                          type={"text"}
                                          errors={error}
                                        />{" "}
                                      </div>
                                      <div className="w-full">
                                        <Select
                                          setValue={setEditValues}
                                          name="expenseCategoryId"
                                          label="Select Expense Category*"
                                        >
                                          {getCategoryExpense?.data?.map(
                                            (ce: any) => (
                                              <Option
                                                key={ce?.id}
                                                value={ce?.id}
                                              >
                                                {ce?.name}
                                              </Option>
                                            )
                                          )}
                                        </Select>
                                      </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col">
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          name={"totalAmount"}
                                          register={editReg}
                                          label={"Total Amount*"}
                                          type={"number"}
                                          errors={error}
                                        />
                                      </div>
                                      <div className="w-full">
                                        <Select
                                          setValue={setEditValues}
                                          name="expenseSubcategoryId"
                                          label="Select Expense Sub Category*"
                                        >
                                          {getSubCategoryExpense?.data?.map(
                                            (sce: any) => (
                                              <Option
                                                key={sce?.id}
                                                value={sce?.id}
                                              >
                                                {sce?.name}
                                              </Option>
                                            )
                                          )}
                                        </Select>
                                      </div>
                                    </div>
                                  </ModalBody>
                                  <ModalFooter>
                                    <div className="flex items-center gap-3">
                                      <Button
                                        handleClick={handleEdit(
                                          handleEditExpense
                                        )}
                                        bgColor="bg-indigo-500"
                                        bgHoverColor="hover:bg-indigo-600"
                                        rounded="rounded-md"
                                      >
                                        EDIT
                                        {isEditing && (
                                          <span className="animate-spin text-lg flex items-center justify-center">
                                            <AiOutlineLoading />
                                          </span>
                                        )}
                                      </Button>
                                      <Button
                                        bgColor="bg-rose-500"
                                        bgHoverColor="hover:bg-rose-600"
                                        rounded="rounded-md"
                                        handleClick={() => setModal2(null)}
                                      >
                                        CLOSE
                                      </Button>
                                    </div>
                                  </ModalFooter>
                                </Modal>
                              </div>
                              <div>
                                <Button
                                  handleClick={() => deleteExpense(ex?.id)}
                                  bgColor="bg-red-500"
                                  bgHoverColor="hover:bg-red-600"
                                >
                                  <FaRegTrashCan />
                                  Delete
                                  {isDeleting && (
                                    <span className="animate-spin text-lg flex items-center justify-center">
                                      <AiOutlineLoading />
                                    </span>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Td>
                        </Tbrow>
                      ))}
                  </>
                )}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default ListExpensePage;
