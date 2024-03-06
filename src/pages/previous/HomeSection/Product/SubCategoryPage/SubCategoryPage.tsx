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
import { addOrEditSubCategorySchema } from "@/schemas/product/sub_category_schema";
import { useGetAllProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoryQuery,
  useSearchSubcategoryQuery,
  useUpdateSubCategoryMutation,
} from "@/store/sub_category/subCategoryApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SubCategoryPage = () => {
  const { toast } = useToast();
  const [modal1, setModal1] = useState(null);
  const [modal2, setModal2] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addSubCategory, { isLoading: isAddSubCategory }] =
    useAddSubCategoryMutation({}) as any;
  const [editSubCategory, { isLoading: isEditing }] =
    useUpdateSubCategoryMutation({}) as any;
  const [deleteSubCategory, { data: Delete }] = useDeleteSubCategoryMutation(
    {}
  ) as any;
  const { data: searchSubCategory, isLoading: isSearching } =
    useSearchSubcategoryQuery(search) as any;

  const { data: getSubCategory, isLoading: isGetSubCategory } =
    useGetSubCategoryQuery(undefined) as any;

  const { data: categories } = useGetAllProductCategoriesQuery(
    undefined
  ) as any;

  const {
    register: addReg,
    handleSubmit: addSubCategorySubmit,
    formState: { errors: subCategoryError },
    setValue: setValueAdd,
    reset: resetAdd,
    clearErrors: err,
  } = useForm({ resolver: yupResolver(addOrEditSubCategorySchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(addOrEditSubCategorySchema) });

  const handleAddSubCategory = async (data: any) => {
    try {
      const result = await addSubCategory(data);
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
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
      const result = await editSubCategory({ id: modal1, data });
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
  if (Delete?.data?.success === true) {
    toast({
      description: Delete?.message,
    });
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Sub Categories</span>{" "}
          <span className="font-light">Manage your Sub Categories</span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 py-5 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center lg:flex-row flex-col lg:justify-start justify-center gap-3 ml-6 ">
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
          <div className="ml-2">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5">
                {" "}
                <Input
                  Icon={<FaSearch />}
                  placeholder={"Search Sub Category..."}
                  name={"search"}
                  setValues={setSearch}
                />
              </div>
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
                  <ModalBody>
                    <form>
                      <div className="mb-3">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={addReg}
                          name={"subCategoryName"}
                          label={"Sub Category Name*"}
                          type={"text"}
                          errors={subCategoryError}
                        />
                      </div>
                      <div>
                        <div className="w-[100%]">
                          <Select
                            label="select Category Name*"
                            setValue={setValueAdd}
                            name="categoryId"
                            onChange={() => {}}
                          >
                            {categories?.data?.map((category: any) => (
                              <Option key={category?.id} value={category?.id}>
                                {category?.categoryName}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex gap-3">
                      <Button
                        handleClick={addSubCategorySubmit(handleAddSubCategory)}
                        type="submit"
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
                        type="button"
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
                  <div>Sub CateGory</div>
                </Th>

                <Th>Action</Th>
              </THeader>
              <TBody>
                {isSearching ? (
                  <div className="flex items-center gap-4">
                    Searching <SearchLoading />
                  </div>
                ) : (
                  <>
                    {getSubCategory &&
                      searchSubCategory?.data
                        ?.slice(currentPage * 5 - 5, currentPage * 5)
                        ?.map((ct: any) => (
                          <Tbrow key={ct?.id}>
                            <Td>
                              <div className="text-center">
                                {ct?.category?.categoryName}
                              </div>
                            </Td>
                            <Td>
                              <div className="text-center">
                                {ct?.subCategoryName}
                              </div>
                            </Td>

                            <Td>
                              <div className="flex items-center justify-around">
                                <div>
                                  <Link to={`/edit_sub_category/${ct?.id}`}>
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
                                      title="Edit Sub Categoires"
                                      setIsModal={() => setModal1(null)}
                                    />
                                    <ModalBody>
                                      <div className="mb-3">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          register={register}
                                          name={"subCategoryName"}
                                          label={"Sub Category Name*"}
                                          type={"text"}
                                          errors={errors}
                                          defaultValue={
                                            ct?.category?.categoryName
                                          }
                                        />
                                      </div>
                                      <div>
                                        <div className="w-[100%]">
                                          <Select
                                            label="select Category Name*"
                                            setValue={setValue}
                                            name="categoryId"
                                            onChange={() => {}}
                                          >
                                            {categories?.data?.map(
                                              (category: any) => (
                                                <Option
                                                  key={category?.id}
                                                  value={category?.id}
                                                >
                                                  {category?.categoryName}
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
                                    handleClick={() =>
                                      deleteSubCategory(ct?.id)
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
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {searchSubCategory?.data?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={searchSubCategory?.data?.length}
              totalPage={Math.ceil(searchSubCategory?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;
