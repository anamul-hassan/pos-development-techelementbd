import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { brandSchema } from "@/schemas/brand/brand_schema";
import {
  useAddBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "@/store/brand/brandApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const BrandPage = () => {
  const { toast } = useToast();

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(null);

  const [createBrand, { isLoading: isLoadingBrand }] = useAddBrandMutation(
    {}
  ) as any;
  const [editBrand, { isLoading: isEditing }] = useUpdateBrandMutation(
    {}
  ) as any;
  const {
    data: BrandData,
    isError,
    isLoading: isGetBrand,
  } = useGetBrandsQuery(undefined);
  const [
    deleteBrand,
    {
      // isError: isDeleteError,
      // error: deleteError,
      isSuccess: deleteBrandSuccess,
    },
  ] = useDeleteBrandMutation({}) as any;
  // Delete brand

  useEffect(() => {
    if (deleteBrandSuccess) {
      toast({
        description: "Brand Deleted Successfully",
      });
    }
  }, [deleteBrandSuccess, toast]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setValue,
    reset,
    clearErrors,
  } = useForm();
  const handleEditBrand = async (data: any) => {
    try {
      const result = await editBrand({ id: modal1, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        setModal1(null);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  const {
    register: addRegister,
    handleSubmit: handleAddBrand,
    formState: { errors: error },
    // setValue,
    reset: addReset,
  } = useForm({ resolver: yupResolver(brandSchema) });

  const handleCreateBrand = async (data: any) => {
    try {
      const result = await createBrand(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal(false);
        toast({
          description: result?.data?.message,
        });
        addReset();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    await deleteBrand(id);
  };
  if (isGetBrand) {
    return <DataLoader />;
  }
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[55px]">
          <span className="text-3xl font-bold">Brand List</span>
          <span className="font-light text-lg">Manage your Brand List</span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="lg:flex mt-10 ml-7">
            <div className="my-2 ">
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
          <div className="mt-4 mr-10 lg:flex gap-5 ml-3">
            <div className="mt-4">
              {/* <InputField
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
              /> */}
            </div>
            <div className="mt-[14px]">
              {actionManager(["manager"]) && (
                <Button handleClick={() => setModal(true)}>+Add</Button>
              )}
              <Modal isModal={modal} width={"30vw"} height={"24vh"}>
                <ModalHead
                  title="Add brand"
                  setIsModal={() => setModal(false)}
                />
                <form>
                  <ModalBody>
                    <div className="">
                      <div className="w-full mb-3">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"brand"}
                          register={addRegister}
                          label={"Brand name*"}
                          type={"text"}
                          required
                          errors={error}
                        />{" "}
                      </div>

                      <div className="w-full">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"note"}
                          register={addRegister}
                          label={"Brand Note"}
                          type={"text"}
                          required
                          errors={error}
                        />{" "}
                      </div>
                    </div>{" "}
                  </ModalBody>
                </form>

                <ModalFooter>
                  <div className="flex gap-3">
                    <Button
                      handleClick={handleAddBrand(handleCreateBrand)}
                      bgColor="bg-indigo-500"
                      bgHoverColor="hover:bg-indigo-600"
                      rounded="rounded-md"
                    >
                      CREATE
                      {isLoadingBrand && (
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
                <Th>Brand Name</Th>
                <Th>Note</Th>

                <Th>Action</Th>
              </THeader>
              <TBody>
                {!isError &&
                  BrandData?.data?.map((brand: any) => (
                    <Tbrow key={brand?.id}>
                      <Td>{brand?.brand}</Td>
                      <Td>{brand?.note}</Td>
                      <Td>
                        <div className="flex justify-center">
                          <div className="mr-2">
                            <Link to={`/edit_brand/${brand?.id}`}>
                              <Button
                                // handleClick={() => setModal1(brand?.id)}
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
                                <div className="">
                                  <div className="w-full mb-3">
                                    <InputField
                                      isPassword={false}
                                      isIcon={false}
                                      name={"brand"}
                                      register={register}
                                      label={"Brand name*"}
                                      type={"text"}
                                      defaultValue={brand?.brand}
                                      errors={error}
                                    />{" "}
                                  </div>

                                  <div className="w-full">
                                    <InputField
                                      isPassword={false}
                                      isIcon={false}
                                      name={"note"}
                                      register={register}
                                      label={"Brand Note"}
                                      type={"text"}
                                      defaultValue={brand?.note}
                                      errors={error}
                                    />{" "}
                                  </div>
                                </div>{" "}
                              </ModalBody>
                              <ModalFooter>
                                <div className="flex gap-3">
                                  <Button
                                    handleClick={handleSubmit(handleEditBrand)}
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
                            <div>
                              <Button
                                handleClick={() => handleDeleteBrand(brand?.id)}
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
      </div>
    </div>
  );
};

export default BrandPage;
