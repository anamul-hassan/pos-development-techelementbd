import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline, IoTrashBin } from "react-icons/io5";
import {
  FaArrowAltCircleUp,
  FaEdit,
  FaEye,
  FaRegFilePdf,
  FaSearch,
} from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoIosPrint } from "react-icons/io";
import { SiGoogledocs } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import {
  useDeletePurchaseMutation,
  useGetPurchasesQuery,
} from "@/store/purchase/purchaseApi";
import { useGetBrandsQuery } from "@/store/brand/brandApi";
import { useGetUnitsQuery } from "@/store/unit/unitApi";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
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
import Pagination from "@/components/previous/all/Pagination";
import { useToast } from "@/components/ui/use-toast";
import { actionManager } from "@/utils/helpers/actionManager";
import { useGetProductSubCategoriesQuery } from "@/store/product_sub_category/productSubCategoryApi";
import { useGetProductCategoriesQuery } from "@/store/product_category/productCategoryApi";

const ListPurchasesPage = () => {
  const { toast } = useToast();
  const { name } = shareBranchAndUserInfo();
  const [currentPage, setCurrentPage] = useState(1);
  // const [modal, setModal] = useState(false);
  const { data: getPurchase, isLoading } = useGetPurchasesQuery(
    undefined
  ) as any;
  const { data: brands } = useGetBrandsQuery(undefined) as any;
  const { data: Units } = useGetUnitsQuery(undefined) as any;
  const { data: subCategories } = useGetProductSubCategoriesQuery({
    page: 1,
    size: 100000000,
  }) as any;
  const { data: categories } = useGetProductCategoriesQuery({
    page: 1,
    size: 100000000,
  }) as any;
  const [
    deletePurchase,
    {
      // data: deletePurchaseData,
      // isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeletePurchaseMutation({}) as any;

  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  const purchaseProduct = getPurchase?.data?.map((purchase: any) => {
    const findBrand = brands?.data?.find(
      (brand: any) =>
        brand?.id === purchase?.PurchaseProducts[0]?.products?.brandId
    );
    const findUnit = Units?.data?.find(
      (unit: any) =>
        unit?.id === purchase?.PurchaseProducts[0]?.products?.unitsId
    ); //subCategoryId //categoryId
    const findSubCategory = subCategories?.data?.find(
      (sbCategory: any) =>
        sbCategory?.id ===
        purchase?.PurchaseProducts[0]?.products?.subCategoryId
    );
    const findCategory = categories?.data?.find(
      (category: any) =>
        category?.id === purchase?.PurchaseProducts[0]?.products?.categoryId
    );
    return {
      ...purchase,
      units: findUnit || null,
      brand: findBrand || null,
      subCategory: findSubCategory || null,
      category: findCategory || null,
    };
  });
  if (isLoading) {
    return <DataLoader />;
  }

  if (isDeleteSuccess) {
    toast({
      description: deletePurchase?.message,
    });
  }
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">List Purchase </span>{" "}
        </h1>
      </div>
      {/* part 1 */}
      <div className="w-[94%] mb-16 mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[96%] mx-auto">
          {/* right part1 */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">Supplier:</span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>All</option>
                  <option value={"User"}>-Samsung(CO0002)</option>
                  <option value={"User"}>-Vivo(CO0002)</option>
                  <option value={"User"}>-gg(CO0002)</option>

                  <option value={"ADMIN"}>Data Test (BL0001)</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>{" "}
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Products"
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"permanentAddress"}
                label={"Products:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Brand "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"permanentAddress"}
                label={"Brand:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
          </div>
          {/* right part1 */}
          {/* midel part2 */}
          <div className="flex-1 w-full p-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder=" Category "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"permanentAddress"}
                label={" Category:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Sub Category "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"permanentAddress"}
                label={"Sub Category:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
            <div className="lg:mb-[53px]"></div>
          </div>
          {/* midel part2 */}
          {/* left part3  */}
          <div className="flex-1 w-full p-2">
            {" "}
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">
                Bussiness Location:
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>All</option>
                  <option value={"ADMIN"}>Data Test (BL0001)</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>{" "}
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                Purchase Status:
              </span> */}
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>Purchase Status</option>
                  <option value={"User"}>Received</option>
                  <option value={"User"}>Pending</option>
                  <option value={"User"}>Ordered</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="lg:mb-[82px]"></div>
          </div>

          {/* left part4*/}
          <div className="flex-1 w-full  p-2">
            <div className="mt-4">
              <span className="mr-3 font-semibold text-[16px]">
                Payment Status:
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>All</option>
                  <option value={"User"}>Paid</option>
                  <option value={"User"}>Due</option>
                  <option value={"User"}>Partial</option>

                  <option value={"ADMIN"}>Overdue</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>{" "}
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Bussiness Locations "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"permanentAddress"}
                label={"Date Range:"}
                type={"date"}
                errors={errors}
              />{" "}
            </div>
            <div className="lg:mb-[82px]"></div>
          </div>
        </div>{" "}
      </div>
      {/* part 1 */}
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div>
          <h2 className="mt-5 lg:mt-14 ml-10 text-xl font-bold">
            All List Purchase
          </h2>
        </div>
        <div className="lg:flex justify-between">
          <div className="lg:flex mt-3 lg:mt-9 ml-3">
            <div>
              <button className="flex text-lg  mt-3 bg-[#163020] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <BsFiletypeCsv className="mt-1 mr-1" />
                CSV
              </button>
            </div>
            <div>
              <button className="flex text-lg mt-3 bg-[#097640] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <FaRegFilePdf className="mt-1 mr-1" />
                Excel
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg mt-3 bg-[#0069D9] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <IoPrintOutline className="mt-1 mr-1" />
                Pribt
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg mt-3 bg-[#18B294] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <CiViewColumn className="mt-1 mr-1" />
                Column
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg mt-3 bg-[#527853] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <VscFilePdf className="mt-1 mr-1" />
                PDF
              </button>
            </div>
          </div>
          <div className="mt-4 mr-5">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5">
                <Input Icon={<FaSearch />} placeholder="Search Purchase..." />
              </div>
              {actionManager(["manager"]) && (
                <div className=" mr-5">
                  <Link
                    to="/add_purchase"
                    className="relative inline-block text-lg group"
                  >
                    <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative uppercase">+ADD</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>SL NO.</Th>
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>Challan No</Th>
                <Th>Location</Th>
                <Th>Supplier</Th>
                <Th>Products</Th>
                <Th>Brand</Th>
                <Th>Category</Th>
                <Th>Sub Category</Th>
                <Th>Purchases Quantities</Th>
                {/* <Th>Return Quantities</Th>
                <Th>Sells Quantities</Th> */}
                <Th>Current Stock</Th>
                <Th>Payment Status</Th>
                <Th>Grand Total</Th>
                <Th>Pay Total</Th>
                <Th>Payment due</Th>
                <Th>AddedBy</Th>
              </THeader>
              <TBody>
                {
                  // slice((currentPage * 5) - 5, (currentPage * 5))?.
                  getPurchase &&
                    purchaseProduct
                      ?.slice(currentPage * 5 - 5, currentPage * 5)
                      ?.map((purchase: any, index: any) => (
                        <Tbrow key={purchase?.id}>
                          <Td>{index + 1}</Td>
                          <Td>
                            <DropAction>
                              <DropActionList>
                                Pay
                                <MdOutlinePayment className="text-base" />
                              </DropActionList>
                              <DropActionList
                              // onClick={() => setModal(true)}
                              >
                                View
                                <FaEye className="text-base" />
                              </DropActionList>
                              <DropActionList>
                                <Link
                                  className="flex items-center justify-between w-full h-full"
                                  to={`/edit_purchase/${purchase?.id}`}
                                >
                                  Edit
                                  <FaEdit className="text-base" />
                                </Link>
                              </DropActionList>
                              <DropActionList
                                onClick={() => deletePurchase(purchase?.id)}
                              >
                                Delete
                                <IoTrashBin className="text-base" />
                              </DropActionList>
                              {/* <DropActionList onClick={() => handleUpdateStatus(pt?.id)}>
                            {pt?.status === false ? <>
                              Deactive
                              <RiEyeOffLine className="text-base" />
                            </>
                              :
                              <>
                                Active
                                <VscVmActive />
                              </>
                            }
                          </DropActionList> */}
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
                            {/* <>
                          <Modal >
                          </Modal>
                        </> */}
                          </Td>
                          {/* <Td>{moment(purchase?.purchaseDate).format("L")}</Td> */}
                          <Td>{purchase?.referenceNo}</Td>
                          <Td>{purchase?.supplier?.address}</Td>
                          <Td>
                            {purchase?.supplier?.firstName}{" "}
                            {purchase?.supplier?.lastName}
                          </Td>
                          <Td>{purchase?.PurchaseProducts[0]?.productName}</Td>
                          <Td>{purchase?.brand?.brand}</Td>
                          <Td>{purchase?.category?.categoryName}</Td>
                          <Td>{purchase?.subCategory?.subCategoryName}</Td>
                          <Td>{purchase?.PurchaseProducts[0]?.quantity}</Td>
                          {/* <Td></Td>
                      <Td></Td> */}
                          <Td>
                            {purchase?.PurchaseProducts[0]?.products?.stock}
                          </Td>
                          <Td>{purchase?.purchaseStatus}</Td>
                          <Td>{purchase?.totalAmount}</Td>
                          <Td>{purchase?.totalPaymentAmount}</Td>
                          <Td>{purchase?.due}</Td>
                          <Td>{name}</Td>
                        </Tbrow>
                      ))
                }
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        {purchaseProduct.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={purchaseProduct?.length}
              totalPage={Math.ceil(purchaseProduct.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPurchasesPage;
