// import { useForm } from "react-hook-form";
import { FaUserTie } from "react-icons/fa";
import { FaLocationDot, FaMobileScreen } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";

import { useState } from "react";
import ViewLedger from "./ViewLedger";
import ViewSales from "./ViewSales";
import ViewDocuments from "./ViewDocuments";
import ViewPayments from "./ViewPayments";
import ViewTabel from "./ViewTabel";

// import { useNavigate, useParams } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";
import // useGetSellPurchaseCustomerByIdQuery,
// useUpdateCustomerMutation,
"@/store/customer/customerApi";
// import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { Modal, ModalBody, ModalHead } from "@/components/previous/all/Modal";

const View = () => {
  // const { id } = useParams();
  // const { toast } = useToast() as any;
  // const { data: Customer, isLoading: getCustomerLoading } =
  //   useGetSellPurchaseCustomerByIdQuery(id) as any;
  // const { data: supplier, isLoading: getsupplierLoading } =
  //   useGetSellPurchaseCustomerByIdQuery(id) as any;

  // const [updateCustomer] = useUpdateCustomerMutation() as any;
  // const navigate = useNavigate();
  // const { data: branchData } = useGetBranchesQuery(undefined) as any;

  // const handleEditCustomer = async (data: any) => {
  //
  //   try {
  //     const result = await updateCustomer({ id, data });
  //     if (result?.data?.data && result?.data?.success === true) {
  //       toast({
  //         description: result?.data?.message,
  //       });
  //       navigate("/list_customers");
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  // if (getCustomerLoading) {
  //   return <Loading />;
  // }
  const [modal, setModal] = useState(false);
  // const {
  //   // register,
  //   // handleSubmit,
  //   // formState: { errors },
  //   // setValue,
  // } = useForm();

  const [ledger, setLedger] = useState(true);
  const [Sales, setSales] = useState(false);
  const [Documents, setDocuments] = useState(false);
  const [Payments, setPayments] = useState(false);

  const LedgerHandle = () => {
    setLedger(true);
    setSales(false);
    setDocuments(false);
    setPayments(false);
  };
  const SalesHandle = () => {
    setSales(true);
    setDocuments(false);
    setLedger(false);
    setPayments(false);
  };
  const DocumentsHandle = () => {
    setDocuments(true);
    setSales(false);
    setLedger(false);
    setPayments(false);
  };
  const PaymentHandle = () => {
    setPayments(true);
    setSales(false);
    setLedger(false);
    setDocuments(false);
  };

  return (
    <div>
      <div className="text-[30px] font-bold lg:ml-14 mt-5 ml-5">View</div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-[94%] mx-auto">
          <div className="lg:w-[40%] w-[90%] mx-auto mt-5">
            <div className="max-w-screen-2xl mx-auto">
              <div>
                <div className=""></div>
              </div>
              <div className=" lg:flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">View Contact</h3>
                </div>
                <div></div>
              </div>
            </div>
            <div className="max-w-screen-2xl mx-auto my-4">
              <div className="lg:flex justify-between">
                <div>
                  <h3 className="text-xl font-bold flex justify-items-center items-center">
                    <FaUserTie />
                    <span className="ml-2">MD Mehedi Hasan,</span>
                  </h3>
                  <div className="text-sm font-semibold">
                    <h3 className="font-bold flex justify-items-center items-center">
                      <FaLocationDot />
                      <span className="ml-2"> Address</span>
                    </h3>
                    <h4>Md. Mehedi Hasan</h4>
                  </div>
                  <div className="text-sm font-semibold">
                    <h3 className="font-bold flex justify-items-center items-center">
                      <MdBusinessCenter />
                      <span className="ml-2">Business Name</span>
                    </h3>{" "}
                    <h4>Md. Mehedi Hasan</h4>
                  </div>
                  <div className="text-sm font-semibold">
                    <h3 className="font-bold flex justify-items-center items-center">
                      <FaMobileScreen />
                      <span className="ml-2">Mobile</span>
                    </h3>{" "}
                    <h4>015555553117</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[60%] w-[90%] mx-auto">
            <div className="">
              <ViewLedger />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-2 transition-all delay-100 hover:text-lg">
            <button
              onClick={LedgerHandle}
              className="bg-brand6 py-2 px-3 rounded-md text-white my-2"
            >
              Ledger
            </button>
          </div>
          <div className="mx-2 transition-all delay-100 hover:text-lg">
            <button
              onClick={SalesHandle}
              className="bg-brand3 py-2 px-3 rounded-md text-white my-2"
            >
              Sales
            </button>
          </div>
          <div className="mx-2 transition-all delay-100 hover:text-lg">
            <button
              onClick={PaymentHandle}
              className="bg-brand py-2 px-3 rounded-md text-white my-2"
            >
              Payment
            </button>
          </div>
          <div className="mx-2 transition-all delay-100 hover:text-lg">
            <button
              onClick={DocumentsHandle}
              className="bg-brand2 py-2 px-3 rounded-md text-white my-2"
            >
              Documets
            </button>
          </div>
          <div>
            <button
              onClick={() => setModal(true)}
              className="bg-brand6 text-white rounded-md py-2 px-4 mt-2 transition-all delay-100 hover:text-lg"
            >
              Add Discount
            </button>
          </div>
        </div>
        <div className="mt-5 mx-12">
          <div>{ledger ? <ViewTabel /> : null}</div>
          <div>{Sales ? <ViewSales /> : null}</div>
          <div>{Documents ? <ViewDocuments /> : null}</div>
          <div>{Payments ? <ViewPayments /> : null}</div>
          <hr className="m-5" />
        </div>
      </div>
      <div className="">
        {/* <Button>+Add</Button> */}
        <Modal isModal={modal} width={"30vw"} height={"100vh lg:30vh"}>
          <ModalHead title="Add Discount" setIsModal={() => setModal(false)} />
          <ModalBody>
            <div className="">
              <div className="w-full my-4">
                {/* <InputField
                  isPassword={false}
                  isIcon={false}
                  name={""}
                  register={register}
                  label={""}
                  type={"date"}
                  requird
                  errors={errors}
                />{" "} */}
              </div>
            </div>
            <div className="">
              <div className="w-full my-4">
                <div className="flex">
                  <div className="w-full">
                    {/* <InputField
                      isPassword={false}
                      isIcon={false}
                      name={"facebook"}
                      register={register}
                      label={"Amoute"}
                      type={"number"}
                      requird
                      errors={errors}
                    />{" "} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="mb-1 font-bold">Note:</h3>
              <textarea
                name=""
                id=""
                className="w-full border-brand border-[1px]"
                rows={5}
              ></textarea>
            </div>{" "}
            <div className="flex justify-center items-center mt-5">
              <button className="bg-[#0069D9] text-white py-2 px-7 rounded">
                Save
              </button>
              {/* <button setIsModal={() => setModal(false)}>Close</button> */}
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default View;
