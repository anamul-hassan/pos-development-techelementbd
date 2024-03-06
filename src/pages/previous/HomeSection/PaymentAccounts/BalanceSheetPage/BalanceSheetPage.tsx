import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";

const BalanceSheetPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        <h1 className="my-3 ml-4 ">
          <span className="text-3xl font-bold">Balance Sheet</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Business Location:"}
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
              label={"Filter by date"}
              type={"date"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4"></div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4"></div>
          <div className="mb-10"></div>
        </div>
      </div>
      <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full ">
          <div className="my-4 ml-2">
            <h2 className="bg-[#D2D6DE] py-2 pl-2">Liability</h2>
            <div>
              <div className="flex justify-between mr-2 ml-2">
                <h2>Supplier Due:</h2>
                <h2>৳ 4222.00</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full ">
          <div className="my-4 mr-2 border-l-[1px] border-brand ">
            <h2 className="bg-[#D2D6DE]  py-2 pl-2">Assets</h2>{" "}
            <div className="flex justify-between ml-2">
              <h2>Customer Due:</h2>
              <h2>৳ 4222.00</h2>
            </div>{" "}
            <div className="flex justify-between ml-2">
              <h2>Closing stock:</h2>
              <h2>৳ 4222.00</h2>
            </div>{" "}
            <div className="flex justify-between ml-2">
              <h2>Account Balances:</h2>
              <h2>৳ 4222.00</h2>
            </div>{" "}
            <div className="flex justify-between ml-2">
              <h2>seals Account:</h2>
              <h2>৳ 4222.00</h2>
            </div>
            <div className="flex justify-between ml-2">
              <h2 className="font-bold">Total Assets:</h2>
              <h2 className="font-bold">৳ 4222.00</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-brand6 text-white font-bold px-4 py-2 rounded-md">
          Print
        </button>
      </div>
    </div>
  );
};

export default BalanceSheetPage;
