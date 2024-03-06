import { FaRegTrashCan } from "react-icons/fa6";

import { FaSearch } from "react-icons/fa";

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

const AddReturnPurchasePage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  return (
    <div>
      <div>
        <h3 className="ml-12 mt-5 text-xl font-bold">Add Purchase Return</h3>
      </div>
      <div className="w-[94%] mx-auto mt-2 mb-10 bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
          {/* right part1 */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">Supplier:</span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
              <span className="mr-3 font-semibold text-[16px]">
                Attach Document:
              </span>
              <div className="flex items-center justify-center bg-grey-lighter mt-2">
                <label className=" w-full py-[3px] text-brand  flex justify-center border-t-2 border-brand items-center  bg-white text-blue rounded-md tracking-wide uppercase  cursor-pointer hover:bg-blue hover:text-brand">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal ml-2">
                    Document
                  </span>
                  <input
                    type="file"
                    {...register("avatar")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* right part1 */}
          {/* midel part2 */}
          <div className="flex-1 w-full p-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder=" "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                name={"email"}
                register={register}
                label={"Challan No:"}
                type={"text"}
                errors={errors}
              />{" "}
            </div>
            <div className="mt-[80px]"></div>
          </div>
          {/* midel part2 */}
          {/* left part3  */}
          <div className="flex-1 w-full p-2">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">
                Business Location:*
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>Please Select</option>
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
            </div>
            <div className="mt-[110px]"></div>
          </div>

          {/* left part4*/}
          <div className="flex-1 w-full  p-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder=" "
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                name={"password"}
                register={register}
                label={""}
                type={"date"}
                errors={errors}
              />{" "}
            </div>
            <div className="mt-[80px]"></div>
          </div>
        </div>{" "}
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 mb-20 shadow-lg rounded border-t-2 border-brand mt-5">
        <div>
          <h4 className="ml-10 mt-5 text-lg">Search Products</h4>
        </div>
        <div className="w-2/3 mx-auto mt-5">
          <div className="lg:flex items-center">
            <div className="w-full">
              <InputField
                isPassword={false}
                isIcon={true}
                placeholder="Search Products"
                labelColor="text-balck"
                Icon={<FaSearch />}
                register={register}
                name={"firstName"}
                type={"email "}
                errors={errors}
              />
            </div>
          </div>{" "}
        </div>
        <div className="mt-5 mx-10">
          <div>
            <Table>
              <THeader>
                <Th>Produt </Th>
                <Th>Lot Number</Th>
                <Th> Quantity</Th>
                <Th>Unit Price</Th>
                <Th>Subtotal</Th>

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
                  <Td> </Td>
                </Tbrow>
              </TBody>
            </Table>
          </div>
          <hr className="mt-5" />
          <div className="flex justify-end">
            <div>
              <h2>Total Items: 0.00</h2>
              <h2>Total Amount: 0.00</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-5">
        <button
          className="border-2 border-brand bg-brand text-white py-1 px-7 rounded"
          type="button"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddReturnPurchasePage;
