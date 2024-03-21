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
  }),
});

export const { useAddSaleExchangeReturnMutation } = saleExchangeReturnApi;
