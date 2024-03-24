import { FC } from "react";
import Regular from "../../utils/fonts/Poppins-Regular.ttf";
import SemiBold from "../../utils/fonts/Poppins-SemiBold.ttf";
import Bold from "../../utils/fonts/Poppins-Bold.ttf";
import moment from "moment";
import {
  Document,
  Font,
  Image,
  // PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { DateRange } from "react-day-picker";
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: Regular,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: SemiBold,
      fontStyle: "normal",
      fontWeight: "semibold",
    },
    {
      src: Bold,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 15,
    fontFamily: "Poppins",
    border: 1,
  },
  section: {
    border: 1,
    borderColor: "#555",
    overflow: "hidden",
    borderRadius: 5,
  },
  pageHeader: {
    justifyContent: "center",
    columnGap: 15,
    flexDirection: "row",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
  headingPrimary: {
    fontSize: 20,
    lineHeight: 1.3,
    fontWeight: "bold",
    color: "#444",
  },
  headingSecondary: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 1.1,
    fontWeight: "semibold",
    color: "#444",
  },
  headingTertiary: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1,
    color: "#555",
  },
  summary: {
    border: 0.8,
    borderColor: "#555",
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#f1f3f5",
  },

  table: {
    width: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    width: "100%",
    borderColor: "#555",
  },
  tableHead: {
    width: "100%",
    borderStyle: "solid",
    fontSize: 10,
    textAlign: "left",
    paddingVertical: 2,
    lineHeight: 1.5,
    paddingHorizontal: 5,
    borderBottom: 0.8,
    fontWeight: "semibold",
    borderColor: "#555",
  },

  tableCell: {
    flexDirection: "row",
    width: "100%",
    borderStyle: "solid",
    fontSize: 10,
    textAlign: "left",
    paddingVertical: 2,
    lineHeight: 1.5,
    paddingHorizontal: 5,
  },
  viewer: {
    width: window.innerWidth - 130,
    height: window.innerHeight,
  },
});

export interface ITableSummary {
  totalPrice: number;
  totalProfit: number;
  totalProduct: number;
  totalQuantity: number;
}

interface IPdfTableProps {
  columns: IPdfTableColumn[];
  data: any;
  preview?: boolean;
  headerData?: IPdfPageHeaderData;
  paperSize?: "A4";
  className?: string;
  itemsPerPage?: number;
  summary?: ITableSummary;
}

const PdfTable: FC<IPdfTableProps> = ({
  columns,
  data,
  headerData,
  paperSize = "A4",
  itemsPerPage = 30,
  summary,
}) => {
  return (
    // <PDFViewer style={styles.viewer}>
    <PdfTableWrapper
      paperSize={paperSize}
      columns={columns}
      data={data}
      headerData={headerData}
      itemsPerPage={itemsPerPage}
      summary={summary}
    />
    // </PDFViewer>
  );
};

export default PdfTable;

