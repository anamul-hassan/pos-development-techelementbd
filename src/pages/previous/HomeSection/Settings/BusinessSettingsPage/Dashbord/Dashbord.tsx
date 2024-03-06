import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const Dashbord = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      {" "}
      <div className="flex-1 w-full p-2">
        <div className="my-4 ]">
          <label htmlFor="">View Stock Expiry Alert For:*</label>
          <InputField
            isPassword={false}
            isIcon={false}
            register={register}
            name={"alternatePhone"}
            label={"30"}
            type={"number"}
            errors={errors}
          />{" "}
        </div>
        <div className="mb-[65px]"></div>
      </div>
    </div>
  );
};

export default Dashbord;
