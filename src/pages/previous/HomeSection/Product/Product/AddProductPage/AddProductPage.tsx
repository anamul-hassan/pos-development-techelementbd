import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { addProductSchema } from "@/schemas/product/product_schema";
import { useGetBrandsQuery } from "@/store/brand/brandApi";

import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { useAddProductMutation } from "@/store/product/productApi";
import { useGetSubCategoryQuery } from "@/store/sub_category/subCategoryApi";
import { useGetUnitsQuery } from "@/store/unit/unitApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const { branchId } = shareBranchAndUserInfo();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: brands } = useGetBrandsQuery(undefined) as any;
  const { data: categories } = useGetAllExpenseCategoryQuery(undefined) as any;
  const { data: subCategories } = useGetSubCategoryQuery(undefined) as any;
  const { data: units } = useGetUnitsQuery(undefined) as any;
  const [addProduct, { isLoading: isLoadingAddingProduct }] =
    useAddProductMutation({}) as any;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addProductSchema) });
  const handleAddProduct = async (data: any) => {
    data.branchId = branchId;
    try {
      const result = await addProduct(data);
      if (result?.data?.data && result?.data?.success === true) {
        reset();
        navigate("/list_products");
        toast({
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  if (isLoadingAddingProduct) {
    return <DataLoader />;
  }
  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ml-2">
          <span className="text-2xl font-bold">Add New Product</span>{" "}
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleAddProduct)} className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"productName"}
                  label={"Products Name*"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"sku"}
                  label={"SKU"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div> */}
              <div className="my-4">
                <Select
                  name={"brandId"}
                  label="Select Brand"
                  setValue={setValue}
                >
                  {brands &&
                    brands?.data?.map((br: any) => (
                      <Option key={br?.id} value={br?.id}>
                        {br?.brand}
                      </Option>
                    ))}
                </Select>
              </div>
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"purchasePrice"}
                  label={"Purchase Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div> */}
            </div>
            {/* right part1 */}
            {/* midel part2 */}
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <Select
                  name={"categoryId"}
                  label="Select Category*"
                  setValue={setValue}
                >
                  {categories &&
                    categories?.data?.map((ct: any) => (
                      <Option key={ct?.id} value={ct?.id}>
                        {ct?.categoryName}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <Select
                  name={"subCategoryId"}
                  label="Select Sub Category"
                  setValue={setValue}
                >
                  {subCategories &&
                    subCategories?.data?.map((sct: any) => (
                      <Option key={sct?.id} value={sct?.id}>
                        {sct?.subCategoryName}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <Select
                  name={"unitsId"}
                  label="Select Unit"
                  setValue={setValue}
                >
                  {units &&
                    units?.data?.map((ut: any) => (
                      <Option key={ut?.id} value={ut?.id}>
                        {ut?.name}
                      </Option>
                    ))}
                </Select>
              </div>
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"wholesalePrice"}
                  label={"Whole Sell Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div> */}
            </div>
            {/* midel part2 */}
            {/* left part3  */}
            <div className="flex-1 w-full p-2">
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"warranty"}
                  label={"Warranty Duration"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div> */}
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"alertQuantity"}
                  register={register}
                  label={"Alert Quantity"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div> */}
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"IME"}
                  label={"IME"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div> */}
              {/* <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"retailPrice"}
                  label={"Retail Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div> */}
            </div>

            {/* left part4 */}
            <div className="flex-1 w-full p-2">
              <div className="">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"image"}
                    label={"Product Image"}
                    type={"text"}
                    errors={errors}
                  />{" "}
                </div>
                {/* <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"quantity"}
                    label={"Quantity"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div> */}
                <div className="my-4 flex items-center gap-3">
                  {/* <div>
                    <InputField
                      isPassword={false}
                      isIcon={false}
                      register={register}
                      name={"ram"}
                      label={"RAM"}
                      type={"text"}
                      errors={errors}
                    />{" "}
                  </div> */}
                  {/* <div>
                    /
                  </div>
                  <div>
                    <InputField
                      isPassword={false}
                      isIcon={false}
                      register={register}
                      name={"rom"}
                      label={"ROM"}
                      type={"text"}
                      errors={errors}
                    />{" "}
                  </div> */}
                </div>
                {/* <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"totalMargin"}
                    label={"Total Margin"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div> */}
              </div>
            </div>
          </div>{" "}
        </div>
        {/* part 2 */}
        {/* <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 mt-10 border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto"> */}
        {/* right part1 */}
        {/* <div className="flex-1 w-full p-2 ">
              <div className="mt-5">
                <span className="mr-3 font-semibold text-[16px]">
                  Product Type:
                </span>
                <div className="relative mt-1 ">
                  <select
                    {...register("role")}
                    className="rounded border-t-2 border-brand appearance-none  w-full py-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option value={"PayTerm"}>Single</option>
                    <option value={"Months"}>Variable</option>
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
            </div>
            {/* right part1 */}
        {/* midel part2 */}
        {/* <div className="flex-1 w-full p-2"></div>
        <div className="flex-1 w-full p-2"></div>
        <div className="flex-1 w-full p-2"></div> */}
        {/* midel part2 */}
        {/* </div>{ " " } */}
        {/* <div className="w-[90%] mx-auto mt-5">
    <h2 className="text-2xl ml-2">
      Add Variation:{" "}
      <span className="border-brand border-2 px-2 py-[2px]  text-lg ml-2 rounded">
        +Add
      </span>
    </h2>
    <div className="flex ml-2 mt-5  text-white px-2 py-[2px]">
      <div className="w-[10%]">
        <div className=" bg-[#075e54] py-2 flex justify-center items-center">
          Variation
        </div>
        <div className="text-black">
          <div className="relative mt-1 ">
            <select
              {...register("role")}
              className="rounded border-t-2 border-brand appearance-none  w-full py-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
            >
              <option value={"PayTerm"}>Please Select</option>
              <option value={"ADMIN"}>Color</option>
              <option value={"MANAGER"}>Jeans</option>
              <option value={"CASHIER"}>Ladies</option>
              <option value={"SALESMAN"}>Shoe Size</option>
              <option value={"MARKETINGOFFICER"}>Size</option>
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
      </div> */}
        {/* <div className="w-full">
        <div className="border-white py-2 bg-[#075e54] w-full border-l-2 pl-2">
          <div className="flex justify-center items-center">
            <h2> Variation Values</h2>
          </div>
        </div>
        <Table>
          <THeader>
            <Th>
              <div className="bg-brand w-full text-white p-5">SKU</div>
            </Th>
            <Th>
              {" "}
              <div className="bg-brand w-full text-white p-5">
                Color
              </div>{" "}
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                Value
              </div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                {" "}
                Purchase Price
              </div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5"> Vat</div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                Whole Price
              </div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                X Margin(%)
              </div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                Retail Price
              </div>
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">
                Images
              </div>{" "}
            </Th>
            <Th>
              <div className="bg-brand w-full text-white p-5">X</div>
            </Th>
          </THeader> */}
        {/* <TBody>
            <Tbrow>
              <Td>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="SKU"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td>
              <Td>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Color"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td>

              <Td>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Value"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td>
              <Td>
                <div className="flex mb-3">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    placeholder="PurchasePrice"
                    labelColor="text-balck"
                    // Icon={<PiContactlessPaymentFill />}
                    name={"password"}
                    register={register}
                    //   label={"point :"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div>
              </Td>
              <Td>
                <div className="flex mb-3">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    placeholder="PurchasePrice"
                    labelColor="text-balck"
                    // Icon={<PiContactlessPaymentFill />}
                    name={"password"}
                    register={register}
                    label={"%"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div>
              </Td>
              <Td>
                {" "}
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="wholeSellPrice"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td>
              <Td>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="0"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td> */}
        {/* <Td>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="RetailPrice"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  //   label={"point :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </Td>
              <Td>
                <div className="mt-4">
                  <div className="flex items-center justify-center bg-grey-lighter mt-2">
                    <label className=" w-full py-[5px] text-brand  flex justify-center border-t-2 border-brand items-center  bg-white text-blue rounded-sm tracking-wide uppercase  cursor-pointer hover:bg-blue hover:text-brand">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal ml-2">
                        Image
                      </span>
                      <input
                        type="file"
                        {...register("avatar")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </Td>
              <Td>X</Td>
            </Tbrow>
          </TBody>
        </Table>
      </div>
    </div>
  </div>
        </div > * /} */}
        {/* part 2 */}
        {/* part 1 */}
        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">ADD New Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
