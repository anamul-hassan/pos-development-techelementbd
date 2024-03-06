import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaFileAlt, FaImage } from "react-icons/fa";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/store/user/userApi";
import { addUserSchema } from "@/schemas/user/add_user_schema";
import { useToast } from "@/components/ui/use-toast";
import InputField from "@/components/previous/all/InputField";
import PageLoader from "@/components/common/loader/PageLoader";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";

const EditUserPage = () => {
  // TOAST MESSAGE
  const { toast } = useToast() as any;
  const { branchId } = shareBranchAndUserInfo();
  // CATCH ID BY PARAMS
  const { id } = useParams();
  const { data: user, isLoading: getUserLoading } = useGetSingleUserQuery(
    id
  ) as any;
  const [updateUser] = useUpdateUserMutation() as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm({ resolver: yupResolver(addUserSchema) });
  const handleEditUser = async (data: any) => {
    data.branchId = branchId;
    try {
      const result = await updateUser({ id, data });

      if (result?.data?.data && result?.data?.success === true) {
        toast({
          title: "Edit User",
          description: result?.data?.message,
        });
        navigate("/users_list");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (getUserLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ">
          <span className="text-2xl font-bold">Edit User</span>{" "}
          <span className="font-light">Manage users</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleEditUser)} className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-16">
            {/* right part */}
            <div className="flex-1 w-full p-2 mt-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"firstName"}
                  label={"First Name*"}
                  type={"text"}
                  errors={errors}
                  defaultValue={user?.data?.firstName}
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
                  errors={errors}
                  defaultValue={user?.data?.lastName}
                />
              </div>
              <div className="my-4">
                {/* <span className="mr-3 font-semibold text-[16px]">Gender:</span> */}
                <div className="relative mt-1">
                  <select
                    defaultValue={user?.data?.gender}
                    {...register("gender")}
                    name="gender"
                    className="rounded border-t-2 border-brand appearance-none w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option>Gender</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Others"}>Others</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Date Of Birth"}
                  type={"date"}
                  errors={errors}
                  defaultValue={user?.data?.dateOfBirth}
                />
              </div>
              <div className="my-4">
                {/* <span className="mr-3 font-semibold text-[16px]">
                                  Blood Group:
                              </span> */}
                <div className="relative mt-1">
                  <select
                    defaultValue={user?.data?.bloodGroup}
                    {...register("bloodGroup")}
                    className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option>select blood group</option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>{" "}
              <div className="my-4">
                {/* <span className="mr-3 font-semibold text-[16px]">
                                  Maitial Statuse:
                              </span> */}
                <div className="relative mt-1">
                  <select
                    defaultValue={user?.data?.maritalStatus}
                    {...register("martialStatus")}
                    className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option value={"Married"}>Married</option>
                    <option value={"Unmarried"}>Unmarried</option>
                    <option value={"Divorce"}>Divorce</option>
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
                  errors={errors}
                  defaultValue={user?.data?.alternatePhone}
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
                  errors={errors}
                  defaultValue={user?.data?.familyPhone}
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
                  errors={errors}
                  defaultValue={user?.data?.currentAddress}
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
                  errors={errors}
                  defaultValue={user?.data?.permanentAddress}
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
                  errors={errors}
                  defaultValue={user?.data?.facebook}
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
                  errors={errors}
                  defaultValue={user?.data?.twitter}
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
                  label={"User Number*"}
                  type={"number"}
                  errors={errors}
                  defaultValue={user?.data?.phone}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"email"}
                  register={register}
                  label={"User Email*"}
                  type={"email"}
                  errors={errors}
                  defaultValue={user?.data?.email}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={true}
                  isIcon={false}
                  name={"password"}
                  register={register}
                  label={"Password*"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                {/* <span className="mr-3 font-semibold text-[16px]">Role:</span> */}
                <div className="relative mt-1">
                  <select
                    defaultValue={user?.data?.role}
                    {...register("role")}
                    className="rounded border-t-2 border-brand appearance-none  w-full py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    <option>select role*</option>
                    <option value={"USER"}>USER</option>
                    <option value={"MANAGER"}>MANAGER</option>
                    <option value={"CASHIER"}>CASHIER</option>
                    <option value={"SALESMAN"}>SALESMAN</option>
                    <option value={"MARKETINGOFFICER"}>MARKETINGOFFICER</option>
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
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={true}
                  Icon={<FaFileAlt className="text-lg" />}
                  name={"fileAttachment"}
                  register={register}
                  label={"Document Attachments"}
                  errors={errors}
                  type="text"
                  defaultValue={user?.data?.fileAttachment}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={true}
                  Icon={<FaImage className="text-lg" />}
                  name={"avatar"}
                  register={register}
                  label={"Profile Image"}
                  errors={errors}
                  type="text"
                  defaultValue={user?.data?.avatar}
                />{" "}
              </div>
            </div>
            {/* left part */}
          </div>{" "}
        </div>
        {/* part 1 */}
        {/* part 2 */}

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit User</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
