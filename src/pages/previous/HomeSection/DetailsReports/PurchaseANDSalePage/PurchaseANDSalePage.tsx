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

const PurchaseANDSalePage = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="lg:flex justify-between">
          <div className="lg:flex mt-10 ml-7">
            Purchase & Sale Report Purchase & sale details for the selected date
            range
          </div>
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-4">
              {" "}
              <InputField
                isPassword={false}
                isIcon={false}
                // placeholder="Point:"
                labelColor="text-balck"
                // Icon={<PiContactlessPaymentFill />}
                register={register}
                label={"Search:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-[94%] mx-auto">
          <div className="w-full mt-5">
            <div className="border-2">
              <div className=" ">
                <div className="w-full ">
                  <div className="w-[100%]  ">
                    <Table>
                      <THeader>
                        <Th>Purchases</Th>
                        <Th></Th>
                      </THeader>
                      <TBody>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Purchase:</div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">
                              Purchase Including tax:
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">
                              Total Purchase Return Including Tax:
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Purchase Due: </div>
                          </Td>
                          <Td>
                            <div className="text-left">৳ 000.00</div>
                          </Td>
                        </Tbrow>
                      </TBody>
                    </Table>
                  </div>
                </div>
                <div className="w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="">
              <div className="flex flex-col gap-4 md:flex-row items-center justify-center w-[90%] mx-auto">
                <div className="w-[100%] mt-5">
                  <Table>
                    <THeader>
                      <Th>Sales</Th>
                      <Th></Th>
                    </THeader>
                    <TBody>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total Sale:</div>
                        </Td>
                        <Td>
                          <div className="text-left">৳ 000.00</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Sale Including tax:</div>
                        </Td>
                        <Td>
                          <div className="text-left">৳ 000.00</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">
                            Total Sell Return Including Tax:
                          </div>
                        </Td>
                        <Td>
                          <div className="text-left">৳ 000.00</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Sale Due:</div>
                        </Td>
                        <Td>
                          <div className="text-left">৳ 000.00</div>
                        </Td>
                      </Tbrow>
                    </TBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 mx-12">
          <h2>
            Overall ((Sale - Sell Return) - (Purchase - Purchase Return) )
          </h2>
          <div>
            <h2 className="text-3xl">Sale - Purchase: ৳ 52,320.00</h2>
          </div>
          <div>
            <h2 className="text-3xl">Due amount: ৳ 60,320.00</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button className="bg-brand px-7 py-2 rounded-md text-white">
          Print
        </button>
      </div>
    </div>
  );
};

export default PurchaseANDSalePage;
