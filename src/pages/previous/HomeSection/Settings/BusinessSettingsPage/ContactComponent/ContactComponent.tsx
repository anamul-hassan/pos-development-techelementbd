import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";

const ContactComponent = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      {/* <h2 className="text-xl font-bold mt-3"></h2> */}
      <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto ">
        <div className=" flex-1 w-full mt-2">
          <InputField
            isPassword={false}
            isIcon={false}
            register={register}
            name={"alternatePhone"}
            label={"Default credit limit"}
            type={"text"}
            errors={errors}
          />{" "}
        </div>
        <div className="flex-1 w-full p-2 mt-2"></div>
        <div className="flex-1 w-full p-2 mt-2"></div>
        <div className="flex-1 w-full p-2 mt-2"></div>
      </div>
    </div>
  );
};

export default ContactComponent;
