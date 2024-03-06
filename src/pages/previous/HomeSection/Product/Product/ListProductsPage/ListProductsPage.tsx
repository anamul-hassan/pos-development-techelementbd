import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import {
  DropAction,
  DropActionList,
} from "@/components/previous/all/DropAction";
import Image from "@/components/previous/all/Image";
import Input from "@/components/previous/all/Input";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import Pagination from "@/components/previous/all/Pagination";
import { Option, Select } from "@/components/previous/all/Select";
import {
  TBody,
  TFooter,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { addProductSchema } from "@/schemas/product/product_schema";
import { useGetBrandsQuery } from "@/store/brand/brandApi";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useSearchProductQuery,
  useUpdateProductMutation,
} from "@/store/product/productApi";
import { useGetAllProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import { useGetSubCategoryQuery } from "@/store/sub_category/subCategoryApi";
import { useGetUnitsQuery } from "@/store/unit/unitApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import {
  FaArrowAltCircleUp,
  FaEdit,
  FaEye,
  FaRegFilePdf,
  FaSearch,
} from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { IoPrintOutline, IoTrashBin } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import { SiGoogledocs } from "react-icons/si";
import { VscFilePdf, VscVmActive } from "react-icons/vsc";

const ListProductsPage = () => {
  const { toast } = useToast();
  const { branchId } = shareBranchAndUserInfo();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: getProducts, isLoading: isLoadingProduct } =
    useGetProductsQuery(undefined) as any;

  const { data: searchProduct, isLoading: isSearching } = useSearchProductQuery(
    search
  ) as any;
  const [deleteProduct, { data: Delete, isSuccess: SuccessDel }] =
    useDeleteProductMutation({}) as any;
  const [
    editProductStatus,
    {
      // data: updateProduct,
      isSuccess: isProductStatusUpdated,
      isLoading: isLoadingEditProduct,
    },
  ] = useUpdateProductMutation({}) as any;
  const { data: brands } = useGetBrandsQuery(undefined) as any;
  const { data: categories } = useGetAllProductCategoriesQuery(
    undefined
  ) as any;
  const { data: subCategoies } = useGetSubCategoryQuery(undefined) as any;
  const { data: units } = useGetUnitsQuery(undefined) as any;
  const [createProduct, { isLoading: isLoadingAddingProduct }] =
    useAddProductMutation({}) as any;

  const {
    register: addProductRegister,
    handleSubmit: addProductHandler,
    formState: { errors: addProductError },
    setValue: addSetValue,
    reset: addProductFormReset,
  } = useForm({ resolver: yupResolver(addProductSchema) });
  const {
    register: editReg,
    handleSubmit: handleEdit,
    formState: { errors: error },
    setValue: values,
    reset,
  } = useForm({ resolver: yupResolver(addProductSchema) });

  const handleUpdateStatus = async (id: any) => {
    try {
      const result = await editProductStatus({ id, data: { status: true } });
      if (result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleAddProduct = async (data: any) => {
    try {
      if (!data?.branchId) {
        data.branchId = branchId;
      }
      const result = await createProduct(data);
      if (result?.data?.data && result?.data?.success === true) {
        addProductFormReset();
        setModal1(false);
        toast({
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEditProduct = async (data: any) => {
    try {
      if (!data?.branchId) {
        data.branchId = branchId;
      }
      const result = await editProductStatus({ id: modal2, data });
      if (result?.data?.data && result?.data?.success === true) {
        reset();
        toast({
          description: result?.data?.message,
        });
        setModal2(null);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const products = searchProduct?.data?.map((product: any) => {
    const findUnit = units?.data?.find(
      (unit: any) => unit?.id === product?.unitsId
    );
    const findbrand = brands?.data?.find(
      (brand: any) => brand?.id === product?.brandId
    );
    const findCategory = categories?.data?.find(
      (category: any) => category?.id === product?.categoryId
    );
    const findSubCategory = subCategoies?.data?.find(
      (subCategory: any) => subCategory?.id === product?.subCategoryId
    );

    return {
      ...product,
      unit: findUnit || null,
      brand: findbrand || null,
      category: findCategory || null,
      subCategory: findSubCategory || null,
    };
  });

  useEffect(() => {
    if (SuccessDel) {
      toast({
        description: Delete?.message,
      });
    }
    if (isProductStatusUpdated) {
      toast({
        description: "Product is upto Updated",
      });
    }
  }, [SuccessDel, isProductStatusUpdated, toast, Delete?.message]);

  if (isLoadingProduct) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-5 ml-12">
          <span className="text-3xl font-bold">Products List</span>{" "}
          <span className="text-lg font-bold">Manage your Products List</span>
        </h1>
      </div>
      {/* <div className="w-[95%] mx-auto bg-slate-100 border-t-2 border-brand pt-5 mb-10 flex pb-10 shadow-xl rounded"> */}
      {/* <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
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
            register={register}
            label={"Point"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
        <div className="flex-1 w-full p-2 ">
          <InputField
            isPassword={false}
            isIcon={false}
            register={register}
            label={"Point Amount"}
            name={"lastName"}
            type={"text"}
            errors={errors}
          />
        </div>
      </div> */}
      <div className="w-[95%] mx-auto bg-slate-100 border-t-2 border-brand pt-5 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center gap-3 ml-3">
            <div className="my-2">
              <Button
                bgColor="bg-[#163020]"
                bgHoverColor="hover:bg-[#255f3c]"
                rounded="rounded-md"
              >
                <BsFiletypeCsv />
                CSV
              </Button>
            </div>
            <div className="my-2">
              <Button
                bgColor="bg-[#097640]"
                bgHoverColor="hover:bg-[#287647]"
                rounded="rounded-md"
              >
                <FaRegFilePdf />
                Excel
              </Button>
            </div>{" "}
            <div className="my-2">
              <Button
                bgColor="bg-[#0069D9]"
                bgHoverColor="hover:bg-[#2466ac]"
                rounded="rounded-md"
              >
                <IoPrintOutline />
                Pribt
              </Button>
            </div>{" "}
            <div className="my-2">
              <Button
                bgColor="bg-[#18B294]"
                bgHoverColor="hover:bg-[#2d9d87]"
                rounded="rounded-md"
              >
                <CiViewColumn />
                Column
              </Button>
            </div>{" "}
            <div className="my-2">
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
          <div className=" mr-5 flex items-center gap-5 ml-2">
            <div>
              <Input
                placeholder={"Search Product..."}
                name={"search"}
                setValues={setSearch}
                Icon={<FaSearch />}
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
                  title="Add Product"
                  setIsModal={() => setModal1(false)}
                />
                <ModalBody>
                  {/* <form> */}
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        register={addProductRegister}
                        name={"productName"}
                        label={"Products Name"}
                        type={"text"}
                        errors={addProductError}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        register={addProductRegister}
                        name={"image"}
                        label={"Product Image"}
                        type={"text"}
                        errors={addProductError}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                    <div className="w-full">
                      <Select
                        name={"brandId"}
                        label="Select Brand"
                        setValue={addSetValue}
                        onChange={() => {}}
                      >
                        {brands &&
                          brands?.data?.map((br: any) => (
                            <Option key={br?.id} value={br?.id}>
                              {br?.brand}
                            </Option>
                          ))}
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select
                        name={"subCategoryId"}
                        label="Select Sub Category"
                        setValue={addSetValue}
                        onChange={() => {}}
                      >
                        {subCategoies &&
                          subCategoies?.data?.map((sct: any) => (
                            <Option key={sct?.id} value={sct?.id}>
                              {sct?.subCategoryName}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 lg:flex-row flex-col">
                    <div className="w-full">
                      <Select
                        name={"unitsId"}
                        label="Select Unit"
                        setValue={addSetValue}
                        onChange={() => {}}
                      >
                        {units &&
                          units?.data?.map((ut: any) => (
                            <Option key={ut?.id} value={ut?.id}>
                              {ut?.name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                    <div className="w-full">
                      <Select
                        name={"categoryId"}
                        label="Select Category"
                        setValue={addSetValue}
                        onChange={() => {}}
                      >
                        {categories &&
                          categories?.data?.map((ct: any) => (
                            <Option key={ct?.id} value={ct?.id}>
                              {ct?.categoryName}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  {/* </form> */}
                </ModalBody>
                <ModalFooter>
                  <div className="flex gap-3">
                    <Button
                      handleClick={addProductHandler(handleAddProduct)}
                      bgColor="bg-indigo-500"
                      bgHoverColor="hover:bg-indigo-600"
                      rounded="rounded-md"
                    >
                      CREATE
                      {isLoadingAddingProduct && (
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
          <div className="w-[98%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Image</Th>
                <Th>Product Name</Th>
                <Th>Category</Th>
                <Th>Sub Category</Th>
                <Th>Brand</Th>
              </THeader>
              <TBody>
                {isSearching ? (
                  <div className="flex items-center justify-center gap-4 text-indigo-600">
                    Searching ...
                  </div>
                ) : (
                  <>
                    {getProducts &&
                      products
                        ?.slice(currentPage * 5 - 5, currentPage * 5)
                        ?.map((pt: any) => (
                          <Tbrow key={pt.id}>
                            <Td>
                              {/* <div> */}
                              <DropAction>
                                <DropActionList>
                                  Pay
                                  <MdOutlinePayment className="text-base" />
                                </DropActionList>
                                <DropActionList onClick={() => setModal(true)}>
                                  View
                                  <FaEye className="text-base" />
                                </DropActionList>
                                <DropActionList
                                  onClick={() => setModal2(pt?.id)}
                                >
                                  Edit
                                  <FaEdit className="text-base" />
                                </DropActionList>
                                <DropActionList
                                  onClick={async () =>
                                    await deleteProduct(pt?.id)
                                  }
                                >
                                  Delete
                                  <IoTrashBin className="text-base" />
                                </DropActionList>
                                <DropActionList
                                  onClick={() => handleUpdateStatus(pt?.id)}
                                >
                                  {pt?.status === false ? (
                                    <>
                                      Deactive
                                      <RiEyeOffLine className="text-base" />
                                    </>
                                  ) : (
                                    <>
                                      Active
                                      <VscVmActive />
                                    </>
                                  )}
                                </DropActionList>
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
                              {/* view */}
                              <>
                                <Modal
                                  isModal={modal}
                                  modal_bg="bg-[#ffffff7e]"
                                  width="lg:w-[70vw] w-[100vw]"
                                  height="lg:h-[95vh] h-[100vh]"
                                >
                                  <ModalHead
                                    title={"Product Informations"}
                                    setIsModal={() => setModal(false)}
                                  />
                                  <ModalBody>
                                    <div className="flex lg:flex-row flex-col">
                                      <div className="lg:w-[50%] w-full flex items-baseline flex-col lg:justify-start justify-center lg:border-r border-b-0 lg:pr-4 pr-0">
                                        <Image
                                          divClass="h-[63vh] w-full rounded-lg"
                                          imgClass="w-full h-full rounded-lg object-cover"
                                          src={pt?.image}
                                          alt={"product Image"}
                                        />
                                        <div className="text-left grid grid-cols-2 gap-3 mt-5 w-full">
                                          <h1 className="text-base text-black tracking-wide font-semibold uppercase ps-2 pr-1 py-1 bg-[#e1e1e1cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                            {pt?.productName}
                                          </h1>
                                          <h1 className="text-base text-black tracking-wide font-semibold uppercase ps-2 pr-1 py-1 bg-[#e1e1e1cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                            ime: {pt?.IME}
                                          </h1>
                                          <h1 className="text-base text-black tracking-wide font-semibold uppercase ps-2 pr-1 py-1 bg-[#e1e1e1cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                            ram: {pt?.ram} / rom: {pt?.rom}
                                          </h1>
                                          <h1 className="text-base text-black tracking-wide font-semibold uppercase ps-2 pr-1 py-1 bg-[#e1e1e1cb] shadow-md shadow-brand4 drop-shadow-md border border-brand4 rounded-sm">
                                            sku: {pt?.sku}
                                          </h1>
                                        </div>
                                      </div>
                                      <div className="lg:w-[50%] w-full text-left lg:ml-4 ml-0 mt-5">
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Product ID: {pt?.id}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Category: {pt?.category?.categoryName}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Sub Category:{" "}
                                          {pt?.subCategory?.subCategoryName}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Unit: {pt?.unit?.brand}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Brand: {pt?.brand?.brand}
                                        </h1>
                                        {/* <h1 className="text-base font-medium tracking-wider mb-1">Quantity: {pt?.quantity}</h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">Purchase Price: {pt?.purchasePrice}</h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">Whole Sell Price: {pt?.wholesalePrice}</h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">Retail Price: {pt?.retailPrice}</h1> */}
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Total Purchase Quantity: {}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Total Sell Quantity: {}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Current Stock: {}
                                        </h1>
                                        <h1 className="text-base font-medium tracking-wider mb-1">
                                          Total Amount: {}
                                        </h1>
                                        {/* <h1 className="text-base font-medium tracking-wider mb-1">Branch Location: {pt?.branch?.branchName}</h1> */}
                                      </div>
                                    </div>
                                  </ModalBody>
                                </Modal>
                              </>
                              {/* edit */}
                              <>
                                <Modal
                                  modal_bg="bg-[#ffffff7e]"
                                  isModal={modal2}
                                  width={"w-[100vw] lg:w-[50vw]"}
                                  height={"h-[100vh] lg:h-fit"}
                                >
                                  <ModalHead
                                    title="Edit Product"
                                    setIsModal={() => setModal2(null)}
                                  />
                                  <ModalBody>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          register={editReg}
                                          name={"productName"}
                                          label={"Products Name"}
                                          type={"text"}
                                          errors={error}
                                        />
                                      </div>
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          register={editReg}
                                          name={"image"}
                                          label={"Product Image"}
                                          type={"text"}
                                          errors={error}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col mb-3">
                                      <div className="w-full">
                                        <Select
                                          name={"brandId"}
                                          label="Select Brand"
                                          setValue={values}
                                          onChange={() => {}}
                                        >
                                          {brands &&
                                            brands?.data?.map((br: any) => (
                                              <Option
                                                key={br?.id}
                                                value={br?.id}
                                              >
                                                {br?.brand}
                                              </Option>
                                            ))}
                                        </Select>
                                      </div>
                                      <div className="w-full">
                                        <Select
                                          name={"subCategoryId"}
                                          label="Select Sub Category"
                                          setValue={values}
                                          onChange={() => {}}
                                        >
                                          {subCategoies &&
                                            subCategoies?.data?.map(
                                              (sct: any) => (
                                                <Option
                                                  key={sct?.id}
                                                  value={sct?.id}
                                                >
                                                  {sct?.subCategoryName}
                                                </Option>
                                              )
                                            )}
                                        </Select>
                                      </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-3 lg:flex-row flex-col">
                                      <div className="w-full">
                                        <Select
                                          name={"unitsId"}
                                          label="Select Unit"
                                          setValue={values}
                                          onChange={() => {}}
                                        >
                                          {units &&
                                            units?.data?.map((ut: any) => (
                                              <Option
                                                key={ut?.id}
                                                value={ut?.id}
                                              >
                                                {ut?.name}
                                              </Option>
                                            ))}
                                        </Select>
                                      </div>
                                      <div className="w-full">
                                        <Select
                                          name={"categoryId"}
                                          label="Select Category"
                                          setValue={values}
                                          onChange={() => {}}
                                        >
                                          {categories &&
                                            categories?.data?.map((ct: any) => (
                                              <Option
                                                key={ct?.id}
                                                value={ct?.id}
                                              >
                                                {ct?.categoryName}
                                              </Option>
                                            ))}
                                        </Select>
                                      </div>
                                    </div>
                                  </ModalBody>
                                  <ModalFooter>
                                    <div className="flex gap-3">
                                      <Button
                                        handleClick={handleEdit(
                                          handleEditProduct
                                        )}
                                        bgColor="bg-indigo-500"
                                        bgHoverColor="hover:bg-indigo-600"
                                        rounded="rounded-md"
                                      >
                                        EDIT
                                        {isLoadingEditProduct && (
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
                              </>
                              {/* </div> */}
                            </Td>
                            <Td>
                              <div className="flex items-center justify-center">
                                <Image
                                  divClass={
                                    "w-10 h-10 p-[2px] rounded-lg shadow-md shadow-brand4 drop-shadow-md"
                                  }
                                  imgClass={"w-full h-full rounded-lg"}
                                  src={pt?.image}
                                  alt="product image"
                                />
                              </div>
                            </Td>
                            <Td>{pt?.productName}</Td>
                            <Td>{pt?.category?.categoryName}</Td>
                            <Td>{pt?.subCategory?.subCategoryName}</Td>
                            <Td>{pt?.brand?.brand}</Td>
                          </Tbrow>
                        ))}
                  </>
                )}
              </TBody>
              <TFooter>
                <Td row={1} column={1}></Td>
                <Td row={1} column={1}></Td>
                <Td row={1} column={1}></Td>
                <Td row={1} column={1}></Td>
                <Td row={1} column={2}>
                  Total Products : {products?.length}
                </Td>
              </TFooter>
            </Table>
          </div>
        </div>
        {/* table area */}
        {products?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={products?.length}
              totalPage={Math.ceil(products?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProductsPage;
