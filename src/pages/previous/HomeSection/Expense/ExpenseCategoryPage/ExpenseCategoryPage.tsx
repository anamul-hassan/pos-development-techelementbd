import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
} from "@/store/expense_category/expenseCategoryApi";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpenseCategorySchema } from "@/schemas/expense/expense_category_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import InputField from "@/components/previous/all/InputField";
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

const ExpenseCategoryPage = () => {
  const { toast } = useToast() as any;
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [createCategory, { isLoading: isLoadingCategory }] =
    useAddExpenseCategoryMutation() as any;

  const [editCategory, { isLoading: isEditing }] =
    useUpdateExpenseCategoryMutation() as any;

  const {
    data: expenseCategory,
    isError,
    isLoading: isGetCategory,
  } = useGetAllExpenseCategoryQuery(undefined);

  const [
    deleteCategory,
    {
      data: deleteExpenseCategory,
      // isError: isDeleteError,
      // error: deleteError,
      isSuccess: isDeleteCategory,
    },
  ] = useDeleteExpenseCategoryMutation();
  // Delete user
  if (isDeleteCategory) {
    toast({
      description: deleteExpenseCategory?.message,
    });
  }
  const {
    register: updateRegister,
    handleSubmit: handleUpdateCategory,
    // formState: { errors },
    // updateReset,
    clearErrors,
  } = useForm({ resolver: yupResolver(ExpenseCategorySchema) });

  const handleEditBrand = async (data: any) => {
    try {
      const result = await editCategory({ id: modal1, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast.success(result?.data?.message);
        setModal1(false);
        // updateReset();
        clearErrors();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const {
    register: addRegister,
    handleSubmit: handleAddCategory,
    formState: { errors: error },
    // setValue,
    reset: addReset,
  } = useForm({ resolver: yupResolver(ExpenseCategorySchema) });

  const handleCreateCategory = async (data: any) => {
    try {
      const result = await createCategory(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal(false);
        toast.success(result?.data?.message);
        addReset();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  if (isGetCategory) {
    return <DataLoader />;
  }
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[55px]">
          <span className="text-3xl font-bold">Expense Category</span>{" "}
          <span className="font-light text-lg">
            Manage your Expense Category
          </span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex mt-10 ml-7">
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
            <div className="mt-[14px]">
              {actionManager(["manager"]) && (
                <Button handleClick={() => setModal(true)}>+Add</Button>
              )}
              <Modal isModal={modal} width={"w-[35vw]"} height={"h-fit"}>
                <ModalHead
                  title="Add Category"
                  setIsModal={() => setModal(false)}
                />
                <form>
                  <ModalBody>
                    <div className="">
                      <div className="w-full mb-3">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"name"}
                          register={addRegister}
                          label={"Expense Category Name*"}
                          type={"text"}
                          errors={error}
                        />{" "}
                      </div>
                    </div>{" "}
                  </ModalBody>
                </form>

                <ModalFooter>
                  <div className="flex gap-3">
                    <Button
                      handleClick={handleAddCategory(handleCreateCategory)}
                      bgColor="bg-indigo-500"
                      bgHoverColor="hover:bg-indigo-600"
                      rounded="rounded-md"
                    >
                      CREATE
                      {isLoadingCategory && (
                        <span className="animate-spin text-lg flex items-center justify-center">
                          <AiOutlineLoading />
                        </span>
                      )}
                    </Button>
                    <Button
                      bgColor="bg-rose-500"
                      bgHoverColor="hover:bg-rose-600"
                      rounded="rounded-md"
                      handleClick={() => setModal(false)}
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
                <Th>Category Name</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {!isError &&
                  expenseCategory?.data
                    ?.slice(currentPage * 5 - 5, currentPage * 5)
                    ?.map((category: any) => (
                      <Tbrow key={category?.id}>
                        <Td>{category?.name}</Td>
                        <Td>
                          <div className="flex justify-center">
                            <div className="mr-2">
                              <Link
                                to={`/edit_expense_categoryedit/${category?.id}`}
                              >
                                <Button
                                  // handleClick={() => setModal1(category?.id)}
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
                                  setIsModal={() => setModal1(false)}
                                />
                                <ModalBody>
                                  <div className="">
                                    <div className="w-full mb-3">
                                      <InputField
                                        isPassword={false}
                                        isIcon={false}
                                        name={"name"}
                                        register={updateRegister}
                                        label={"Category Name*"}
                                        type={"text"}
                                        errors={error}
                                      />{" "}
                                    </div>
                                  </div>{" "}
                                </ModalBody>
                                <ModalFooter>
                                  <div className="flex gap-3">
                                    <Button
                                      handleClick={handleUpdateCategory(
                                        handleEditBrand
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
                                      handleClick={() => setModal1(false)}
                                    >
                                      CLOSE
                                    </Button>
                                  </div>
                                </ModalFooter>
                              </Modal>
                            </div>

                            <div>
                              <div>
                                <Button
                                  handleClick={() =>
                                    deleteCategory(category?.id)
                                  }
                                  bgColor="bg-red-500"
                                  bgHoverColor="hover:bg-red-600"
                                >
                                  <FaRegTrashCan />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Td>
                      </Tbrow>
                    ))}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {expenseCategory?.data?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={expenseCategory?.data?.length}
              totalPage={Math.ceil(expenseCategory?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCategoryPage;
