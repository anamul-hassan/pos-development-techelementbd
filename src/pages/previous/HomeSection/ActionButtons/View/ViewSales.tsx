// import React from "react";
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

const ViewSales = () => {
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
        <div className="lg:flex mt-3 lg:mt-9 ml-12">
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
          </div>
        </div>
      </div>
      <div className="mt-5 mx-12">
        <div>
          <Table>
            <THeader>
              <Th>Action</Th>
              <Th>Date</Th>
              <Th>Challan No</Th>
              <Th>
                Customer <br />
                Name
              </Th>
              <Th>
                Contact <br />
                Number
              </Th>
              <Th>Location</Th>
              <Th>
                Payment <br />
                Status
              </Th>
              <Th>
                Payment <br />
                Method
              </Th>
              <Th>
                Total <br />
                Amount
              </Th>
              <Th>
                Total <br />
                Paid
              </Th>
              <Th>
                Sell <br /> Due
              </Th>
              <Th>
                Sell <br />
                Return <br />
                Due
              </Th>
              <Th>
                Total <br />
                Items
              </Th>
              <Th>
                Shipping <br />
                Status
              </Th>

              <Th>
                Added <br />
                By
              </Th>
              <Th>
                Sell <br />
                Note
              </Th>
              <Th>
                Staff <br />
                Note
              </Th>
              <Th>
                Shipping <br />
                Details
              </Th>
            </THeader>
            <TBody>
              <Tbrow>
                <Td>01/12/2023 00:00</Td>
                <Td>11</Td>
                <Td>3117</Td>
                <Td>1731</Td>
                <Td>Sadid</Td>
                <Td> 17</Td>
                <Td> 31</Td>
                <Td>$3117 </Td>
                <Td> $1000</Td>
                <Td>$500</Td>
                <Td> 17</Td>
                <Td> 31</Td>
                <Td>$3117 </Td>
                <Td> $1000</Td>
                <Td>$500</Td>
                <Td> 17</Td>
                <Td> 31</Td>
                <Td>$3117 </Td>
              </Tbrow>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewSales;
