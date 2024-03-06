import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import Input from "@/components/previous/all/Input";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import Pagination from "@/components/previous/all/Pagination";
import SearchLoading from "@/components/previous/all/SearchLoading";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { productCategorySchema } from "@/schemas/product/product_category_schema";
import {
  useAddProductCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllProductCategoriesQuery,
  useGetProductBySearchQuery,
  useUpdateCategoryMutation,
} from "@/store/product_category/productCategoryApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { toast } = useToast();
  const [modal1, setModal1] = useState(null);
  const [modal2, setModal2] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addCategory, { isLoading: isLoadingCreateProductCategory }] =
    useAddProductCategoryMutation({}) as any;
  const {
    data: categories,
    isLoading: isGetAllCategoryLoading,
    error: getAllError,
    isError: isGetAllError,
    isSuccess: isGetAllSuccess,
  } = useGetAllProductCategoriesQuery(undefined) as any;

  const { data: searchCategory, isLoading: isGetWithSearchLoading } =
    useGetProductBySearchQuery(search) as any;

  const [
    deleteCategory,
    { data: isDelete, isSuccess: isSuccessDeleteCategory },
  ] = useDeleteCategoryMutation({}) as any;

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
  };

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      toast({
        description: isDelete?.message,
      });
    }
  }, [isSuccessDeleteCategory, toast, isDelete]);

  const [updateCategory, { isLoading: isLoadingUpdateCategory }] =
    useUpdateCategoryMutation({}) as any;
  const {
    register: addRegister,
    handleSubmit: handleAddCategory,
    formState: { errors: error },
    // setValue,
    reset: addReset,
  } = useForm({ resolver: yupResolver(productCategorySchema) });
  const {
    register: updateRegister,
    handleSubmit: handleUpdateCategory,
    formState: { errors: err },
  } = useForm({ resolver: yupResolver(productCategorySchema) });

  const handleCreateProductCategory = async (data: any) => {
    try {
      const result = await addCategory(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal2(false);
        toast({
          description: result?.data?.message,
        });
        addReset();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleUpdateProductCategory = async (data: any) => {
    try {
      const result = await updateCategory({ id: modal1, data });
      if (result?.data?.data && result?.data?.success === true) {
        setModal1(null);
        toast({
          description: result?.message,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (isGetAllCategoryLoading) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-8">
          <span className="text-3xl font-bold">Categories </span>{" "}
          <span className="font-light text-lg">Manage your categories</span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}

        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center lg:flex-row flex-col lg:justify-start justify-center gap-3 ml-6 mt-5 pt-4">
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
          <div>
            <div className="mt-4 mr-5">
              <div className="mt-4 mr-5 flex">
                <div className="mr-5">
                  {" "}
                  <Input
                    name="search"
                    placeholder="Category Search..."
                    setValues={setSearch}
                    Icon={<FaSearch />}
                  ></Input>
                </div>
                <div className="">
                  {actionManager(["manager"]) && (
                    <Button handleClick={() => setModal2(true)}>+Add</Button>
                  )}
                  <Modal isModal={modal2} width={"30vw"} height={"24vh"}>
                    <ModalHead
                      title="Add "
                      setIsModal={() => setModal2(false)}
                    />
                    <form>
                      <ModalBody>
                        <div className="">
                          <div className="w-full space-y-4">
                            <InputField
                              isPassword={false}
                              isIcon={false}
                              name={"categoryName"}
                              register={addRegister}
                              label={"Category Name*"}
                              type={"text"}
                              errors={error}
                            />{" "}
                            <InputField
                              isPassword={false}
                              isIcon={false}
                              name={"categoryCode"}
                              register={addRegister}
                              label={"Category Code"}
                              type={"text"}
                              errors={error}
                            />{" "}
                            <InputField
                              isPassword={false}
                              isIcon={false}
                              name={"description"}
                              register={addRegister}
                              label={"Description"}
                              type={"text"}
                              errors={error}
                            />{" "}
                          </div>
                        </div>
                      </ModalBody>
                    </form>

                    <ModalFooter>
                      <div className="flex gap-3">
                        <Button
                          handleClick={handleAddCategory(
                            handleCreateProductCategory
                          )}
                          bgColor="bg-indigo-500"
                          bgHoverColor="hover:bg-indigo-600"
                          rounded="rounded-md"
                        >
                          CREATE
                          {isLoadingCreateProductCategory && (
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
        </div>
        {/* Top side area */}
        {/* tabel area */}
        {/* table area */}

        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] mx-auto mt-5 h-fit">
            <Table>
              <THeader>
                <Th>Category Name</Th>
                <Th>Category Code</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {isGetWithSearchLoading ? (
                  <div className="flex items-center gap-4">
                    Searching <SearchLoading />
                  </div>
                ) : (
                  <>
                    {!isGetAllError &&
                      !getAllError &&
                      isGetAllSuccess &&
                      categories?.data?.length > 0 &&
                      searchCategory?.data?.length > 0 &&
                      searchCategory?.data
                        ?.slice(currentPage * 5 - 5, currentPage * 5)
                        ?.map((category: any) => (
                          <Tbrow key={category?.id}>
                            <Td>{category?.categoryName}</Td>{" "}
                            <Td>{category?.categoryCode}</Td>{" "}
                            <Td>{category?.description}</Td>{" "}
                            <Td>
                              <div className="flex items-center justify-around gap-2">
                                <div>
                                  <Link to={`/edit_category/${category?.id}`}>
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
                                    isModal={modal1}
                                    modal_bg="bg-[#ffffff7e]"
                                    width="w-[400px]"
                                    height="h-fit"
                                  >
                                    <ModalHead
                                      title={"Update Category"}
                                      setIsModal={() => setModal1(null)}
                                    />
                                    <form>
                                      <ModalBody>
                                        <div className="mb-3">
                                          <InputField
                                            isPassword={false}
                                            isIcon={false}
                                            register={updateRegister}
                                            name={"categoryName"}
                                            label={"Category Name*"}
                                            type={"text"}
                                            errors={err}
                                            defaultValue={
                                              category?.categoryName
                                            }
                                          />
                                        </div>
                                        <div>
                                          <InputField
                                            isPassword={false}
                                            isIcon={false}
                                            register={updateRegister}
                                            name={"categoryCode"}
                                            label={"Category Code"}
                                            type={"text"}
                                            errors={err}
                                            defaultValue={
                                              category?.categoryCode
                                            }
                                          />
                                        </div>
                                        <div className="mt-3">
                                          <InputField
                                            isPassword={false}
                                            isIcon={false}
                                            register={updateRegister}
                                            name={"description"}
                                            label={"Description"}
                                            type={"text"}
                                            errors={err}
                                            defaultValue={category?.description}
                                          />
                                        </div>
                                      </ModalBody>
                                    </form>
                                    <ModalFooter>
                                      <div className="flex gap-3">
                                        <Button
                                          handleClick={handleUpdateCategory(
                                            handleUpdateProductCategory
                                          )}
                                          bgColor="bg-indigo-500"
                                          bgHoverColor="hover:bg-indigo-600"
                                          rounded="rounded-md"
                                        >
                                          Edit
                                          {isLoadingUpdateCategory && (
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
                                    handleClick={() =>
                                      handleDeleteCategory(category?.id)
                                    }
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
                )}
              </TBody>
              {/* <TFooter>
                 <Td row={1} column={1}></Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     Total Users: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     Total Name: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="text-left whitespace-nowrap">
                     Total Role: {userData?.meta?.total} <br />
                     Total USER: {user?.length} <br />
                     Total MANAGER: {manager?.length} <br />
                     Total CASHIER: {cashier?.length} <br />
                     Total SALESMAN: {saleman?.length} <br />
                     Total MARKETINGOFFICER: {marketOfficer?.length} <br />
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     All Email: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="text-left whitespace-nowrap">
                     Total Active: {activeStatus?.length} <br />
                     Total Deactive: {deactiveStatus?.length} <br />
                   </div>
                 </Td>
               </TFooter> */}
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {searchCategory?.data?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={searchCategory?.data?.length}
              totalPage={Math.ceil(searchCategory?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
