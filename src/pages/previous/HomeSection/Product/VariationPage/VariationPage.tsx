import Button from "@/components/previous/all/Button";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { actionManager } from "@/utils/helpers/actionManager";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";

const VariationPage = () => {
  const [modal, setModal] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-16">
          <span className="text-2xl font-bold">Variations</span>
          <span className="font-light">Manage product variations</span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
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
                Print
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
          <div className="mt-4 mr-5 flex ml-3">
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
                // label={"Number:"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="">
              {actionManager(["manager"]) && (
                <Button handleClick={() => setModal(true)}>+Add</Button>
              )}
              <Modal isModal={modal} width={"30vw"} height={"26vh"}>
                <ModalHead
                  title="Add Variations"
                  setIsModal={() => setModal(false)}
                />
                <ModalBody>
                  <div className="flex items-center">
                    <h2 className="mt-[13px] w-[200px] font-bold">
                      Variation Name:*
                    </h2>
                    <div className="w-full">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        placeholder="Variation Name"
                        labelColor="text-balck"
                        // Icon={<PiContactlessPaymentFill />}
                        name={"facebook"}
                        register={register}
                        label={""}
                        type={"text"}
                        required
                        errors={errors}
                      />{" "}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <h2 className="mt-[13px] w-[200px] font-bold">
                      Add Variation Values:*
                    </h2>
                    <div className="w-full">
                      <div className="flex">
                        <div className="w-full">
                          <InputField
                            isPassword={false}
                            isIcon={false}
                            placeholder="Values"
                            labelColor="text-balck"
                            // Icon={<PiContactlessPaymentFill />}
                            name={"facebook"}
                            register={register}
                            label={""}
                            type={"text"}
                            required
                            errors={errors}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#0069D9] text-white py-2 px-8 mt-2 rounded">
                      Save
                    </button>
                    {/* <button setIsModal={() => setModal(false)}>Close</button> */}
                  </div>
                </ModalBody>

                <ModalFooter></ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-[70vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Variations</Th>
                <Th>Values</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td>
                    <div className="text-left">Color</div>
                  </Td>
                  <Td>
                    <div className="text-left">black, White, blue</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Jeans</div>
                  </Td>
                  <Td>
                    <div className="text-left">
                      30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 42, 44
                    </div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Ladies</div>
                  </Td>
                  <Td>
                    <div className="text-left">30</div>
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
                    <div className="text-left">Shoe Size</div>
                  </Td>
                  <Td>
                    <div className="text-left">39, 40, 41, 42, 43, 44, 45</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Size</div>
                  </Td>
                  <Td>
                    <div className="text-left">S, L, XL, XXL, M</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Size</div>
                  </Td>
                  <Td>
                    <div className="text-left">S, L, XL, XXL, M</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Size</div>
                  </Td>
                  <Td>
                    <div className="text-left">S, L, XL, XXL, M</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">Size</div>
                  </Td>
                  <Td>
                    <div className="text-left">S, L, XL, XXL, M</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      <div>
                        <a>
                          <button className="flex bg-indigo-500 text-white py-1 px-2 rounded cursor-pointer">
                            <FaRegEdit className="mt-1 mr-1" />
                            Edit
                          </button>
                        </a>
                      </div>
                    </div>
                  </Td>
                </Tbrow>

                <Tbrow>
                  <Td>
                    <div className="text-left">Size</div>
                  </Td>
                  <Td>
                    <div className="text-left"> S, X, XXL, XXLL</div>
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

export default VariationPage;
