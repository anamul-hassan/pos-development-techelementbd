import { BsGraphUp } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import { useGetDashboardQuery } from "@/store/dashboard/dashboardApi";

const Card = () => {
  // GET DASHBOARD DATA IS TOTAL SELL ,POS, PURCHSE, EXPENSE, DUE, PAYMENT, AMOUNT
  const { data: dashboardData, isLoading } = useGetDashboardQuery(undefined);

  return (
    <>
      {/* <div className="flex justify-end">
        <div className="py-3">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Users</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="h-full rounded-l border block appearance-none w-full bg-brand3 border-brand3 text-white py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-brand3 focus:border-brand3">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* card one */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Sales</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>
                    {(dashboardData?.totalSell?.sell?.totalPrice ||
                      dashboardData?.totalSell?.pos?.totalPrice) !== null
                      ? dashboardData?.totalSell?.sell?.totalPrice +
                        dashboardData?.totalSell?.pos?.totalPrice
                      : 0}
                  </>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>

        {/* card two */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Due</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>{dashboardData?.totalDueAmount}</>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>

        {/* card three */}
        {/* <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Due Collection</span>
              <span className="text-lg font-semibold text-white">100,221</span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div>
        </div> */}

        {/* card four */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Payment</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>
                    {dashboardData?.totalPayment?.paymentAmount !== null
                      ? dashboardData?.totalPayment?.paymentAmount
                      : 0}
                  </>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>

        {/* card five */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Purchases</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>
                    {dashboardData?.totalPurchase?.totalAmount !== null
                      ? dashboardData?.totalPurchase?.totalAmount
                      : 0}
                  </>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>

        {/* card six */}
        {/* <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Purchases Return</span>
              <span className="text-lg font-semibold text-white">100,221</span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div>
        </div> */}

        {/* card seven */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Expense</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>
                    {dashboardData?.totalExpenses?.totalAmount !== null
                      ? dashboardData?.totalExpenses?.totalAmount
                      : 0}
                  </>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>

        {/* card eight */}
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-brand3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-200">Total Amount</span>
              <span className="text-lg font-semibold text-white flex items-center gap-3">
                {isLoading ? (
                  <span className="animate-spin text-lg flex items-center justify-center">
                    <AiOutlineLoading />
                  </span>
                ) : (
                  <>
                    {((dashboardData?.totalSell?.sell?.totalPrice ||
                      dashboardData?.totalSell?.pos?.totalPrice) !== null
                      ? dashboardData?.totalSell?.sell?.totalPrice +
                        dashboardData?.totalSell?.pos?.totalPrice
                      : 0) -
                      (dashboardData?.totalExpenses?.totalAmount !== null
                        ? dashboardData?.totalExpenses?.totalAmount
                        : 0)}
                  </>
                )}{" "}
                TK
              </span>
            </div>
            <div className="p-5 bg-gray-200 rounded-md">
              <BsGraphUp className="text-2xl" />
            </div>
          </div>
          {/* <div>
            <span className="inline-block px-2 text-sm text-white bg-brand2 rounded">
              14%
            </span>
            <span className="text-gray-300 pl-2">from 2019</span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Card;
