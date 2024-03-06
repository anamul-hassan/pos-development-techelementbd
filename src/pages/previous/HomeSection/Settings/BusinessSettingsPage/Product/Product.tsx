import InputField from "@/components/previous/all/InputField";
import { useForm } from "react-hook-form";
const Product = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
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
                label={"SKU Prefix"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Brands
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Price & Tax info
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Racks
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Warranty
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Enable Product Expiry"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Categories
                </label>
              </div>
            </div>
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"Default Unit"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Row
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Is product image required?
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="my-4">
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                name={"firstName"}
                label={"On Product Expiry"}
                type={"text"}
                errors={errors}
              />
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Sub-Categories
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Sub Units
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Position
                </label>
              </div>
            </div>
            <div className="lg:mb-[70px]"></div>
          </div>
          {/* right part */}
        </div>{" "}
      </div>
    </div>
  );
};

export default Product;
