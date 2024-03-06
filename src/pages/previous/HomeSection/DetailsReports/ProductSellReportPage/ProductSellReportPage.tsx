import { useForm } from "react-hook-form";
import { useState } from "react";
import Detailed from "./Detailed/Detailed";
import DetailedPurchase from "./DetailedPurchase/DetailedPurchase";
import Grouped from "./Grouped/Grouped";
import Category from "./Category/Category";
import Brand from "./Brand/Brand";
import InputField from "@/components/previous/all/InputField";

const ProductSellReportPage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();

  const [detailed, setdetailed] = useState(true);
  const [detailedPurchase, setdetailedPurchase] = useState(false);
  const [grouped, setgrouped] = useState(false);
  const [category, setcategory] = useState(false);
  const [brand, setBrand] = useState(false);

  const detailedHandles = () => {
    setdetailed(true);
    setdetailedPurchase(false);
    setBrand(false);
    setgrouped(false);
    setcategory(false);
  };
  const detailedPurchaseHandle = () => {
    setdetailed(false);
    setdetailedPurchase(true);
    setBrand(false);
    setgrouped(false);
    setcategory(false);
  };
  const brandHandle = () => {
    setdetailed(false);
    setdetailedPurchase(false);
    setBrand(true);
    setgrouped(false);
    setcategory(false);
  };
  const groupedHandle = () => {
    setdetailed(false);
    setdetailedPurchase(false);
    setBrand(false);
    setgrouped(true);
    setcategory(false);
  };
  const categoryHanlde = () => {
    setdetailed(false);
    setdetailedPurchase(false);
    setBrand(false);
    setgrouped(false);
    setcategory(true);
  };

  return (
    <div>
      <div>
        <h1 className="my-3 ml-12 ">
          <span className="text-3xl font-bold">Product Sell Report</span>{" "}
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
              label={"Search Product"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              placeholder="Customer"
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              label={"Category"}
              name={""}
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
              label={"Customer"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Brand"}
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
              label={"Customer Group Name"}
              type={"text"}
              errors={errors}
            />
          </div>
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
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={"Business grouped"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              // Icon={<PiContactlessPaymentFill />}
              register={register}
              name={"firstName"}
              label={""}
              type={"time"}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex items-center justify-center">
          <div className=" lg:flex justify-center items-center gap-5 my-5 ">
            <div>
              <button
                onClick={detailedHandles}
                className="bg-brand px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Detailed
              </button>
            </div>
            <div>
              <button
                onClick={detailedPurchaseHandle}
                className="bg-brand2 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Detailed(With Purchase)
              </button>
            </div>
            <div>
              <button
                onClick={groupedHandle}
                className="bg-brand3 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Grouped
              </button>
            </div>
            <div>
              <button
                onClick={categoryHanlde}
                className="bg-[#64de31] px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                By Category
              </button>
            </div>
            <div>
              <button
                onClick={brandHandle}
                className="bg-brand5 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                By Brand
              </button>
            </div>
          </div>
        </div>
        <div>
          {detailed ? <Detailed /> : null}
          {detailedPurchase ? <DetailedPurchase /> : null}
          {grouped ? <Grouped /> : null}
          {category ? <Category /> : null}
          {brand ? <Brand /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductSellReportPage;
