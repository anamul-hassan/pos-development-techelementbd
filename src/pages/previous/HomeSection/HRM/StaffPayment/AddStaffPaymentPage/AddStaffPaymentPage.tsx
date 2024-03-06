import { FaRegFilePdf, FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { FaRegTrashCan } from "react-icons/fa6";

import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { Option, Select } from "@/components/previous/all/Select";
import InputField from "@/components/previous/all/InputField";
import Button from "@/components/previous/all/Button";
import Input from "@/components/previous/all/Input";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import { TBody, THeader, Table, Th } from "@/components/previous/all/Table";

const AddStaffPaymentPage = () => {
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
          <span className="text-2xl font-bold">Add Staff Payment </span>{" "}
          {/* <span className="font-light"></span> */}
        </h1>
      </div>
      <div className="w-[95%] mx-auto mb-10 bg-slate-100 border-t-2 pt-5 border-brand flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2">
          <div className="my-4">
            <Select name="gender" label="Supplier name">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
          <div className="my-4">
            <Select name="gender" label="Purchase Status">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
          <div className="my-4">
            <Select name="gender" label="Add Payment">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder="Number"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={"Challan Number"}
              name={"number"}
              type={"number"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <div className="flex justify-center items-center">
              {" "}
              <div className="w-[50%] mr-2">
                <div className="">
                  <Select name="gender" label="Expenses">
                    <Option value="Male">Fixed</Option>
                    <Option value="Female">Persent</Option>
                  </Select>
                </div>
              </div>
              <div className=" w-[50%]">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Pay term"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"facebook"}
                  register={register}
                  label={"0.00"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-center bg-grey-lighter mt-2">
              <label className=" w-full py-[3px] rounded-md text-brand  flex justify-center border-t-2 border-brand items-center  bg-white text-blue  tracking-wide uppercase  cursor-pointer hover:bg-blue hover:text-brand">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal ml-2">
                  Attach File
                </span>
                <input type="file" {...register("avatar")} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <Select name="gender" label="Business Location">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
          <div className="my-4">
            <div className="flex justify-center items-center">
              {" "}
              <div className="w-[50%] mr-2">
                <div className="">
                  <Select name="gender" label="Discout">
                    <Option value="Male">Fixed</Option>
                    <Option value="Female">Persent</Option>
                  </Select>
                </div>
              </div>
              <div className=" w-[50%]">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Pay term"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"facebook"}
                  register={register}
                  label={"0.00"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder="Email"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={""}
              name={"lastName"}
              type={"date"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <Select name="gender" label="Payment Mathods">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Others">Others</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-[94%] mx-auto border-t-2 pt-5 border-brand bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center lg:flex-row flex-col gap-3 ml-6 mt-8">
            <div>
              <Button
                bgColor="bg-[#163020]"
                bgHoverColor="hover:bg-[#255f3c]"
                rounded="rounded-md"
              >
                <BsFiletypeCsv />
                CSV
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#097640]"
                bgHoverColor="hover:bg-[#287647]"
                rounded="rounded-md"
              >
                <FaRegFilePdf />
                Excel
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#0069D9]"
                bgHoverColor="hover:bg-[#2466ac]"
                rounded="rounded-md"
              >
                <IoPrintOutline />
                Pribt
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#18B294]"
                bgHoverColor="hover:bg-[#2d9d87]"
                rounded="rounded-md"
              >
                <CiViewColumn />
                Column
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#527853]"
                bgHoverColor="hover:bg-[#70ae71]"
                rounded="rounded-md"
              >
                <VscFilePdf />
                PDF
              </Button>
            </div>
          </div>
          <div className="mt-4 mr-5">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5">
                {" "}
                <Input
                  Icon={<FaSearch />}
                  name={"search"}
                  placeholder={"Search Unit..."}
                  setValues={undefined}
                />
              </div>
              <div className="">
                <Button>+Add</Button>
                <Modal
                  modal_bg="bg-[#ffffff7e]"
                  // isModal={modal2}
                  width={"w-[100vw] lg:w-[30vw]"}
                  height={"h-[100vh] lg:h-fit"}
                >
                  <ModalHead
                    title="Add Unit"
                    // setIsModal={() => setModal2(false)}
                  />
                  <ModalBody>
                    <div className="mb-3">
                      <div className="w-full">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"name"}
                          register={register}
                          label={"Name*"}
                          type={"text"}
                          // errors={addErr}
                        />{" "}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="w-full">
                        <div className="flex">
                          <div className="w-full">
                            <InputField
                              isPassword={false}
                              isIcon={false}
                              name={"shortName"}
                              register={register}
                              label={"Short Name*"}
                              type={"text"}
                              // errors={addErr}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {/* <h2 className="mt-[13px] w-[200px] font-bold">1 Unit:</h2> */}
                      {/* <div className="flex justify-center items-center"> */}
                      {/* <div className="mt-[7px] w-[50%]">
                          <InputField
                            isPassword={false}
                            isIcon={false}
                            name={"facebook"}
                            register={register}
                            label={""}
                            type={"number"}
                            errors={errors}
                          />{" "}
                        </div> */}
                      <div className="w-[100%]">
                        <Select name="allowDecimal">
                          <Option value="Yes">Yes</Option>
                          <Option value="No">No</Option>
                        </Select>
                      </div>
                      {/* </div> */}
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex gap-3">
                      {/* <Button
                        handleClick={handleAdd(handleAddUnit)}
                        bgColor="bg-indigo-500"
                        bgHoverColor="hover:bg-indigo-600"
                        rounded="rounded-md"
                      >
                        CREATE
                        {isLoadingAddUnit && (
                          <span className="animate-spin text-lg flex items-center justify-center">
                            <AiOutlineLoading />
                          </span>
                        )}
                      </Button> */}
                      <Button
                        bgColor="bg-rose-500"
                        bgHoverColor="hover:bg-rose-600"
                        rounded="rounded-md"
                        // handleClick={() => setModal2(false)}
                      >
                        CLOSE
                      </Button>
                    </div>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-fit mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Action</Th>
                <Th>Date</Th>
                <Th>
                  Challan <br />
                  Number
                </Th>
                <Th>
                  Load <br />
                  Number
                </Th>
                <Th>
                  Product <br />
                  Name
                </Th>
                <Th>
                  Curent <br />
                  Stock
                </Th>
                <Th>
                  Purchase <br /> Price
                </Th>
                <Th>
                  WholeSell <br />
                  Price
                </Th>
                <Th>Retail Price</Th>
                <Th>
                  Total <br />
                  Price
                </Th>
                <Th>
                  {" "}
                  <FaRegTrashCan className="mt-1 mr-1" />
                </Th>
              </THeader>
              <TBody children={undefined}>
                {/* {isSearching ?
                  (<div className="flex items-center gap-4">
                    Searching <SearchLoading /> 
                  </div>)
                  :
                  (<>
                    {getUnits &&
                      searchUnit?.data?.slice((currentPage * 5) - 5, (currentPage * 5))?.map((unit) =>
                        <Tbrow key={unit?.id}>
                          <Td>
                            <div className="text-left">{unit?.name}</div>
                          </Td>
                          <Td>
                            <div className="text-left">{unit?.shortName}</div>
                          </Td>
                          <Td>
                            <div className="text-left">{unit?.allowDecimal}</div>
                          </Td>
                          <Td>
                          
                            {" "}
                            <div className="flex items-center justify-around">
                              <div>
                                <Button
                                  handleClick={() => setModal1(unit?.id)}
                                  bgColor="bg-indigo-500"
                                  bgHoverColor="hover:bg-indigo-600"
                                >
                                  <FaRegEdit />
                                  Edit
                                </Button>
                                <Modal
                                  modal_bg="bg-[#ffffff7e]"
                                  isModal={modal1}
                                  width={"w-[100vw] lg:w-[30vw]"}
                                  height={"h-[100vh] lg:h-fit"}
                                >
                                  <ModalHead
                                    title="Edit Unit"
                                    setIsModal={() => setModal1(null)}
                                  />
                                  <ModalBody>
                                    <div className="mb-3">
                                      <div className="w-full">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          name={"name"}
                                          register={register}
                                          label={"Name*"}
                                          type={"text"}
                                          errors={errors}
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="w-full">
                                        <div className="flex">
                                          <div className="w-full">
                                            <InputField
                                              isPassword={false}
                                              isIcon={false}
                                              name={"shortName"}
                                              register={register}
                                              label={"Short Name*"}
                                              type={"text"}
                                              errors={errors}
                                            />{" "}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="">
                                   
                                      <div className="w-[100%]">
                                        <Select setValue={setValue} name="allowDecimal">
                                          <Option value="Yes">Yes</Option>
                                          <Option value="No">No</Option>
                                        </Select>
                                      </div>
                                     
                                    </div>{" "}
                                  </ModalBody>
                                  <ModalFooter>
                                    <div className="flex gap-3">
                                     
                                      <Button
                                        bgColor="bg-rose-500"
                                        bgHoverColor="hover:bg-rose-600"
                                        rounded="rounded-md"
                                        handleClick={() => setModal1(null)}
                                      >
                                        CLOSE
                                      </Button>
                                    </div>
                                  </ModalFooter>
                                </Modal>
                              </div>
                              <div>
                                <Button
                                  handleClick={() => deleteUnit(unit?.id)}
                                  bgColor="bg-red-500"
                                  bgHoverColor="hover:bg-red-600"
                                >
                                  <FaRegTrashCan />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </Td>
                        </Tbrow>)}
                  </>)} */}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {/* {
          searchUnit?.data?.length > 5 &&
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={searchUnit?.data?.length}
              totalPage={Math.ceil(searchUnit?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        } */}
      </div>
    </div>
  );
};

export default AddStaffPaymentPage;
