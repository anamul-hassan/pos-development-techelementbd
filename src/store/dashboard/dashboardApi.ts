import { apiSlice } from "../root_api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET AGGREGATION
    getDashboard: builder.query({
      query: () => ({
        url: "/product/get-aggrigation",
      }),
      providesTags: ["dashboard"],
    }),
    //GET ALL AGGREGATION
    getDashboardAll: builder.query({
      query: () => ({
        url: "/product/get-aggrigation-all",
      }),
      providesTags: ["dashboard"],
    }),
    // GET DAY BOOK REPORT
    getDayBookReport: builder.query({
      query: (data) => ({
        url: `/product/get-day-book-reports?fromDate=${data.from}&toDate=${data?.to}`,
      }),
      providesTags: ["dashboard"],
    }),
    // GET STOCK REPORT
    getStockReport: builder.query({
      query: () => ({
        url: "/product/get-inventory-reports",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useGetStockReportQuery,
  useGetDashboardQuery,
  useGetDashboardAllQuery,
  useGetDayBookReportQuery,
} = dashboardApi;
