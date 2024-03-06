// import { FaSearch } from "react-icons/fa";
// import ReportSelector from "../../../../Components/Module/ReportSelector/ReportSelector";

// import { useForm } from "react-hook-form";
import ProfiteDay from "./ProfiteDay/ProfiteDay";
import ProfiteProducts from "./Profiteproducts/ProfiteProducts";
import ProfiteCategories from "./PorfiteCategories/ProfiteCategories";
import ProfiteBrands from "./ProfiteBrands/ProfiteBrands";
import ProfiteLocations from "./ProfiteLocations/ProfiteLocations";
import ProfiteInvoice from "./ProfiteInvoice/ProfiteInvoice";
import Profitedate from "./Profitedate/Profitedate";
import ProfiteCustomer from "./ProfiteCustomer/ProfiteCustomer";
import { useState } from "react";

import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import {
  useGetDashboardAllQuery,
  useGetDashboardQuery,
} from "@/store/dashboard/dashboardApi";

const ProfitORLossReportPage = () => {
  const { data: dashboardData } = useGetDashboardQuery(undefined) as any;
  const { data: allAccountAmountData } = useGetDashboardAllQuery(
    undefined
  ) as any;
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm();

  const [products, setProducts] = useState(true);
  const [categories, setCategories] = useState(false);
  const [brand, setBrand] = useState(false);
  const [location, setLocation] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [date, setDate] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [day, setDay] = useState(false);
  const productsHandles = () => {
    setProducts(true);
    setCategories(false);
    setBrand(false);
    setLocation(false);
    setInvoice(false);
    setDate(false);
    setCustomer(false);
    setDay(false);
  };
  const categoriesHandle = () => {
    setProducts(false);
    setCategories(true);
    setBrand(false);
    setLocation(false);
    setInvoice(false);
    setDate(false);
    setCustomer(false);
    setDay(false);
  };
  const brandHandle = () => {
    setProducts(false);
    setCategories(false);
    setBrand(true);
    setLocation(false);
    setInvoice(false);
    setDate(false);
    setCustomer(false);
    setDay(false);
  };
  const locationHandle = () => {
    setProducts(false);
    setCategories(false);
    setBrand(false);
    setLocation(true);
    setInvoice(false);
    setDate(false);
    setCustomer(false);
    setDay(false);
  };
  const invoiceHanlde = () => {
    setProducts(false);
    setCategories(false);
    setBrand(false);
    setLocation(false);
    setInvoice(true);
    setDate(false);
    setCustomer(false);
    setDay(false);
  };
  const dateHandle = () => {
    setProducts(false);
    setCategories(false);
    setBrand(false);
    setLocation(false);
    setInvoice(false);
    setDate(true);
    setCustomer(false);
    setDay(false);
  };
  const customerHandle = () => {
    setProducts(false);
    setCategories(false);
    setBrand(false);
    setLocation(false);
    setInvoice(false);
    setDate(false);
    setCustomer(true);
    setDay(false);
  };
  const dayHandle = () => {
    setProducts(false);
    setCategories(false);
    setBrand(false);
    setLocation(false);
    setInvoice(false);
    setDate(false);
    setCustomer(false);
    setDay(true);
  };

  return (
    <div>
      <div className="text-[30px] font-bold lg:ml-14 mt-5 ml-5">
        Profit / Loss Report
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-[94%] mx-auto">
          <div className="w-full mt-5">
            <div className="border-2">
              <div className=" ">
                <div className="w-full ">
                  <div className="w-[100%]  ">
                    <Table>
                      <THeader>
                        <Th>item</Th>
                        <Th>Taka</Th>
                      </THeader>
                      <TBody>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Supplier Name:</div>
                          </Td>
                          <Td>
                            <div className="text-left">Shaka</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Business Location:</div>
                          </Td>
                          <Td>
                            <div className="text-left">Dhaka</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Challan Number:</div>
                          </Td>
                          <Td>
                            <div className="text-left">1</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Item:</div>
                          </Td>
                          <Td>
                            <div className="text-left">31</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">
                              Total Purchase Quantity:{" "}
                            </div>
                          </Td>
                          <Td>
                            <div className="text-left">17</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total price:</div>
                          </Td>
                          <Td>
                            <div className="text-left">3117</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Expense:</div>
                          </Td>
                          <Td>
                            <div className="text-left">17</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Discout:</div>
                          </Td>
                          <Td>
                            <div className="text-left">31</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Total Pay Bil: </div>
                          </Td>
                          <Td>
                            <div className="text-left">1731</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Due Bil:</div>
                          </Td>
                          <Td>
                            <div className="text-left">3131</div>
                          </Td>
                        </Tbrow>
                        <Tbrow>
                          <Td>
                            <div className="text-left">Pay Methods:</div>
                          </Td>
                          <Td>
                            <div className="text-left">Cash</div>
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
                <div className="w-[100%] mt-3 ">
                  <Table>
                    <THeader>
                      <Th>Item</Th>
                      <Th>Taka</Th>
                    </THeader>
                    <TBody>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Supplier Name:</div>
                        </Td>
                        <Td>
                          <div className="text-left">Shaka</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Business Location:</div>
                        </Td>
                        <Td>
                          <div className="text-left">Dhaka</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Challan Number:</div>
                        </Td>
                        <Td>
                          <div className="text-left">1</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total Item:</div>
                        </Td>
                        <Td>
                          <div className="text-left">31</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">
                            Total Purchase Quantity:{" "}
                          </div>
                        </Td>
                        <Td>
                          <div className="text-left">17</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total price:</div>
                        </Td>
                        <Td>
                          <div className="text-left">3117</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total Expense:</div>
                        </Td>
                        <Td>
                          <div className="text-left">17</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total Discout:</div>
                        </Td>
                        <Td>
                          <div className="text-left">31</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Total Pay Bil: </div>
                        </Td>
                        <Td>
                          <div className="text-left">1731</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Due Bil:</div>
                        </Td>
                        <Td>
                          <div className="text-left">3131</div>
                        </Td>
                      </Tbrow>
                      <Tbrow>
                        <Td>
                          <div className="text-left">Pay Methods:</div>
                        </Td>
                        <Td>
                          <div className="text-left">Cash</div>
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
          <div>
            <h2 className="text-3xl">
              Gross Profit: ৳{" "}
              {((dashboardData?.totalSell?.sell?.totalPrice ||
                dashboardData?.totalSell?.pos?.totalPrice) !== null
                ? dashboardData?.totalSell?.sell?.totalPrice +
                  dashboardData?.totalSell?.pos?.totalPrice
                : 0) -
                (dashboardData?.totalExpenses?.totalAmount !== null
                  ? dashboardData?.totalExpenses?.totalAmount
                  : 0)}
            </h2>
            <h2>(Total sell price - Total purchase price)</h2>
          </div>
          <div>
            <h2 className="text-3xl">
              Total Gross Profit: ৳{" "}
              {((allAccountAmountData?.totalSell?.sell?.totalPrice ||
                allAccountAmountData?.totalSell?.pos?.totalPrice) !== null
                ? allAccountAmountData?.totalSell?.sell?.totalPrice +
                  allAccountAmountData?.totalSell?.pos?.totalPrice
                : 0) -
                (allAccountAmountData?.totalExpenses?.totalAmount !== null
                  ? allAccountAmountData?.totalExpenses?.totalAmount
                  : 0)}
            </h2>
            <h2>(Total sell price - Total purchase price)</h2>
          </div>
          <div>
            <h2 className="text-3xl">Net Profit: ৳ 60,320.00</h2>
            <h2>
              Gross Profit + (Total sell shipping charge + Sell additional
              expenses + Total Stock Recovered + Total Purchase discount + Total
              sell round off )
            </h2>
            <h2>
              - ( Total Stock Adjustment + Total Expense + Total purchase
              shipping charge + Total transfer shipping charge + Purchase
              additional expenses + Total Sell discount + Total customer reward
              + Total Payroll + Total Production Cost )
            </h2>
          </div>
        </div>
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex items-center justify-center">
          <div className=" lg:flex justify-center items-center gap-5 my-5 ">
            <div>
              <button
                onClick={productsHandles}
                className="bg-brand px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Products
              </button>
            </div>
            <div>
              <button
                onClick={categoriesHandle}
                className="bg-brand2 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Categories
              </button>
            </div>
            <div>
              <button
                onClick={brandHandle}
                className="bg-brand3 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Brands
              </button>
            </div>
            <div>
              <button
                onClick={locationHandle}
                className="bg-[#64de31] px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Locations
              </button>
            </div>
            <div>
              <button
                onClick={invoiceHanlde}
                className="bg-brand5 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Invoice
              </button>
            </div>
            <div>
              <button
                onClick={dateHandle}
                className="bg-brand6 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By date
              </button>
            </div>
            <div>
              <button
                onClick={customerHandle}
                className="bg-brand7 px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By Customer
              </button>
            </div>
            <div>
              <button
                onClick={dayHandle}
                className="bg-brand px-3 py-1 rounded-md m-2 text-white transition-all delay-100 hover:text-lg"
              >
                Profit By day
              </button>
            </div>
          </div>
        </div>
        <div>
          {products ? <ProfiteProducts /> : null}

          {categories ? <ProfiteCategories /> : null}
          {brand ? <ProfiteBrands /> : null}
          {location ? <ProfiteLocations /> : null}
          {invoice ? <ProfiteInvoice /> : null}
          {date ? <Profitedate /> : null}
          {customer ? <ProfiteCustomer /> : null}
          {day ? <ProfiteDay /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProfitORLossReportPage;
