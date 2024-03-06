import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import Input from "@/components/previous/all/Input";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import Pagination from "@/components/previous/all/Pagination";
import SearchLoading from "@/components/previous/all/SearchLoading";
import { Option, Select } from "@/components/previous/all/Select";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useToast } from "@/components/ui/use-toast";
import { addUnitsSchema } from "@/schemas/units/units_schema";
import {
  useAddUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsQuery,
  useSearchUnitQuery,
  useUpdateUnitMutation,
} from "@/store/unit/unitApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaRegEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const UnitPage = () => {
  const { toast } = useToast();
  const [modal1, setModal1] = useState(null);
  const [modal2, setModal2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createUnit, { isLoading: isLoadingAddUnit }] = useAddUnitMutation(
    {}
  ) as any;
  const [editUnit, { isLoading: isUpdateUnit }] = useUpdateUnitMutation(
    {}
  ) as any;
  const { data: getUnits, isLoading: isLoadingGetUnits } = useGetUnitsQuery(
    undefined
  ) as any;
  const [deleteUnit, { data: Delete, isLoading: isDelete }] =
    useDeleteUnitMutation({}) as any;
  const { data: searchUnit, isLoading: isSearching } = useSearchUnitQuery(
    search
  ) as any;

  const {
    register: addreg,
    handleSubmit: handleAdd,
    formState: { errors: addErr },
    setValue: setValueAdd,
    reset: resetAdd,
    clearErrors: errClear,
  } = useForm({ resolver: yupResolver(addUnitsSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(addUnitsSchema) });
  const handleAddUnit = async (data: any) => {
    try {
      const result = await createUnit(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal2(false);
        resetAdd();
        errClear();
        toast({
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEditUnit = async (data: any) => {
    try {
      const result = await editUnit({ id: modal1, data });
      if (result?.data?.data && result?.data?.success === true) {
        reset();
        clearErrors();
        toast({
          description: result?.data?.message,
        });
        setModal1(null);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (isLoadingGetUnits) {
    return <DataLoader />;
  }

  if (Delete?.data?.success === true) {
    toast({
      description: Delete?.message,
    });
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Units </span>{" "}
          <span className="font-light">Manage your units</span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between pt-1">
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
          <div className="mt-4 mr-5 ml-2">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5">
                {" "}
                <Input
                  Icon={<FaSearch />}
                  name={"search"}
                  placeholder={"Search Unit..."}
                  setValues={setSearch}
                />
              </div>
              <div className="">
                {actionManager(["manager"]) && (
                  <Button handleClick={() => setModal2(true)}>+Add</Button>
                )}
                <Modal
                  modal_bg="bg-[#ffffff7e]"
                  isModal={modal2}
                  width={"w-[100vw] lg:w-[30vw]"}
                  height={"h-[100vh] lg:h-fit"}
                >
                  <ModalHead
                    title="Add Unit"
                    setIsModal={() => setModal2(false)}
                  />
                  <ModalBody>
                    <div className="mb-3">
                      <div className="w-full">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"name"}
                          register={addreg}
                          label={"Name*"}
                          type={"text"}
                          errors={addErr}
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
                              register={addreg}
                              label={"Short Name*"}
                              type={"text"}
                              errors={addErr}
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
                        <Select setValue={setValueAdd} name="allowDecimal">
                          <Option value="Yes">Yes</Option>
                          <Option value="No">No</Option>
                        </Select>
                      </div>
                      {/* </div> */}
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex gap-3">
                      <Button
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
                      </Button>
                      <Button
                        bgColor="bg-rose-500"
                        bgHoverColor="hover:bg-rose-600"
                        rounded="rounded-md"
                        handleClick={() => setModal2(false)}
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
                <Th>Name</Th>
                <Th>Short Name</Th>
                <Th>Allow Decimal</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {isSearching ? (
                  <div className="flex items-center gap-4">
                    Searching <SearchLoading />
                  </div>
                ) : (
                  <>
                    {getUnits &&
                      searchUnit?.data
                        ?.slice(currentPage * 5 - 5, currentPage * 5)
                        ?.map((unit: any) => (
                          <Tbrow key={unit?.id}>
                            <Td>
                              <div className="text-left">{unit?.name}</div>
                            </Td>
                            <Td>
                              <div className="text-left">{unit?.shortName}</div>
                            </Td>
                            <Td>
                              <div className="text-left">
                                {unit?.allowDecimal}
                              </div>
                            </Td>
                            <Td>
                              {/* edit */}{" "}
                              <div className="flex items-center justify-around">
                                <div>
                                  <Link to={`/edit_unit/${unit?.id}`}>
                                    <Button
                                      // handleClick={() => setModal1(unit?.id)}
                                      bgColor="bg-indigo-500"
                                      bgHoverColor="hover:bg-indigo-600"
                                    >
                                      <FaRegEdit />
                                      Edit
                                    </Button>
                                  </Link>
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
                                            defaultValue={unit?.name}
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
                                                defaultValue={unit?.shortName}
                                                errors={errors}
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
                                          <Select
                                            setValue={setValue}
                                            name="allowDecimal"
                                          >
                                            <Option value="Yes">Yes</Option>
                                            <Option value="No">No</Option>
                                          </Select>
                                        </div>
                                        {/* </div> */}
                                      </div>{" "}
                                    </ModalBody>
                                    <ModalFooter>
                                      <div className="flex gap-3">
                                        <Button
                                          handleClick={handleSubmit(
                                            handleEditUnit
                                          )}
                                          bgColor="bg-indigo-500"
                                          bgHoverColor="hover:bg-indigo-600"
                                          rounded="rounded-md"
                                        >
                                          EDIT
                                          {isUpdateUnit && (
                                            <span className="animate-spin text-lg flex items-center justify-center">
                                              <AiOutlineLoading />
                                            </span>
                                          )}
                                        </Button>
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
                                    {isDelete && (
                                      <span className="animate-spin text-lg flex items-center justify-center">
                                        <AiOutlineLoading />
                                      </span>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </Td>
                          </Tbrow>
                        ))}
                  </>
                )}
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
        <hr className="m-5" />
        {searchUnit?.data?.length > 5 && (
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
        )}
      </div>
    </div>
  );
};

export default UnitPage;
