import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import {
  TBody,
  TFooter,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import InputField from "@/components/previous/all/InputField";

const StockAdjustmentReportPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div className="ml-12 text-3xl font-bold">Stock Adjustment Report</div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        {/* <div className="lg:flex justify-between">
          <div className="lg:flex mt-10 ml-7">
            Purchase & Sale Report Purchase & sale details for the selected date
            range
          </div>
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-4">
              {" "}
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
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-[94%] mx-auto">
          <div className="w-full mt-5">
            <div className="border-2">
              <div className=" ">
                <div className="w-full ">
                  <div className="w-[100%]  ">
                    <Table>
                      <TBody>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Normal:</div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Abnormal:</div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">
                              Total Stock Adjustment:
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                      </TBody>
                    </Table>
                  </div>
                </div>
                <div className="w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="">
              <div className="flex flex-col gap-4 md:flex-row items-center justify-center w-[90%] mx-auto">
                <div className="w-[100%] mb-16">
                  <Table>
                    <TBody>
                      <Tbrow>
                        <Td>
                          <div className="text-left">
                            Total Amount Recovered:
                          </div>
                        </Td>
                        <Td>
                          <div className="text-left">৳ 000.00</div>
                        </Td>
                      </Tbrow>
                    </TBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 border-t-2 border-brand pb-10 shadow-xl rounded mt-10">
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
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-3">
              {" "}
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
            <Link
              to={"/add_sale"}
              className="relative inline-block text-lg group mt-2"
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
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>Challan</Th>
                <Th>Location</Th>
                <Th>Adjustment Type</Th>
                <Th>Total Amount</Th>
                <Th>Total Amount Recovered</Th>
                <Th>Reason</Th>
                <Th>Added By</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tbrow>
              </TBody>
              <TFooter>
                <Td row={1} column={1}>
                  All Users:4
                </Td>
                <Td row={1} column={1}>
                  All Name:4
                </Td>
                <Td row={1} column={1}>
                  All Roll:4
                </Td>
                <Td row={1} column={1}>
                  All Email: 4
                </Td>
                <Td row={1} column={1}>
                  All Name:4
                </Td>
                <Td row={1} column={1}>
                  All Roll:4
                </Td>
                <Td row={1} column={1}>
                  All Email: 4
                </Td>
              </TFooter>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default StockAdjustmentReportPage;
