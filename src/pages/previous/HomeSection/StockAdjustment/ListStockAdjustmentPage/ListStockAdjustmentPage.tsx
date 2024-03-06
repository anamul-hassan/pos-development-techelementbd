import { Link } from "react-router-dom";
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

const ListStockAdjustmentPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 cl">
          <span className="text-2xl font-bold">Stock Adjustments </span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      {/* <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
            <div className="flex-1 w-full p-2 ">
              <InputField
                isPassword={false}
                isIcon={false}
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"firstName"}
                label={"Business Location:"}
                type={"text"}
                errors={errors}
              />
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Customer"
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={"Customer:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="flex-1 w-full p-2 ">
              <InputField
                isPassword={false}
                isIcon={false}
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"firstName"}
                label={"Payment Status:"}
                type={"text"}
                errors={errors}
              />
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder="Sources"
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={"Sources:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="flex-1 w-full p-2 ">
              <InputField
                isPassword={false}
                isIcon={false}
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"firstName"}
                label={"Subcriptions:"}
                type={"text"}
                errors={errors}
              />
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder=""
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={""}
                name={"lastName"}
                type={"date"}
                errors={errors}
              />
            </div>
            <div className="flex-1 w-full p-2 ">
              <InputField
                isPassword={false}
                isIcon={false}
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                name={"firstName"}
                label={"User:"}
                type={"text"}
                errors={errors}
              />
              <InputField
                isPassword={false}
                isIcon={false}
                placeholder=""
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={"Shipping Status:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div> */}
      <div className="w-[98%] mx-auto bg-slate-100 border-t-2 border-brand pb-10 shadow-xl rounded">
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
                register={register}
                label={"Search:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
            <Link
              to={"/add_stock_adjustment"}
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
          <div className="w-[98%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>Challan No</Th>
                <Th>Location(From)</Th>
                <Th>Adjustment type</Th>
                <Th>Total Amount</Th>
                <Th>Total amount recoverred</Th>
                <Th>Reason</Th>
                <Th>Added By</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td>
                    <div></div>
                  </Td>
                  <Td>10/1024</Td>
                  <Td>0063</Td>
                  <Td>Sad </Td>
                  <Td>01558085609</Td>
                  <Td>Dhaka</Td>
                  <Td>Paid</Td>
                  <Td>Cash</Td>
                  <Td>Cash</Td>
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

export default ListStockAdjustmentPage;
