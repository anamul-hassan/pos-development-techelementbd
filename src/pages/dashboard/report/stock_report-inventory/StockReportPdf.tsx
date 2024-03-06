import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 2,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "semibold",
  },
  subHeading: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  table: {
    // display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: "8px",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 2,
  },

  tableCol: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: "7px",
    textAlign: "center",
    paddingVertical: 2,
  },
});

const StockReportPdf = ({ data }: any) => {
  const { companyName } = CLIENT_DETAILS;
  // Format the current date
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SALES REPORT TABLE */}
        <View style={styles.section}>
          <Text style={styles.heading}>{companyName}</Text>
          <Text style={styles.subHeading}>Stock Report</Text>
          <Text style={styles.subHeading}>Date: {currentDate}</Text>
          <View style={styles.table}>
            {/* STOCKS HEADING ROW */}
            <View style={styles.tableRow}>
              <View style={styles.tableHeader}>
                <Text>Products Name</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Brand</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Category</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>SubCategory</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Variation</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Total Purchase Qty</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Total Seal Qty</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Total Purchase Return Qty</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Total Seal Return Qty</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Current Stock</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Current Stock Value(Purchase)</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Current Stock Value(Sale Price)</Text>
              </View>
            </View>

            {/* STOCKS DATA FETCHING */}
            {data?.map((stock: any, index: any) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text>{stock.productName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.brand}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.categoryName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.subcategoryName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.variationIMEI}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.totalPurchase}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.totalSale}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.totalPurchaseReturn}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.totalSaleReturn}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.stock}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.purchaseValue}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.saleValue}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default StockReportPdf;
