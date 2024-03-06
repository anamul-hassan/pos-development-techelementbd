import InputField from "@/components/previous/all/InputField";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useForm } from "react-hook-form";

const POSComponent = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        <div className="flex gap-5">
          <div className="w-full">
            <div className="mb-3">
              <h2 className="text-2xl font-semibold">
                Add keyboard shortcuts:
              </h2>
              <h3>
                Shortcut should be the names of the keys separated by '+';
                Example: ctrl+shift+b, ctrl+h
              </h3>
              <h3 className="text-lg mt-3 font-semibold">
                Available ky names are:
              </h3>
              <h4>
                shift, ctrl, alt, backspace, tab, enter, return, capslock, esc,
                escape, space, pageup, pagedown, end, home, left, up, right,
                down, ins, del, and plus
              </h4>
            </div>
            <div className=" h-[47vh] mx-auto ">
              <Table>
                <THeader>
                  <Th>Operatings</Th>

                  <Th>Keyboard Shortcut</Th>
                </THeader>
                <TBody>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Express Checkout</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+e"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Pay & Checkout</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+p"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Draft</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+d"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Cancel</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+c"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Go to product quantity</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"12"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Weighing Scale</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={""}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                </TBody>
              </Table>
            </div>
          </div>
          <div className="w-full">
            {" "}
            <div className=" h-[47vh] mx-auto lg:mt-[155px]">
              <Table>
                <THeader>
                  <Th>Operatings</Th>

                  <Th>Keyboard Shortcut</Th>
                </THeader>
                <TBody>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Edit Discont</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+i"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Edit Order Tax</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+t"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Add Payment Row</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+r"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Finalize Payment</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"shift+f"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                  <Tbrow>
                    <Td>
                      <div className="text-left">Add new Product</div>
                    </Td>
                    <Td>
                      <div className="text-left">
                        {" "}
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          register={register}
                          label={"f4"}
                          name={"lastName"}
                          type={"text"}
                          errors={errors}
                        />
                      </div>
                    </Td>
                  </Tbrow>
                </TBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-semibold">POS Settings:</h2>
          <div className="my-4 mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
            <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-6">
              {/* right part */}
              <div className="flex-1 w-full p-2 mt-2">
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable Multiple Pay
                    </label>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Don't show product suggestion
                    </label>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable order tax
                    </label>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Enable transaction date on POS screen
                    </label>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Is service staff required
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Show invoice scheme
                    </label>
                  </div>
                </div>
              </div>
              {/* right part */}
              {/* midel part */}
              <div className="flex-1 w-full p-2">
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Show pricing on product suggestion tooltip
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable Draft
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Don't show recent transactions
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Subtotal Editable
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Enable service staff in product line
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable credit sale button
                    </label>
                  </div>
                </div>
              </div>
              {/* midel part */}
              {/* left part  */}
              <div className="flex-1 w-full p-2 mt-2">
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Show invoice layout dropdown
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable Express Checkout
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable Discount
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Disable Suspend Sale
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-4 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Enable Weighing Scale
                    </label>
                  </div>
                </div>{" "}
                <div className="flex justify-start">
                  <div className="my-5 flex justify-center items-center">
                    <input type="checkbox" className="h-4 w-4" />
                    <label htmlFor="" className="text-lg ml-2">
                      Print invoice on suspend
                    </label>
                  </div>
                </div>
              </div>
              {/* left part */}
            </div>{" "}
            <div className="w-[90%] mx-auto">
              <hr />
              <h3 className="text-xl">Weighing Scale barcode Setting:</h3>
              <h3 className="text-sm">
                Configure barcode as per your weighing scale.
              </h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-6">
              {/* right part */}

              <div className="flex-1 w-full p-2 mt-2">
                {" "}
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"firstName"}
                    label={"Prefix"}
                    type={"text"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex-1 w-full p-2 mt-2">
                {" "}
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"firstName"}
                    label={"Product sku length"}
                    type={"number"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex-1 w-full p-2 mt-2">
                {" "}
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"firstName"}
                    label={"Quantity integer part length"}
                    type={"number"}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex-1 w-full p-2 mt-2">
                {" "}
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"firstName"}
                    label={"Quantity part length"}
                    type={"number"}
                    errors={errors}
                  />
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSComponent;
