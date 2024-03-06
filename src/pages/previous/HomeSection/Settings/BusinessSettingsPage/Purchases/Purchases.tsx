
const Purchases = () => {
  return (
    <div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto py-16">
          {/* right part */}
          <div className="flex-1 w-full p-2 mt-2">
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable editing product price from purchase screen
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Lot number
                </label>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable Purchase Requisition
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
                  Enable Purchase Status
                </label>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="my-4 flex justify-center items-center">
                <input type="checkbox" className="h-4 w-4" />
                <label htmlFor="" className="text-lg ml-2">
                  Enable purchase order
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

export default Purchases;
