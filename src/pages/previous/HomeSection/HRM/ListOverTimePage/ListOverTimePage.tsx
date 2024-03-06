import { FaRegTrashCan } from "react-icons/fa6";

import { VscFilePdf } from "react-icons/vsc";
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";

import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import InputField from "@/components/previous/all/InputField";
import {
  TBody,
  TFooter,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ListOverTimePage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        <h1 className="my-3 ml-5">
          <span className="text-3xl font-bold">List Over Time Page</span>{" "}
          {/* <span className="font-light text-lg"></span> */}
        </h1>
      </div>
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
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[98%] h-[57vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Number</Th>
                <Th>Name</Th>
                <Th>Role</Th>

                <Th>Email</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <Link to={""}>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button className="flex bg-sky-500 text-white py-1 px-2 rounded cursor-pointer">
                          <GrFormView className="mt-1" size={20} />
                          View
                        </button>
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
              </TFooter>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default ListOverTimePage;