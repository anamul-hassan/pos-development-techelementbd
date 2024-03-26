import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import regularFont from "../../../../utils/fonts/AnekBangla-Regular.ttf";
Font.register({ family: "regular", src: regularFont });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: "regular",
  },
  section: {},
  headers: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: 1,
    marginBottom: 12,
  },
  image: {
    width: 50,
    filter: "grayscale(1)",
  },
  headingPrimary: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  headingSecondary: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 0.9,
  },
  headingTertiary: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 0.9,
  },

  table: {
    width: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    borderLeft: 0.5,
    borderRight: 0.5,
    fontSize: 10,
    textAlign: "left",
    paddingVertical: 2,
    lineHeight: 1,
  },

  tableCol: {
    color: "red",
    width: "25%",
    borderStyle: "solid",
    borderBottomColor: "red",
    borderBottomWidth: 0.5,
    borderLeft: 0.5,
    borderRight: 0.5,
    fontSize: 10,
    textAlign: "left",
    paddingVertical: 2,
    lineHeight: 1,
    paddingBottom: 1,
    paddingTop: 1,
  },
  viewer: {
    width: window.innerWidth - 130,
    height: window.innerHeight,
  },
});

const SalesReportPDF = ({ data }: any) => {
  const { companyName, sidebarLogo } = CLIENT_DETAILS;
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

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* SALES REPORT TABLE */}
          <View style={styles.section}>
            <View
              style={{ display: "flex", flexDirection: "column", border: "1" }}
            >
              <Image style={{ ...styles.image }} src={sidebarLogo} />

              <View style={styles.headingTertiary}>
                <Text style={styles.headingPrimary}>
                  {companyName?.toUpperCase()}
                </Text>
                <Text style={styles.headingSecondary}>Daily Sales Report</Text>
                {/* <Text style={styles.headingTertiary}>{currentDate}</Text> */}
              </View>
            </View>

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
            <Text style={styles.headingSecondary}>Daily Payment Report</Text>
            {/* <Text style={styles.headingSecondary}>Date: {currentDate}</Text> */}
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
    </PDFViewer>
  );
};

export default SalesReportPDF;
