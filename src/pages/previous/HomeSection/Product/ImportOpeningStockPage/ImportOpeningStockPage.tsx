import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ImportOpeningStockPage = () => {
  return (
    <div>
      <div>
        <h1 className="my-3 ml-2 lg:ml-[60px]">
          <span className="text-2xl font-bold">Import Opening Stock</span>{" "}
        </h1>
      </div>
      {/* top part  */}
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 mb-20 shadow-lg rounded border-t-2 border-brand">
        <div className="flex justify-between">
          <div className="mt-5 mx-10 w-[250px]">
            <div className="mt-4 ">
              <span className="mr-3 font-semibold text-[16px]">
                File To Import:
              </span>
              <div className="flex items-center justify-center bg-grey-lighter mt-2">
                <label className=" w-full py-[5px] text-brand  flex justify-center border-t-2 border-brand items-center  bg-white text-blue rounded-sm tracking-wide uppercase  cursor-pointer hover:bg-blue hover:text-brand">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal ml-2">
                    User Image
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            <button className="py-2 px-3 bg-[#1367D1] text-white mt-3 rounded">
              Submit
            </button>
          </div>
          <div className="mt-16 mr-10">
            <button className="bg-[#28B97B] py-2 px-3 text-white rounded ">
              Download Template File
            </button>
          </div>
        </div>
      </div>
      {/* top part  */}
      <div className="w-[94%] mx-auto bg-slate-100 pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="ml-5 lg:ml-10">
          <h3 className="text-xl pt-5 ">Instructions</h3>
          <h4 className="font-bold">
            Follow the instructions carefully before importing the file.
          </h4>
          <h4 className="font-light">
            The columns of the file should be in the following order.
          </h4>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="w-[96%] h-[70vh] mx-auto mt-5">
            <Table>
              <THeader>
                <Th>Column Number</Th>
                <Th>Column Name</Th>
                <Th> Instruction</Th>
              </THeader>
              <TBody>
                <Tbrow>
                  <Td>
                    <div className="text-left">1</div>
                  </Td>
                  <Td>
                    <div className="text-left"> SKU(Required)</div>
                  </Td>

                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">2</div>
                  </Td>
                  <Td>
                    <div className="text-left">
                      <h3> Location (Optional)</h3>
                      <h4 className="text-sm">
                        If blank first business location will be used
                      </h4>
                    </div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      Name of the business location
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">3</div>
                  </Td>
                  <Td>
                    <div className="text-left">Quantity (Required)</div>
                  </Td>

                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">4</div>
                  </Td>
                  <Td>
                    <div className="text-left">
                      {" "}
                      Unit Cost (Before Tax) (Required)
                    </div>
                  </Td>

                  <Td> </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">5</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Lot Number (Optional)</div>
                  </Td>

                  <Td></Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">6</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Expiry Date (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Stock expiry date in Business date format</h3>
                      <h3>mm/dd/yyyy, Type: text, Example: 01/09/2024</h3>
                    </div>
                  </Td>
                </Tbrow>
              </TBody>
            </Table>
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default ImportOpeningStockPage;
