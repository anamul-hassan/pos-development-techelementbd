import { FaPowerOff, FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { Link } from "react-router-dom";

const SellingPriceGroupPage = () => {
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2">
          <span className="text-2xl font-bold">Selling Price Group</span>{" "}
        </h1>
      </div>{" "}
      {/* top part  */}
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 mb-20 shadow-lg rounded border-t-2 border-brand">
        <div className="flex justify-between">
          <div className="mt-5 ml-10">
            <h2 className="text-xl font-semibold mb-8">
              Import/Export Selling Price Group Prices
            </h2>
            <button className="bg-[#1367D1] py-2 px-3 text-white rounded mb-10">
              Export Selling Price Group Prices
            </button>
            <h3 className="text-lg">Instructions:</h3>
            <ol className="font-light">
              <li>• Export Selling price group prices.</li>
              <li>• Update the exported file and import the same file.</li>
              <li>
                • Only selling price group prices of the product will be
                updated. Any blank price will be skipped.
              </li>
            </ol>
          </div>
          <div className="mt-5 mx-10 w-[250px]">
            <div className="mt-4 ">
              <span className="mr-3 font-semibold text-[16px]">
                File To Import:
              </span>
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
                    Choose File
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <button className="py-2 px-3 bg-[#1367D1] text-white mt-3 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* top part  */}
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex mt-4 ml-3">
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
          <div className="mt-4 mr-5">
            <Link
              to="/add-users"
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
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] h-[70vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Name</Th>
                <Th>Descrption</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Wholesale Price</div>
                  </Td>
                  <Td></Td>

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
                      <div className="mr-5">
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaRegTrashCan className="mt-1 mr-1" />
                          Delete
                        </button>
                      </div>
                      <div>
                        <button className="flex bg-red-500 text-white py-1 px-2 rounded cursor-pointe">
                          <FaPowerOff className="mt-1 mr-1" />
                          Deactivate
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

export default SellingPriceGroupPage;
