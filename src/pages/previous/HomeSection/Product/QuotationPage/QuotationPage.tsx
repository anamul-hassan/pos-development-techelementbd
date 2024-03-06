import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import InputField from "@/components/previous/all/InputField";
import { Link } from "react-router-dom";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { actionManager } from "@/utils/helpers/actionManager";

const QuotationPage = () => {
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
          <span className="text-3xl font-bold">QuotationPage</span>{" "}
          {/* <span className="font-light">Manage your Brand</span> */}
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div>
            <h3 className="mt-12 ml-10 text-lg font-bold">All QuotationPage</h3>
          </div>
          <div className="flex items-center lg:flex-row flex-col lg:justify-start justify-center gap-3 ml-6 mt-5 pt-4">
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
          <div className="mt-4 mr-5 lg:flex gap-5 ml-3">
            <div className="mt-4">
              <InputField
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
              />
            </div>
            {actionManager(["manager"]) && (
              <Link
                to={"/"}
                className="relative inline-block text-lg group mt-2"
              >
                <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">+ADD</span>
                </span>
                <span
                  className="absolute bottom-3 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </Link>
            )}
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-[70vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Duration</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">-Now Phone</div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
                  </Td>
                  <Td>
                    <div className="text-left"></div>
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
                </Tbrow>
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default QuotationPage;
