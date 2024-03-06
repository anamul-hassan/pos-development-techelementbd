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
import { addWarrantySchema } from "@/schemas/warranty/warranty_schema";
import {
  useAddWarrantyMutation,
  useDeleteWarrantyMutation,
  useGetWarrantiesQuery,
  useUpdateWarrantyMutation,
} from "@/store/warranty/warrantyApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFiletypeCsv } from "react-icons/bs";
import { CiViewColumn } from "react-icons/ci";
import { FaEdit, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPrintOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { Link } from "react-router-dom";

const WarrantyPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState<any>(null);
  const [createWarranty, { isLoading: isCookingWarranty }] =
    useAddWarrantyMutation({}) as any;
  const { data: warrantiesData, isLoading: isWarranty } = useGetWarrantiesQuery(
    undefined
  ) as any;
  const [
    deleteWarranty,
    { data: Delete, isLoading: isDeleting, isSuccess: isDeleted },
  ] = useDeleteWarrantyMutation({}) as any;
  const [
    editWarranty,
    { data: Edit, isLoading: editingWarranty, isSuccess: isSuccessWarranty },
  ] = useUpdateWarrantyMutation({}) as any;

  // const { data: singleWarranty } = useGetSingleWarrantyQuery(modal2) as any;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addWarrantySchema) });
  const {
    register: editReg,
    handleSubmit: handleEdit,
    formState: { errors: err },
    setValue: editValue,
    reset: resetEdit,
  } = useForm();

  const handleAddWarranty = async (data: any) => {
    try {
      const result = await createWarranty(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal1(false);
        toast({
          description: result?.data?.message,
        });
        reset();
      }
    } catch (error: any) {
      toast({
        description: "Warranty Creating Not Successful",
      });
    }
  };
  const handleEditWarranty = async (data: any) => {
    try {
      const result = await editWarranty({ id: modal2?.id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        setModal2(null);
        resetEdit();
      }
    } catch (error: any) {
      toast({
        description: "Warranty Editing Not Successful",
      });
    }
  };

  const handleDeleteWarranty = async (id: string) => {
    await deleteWarranty(id);
  };

  useEffect(() => {
    if (isDeleted) {
      toast({
        description: Delete?.message,
      });
    }
    if (isSuccessWarranty) {
      toast({
        description: Edit?.message,
      });
    }
  }, [isDeleted, isSuccessWarranty, toast, Delete, Edit]);

  if (isWarranty) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-3xl font-bold">Warranties</span>{" "}
          {/* <span className="font-light">Manage your Brand</span> */}
        </h1>
      </div>
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex items-center gap-3 ml-3">
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
          <div className="mt-4 mr-5 ml-3">
            <div className="mt-4 mr-5 flex">
              <div className="mr-5">
                <Input Icon={<FaSearch />} placeholder="Search Warranty..." />
              </div>
              <div className="">
                {actionManager(["manager"]) && (
                  <Button handleClick={() => setModal1(true)}>+Add</Button>
                )}
                <Modal
                  isModal={modal1}
                  width={"lg:w-[35vw] w-full"}
                  height={"lg:h-fit h-full"}
                >
                  <ModalHead
                    title="Add Warranty"
                    setIsModal={() => setModal1(false)}
                  />
                  <ModalBody>
                    <div className="w-full mb-3">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"warranty"}
                        register={register}
                        label={"Warrnty"}
                        type={"text"}
                        errors={errors}
                      />{" "}
                    </div>
                    <div className="w-full">
                      <Select
                        name={"warrantyType"}
                        label="Warranty Type"
                        setValue={setValue}
                        onChange={() => {}}
                      >
                        <Option value={"Official"}>Official</Option>
                        <Option value={"UnOfficial"}>UnOfficial</Option>
                      </Select>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <div className="flex gap-3">
                      <Button
                        handleClick={handleSubmit(handleAddWarranty)}
                        bgColor="bg-indigo-500"
                        bgHoverColor="hover:bg-indigo-600"
                        rounded="rounded-md"
                      >
                        CREATE
                        {isCookingWarranty && (
                          <span className="animate-spin text-lg flex items-center justify-center">
                            <AiOutlineLoading />
                          </span>
                        )}
                      </Button>
                      <Button
                        bgColor="bg-rose-500"
                        bgHoverColor="hover:bg-rose-600"
                        rounded="rounded-md"
                        handleClick={() => setModal1(false)}
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
                <Th>#</Th>
                <Th>Warranty Type</Th>
                <Th>Warranty</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {/* slice((currentPage * 5) - 5, (currentPage * 5))?. */}
                {warrantiesData &&
                  warrantiesData?.data
                    ?.slice(currentPage * 5 - 5, currentPage * 5)
                    ?.map((wr: any, index: any) => (
                      <Tbrow key={wr?.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <div className="text-left">{wr?.warrantyType}</div>
                        </Td>
                        <Td>
                          <div className="text-left">{wr?.warranty}</div>
                        </Td>

                        <Td>
                          <div className="flex items-center gap-5 justify-center">
                            <>
                              <Link to={`/edit_warranty/${wr?.id}`}>
                                <Button
                                  // handleClick={() => setModal2(wr)}
                                  bgColor="bg-indigo-500"
                                  bgHoverColor="hover:bg-indigo-600"
                                >
                                  <FaEdit />
                                  EDIT
                                </Button>
                              </Link>
                              {/* edit modal */}

                              <Modal
                                isModal={modal2}
                                width={"lg:w-[35vw] w-full"}
                                height={"lg:h-fit h-full"}
                              >
                                <ModalHead
                                  title="Edit Warranty"
                                  setIsModal={() => setModal2(null)}
                                />
                                <ModalBody>
                                  <div className="w-full mb-3">
                                    <InputField
                                      isPassword={false}
                                      isIcon={false}
                                      name={"warranty"}
                                      register={editReg}
                                      label={"Warrnty"}
                                      type={"text"}
                                      errors={err}
                                      defaultValue={modal2?.warranty}
                                    />{" "}
                                  </div>
                                  <div className="w-full">
                                    <Select
                                      name={"warrantyType"}
                                      label={modal2?.warrantyType}
                                      setValue={editValue}
                                      onChange={() => {}}
                                    >
                                      <Option value={"Official"}>
                                        Official
                                      </Option>
                                      <Option value={"UnOfficial"}>
                                        Un-official
                                      </Option>
                                    </Select>
                                  </div>
                                </ModalBody>

                                <ModalFooter>
                                  <div className="flex gap-3">
                                    <Button
                                      handleClick={handleEdit(
                                        handleEditWarranty
                                      )}
                                      bgColor="bg-indigo-500"
                                      bgHoverColor="hover:bg-indigo-600"
                                      rounded="rounded-md"
                                    >
                                      EDIT
                                      {editingWarranty && (
                                        <span className="animate-spin text-lg flex items-center justify-center">
                                          <AiOutlineLoading />
                                        </span>
                                      )}
                                    </Button>
                                    <Button
                                      bgColor="bg-rose-500"
                                      bgHoverColor="hover:bg-rose-600"
                                      rounded="rounded-md"
                                      handleClick={() => setModal2(null)}
                                    >
                                      CLOSE
                                    </Button>
                                  </div>
                                </ModalFooter>
                              </Modal>
                            </>
                            <Button
                              handleClick={() => handleDeleteWarranty(wr?.id)}
                              bgColor="bg-red-500"
                              bgHoverColor="hover:bg-red-600"
                            >
                              <FaRegTrashCan />
                              Delete
                              {isDeleting === true && (
                                <span className="animate-spin text-lg flex items-center justify-center">
                                  <AiOutlineLoading />
                                </span>
                              )}
                            </Button>
                          </div>
                        </Td>
                      </Tbrow>
                    ))}
              </TBody>
            </Table>
            {modal2 ? (
              <Modal
                isModal={modal2}
                width={"lg:w-[35vw] w-full"}
                height={"lg:h-fit h-full"}
              >
                <ModalHead
                  title="Edit Warranty"
                  setIsModal={() => setModal2(null)}
                />
                <ModalBody>
                  <form>
                    <div className="w-full mb-3">
                      <InputField
                        isPassword={false}
                        value={modal2?.warranty}
                        isIcon={false}
                        name={"warranty"}
                        register={editReg}
                        label={"Warrnty"}
                        type={"text"}
                        errors={err}
                      />{" "}
                      {/* <input
                        type="text"
                        defaultValue={modal2?.warranty}
                        name={"warranty"}
                        {...register("warranty")}
                        className={`peer h-10 w-full border-brand border-[1px] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg`}
                      /> */}
                    </div>
                    <div className="w-full">
                      <Select
                        name={"warrantyType"}
                        label={modal2?.warrantyType}
                        setValue={editValue}
                        onChange={() => {}}
                      >
                        <Option value={"Official"}>Official</Option>
                        <Option value={"UnOfficial"}>Un-official</Option>
                      </Select>
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <div className="flex gap-3">
                    <Button
                      handleClick={handleEdit(handleEditWarranty)}
                      bgColor="bg-indigo-500"
                      bgHoverColor="hover:bg-indigo-600"
                      rounded="rounded-md"
                    >
                      EDIT
                      {editingWarranty && (
                        <span className="animate-spin text-lg flex items-center justify-center">
                          <AiOutlineLoading />
                        </span>
                      )}
                    </Button>
                    <Button
                      bgColor="bg-rose-500"
                      bgHoverColor="hover:bg-rose-600"
                      rounded="rounded-md"
                      handleClick={() => setModal2(null)}
                    >
                      CLOSE
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>
            ) : null}
          </div>
        </div>
        {/* table area */}
        {warrantiesData?.data?.length > 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={null}
              totalItems={warrantiesData?.data?.length}
              totalPage={Math.ceil(warrantiesData?.data?.length / 5)}
              pageLength={5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyPage;
