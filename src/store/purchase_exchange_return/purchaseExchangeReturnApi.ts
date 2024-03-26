import { undefinedSize } from "../branch/branchApi";
import { apiSlice } from "../root_api/apiSlice";

const purchaseExchangeReturnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PURCHASE EXCHANGE RETURN
    addPurchaseExchangeReturn: builder.mutation({
      query: (data) => ({
        url: "/return/create-purchase-return",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase-exchange-return"],
    }),
    // GET ALL PURCHASE EXCHANGE RETURN
    getPurchaseExchangeReturn: builder.query({
      query: (data) => ({
        url: `/return/get-purchase-return?search=${data?.search || ""}&page=${
          data?.page || 1
        }&size=${data?.size || undefinedSize}&sortOrder=${data?.sort || "asc"}`,
        method: "GET",
      }),
      providesTags: ["purchase-exchange-return"],
    }),
  }),
});

export const {
  useAddPurchaseExchangeReturnMutation,
  useGetPurchaseExchangeReturnQuery,
} = purchaseExchangeReturnApi;