export interface IPdfPageHeaderData {
  company: string;
  heading: string;
  subHeading?: string;
  logo: string;
  date: DateRange | undefined;
}
export interface IPdfTableColumn {
  header: string;
  accessorKey: string;
  width?: number;
}
interface IPdfTableWrapper {
  headerData?: IPdfPageHeaderData;
  columns: IPdfTableColumn[];
  data: any;
  paperSize?: "A4";
  itemsPerPage: number;
  summary?: ITableSummary;
}
const PdfTableWrapper: FC<IPdfTableWrapper> = ({
  headerData,
  columns,
  data,
  paperSize,
  itemsPerPage,
  summary,
}) => {
  // SPLIT THE ARRAY WITH LIMIT
  const chunkArray = (array: any, chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunks = chunkArray(data, itemsPerPage);
  return (
    <Document>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size={paperSize} style={styles.page}>
          {/* PAGE HEADER */}
          <PdfPageHeader headerData={headerData} />

          {/* TABLE CONTAINER */}
          <View style={styles.section}>
            {/* TABLE HEADER */}
            <PdfTableHeader columns={columns} />
            {/* TABLE BODY COMPONENT */}
            <PdfTableBody columns={columns} data={chunk} />
          </View>
          {Object?.keys(summary || {})?.length > 0 && (
            <PdfTableSummary summary={summary} />
          )}
        </Page>
      ))}
    </Document>
  );
};
interface IPdfPageHeader {
  headerData?: IPdfPageHeaderData;
}
const PdfPageHeader: FC<IPdfPageHeader> = ({ headerData }) => {
  return (
    <View style={styles.pageHeader}>
      <Image style={styles.image} src={headerData?.logo} />
      <View
        style={{
          marginTop: -5,
        }}
      >
        <Text style={styles.headingPrimary}>{headerData?.company}</Text>
        <Text style={styles.headingSecondary}>{headerData?.heading}</Text>
        <Text style={styles.headingTertiary}>
          {headerData?.date?.from
            ? headerData?.date?.to
              ? `${moment(headerData?.date?.from).format(
                  "DD MMMM, YYYY"
                )} - ${moment(headerData?.date?.to).format("DD MMMM, YYYY")}`
              : `${moment(headerData?.date?.from).format("DD MMMM, YYYY")}`
            : `${moment().format("DD MMMM, YYYY")}`}
        </Text>
      </View>
    </View>
  );
};

interface IPdfTableHeader {
  columns: IPdfTableColumn[];
}
const PdfTableHeader: FC<IPdfTableHeader> = ({ columns }) => {
  return (
    <View style={styles.tableRow}>
      {columns?.map((singleColumn: IPdfTableColumn) => (
        <View key={singleColumn?.accessorKey} style={styles.tableHead}>
          <Text>{singleColumn?.header}</Text>
        </View>
      ))}
    </View>
  );
};

interface IPdfTableBody {
  data: any;
  columns: IPdfTableColumn[];
}

// PDF TABLE BODY
const PdfTableBody: FC<IPdfTableBody> = ({ data, columns }) => {
  return (
    <View>
      {data?.length > 0 &&
        data?.map((singleData: any, dataIndex: number, dataArray: any) => (
          <View
            style={[
              styles.tableRow,
              { borderBottom: 0.8 },
              dataIndex === dataArray?.length - 1 ? { borderBottom: 0 } : {},
            ]}
            key={dataIndex}
          >
            {columns?.map(
              (singleColumn: any, columnIndex: number, array: any) => (
                <View
                  key={singleColumn?.accessorKey}
                  style={[
                    styles.tableCell,
                    columnIndex % 2 !== 0
                      ? {
                          borderLeft: 0.8,
                          borderRight: 0.8,
                          borderColor: "#555",
                        }
                      : { borderColor: "#555" },
                    columnIndex === array?.length - 1 ? { borderRight: 0 } : {},
                  ]}
                >
                  <Text>{singleData[singleColumn?.accessorKey]}</Text>
                </View>
              )
            )}
          </View>
        ))}
    </View>
  );
};

// PDF TABLE SUMMARY
const PdfTableSummary = ({
  summary,
}: {
  summary: ITableSummary | undefined;
}) => {
  return (
    <View style={styles.summary}>
      <View style={styles.tableRow}>
        <View style={styles.tableHead}>
          <Text>Total Product</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Total Quantity</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Total Sale</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Total Profit</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={{
            ...styles.tableHead,
            borderBottomWidth: 0,
          }}
        >
          <Text>{summary?.totalProduct || "0"}</Text>
        </View>
        <View style={{ ...styles.tableHead, borderBottomWidth: 0 }}>
          <Text>{summary?.totalQuantity || "0"}</Text>
        </View>
        <View style={{ ...styles.tableHead, borderBottomWidth: 0 }}>
          <Text>{summary?.totalPrice?.toFixed(2) || "0.00"}</Text>
        </View>
        <View style={{ ...styles.tableHead, borderBottomWidth: 0 }}>
          <Text>{summary?.totalProfit?.toFixed(2) || "0.00"}</Text>
        </View>
      </View>
    </View>
  );
};
