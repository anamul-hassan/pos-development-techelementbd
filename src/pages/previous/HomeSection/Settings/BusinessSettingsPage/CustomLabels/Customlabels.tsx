import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";

const Customlabels = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      {" "}
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mt-10">
        <h3 className="text-xl font-bold w-[90%] mx-auto mt-5">
          Labels for custom payments:
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
                label={"Custom Payment 1"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Custom Payment 2"}
                name={"Username"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Custom Payment 3"}
                name={"Username"}
                type={"text"}
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
                label={"Custom Payment 4"}
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
                label={"Custom Payment 5"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="mb-[70px]"></div>
          </div>
          {/* midel part */}
          {/* left part  */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Custom Payment 6"}
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
                label={"Custom Payment 7"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="mb-[70px]"></div>
          </div>
          {/* left part */}
        </div>{" "}
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mt-10">
        <h3 className="text-xl font-bold w-[90%] mx-auto mt-5">
          Labels for custom payments:
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
                label={"Custom Payment 1"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Custom Payment 2"}
                name={"Username"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Custom Payment 3"}
                name={"Username"}
                type={"text"}
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
                label={"Custom Payment 4"}
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
                label={"Custom Payment 5"}
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
                label={"Custom Payment 6"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
          {/* midel part */}
          {/* left part  */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Custom Payment 7"}
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
                label={"Custom Payment 8"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="mb-[70px]"></div>
          </div>
          {/* left part */}
          <div className="flex-1 w-full p-2 ">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Custom Payment 9"}
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
                label={"Custom Payment 10"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="mb-[70px]"></div>
          </div>
          {/* left part */}
        </div>{" "}
      </div>
    </div>
  );
};

export default Customlabels;
