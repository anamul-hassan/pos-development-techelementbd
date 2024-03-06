import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";

const Business = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
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
                label={"Business Name"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">Gender:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("gender")}
                  name="gender"
                  className="rounded border-t-2 border-brand appearance-none w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Bangladesh-taka(BDT)</option>
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
                isIcon={true}
                Icon={<FaImage className="text-lg" />}
                name={"avatar"}
                register={register}
                label={"upload logo"}
                errors={errors}
                type="text"
              />{" "}
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"dateOfBirth"}
                register={register}
                label={"transaction edit day"}
                type={"number"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                              Blood Group:
                          </span> */}
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>currency precision</option>
                  <option value={"A+"}>1</option>
                  <option value={"A-"}>2</option>
                  <option value={"B+"}>3</option>
                  <option value={"B-"}>4</option>
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
                label={"start date"}
                type={"date"}
                errors={errors}
              />{" "}
            </div>
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">Gender:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("gender")}
                  name="gender"
                  className="rounded border-t-2 border-brand appearance-none w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>currency symbol</option>
                  <option value={"Male"}>Before amount</option>
                  <option value={"Female"}>After amount</option>
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
                isIcon={true}
                Icon={<FaImage className="text-lg" />}
                name={"avatar"}
                register={register}
                label={"login screen Image"}
                errors={errors}
                type="text"
              />{" "}
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"currentAddress"}
                label={"date format"}
                type={"date"}
                errors={errors}
              />{" "}
            </div>
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">Gender:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("gender")}
                  name="gender"
                  className="rounded border-t-2 border-brand appearance-none w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Quantity precision:*</option>
                  <option value={"Male"}>0</option>
                  <option value={"Male"}>1</option>
                  <option value={"Male"}>2</option>
                  <option value={"Male"}>3</option>
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
                label={"Default Profite"}
                type={"number"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">Gender:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("gender")}
                  name="gender"
                  className="rounded border-t-2 border-brand appearance-none w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Time Zone</option>
                  <option value={"Male"}>Asia/Dhaka</option>
                  <option value={"Female"}>Asia/Dili</option>
                  <option value={"Others"}>Asia/Dubai</option>
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
              {/* <span className="mr-3 font-semibold text-[16px]">Role:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Financiial Year Start Month:</option>
                  <option value={"USER"}>January</option>
                  <option value={"MANAGER"}>February</option>
                  <option value={"CASHIER"}>March</option>
                  <option value={"SALESMAN"}>April</option>
                  <option value={"MARKETINGOFFICER"}>May</option>
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
              {/* <span className="mr-3 font-semibold text-[16px]">Role:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Stock Accounting </option>
                  <option value={"USER"}>Fifo (First in First out)</option>
                  <option value={"MANAGER"}>Lifo (Last In First Out)</option>
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
              {/* <span className="mr-3 font-semibold text-[16px]">Role:</span> */}
              <div className="relative mt-1">
                <select
                  {...register("role")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Time Format</option>
                  <option value={"USER"}>12 Hour</option>
                  <option value={"MANAGER"}>24 Hour</option>
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
          {/* left part */}
        </div>{" "}
      </div>
      {/* part 1 */}
    </div>
  );
};

export default Business;
