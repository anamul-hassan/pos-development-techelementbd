const ViewLedger = () => {
  return (
    <div>
      {" "}
      <div className=" w-[90%] mx-auto mt-2">
        {/* left 1  */}
        <div>
          <div>
            <h2 className="text-right bg-brand5 py-2 pr-2 rounded-md text-white text-lg">
              Account Summary
            </h2>
            <h4 className="text-sm text-right mr-2 mt-2">1/11/2024</h4>
            <div className="border-brand border-[1px]"></div>
            <div className="flex justify-between">
              <h2>Opening Balance</h2>
              <h2>৳ 0.00</h2>
            </div>
            <div className="flex justify-between">
              <h2>Total invoice</h2>
              <h2>৳ 0.00</h2>
            </div>
            <div className="flex justify-between">
              <h2>Total paid</h2>
              <h2>৳ 0.00</h2>
            </div>
            <div className="flex justify-between">
              <h2>Advance Balance</h2>
              <h2>৳ 0.00</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold">Balance Due</h2>
              <h2>৳ 0.00</h2>
            </div>
          </div>
        </div>
        {/* left 2 */}
      </div>
    </div>
  );
};

export default ViewLedger;
