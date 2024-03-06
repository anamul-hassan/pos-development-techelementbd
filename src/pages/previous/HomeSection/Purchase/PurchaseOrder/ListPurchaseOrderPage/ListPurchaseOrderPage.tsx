import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "@/components/previous/all/InputField";
import { FaRegFilePdf } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import { TBody, THeader, Table, Th } from "@/components/previous/all/Table";
import { actionManager } from "@/utils/helpers/actionManager";

const ListPurchaseOrderPage = () => {
  // const [modal, setModal] = useState(false);
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Purchase Order List</span>{" "}
        </h1>
      </div>
      {/* part 1 */}
      <div className="w-[94%] mb-16 mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
          {/* right part1 */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">Supplier:</span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded-md border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
            </div>
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
          {/* right part1 */}
          {/* midel part2 */}
          <div className="flex-1 w-full p-2">
            <div className="mt-5">
              <span className="mr-3 font-semibold text-[16px]">Status:</span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded-md border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>All</option>
                  <option value={"User"}>Ordered</option>
                  <option value={"User"}>Partial</option>
                  <option value={"User"}>Completed</option>
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
            <div className="lg:mb-[60px]"></div>
          </div>
          {/* midel part2 */}
          {/* left part3  */}
          <div className="flex-1 w-full p-2">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">
                Shipping Status:
              </span>
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded-md border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"User"}>All</option>
                  <option value={"User"}>Ordered</option>
                  <option value={"User"}>Packed</option>
                  <option value={"User"}>Shipped</option>

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
            <div className="lg:mb-[60px]"></div>
          </div>

          {/* left part4*/}
          <div className="flex-1 w-full  p-2">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">
                Bussiness Location:
              </span>
              <div className="relative mt-1">
                <select
                  // {...register("role")}
                  className="rounded-md border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
            </div>

            <div className="lg:mb-[60px]"></div>
          </div>
        </div>{" "}
      </div>
      {/* part 1 */}
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div>
            <h2 className="mt-5 lg:mt-14 ml-10 text-xl font-bold">
              All Purchase Order
            </h2>
          </div>
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
                {" "}
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder={"Search"}
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  register={register}
                  name={"firstName"}
                  label={"Search"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div className=" mr-5">
                {actionManager(["manager"]) && (
                  <Link
                    to={"/add_purchase_order"}
                    className="relative inline-block text-lg group"
                  >
                    <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">+ADD</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-[50vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>Challan No</Th>
                <Th>Location</Th>
                <Th>Supplier</Th>
                <Th>Status</Th>
                <Th>Quantity Remaining</Th>
                <Th>Shipping Status</Th>
                <Th>AddedBy</Th>
              </THeader>
              <TBody>
                {/* <Tbrow>
                  <Td>
                    <div className="text-left">Box</div>
                  </Td>
                  <Td>
                    <div className="text-left">(Box)</div>
                  </Td>
                  <Td>
                    <div className="text-left">Yes</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex">
                      <div className="mr-5">
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow> */}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default ListPurchaseOrderPage;
