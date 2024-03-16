import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";

const DayBookExcel = ({ data }: any) => {
  if (!data || !data.stocks || !data.payments || !data.total) {
    return (
      <Button disabled variant="tertiary" size="sm">
        EXCEL
      </Button>
    );
  }
  const combinedData = [];

  // Add stocks data to combinedData
  combinedData.push(...data.stocks);

  // Add payments data to combinedData
  combinedData.push(...data.payments);

  // Convert the total object to an array and add it to combinedData
  combinedData.push(data.total);

  return (
    <CSVLink data={combinedData} filename={"all_data.csv"} onClick={() => {}}>
      <Button variant="tertiary" size="sm">
        EXCEL
      </Button>
    </CSVLink>
  );
};

export default DayBookExcel;
