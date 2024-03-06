import InputField from "@/components/previous/all/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SalesAdded from "./SalesAdded/SalesAdded";
import SalesPurchase from "./SalesPurchase/SalesPurchase";
import Expenses from "./Expenses/Expenses";
import PaymentCommission from "./PaymentCommission/PaymentCommission";

const SalesRepresentativeReportPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  const [salesAdded, setsalesAdded] = useState(true);
  const [salesCommission, setsalesCommission] = useState(false);
  const [expenses, setexpenses] = useState(false);
  const [paymentCommission, setpaymentCommission] = useState(false);

  const salesAddedHandles = () => {
    setsalesAdded(true);
    setsalesCommission(false);

    setexpenses(false);
    setpaymentCommission(false);
  };
  const salesCommissionHandle = () => {
    setsalesAdded(false);
    setsalesCommission(true);

    setexpenses(false);
    setpaymentCommission(false);
  };

  const expensesHandle = () => {
    setsalesAdded(false);
    setsalesCommission(false);

    setexpenses(true);
    setpaymentCommission(false);
  };
  const paymentCommissionHanlde = () => {
    setsalesAdded(false);
    setsalesCommission(false);

    setexpenses(false);
    setpaymentCommission(true);
  };

  return (
    <div>
      <div>
        <h1 className="my-3 ml-12">
          <span className="text-3xl font-bold">
            Sales Representative Report
          </span>{" "}
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
              label={"User"}
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
              label={""}
              type={"date"}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="mt-5 mx-12">
          <div>
            <h2 className="text-xl">Summary</h2>
            <h2 className="text-2xl mt-9">
              Total Sale - Total Sales Return: ৳ 62,905.00 - ৳ 80.00 = ৳
              62,825.00
            </h2>
            <h2 className="text-2xl">Total Expense: ৳ 0.00</h2>
          </div>
        </div>
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex items-center justify-center">
          <div className=" lg:flex justify-center items-center gap-5 my-5 ">
            <div>
              <button
                onClick={salesAddedHandles}
                className="bg-brand px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Sales Added
              </button>
            </div>
            <div>
              <button
                onClick={salesCommissionHandle}
                className="bg-brand2 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Sales With Purchase
              </button>
            </div>
            <div>
              <button
                onClick={expensesHandle}
                className="bg-brand3 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Expenses
              </button>
            </div>
            <div>
              <button
                onClick={paymentCommissionHanlde}
                className="bg-[#64de31] px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Payment with Commission
              </button>
            </div>
          </div>
        </div>
        <div>
          {salesAdded ? <SalesAdded /> : null}
          {salesCommission ? <SalesPurchase /> : null}
          {expenses ? <Expenses /> : null}
          {paymentCommission ? <PaymentCommission /> : null}
        </div>
      </div>
    </div>
  );
};

export default SalesRepresentativeReportPage;
