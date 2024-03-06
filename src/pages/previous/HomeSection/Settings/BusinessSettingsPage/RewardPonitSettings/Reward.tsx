import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";

const Reward = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-6">
          {/* right part */}
          <div className="flex-1 w-full p-2 my-4">
            <div className="flex">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Reward Point
                </label>
              </div>
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Amount unit point"}
                name={"Amountunit point"}
                type={"number"}
                errors={errors}
              />
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
                name={"firstName"}
                label={"Reward Point Name"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"minimum order earn"}
                name={"Stock Transfer"}
                type={"number"}
                errors={errors}
              />
            </div>
          </div>
          {/* midel part */}
          {/* left part  */}
          <div className="flex-1 w-full p-2 mt-6">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"maximum point order"}
                type={"number"}
                errors={errors}
              />
            </div>

            <div className="mb-[83px]"></div>
          </div>
          {/* left part */}
        </div>{" "}
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mt-10">
        <h3 className="text-xl font-bold w-[90%] mx-auto mt-5">
          Redeem Points Settngs:
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-3">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"redeem amount point"}
                type={"number"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"maximum redeem order"}
                name={"Username"}
                type={"number"}
                errors={errors}
              />
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
                name={"firstName"}
                label={"minimum order total points"}
                type={"number"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Rewad Point period"}
                name={"Stock Transfer"}
                type={"number"}
                errors={errors}
              />
            </div>
          </div>
          {/* midel part */}
          {/* left part  */}
          <div className="flex-1 w-full p-2 mt-6">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Minimum redeem point"}
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
                  <option>Year</option>
                  <option value={"Male"}>Month</option>
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

            <div className="mb-[25px]"></div>
          </div>
          {/* left part */}
        </div>{" "}
      </div>
    </div>
  );
};

export default Reward;
