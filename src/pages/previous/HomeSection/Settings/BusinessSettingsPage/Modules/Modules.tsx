

const Modules = () => {
  return (
    <div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div>
          <h2 className="text-3xl font-bold w-[90%] mx-auto mt-5">
            Enable/ Disable Modules
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-6">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Purchases
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Stock Transfers
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Account
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Service Staff
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Subscription
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Add Sale
                </label>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Stock Adjustment
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Tables
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Bookings
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Types of service
                </label>
              </div>
            </div>
          </div>
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  POS
                </label>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Expenses
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Modifiers
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Kitchen (For restaurants)
                </label>
              </div>
            </div>

            <div className="mb-[50px]"></div>
          </div>
          {/* right part */}

          {/* right part */}
        </div>{" "}
      </div>
    </div>
  );
};

export default Modules;
