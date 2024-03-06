import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ImportProductsPage = () => {
  return (
    <div>
      <div>
        <h1 className="my-3 mb-10 lg:ml-16">
          <span className="text-2xl font-bold">Import Products</span>{" "}
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
        <div>
          <h3 className="text-xl pt-5 lg:ml-10 ml-4">Instructions</h3>
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
                    <div className="text-left">Product Name (Required)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="flex justify-between">
                      Name of the product
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">2</div>
                  </Td>
                  <Td>
                    <div className="text-left">Brand (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Name of the brand</h3>
                      <h4 className="text-sm">
                        (If not found new brand with the given name will be
                        created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">3</div>
                  </Td>
                  <Td>
                    <div className="text-left">Unit (Required)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Name of the unit</h3>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">4</div>
                  </Td>
                  <Td>
                    <div className="text-left">Category (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Name of the Category</h3>
                      <h4 className="text-sm">
                        (If not found new category with the given name will be
                        created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">5</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Sub category (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Name of the Sub-Category</h3>
                      <h4 className="text-sm">
                        (If not found new sub-category with the given name under
                        the parent Category will be created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">6</div>
                  </Td>
                  <Td>
                    <div className="text-left"> SKU (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>
                        Product SKU. If blank an SKU will be automatically
                        generated
                      </h3>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">7</div>
                  </Td>
                  <Td>
                    <div className="text-left">
                      {" "}
                      Barcode Type (Optional, Default: C128)
                    </div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Barcode Type for the product.</h3>
                      <h4 className="text-sm">
                        Currently supported: C128, C39, EAN-13, EAN-8, UPC-A,
                        UPC-E, ITF-14
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">8</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Manage Stock? (Required)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Enable or disable stock managemant</h3>
                      <h4 className="text-sm">1 = Yes</h4>
                      <h4 className="text-sm">0 = No</h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">9</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Alert quantity (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Alert quantity</h3>
                      <h4 className="text-sm">
                        (If not found new brand with the given name will be
                        created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">3</div>
                  </Td>
                  <Td>
                    <div className="text-left">Unit (Required)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Name of the brand</h3>
                      <h4 className="text-sm">
                        (If not found new brand with the given name will be
                        created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">10</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Expires in (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Product expiry period (Only in numbers)</h3>
                      <h4 className="text-sm">
                        (If not found new brand with the given name will be
                        created)
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">11</div>
                  </Td>
                  <Td>
                    <div className="text-left">
                      {" "}
                      Expiry Period Unit (Optional)
                    </div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3>Unit for the expiry period</h3>
                      <h4 className="text-sm">
                        Available Options: days, months
                      </h4>
                    </div>
                  </Td>
                </Tbrow>
                <Tbrow>
                  <Td>
                    <div className="text-left">12</div>
                  </Td>
                  <Td>
                    <div className="text-left"> Applicable Tax (Optional)</div>
                  </Td>

                  <Td>
                    {" "}
                    <div className="text-left">
                      <h3> Name of the Tax Rate</h3>
                      <h4 className="text-sm">
                        (If not found new brand with the given name will be
                        created)
                      </h4>
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

export default ImportProductsPage;
