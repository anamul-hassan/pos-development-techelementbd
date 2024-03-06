import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ViewPayments = () => {
  return (
    <div>
      {" "}
      <div
        className="mt-5 mx-12 bg-white py-10 px-5 rounded-md
      "
      >
        <div>
          <Table>
            <THeader>
              <Th>Action</Th>
              <Th>Paid on</Th>
              <Th>Challan No</Th>
              <Th>Amount</Th>
              <Th>Payment Method</Th>
              <Th>Payment For</Th>
            </THeader>
            <TBody>
              <Tbrow>
                <Td>Action</Td>
                <Td>01/12/2023 </Td>
                <Td>11</Td>
                <Td>3117</Td>
                <Td>1731</Td>
                <Td>Sadid</Td>
              </Tbrow>
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewPayments;
