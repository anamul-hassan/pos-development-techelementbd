import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const Prefixes = () => {
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
                label={"Purchase"}
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
                name={"Purchase Order"}
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
                label={"Sell Return"}
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
                name={"Purchase Payment"}
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
                label={"Business Location"}
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
                label={"Draft"}
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
                label={"Purchase Return"}
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
                label={"Expenses"}
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
                name={"Sell Payment"}
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
                label={"Username"}
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
                label={"Sales Order"}
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
                label={"Purchase Requisition"}
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
                name={"Stock Adjustment"}
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
                label={"Contacts"}
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
                name={"Expense Payment"}
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
                label={"Subscription No"}
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

export default Prefixes;
