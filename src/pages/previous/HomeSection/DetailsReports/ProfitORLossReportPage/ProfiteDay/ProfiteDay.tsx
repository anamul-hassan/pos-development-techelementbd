import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import InputField from "@/components/previous/all/InputField";

const ProfiteDay = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  return (
    <div>
      <div>
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="lg:flex mt-10 ml-7">
            <div>
              <button className="flex text-lg bg-[#163020] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold my-2">
                <BsFiletypeCsv className="mt-1 mr-1" />
                CSV
              </button>
            </div>
            <div>
              <button className="flex text-lg bg-[#097640] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold my-2">
                <FaRegFilePdf className="mt-1 mr-1" />
                Excel
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#0069D9] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold my-2">
                <IoPrintOutline className="mt-1 mr-1" />
                Pribt
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#18B294] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold my-2">
                <CiViewColumn className="mt-1 mr-1" />
                Column
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#527853] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold my-2">
                <VscFilePdf className="mt-1 mr-1" />
                PDF
              </button>
            </div>
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
        {/* Top side area */}
        <div className="lg:flex">
          <div className="flex-1 w-full ">
            <div className="my-4 ml-2">
              <h2 className="bg-[#D2D6DE] py-2 pl-2">Days</h2>
              <div>
                <div className="flex justify-between mr-2 ml-2">
                  <h2>Monday</h2>
                </div>
                <div className="flex justify-between mr-2 ml-2">
                  <h2>Tuesday</h2>
                </div>
                <div className="flex justify-between mr-2 ml-2">
                  <h2>Wednesday</h2>
                </div>
                <div className=" mr-2 ml-2">
                  <h2>Thursday</h2>
                </div>
                <div className=" mr-2 ml-2">
                  <h2>Friday</h2>
                </div>
                <div className=" mr-2 ml-2">
                  <h2>Saturday</h2>
                </div>
                <div className=" mr-2 ml-2">
                  <h2>Sunday</h2>
                </div>
                <div className="mr-2  bg-[#D2D6DE] py-2 pl-2">
                  <h2>Total:</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full ">
            <div className="my-4 mr-2 border-l-[1px] border-brand ">
              <h2 className="bg-[#D2D6DE]  py-2 pl-2">Gross Profite</h2>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between ml-2">
                <h2>৳ 000.00</h2>
              </div>{" "}
              <div className="flex justify-between  bg-[#D2D6DE] py-2 pl-2">
                <h2 className="font-bold">৳ 000.00</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfiteDay;
