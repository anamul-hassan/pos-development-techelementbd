import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const SMSSetting = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-16">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <span className="mr-3 font-semibold text-[16px]">
                SMS Service:
              </span>
              <div className="relative mt-1">
                <select
                  {...register("bloodGroup")}
                  className="rounded border-t-2 border-brand appearance-none  w-full py-[7px] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>SMS</option>
                  <option value={"A+"}>Other</option>
                  <option value={"A-"}>Nexmo</option>
                  <option value={"B+"}>Twilio</option>
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
            <div className="mt-4 mb-8">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"URL"}
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
                label={"Send Name"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="lg:mb-[65px]"></div>
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
                label={"Message name"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="lg:mb-[65px]"></div>
          </div>
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Request Method"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="lg:mb-[65px]"></div>
          </div>
          {/* right part */}
        </div>
        <div className="border-brand border-[1px] w-[98%] mx-auto"></div>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand my-5">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-3">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Header 1 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Header 2 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Header 3 Key"}
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
                label={"Header 1 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Header 2 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Header 3 value"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2"></div>
          {/* right part */}
        </div>
        <div className="border-brand border-[1px] w-[98%] mx-auto"></div>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand my-5">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-3">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 1 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 2 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 3 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 4 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 5 Key"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 6 Key"}
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
                label={"parameter 1 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 2 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 3 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 4 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 5 value"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"parameter 6 value"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2"></div>
          {/* right part */}
        </div>
        <div className="border-brand border-[1px] w-[98%] mx-auto"></div>
      </div>
    </div>
  );
};

export default SMSSetting;
