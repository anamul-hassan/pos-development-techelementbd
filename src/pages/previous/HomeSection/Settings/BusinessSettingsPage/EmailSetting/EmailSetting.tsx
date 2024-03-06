import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const EmailSetting = () => {
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
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Mail Driver"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Last Name"}
                name={"Username"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"dateOfBirth"}
                register={register}
                label={"From Address"}
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
                label={"Host"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Password"}
                name={"Stock Transfer"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                name={"dateOfBirth"}
                register={register}
                label={"From Name"}
                type={"text"}
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
                label={"Port"}
                type={"text"}
                errors={errors}
              />
            </div>
            <div>
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Last Name"}
                name={"Encryption"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="mb-[95px]"></div>
          </div>
          {/* left part */}
        </div>{" "}
      </div>
    </div>
  );
};

export default EmailSetting;
