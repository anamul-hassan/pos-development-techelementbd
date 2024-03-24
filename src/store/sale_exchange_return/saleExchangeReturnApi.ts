import { undefinedSize } from "../branch/branchApi";
import { apiSlice } from "../root_api/apiSlice";

const saleExchangeReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSaleExchangeReturn: builder.mutation({
      query: (data) => ({
        url: "/return/create-sell-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sale-return-exchange"],
    }),
    // GET ALL SALE RETURN / EXCHANGE
    getSaleReturnExchanges: builder.query({
      query: (data) => ({
        url: `/return/get-sell-return?search=${data?.search || ""}&page=${
          data?.page || 1
        }&size=${data?.size || undefinedSize}&sortOrder=${data?.sort || "asc"}`,
        method: "GET",
      }),
      providesTags: ["sale-return-exchange"],
    }),
  }),
});

export const {
  useAddSaleExchangeReturnMutation,
  useGetSaleReturnExchangesQuery,
} = saleExchangeReturnApi;
