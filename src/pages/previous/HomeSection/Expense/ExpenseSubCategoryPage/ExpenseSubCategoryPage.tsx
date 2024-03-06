import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useAddExpenseSubCategoryMutation,
  useDeleteExpenseSubCategoryMutation,
  useGetAllExpenseSubCategoryQuery,
  useUpdateExpenseSubCategoryMutation,
} from "@/store/expense_sub_category/expense_sub_category";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpenseSubCategorySchema } from "@/schemas/expense/expense_sub_category_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { AiOutlineLoading } from "react-icons/ai";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import Pagination from "@/components/previous/all/Pagination";
import { actionManager } from "@/utils/helpers/actionManager";

const ExpenseSubCategoryPage = () => {
  const { toast } = useToast() as any;
  const [modal1, setModal1] = useState(null);
  const [modal2, setModal2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [createExpenseSubCategory, { isLoading: isAddSubCategory }] =
    useAddExpenseSubCategoryMutation() as any;

  const [editExpenseSubCategory, { isLoading: isEditing }] =
    useUpdateExpenseSubCategoryMutation();

  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteExpenseSubCategoryMutation() as any;

  const { data: getSubCategory, isLoading: isGetSubCategory } =
    useGetAllExpenseSubCategoryQuery(undefined);

  const { data: categories } = useGetAllExpenseCategoryQuery(undefined);

  const {
    register: addReg,
    handleSubmit: handleAdd,
    formState: { errors: addErr },
    setValue: setValueAdd,
    reset: resetAdd,
    clearErrors: err,
  } = useForm({ resolver: yupResolver(ExpenseSubCategorySchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(ExpenseSubCategorySchema) });

  const handleAddSubCategory = async (data: any) => {
    try {
      const result = await createExpenseSubCategory(data);
      if (result?.data?.data && result?.data?.success === true) {
        toast.success(result?.data?.message);
        setModal2(false);
        resetAdd();
        err();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleEditSubCategory = async (data: any) => {
    try {
      const result = (await editExpenseSubCategory({
        id: modal1,
        data,
      })) as any;
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        setModal1(null);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  if (isGetSubCategory) {
    return <DataLoader />;
  }
  if (isDeleting) {
    toast.success("Sub Category Deleted Successfully");
  }
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Expense Sub Categories</span>{" "}
          <span className="font-light">Manage your Expense Sub Categories</span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 py-5 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center lg:flex-row flex-col lg:justify-start justify-center gap-3 ml-6 mt-5">
            <div>
              <Button
                bgColor="bg-[#163020]"
                bgHoverColor="hover:bg-[#255f3c]"
                rounded="rounded-md"
              >
                <BsFiletypeCsv />
                CSV
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#097640]"
                bgHoverColor="hover:bg-[#287647]"
                rounded="rounded-md"
              >
                <FaRegFilePdf />
                Excel
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#0069D9]"
                bgHoverColor="hover:bg-[#2466ac]"
                rounded="rounded-md"
              >
                <IoPrintOutline />
                Pribt
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#18B294]"
                bgHoverColor="hover:bg-[#2d9d87]"
                rounded="rounded-md"
              >
                <CiViewColumn />
                Column
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#527853]"
                bgHoverColor="hover:bg-[#70ae71]"
                rounded="rounded-md"
              >
                <VscFilePdf />
                PDF
              </Button>
            </div>
          </div>
          <div className="">
            <div className="mt-4 mr-5 flex">
              <div className="">
                {actionManager(["manager"]) && (
                  <Button handleClick={() => setModal2(true)}>+Add</Button>
                )}
                <Modal
                  isModal={modal2}
                  modal_bg="bg-[#ffffff7e]"
                  width="w-[400px]"
                  height="h-fit"
                >
                  <ModalHead
                    title={"Add Sub Category"}
                    setIsModal={() => setModal2(false)}
                  />
                  <form>
                    <ModalBody>
                      <div className="mb-3">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={addReg}
                          name={"name"}
                          label={"Sub Category Name"}
                          type={"text"}
                          errors={addErr}
                        />
                      </div>
                      <div>
                        <div className="w-[100%]">
                          <Select
                            label="select Category Name"
                            setValue={setValueAdd}
                            name="expenseCategoryId"
                          >
                            {categories?.data?.map((category: any) => (
                              <Option key={category?.id} value={category?.id}>
                                {category?.name}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </ModalBody>
                  </form>
                  <ModalFooter>
                    <div className="flex gap-3">
                      <Button
                        handleClick={handleAdd(handleAddSubCategory)}
                        bgColor="bg-indigo-500"
                        bgHoverColor="hover:bg-indigo-600"
                        rounded="rounded-md"
                      >
                        CREATE
                        {isAddSubCategory && (
                          <span className="animate-spin text-lg flex items-center justify-center">
                            <AiOutlineLoading />
                          </span>
                        )}
                      </Button>
                      <Button
                        bgColor="bg-rose-500"
                        bgHoverColor="hover:bg-rose-600"
                        rounded="rounded-md"
                        handleClick={() => setModal2(false)}
                      >
                        CLOSE
                      </Button>
                    </div>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>
                  <div>Category</div>
                </Th>
                <Th>
                  <div>Sub Category</div>
                </Th>

                <Th>Action</Th>
              </THeader>
              <TBody>
                <>
                  {getSubCategory?.data
                    ?.slice(currentPage * 5 - 5, currentPage * 5)
                    ?.map((ct: any) => (
                      <Tbrow key={ct?.id}>
                        <Td>
                          <div className="text-center">
                            {ct?.expenseCategory?.name}
                          </div>
                        </Td>
                        <Td>
                          <div className="text-center">{ct?.name}</div>
                        </Td>

                        <Td>
                          <div className="flex items-center justify-center">
                            <div className="px-2">
                              <Link to={`/edit_expense_sub_category/${ct?.id}`}>
                                <Button
                                  // handleClick={() => setModal1(ct?.id)}
                                  bgColor="bg-indigo-500"
                                  bgHoverColor="hover:bg-indigo-600"
                                >
                                  <FaRegEdit />
                                  Edit
                                </Button>
                              </Link>
                              <Modal
                                modal_bg="bg-[#ffffff7e]"
                                isModal={modal1}
                                width={"w-[100vw] lg:w-[30vw]"}
                                height={"h-[100vh] lg:h-fit"}
                              >
                                <ModalHead
                                  title="Edit Unit"
                                  setIsModal={() => setModal1(null)}
                                />
                                <ModalBody>
                                  <div className="mb-3">
                                    <InputField
                                      isPassword={false}
                                      isIcon={false}
                                      register={register}
                                      name={"name"}
                                      label={"Sub Category Name"}
                                      type={"text"}
                                      errors={errors}
                                    />
                                  </div>
                                  <div>
                                    <div className="w-[100%]">
                                      <Select
                                        label="select Category Name"
                                        setValue={setValue}
                                        name="expenseCategoryId"
                                      >
                                        {categories?.data?.map(
                                          (category: any) => (
                                            <Option
                                              key={category?.id}
                                              value={category?.id}
                                            >
                                              {category?.name}
                                            </Option>
                                          )
                                        )}
                                      </Select>
                                    </div>
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <div className="flex gap-3">
                                    <Button
                                      handleClick={handleSubmit(
                                        handleEditSubCategory
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
                                      handleClick={() => setModal1(null)}
                                    >
                                      CLOSE
                                    </Button>
                                  </div>
                                </ModalFooter>
                              </Modal>
                            </div>
                            <div>
                              <Button
                                handleClick={() => deleteSubCategory(ct?.id)}
                                bgColor="bg-red-500"
                                bgHoverColor="hover:bg-red-600"
                              >
                                <FaRegTrashCan />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Td>
                      </Tbrow>
                    ))}
                </>
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {getSubCategory?.data?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={getSubCategory?.data?.length}
              totalPage={Math.ceil(getSubCategory?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseSubCategoryPage;
