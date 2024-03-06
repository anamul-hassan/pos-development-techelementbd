import InputField from "@/components/previous/all/InputField";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const AddStockAdjustmentPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div className="ml-14 mt-5 text-[30px] font-bold">
        Add Stock Adjustment
      </div>
      <div className="w-[94%] mx-auto mt-12 mb-10 bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
          {/* right part1 */}
          <div className="flex-1 w-full p-2 ">
            <div className="">
              <span className="mr-3 font-semibold text-[16px]">
                Business Location:
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[5px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
          </div>
          {/* right part1 */}
          {/* midel part2 */}
          <div className="flex-1 w-full p-2">
            <div className="mt-7">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"email"}
                register={register}
                label={"Challan No:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
          </div>
          {/* midel part2 */}
          {/* left part3  */}
          <div className="flex-1 w-full p-2">
            <div className="">
              <span className="mr-3 font-semibold text-[16px]">
                Adjustment type:*
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[5px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
          </div>

          {/* left part4*/}
          <div className="flex-1 w-full  p-2">
            <div className="mt-7">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"password"}
                register={register}
                label={""}
                type={"date"}
                errors={errors}
              />{" "}
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 mb-20 shadow-lg rounded border-t-2 border-brand mt-5">
        <div className="w-2/3 mx-auto mt-9">
          <div className="lg:flex items-center">
            <div className="w-full">
              <InputField
                isPassword={false}
                isIcon={true}
                Icon={<FaSearch />}
                register={register}
                name={"firstName"}
                type={"email "}
                errors={errors}
              />
            </div>
            {/* <div className="w-[200px] ml-2 mt-2 border-2 border-brand flex justify-center rounded py-1">
              Add New product
            </div> */}
          </div>{" "}
        </div>
        <div className="mt-5 mx-10">
          <div>
            <Table>
              <THeader>
                <Th>Products Name</Th>
                <Th> Quantity</Th>
                <Th>Unit Price</Th>

                <Th>Sub Total</Th>

                <Th>
                  {" "}
                  <FaRegTrashCan className="mt-1 mr-1" />
                </Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td> </Td>
                </Tbrow>
              </TBody>
            </Table>
          </div>
          <hr className="m-5" />
          <div>
            <h2>Total Items: 0.00</h2>
            <h2>Net Total Amout: 0.00</h2>
          </div>
        </div>
      </div>
      <div className="w-[94%] mx-auto mt-12 mb-10 bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
          {/* right part1 */}

          {/* right part1 */}
          {/* midel part2 */}
          <div className="flex-1 w-full p-2">
            <div className="mt-5">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"email"}
                register={register}
                label={"Total amount recovered:"}
                type={"number"}
                errors={errors}
              />{" "}
            </div>
          </div>
          {/* midel part2 */}
          {/* left part3  */}
          <div className="flex-1 w-full p-2">
            <div className="mt-5">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"password"}
                register={register}
                label={"Shipping Address:*"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
          </div>

          {/* left part4*/}
          <div className="flex-1 w-full  p-2"></div>
        </div>{" "}
      </div>
      <div className="w-[94%] flex-row mx-auto mt-12 mb-10 bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="ml-5 my-2 font-bold">Additional Notes:</div>
        <div className="flex items-center justify-center">
          <textarea
            name=""
            id=""
            className="w-[98%] m-auto mx-5 border-[1px] border-brand"
            rows={5}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-brand text-white rounded py-2 text-lg font-bold px-9 mb-10">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddStockAdjustmentPage;
