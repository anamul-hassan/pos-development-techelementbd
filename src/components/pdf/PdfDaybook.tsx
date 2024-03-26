import { FC } from "react";
import Regular from "../../utils/fonts/Poppins-Regular.ttf";
import SemiBold from "../../utils/fonts/Poppins-SemiBold.ttf";
import Bold from "../../utils/fonts/Poppins-Bold.ttf";
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
import { totalCalculator } from "@/utils/helpers/totalCalculator";

// FONT FOR STYLING PDF
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
// CLASSES FOR STYLING PDF
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

export interface IDaybookSummary {
  totalPrice: number;
  totalProfit: number;
  totalProduct: number;
  totalQuantity: number;
}

interface IPdfDaybookProps {
  columns: {
    columnsProduct: IPdfDaybookColumn[];
    columnsPayment: IPdfDaybookColumn[];
  };
  data: any;
  preview?: boolean;
  headerData?: {
    headerProduct: IPdfDaybookPageHeaderData;
    headerPayment: IPdfDaybookPageHeaderData;
  };
  paperSize?: "A4";
  className?: string;
  itemsPerPage?: number;
  summary?: IDaybookSummary;
}

const PdfDaybook: FC<IPdfDaybookProps> = ({
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

export default PdfDaybook;

export interface IPdfDaybookPageHeaderData {
  company: string;
  heading: string;
  subHeading?: string;
  logo: string;
  date: string;
}
export interface IPdfDaybookColumn {
  header: string;
  accessorKey: string;
  width?: number;
}
interface IPdfDaybookWrapper {
  data: any;
  paperSize?: "A4";
  itemsPerPage: number;
  summary?: IDaybookSummary;
  columns: {
    columnsProduct: IPdfDaybookColumn[];
    columnsPayment: IPdfDaybookColumn[];
  };
  headerData?: {
    headerProduct: IPdfDaybookPageHeaderData;
    headerPayment: IPdfDaybookPageHeaderData;
  };
}
const PdfTableWrapper: FC<IPdfDaybookWrapper> = ({
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
  const chunks = chunkArray(data?.products, itemsPerPage);

  const cashOnHand =
    (summary?.totalPrice ?? 0) - totalCalculator(data?.payments, "price");

  return (
    <Document>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size={paperSize} style={styles.page}>
          {/* PRODUCT PAGE HEADER */}
          <PdfPageHeader headerData={headerData?.headerProduct} />
          {/* PRODUCT PAGE HEADING */}
          <Text style={styles.headingSecondary}>
            Product/ Stock Information
          </Text>
          <View style={styles.section}>
            {/* PRODUCT TABLE HEADER COMPONENT */}
            <PdfTableHeader columns={columns?.columnsProduct} />
            {/* TABLE BODY COMPONENT */}
            <PdfTableBody columns={columns?.columnsProduct} data={chunk} />
          </View>
          <Text
            style={{
              ...styles.headingSecondary,
              marginTop: 10,
              marginBottom: -5,
            }}
          >
            Product/ Stock Summary
          </Text>
          {Object?.keys(summary || {})?.length > 0 && (
            <PdfTableSummary summary={summary} />
          )}
        </Page>
      ))}

      {/* PAYMENT PAGE */}
      <Page size={paperSize} style={styles.page}>
        {/* PAYMENT PAGE HEADER */}
        <PdfPageHeader headerData={headerData?.headerPayment} />

        {/* PAYMENT TABLE CONTAINER & HEADING */}
        <Text style={styles.headingSecondary}>Payments Summary</Text>
        {data?.payments?.length > 0 && (
          <View style={styles.section}>
            {/* PAYMENT CONTAINER */}
            <PdfTableHeader columns={columns?.columnsPayment} />
            {/* TABLE BODY COMPONENT */}
            <PdfTableBody
              columns={columns?.columnsPayment}
              data={data?.payments}
            />
          </View>
        )}

        {/* TABLE CONTAINER */}
        <View style={{ ...styles.section, marginTop: 10 }}>
          {/* TABLE BODY COMPONENT */}
          <PdfTableBody
            columns={[
              { accessorKey: "title", header: "Product Name" },
              { accessorKey: "handOnCash", header: "Product Name" },
            ]}
            data={[
              {
                title: "Cash On Hand",
                handOnCash: cashOnHand > 0 ? cashOnHand.toFixed(2) : "0.00",
              },
            ]}
          />
        </View>
      </Page>
    </Document>
  );
};
interface IPdfDaybookPageHeader {
  headerData?: IPdfDaybookPageHeaderData;
}
const PdfPageHeader: FC<IPdfDaybookPageHeader> = ({ headerData }) => {
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
        <Text style={styles.headingTertiary}>{headerData?.date}</Text>
      </View>
    </View>
  );
};

interface IPdfTableHeader {
  columns: IPdfDaybookColumn[];
}
const PdfTableHeader: FC<IPdfTableHeader> = ({ columns }) => {
  return (
    <View style={styles.tableRow}>
      {columns?.map((singleColumn: IPdfDaybookColumn) => (
        <View key={singleColumn?.accessorKey} style={styles.tableHead}>
          <Text>{singleColumn?.header}</Text>
        </View>
      ))}
    </View>
  );
};

interface IPdfDaybookBody {
  data: any;
  columns: IPdfDaybookColumn[];
}

// PDF TABLE BODY
const PdfTableBody: FC<IPdfDaybookBody> = ({ data, columns }) => {
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
  summary: IDaybookSummary | undefined;
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
