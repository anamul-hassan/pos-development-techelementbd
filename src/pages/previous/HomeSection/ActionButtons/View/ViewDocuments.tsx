import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { VscFilePdf } from "react-icons/vsc";
import InputField from "@/components/previous/all/InputField";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ViewDocuments = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div className=" bg-white pb-10 px-5 rounded-md">
      {" "}
      <div className="lg:flex justify-between ">
        <div className="lg:flex mt-3  ml-12">
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
              <Link to={""} className="relative inline-block text-lg group">
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
        </div>
      </div>
      <div className="mt-5 mx-12">
        <div>
          <Table>
            <THeader>
              <Th>Action</Th>
              <Th>Heading</Th>
              <Th>Added By</Th>
              <Th>Created At</Th>
              <Th>Updated At</Th>
            </THeader>
            <TBody>
              <Tbrow>
                <Td>01/12/2023 00:00</Td>
                <Td>11</Td>
                <Td>3117</Td>
                <Td>1731</Td>
                <Td>Sadid</Td>
              </Tbrow>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewDocuments;
