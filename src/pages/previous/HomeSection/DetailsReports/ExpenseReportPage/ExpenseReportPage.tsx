import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";

const ExpenseReportPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        <h1 className="my-3 ml-12 ">
          <span className="text-3xl font-bold">Expense Report</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      <div className="w-[94%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Business Location"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Category"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={""}
              type={"date"}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReportPage;
