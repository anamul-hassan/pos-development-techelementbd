import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
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

const PaymentAccountReportPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        <h1 className="my-5 ml-12">
          <span className="text-2xl font-bold">Payment Account Report</span>{" "}
          {/* <span className="font-light">Manage your Customers</span> */}
        </h1>
      </div>
      <div className="w-[95%] mx-auto mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="mt-3">
            <div className="relative">
              <select
                {...register("role")}
                className="rounded border-[1px] border-brand appearance-none  w-full py-[4px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
              >
                <option value={"PayTerm"}>Business Location:</option>
                <option value={"Months"}>Bkish</option>
                <option value={"Days"}>Rocket</option>
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
        <div className="flex-1 w-full p-2 mt-2">
          <InputField
            isPassword={false}
            isIcon={false}
            // placeholder="Point:"
            labelColor="text-balck"
            // Icon={<PiContactlessPaymentFill />}
            register={register}
            // label={"Point:"}
            name={"lastName"}
            type={"date"}
            errors={errors}
          />
        </div>{" "}
        <div className="flex-1 w-full p-2 "></div>
        <div className="flex-1 w-full p-2 "></div>
      </div>
      <div className="w-[95%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
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
            <div className="">
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
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] h-[60vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>Pyament Ref No.</Th>
                <Th>Invoice No</Th>
                <Th>Amount</Th>
                <Th>Payment Type</Th>
                <Th>Account</Th>
                <Th>Description</Th>
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

export default PaymentAccountReportPage;
