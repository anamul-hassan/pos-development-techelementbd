import Button from "@/components/previous/all/Button";
import InputField from "@/components/previous/all/InputField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { addBranchSchema } from "@/schemas/branch/branch_schema";
import { addUserSchema } from "@/schemas/user/add_user_schema";
import {
  useAddBranchMutation,
  useGetBranchesQuery,
} from "@/store/branch/branchApi";
import { useAddUserMutation } from "@/store/user/userApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { FaFileAlt, FaImage, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const { toast } = useToast() as any;
  const [modal, setModal] = useState<boolean>(false);
  const [addUser] = useAddUserMutation() as any;
  const [addBranch, { isLoading: isLoadingCreateBranch }] =
    useAddBranchMutation() as any;
  const { data: branchData } = useGetBranchesQuery(undefined);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit: submitUser,
    formState: { errors: addUserError },
    setValue,
  } = useForm({ resolver: yupResolver(addUserSchema) });
  const {
    register: registerBranch,
    handleSubmit: submitBranch,
    formState: { errors: addBranchError },
    // setValue,
  } = useForm({ resolver: yupResolver(addBranchSchema) });
  const handleAddUser = async (data: any) => {
    try {
      const result = await addUser(data);

      if (result?.data?.data && result?.data?.success === true) {
        toast({
          title: "Add User Message",
          description: result?.data?.message,
        });
        navigate("/users_list");
      }
    } catch (error: any) {
      toast({
        title: "User Add Error",
        description: "User added unsuccessful! try again",
      });
    }
  };

  const handleCreateBranch = async (data: any) => {
    try {
      const result = await addBranch(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModal(false);
        toast({
          title: "User Create Message",
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto ">
        <h1 className="my-5 ">
          <span className="text-3xl font-bold">Add User</span>{" "}
          <span className="font-light text-lg">Manage user</span>
        </h1>
      </div>
      {/* part 1 */}
      <div className=" md:mx-0 bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand pt-10 xl:px-10 md:px-0">
        <div className="flex items-center gap-2 text-base font-semibold tracking-wide uppercase xl:justify-end md:justify-center mr-10">
          <div className="w-[260px]">
            <Select name="branchId" setValue={setValue} label="Select Branch">
              {branchData &&
                branchData?.data?.map((branch: any) => (
                  <Option key={branch?.id} value={branch?.id}>
                    {branch?.branchName}
                  </Option>
                ))}
            </Select>
          </div>
          <span
            onClick={() => setModal(true)}
            className="text-lg bg-brand3 rounded-md w-10 h-10 flex items-center justify-center text-brand4 cursor-pointer"
          >
            <FaPlus />
          </span>

          <Modal
            isModal={modal}
            modal_bg="bg-[#ffffff7e]"
            width="w-[400px]"
            height="h-fit"
          >
            <ModalHead
              title={"Create Branch"}
              setIsModal={() => setModal(false)}
            />
            <form>
              <ModalBody>
                <div className="mb-3">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={registerBranch}
                    name={"branchName"}
                    label={"Branch Name"}
                    type={"text"}
                    errors={addBranchError}
                  />
                </div>
                <div>
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={registerBranch}
                    name={"branchLocation"}
                    label={"Branch Location"}
                    type={"text"}
                    errors={addBranchError}
                  />
                </div>
              </ModalBody>
            </form>
            <ModalFooter>
              <div className="flex gap-3">
                <Button
                  handleClick={submitBranch(handleCreateBranch)}
                  bgColor="bg-indigo-500"
                  bgHoverColor="hover:bg-indigo-600"
                  rounded="rounded-md"
                >
                  CREATE
                  {isLoadingCreateBranch && (
                    <span className="animate-spin text-lg flex items-center justify-center">
                      <AiOutlineLoading />
                    </span>
                  )}
                </Button>
                <Button
                  bgColor="bg-rose-500"
                  bgHoverColor="hover:bg-rose-600"
                  rounded="rounded-md"
                  handleClick={() => setModal(false)}
                >
                  CLOSE
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
        <form onSubmit={submitUser(handleAddUser)}>
          <div className="flex flex-col md:flex-row items-center justify-center xl:w-[90%] md:w-full mx-auto">
            {/* right part */}
            <div className="flex-1 w-full p-2 mt-1">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"firstName"}
                  label={"First Name"}
                  type={"text"}
                  errors={addUserError}
                />
              </div>
              <div>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  label={"Last Name"}
                  name={"lastName"}
                  type={"text"}
                  errors={addUserError}
                />
              </div>
              <div className="my-4">
                <Select name="gender" setValue={setValue} label="Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Date Of Birth"}
                  type={"date"}
                  errors={addUserError}
                />
              </div>
              <div className="my-4">
                <Select
                  name="bloodGroup"
                  setValue={setValue}
                  label="Select Blood Group"
                >
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>
              </div>{" "}
              <div className="my-4">
                <Select
                  name="maritialStatus"
                  setValue={setValue}
                  label="Select Marital Status"
                >
                  <Option value="Married">Married</Option>
                  <Option value="Unmarried">Unmarried</Option>
                  <Option value="Divorce">Divorce</Option>
                </Select>
              </div>
            </div>
            {/* right part */}
            {/* midel part */}
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"alternatePhone"}
                  label={"Alternate Phone"}
                  type={"number"}
                  errors={addUserError}
                />{" "}
              </div>
              <div>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"familyPhone"}
                  label={"Family Phone"}
                  type={"number"}
                  errors={addUserError}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"currentAddress"}
                  label={"Current Address"}
                  type={"text"}
                  errors={addUserError}
                />{" "}
              </div>
              <div>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"permanentAddress"}
                  label={"Permanent Address"}
                  type={"text"}
                  errors={addUserError}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"facebook"}
                  register={register}
                  label={"Facebook"}
                  type={"text"}
                  errors={addUserError}
                />{" "}
              </div>
              <div className="mb-3">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"twitter"}
                  register={register}
                  label={"Twitter"}
                  type={"text"}
                  errors={addUserError}
                />{" "}
              </div>
            </div>
            {/* midel part */}
            {/* left part  */}
            <div className="flex-1 w-full p-2 mt-6">
              <div className="-mt-1  mb-2 my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"phone"}
                  register={register}
                  label={"User Number"}
                  type={"number"}
                  errors={addUserError}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"email"}
                  register={register}
                  label={"User Email"}
                  type={"email"}
                  errors={addUserError}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={true}
                  isIcon={false}
                  name={"password"}
                  register={register}
                  label={"Password"}
                  errors={addUserError}
                />{" "}
              </div>
              <div className="my-4">
                <Select name="role" setValue={setValue} label="Select Role">
                  <Option value="USER">User</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="CASHIER">Cashier</Option>
                  <Option value="SALESMAN">Salesman</Option>
                  <Option value="MARKETINGOFFICER">Marketing Officer</Option>
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={true}
                  Icon={<FaFileAlt className="text-lg" />}
                  name={"fileAttachment"}
                  register={register}
                  label={"Document Attachments"}
                  errors={addUserError}
                  type="text"
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={true}
                  Icon={<FaImage className="text-lg" />}
                  name={"avatar"}
                  register={register}
                  label={"Profile Image"}
                  errors={addUserError}
                  type="text"
                />{" "}
              </div>
            </div>
            {/* left part */}
          </div>
          <div className="flex justify-center items-center mt-6">
            <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative uppercase">Add New User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
