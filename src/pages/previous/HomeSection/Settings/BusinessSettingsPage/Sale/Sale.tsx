import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const Sale = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      {" "}
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
                label={"Default Sale Discount"}
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
                  <option>amount rounding method</option>
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

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Sales Order
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                              Blood Group:
                          </span> */}
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>default sale tax</option>
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

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Sales Price is minimum selling price
                </label>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Is Pay term required?
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                              Blood Group:
                          </span> */}
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>sales item addition method</option>
                  <option value={"A+"}>
                    Increase Item Quantity if it already exists
                  </option>
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

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Allow Overselling
                </label>
              </div>
            </div>

            <div className="lg:mb-[65px]"></div>
          </div>
          {/* right part */}
        </div>
        <div className="border-brand border-[1px] w-[98%] mx-auto"></div>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand my-5">
        <h2 className="text-xl font-bold lg:ml-16 mt-5">Comission Agent:</h2>
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-3">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                              Blood Group:
                          </span> */}
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>select from user's list</option>
                  <option value={"A+"}>Disable</option>
                  <option value={"A-"}>Logged in user</option>
                  <option value={"B+"}>Select from user's list</option>
                  <option value={"B-"}>
                    Select from commission agent's list
                  </option>
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
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              {/* <span className="mr-3 font-semibold text-[16px]">
                              Blood Group:
                          </span> */}
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>Commission Calculation Type</option>
                  <option value={"A+"}>Payment Received</option>
                  <option value={"A-"}>Invoice Value</option>
                  <option value={"B+"}>Payment Received</option>
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
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Is Commission agent required?
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
        </div>
        <div className="border-brand border-[1px] w-[98%] mx-auto"></div>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand my-5">
        <h2 className="text-xl font-bold lg:ml-16 mt-5">Payment Link:</h2>
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-3">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Key Id"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Key Secret"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Stripe Public Key"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* right part */}
        </div>
      </div>
    </div>
  );
};

export default Sale;
