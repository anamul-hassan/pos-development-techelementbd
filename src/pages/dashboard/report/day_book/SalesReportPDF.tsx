import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "semibold",
  },
  subHeading: {
    fontSize: 14,
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
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 2,
  },

  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: "12px",
    textAlign: "center",
    paddingVertical: 2,
  },
});

const SalesReportPDF = ({ data }: any) => {
  const { companyName } = CLIENT_DETAILS;
  // CALCULATE TOTAL QUANTITY
  const totalQuantity = data?.stocks?.reduce(
    (total: number, stock: any) => total + stock?.quantity,
    0
  );

  // CALCULATE TOTAL PROFIT
  const totalProfit = data?.stocks?.reduce(
    (total: number, stock: any) => total + stock.profit,
    0
  );

  // CALCULATE TOTAL SALES PRICES
  const totalSalePrice = data?.stocks?.reduce(
    (total: number, stock: any) => total + stock.price,
    0
  );

  // CALCULATE TOTAL PAYMENT
  const totalPayment = data?.payments?.reduce(
    (total: number, payment: any) => total + payment.price,
    0
  );

  // Format the current date
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SALES REPORT TABLE */}
        <View style={styles.section}>
          <Text style={styles.heading}>{companyName}</Text>
          <Text style={styles.subHeading}>Daily Sales Report</Text>
          <Text style={styles.subHeading}>Date: {currentDate}</Text>
          <View style={styles.table}>
            {/* STOCKS HEADING ROW */}
            <View style={styles.tableRow}>
              <View style={styles.tableHeader}>
                <Text>Product Name</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Product Quantity</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Product Price</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Profit</Text>
              </View>
            </View>

            {/* STOCKS DATA FETCHING */}
            {data?.stocks?.map((stock: any, index: any) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text>{stock.productName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.price} TK</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{stock.profit} TK</Text>
                </View>
              </View>
            ))}

            {/* TOTAL QUANTITY ROW */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Quantity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{totalQuantity}</Text>
              </View>

              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>

            {/* TOTAL SALE ROW */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Sale</Text>
              </View>
              <View style={styles.tableCol}></View>

              <View style={styles.tableCol}>
                <Text>{totalSalePrice} TK</Text>
              </View>
              <View style={styles.tableCol}></View>
            </View>

            {/* TOTAL PROFIT ROW */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Profit</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text>{totalProfit} TK</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PAYMENT REPORT TABLE */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>Daily Payment Report</Text>
          <Text style={styles.subHeading}>Date: {currentDate}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableHeader}>
                <Text>Vendor Name</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Amount</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text>Payment Type</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text></Text>
              </View>
            </View>

            {/* PAYMENT DATA FETCHING */}
            {data?.payments?.map((payment: any, index: any) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text>{payment?.supplierName}</Text>
                </View>

                <View style={styles.tableCol}>
                  <Text>{payment?.price} TK</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{payment?.paymentType}</Text>
                </View>
                <View style={styles.tableCol}></View>
              </View>
            ))}

            {/* TOTAL PAYMENT ROW */}
            <View style={styles.tableRow}></View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Payment</Text>
              </View>

              <View style={styles.tableCol}>
                <Text>{totalPayment} TK</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
          </View>
        </View>

        {/* CASH ON HAND TABLE */}
        <View style={styles.section}>
          <View style={styles.table}>
            {/* TOTAL SALE */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Sale</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text>{totalSalePrice} TK</Text>
              </View>
            </View>

            {/* TOTAL PAYMENT */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Total Payment</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text>{totalPayment} TK</Text>
              </View>
            </View>

            {/* TOTAL PROFIT */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Cash In Hand</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text>{totalSalePrice - totalPayment} TK</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SalesReportPDF;
