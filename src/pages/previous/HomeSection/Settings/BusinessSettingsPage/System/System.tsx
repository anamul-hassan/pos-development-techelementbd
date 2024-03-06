import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const System = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      {" "}
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
                  label={"Theme Color"}
                  type={"text"}
                  errors={errors}
                />
              </div>
            </div>
            {/* right part */}
            {/* midel part */}
            <div className="flex-1 w-full p-2 mt-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"alternatePhone"}
                  label={"Default Datatable"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* midel part */}
            {/* left part  */}
            <div className="flex-1 w-full p-2 -mt-4">
              <div className="flex  mb-2 my-4">
                <div className="my-4 flex justify-center items-center">
                  <input type="checkbox" className="h-4 w-4" />
                  <label htmlFor="" className="text-lg ml-2">
                    Show Help text
                  </label>
                </div>
              </div>
            </div>
            {/* left part */}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default System;
