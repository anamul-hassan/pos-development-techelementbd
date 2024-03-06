import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";

const ViewTabel = () => {
  return (
    <div className=" bg-white py-10 px-5 rounded-md">
      <Table>
        <THeader>
          <Th>Date</Th>
          <Th>Challan No</Th>
          <Th>Type</Th>
          <Th>Location</Th>
          <Th>
            Pyament <br />
            Status
          </Th>
          <Th>Debit</Th>
          <Th>Credit</Th>
          <Th>Balance</Th>
          <Th>
            Payment <br />
            Method
          </Th>
          <Th>Ohters</Th>
        </THeader>
        <TBody>
          <Tbrow>
            <Td>01/12/2023 00:00</Td>
            <Td>11</Td>
            <Td>3117</Td>
            <Td>1731</Td>
            <Td>Sadid</Td>
            <Td> 17</Td>
            <Td> 31</Td>
            <Td>$3117 </Td>
            <Td> $1000</Td>
            <Td>$500</Td>
          </Tbrow>
        </TBody>
      </Table>
    </div>
  );
};

export default ViewTabel;
