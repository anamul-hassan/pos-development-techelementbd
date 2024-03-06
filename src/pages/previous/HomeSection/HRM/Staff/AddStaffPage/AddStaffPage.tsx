import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useForm } from "react-hook-form";

const AddStaffPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ">
          <span className="text-3xl font-bold">Add Staff</span>{" "}
          <span className="font-light text-lg">Manage Staff</span>
        </h1>
      </div>
      <form className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2  border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-16">
            {/* right part */}
            <div className="flex-1 w-full p-2 mt-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="First Name"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  register={register}
                  name={"firstName"}
                  label={"Name"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div>
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Last Name"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  register={register}
                  label={"Father Name"}
                  name={"lastName"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              {/* <div className="my-4">
                <div className="relative mt-1">
                  <select
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
              </div> */}
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Date Of Birth"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Mother Name"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Date Of Birth"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Address"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Date Of Birth"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Permanent Address"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Date Of Birth"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"dateOfBirth"}
                  register={register}
                  label={"Date Of Birth"}
                  type={"date"}
                  errors={errors}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Alternate Phone"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  register={register}
                  name={"alternatePhone"}
                  label={"Bangladeshi"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <Select name="gender" label="Islam">
                  <Option value="Male">Islam</Option>
                  <Option value="Male">Hindusm</Option>
                  <Option value="Female">Buddhism</Option>
                  <Option value="Others">Christianity</Option>
                </Select>
              </div>
              <div className="my-4">
                <Select name="gender" label="Married">
                  <Option value="Male">Married</Option>
                  <Option value="Male">Unmarrid</Option>
                  <Option value="Female">Other</Option>
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Current Address"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  register={register}
                  name={"currentAddress"}
                  label={"NID"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* right part */}
            {/* midel part */}
            <div className="flex-1 w-full p-2 mt-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Facebook"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"facebook"}
                  register={register}
                  label={"Birth Certificate"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <Select name="gender" label="Blood Group">
                  <Option value="Male">A+</Option>
                  <Option value="Female">A-</Option>
                  <Option value="Others">B+</Option>
                  <Option value="Others">B-</Option>
                  <Option value="Others">AB+</Option>
                  <Option value="Others">AB-</Option>
                  <Option value="Others">O+</Option>
                  <Option value="Others">O-</Option>
                </Select>
              </div>{" "}
              <div className="my-4">
                <Select name="gender" label="Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </div>
              <div className="mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Twitter"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"twitter"}
                  register={register}
                  label={"Mobile"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Twitter"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"twitter"}
                  register={register}
                  label={"Educational Qualification"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Twitter"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"twitter"}
                  register={register}
                  label={"Experience"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Twitter"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"twitter"}
                  register={register}
                  label={"Staff ID"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                {/* <span className="mr-3 font-semibold text-[16px]">
                                        User Image:
                                    </span> */}
                <div className="flex items-center justify-center bg-grey-lighter mt-2 ">
                  <label className="w-full py-[3px] flex  text-brand   justify-center rounded-md border-t-2 border-brand items-center  bg-white text-blue tracking-wide uppercase  cursor-pointer hover:bg-blue hover:text-brand">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal ml-2">
                      User Image
                    </span>
                    <input
                      type="file"
                      {...register("avatar")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Twitter"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"twitter"}
                  register={register}
                  label={"Staff Type"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <Select name="gender" label="Department">
                  <Option value="Male">Accounts Deptment</Option>
                  <Option value="Female">Sr</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </div>
            </div>
            {/* midel part */}
            {/* left part  */}
            <div className="flex-1 w-full p-2 mt-3">
              <div className="my-4">
                <Select name="gender" label="Designation">
                  <Option value="Male">Accountant</Option>
                  <Option value="Female">Na</Option>
                  <Option value="Others">Sr</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  placeholder="Email"
                  labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"email"}
                  register={register}
                  label={"Office zone"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"joining Date"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Job Exemption Date"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Email"}
                  type={"email"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Mobile"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Machine ID"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Note"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Note 2"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  // placeholder="Password"
                  // labelColor="text-balck"
                  // Icon={<PiContactlessPaymentFill />}
                  name={"password"}
                  register={register}
                  label={"Note 3"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* left part */}
          </div>{" "}
        </div>
        {/* part 1 */}
        {/* part 2 */}

        <div className="flex justify-center items-center mt-6">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">ADD New Staff</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffPage;
