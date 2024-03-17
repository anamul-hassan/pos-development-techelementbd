import { apiSlice } from "../root_api/apiSlice";

const saleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  ADD SALE
    addSale: builder.mutation({
      query: (data) => ({
        url: "/sell/create-sell",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pos"],
    }),
    //  GET ALL SALE
    getSales: builder.query({
      query: () => ({
        url: "/sell/get-sell-all",
      }),
      providesTags: ["pos"],
    }),

    // GET SINGLE SALE
    getSingleSale: builder.query({
      query: (id) => ({
        url: `/sell/get-sell-by-id/${id}`,
      }),
      providesTags: ["pos"],
    }),

    // DELETE SALE
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sell/delete-sell/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pos"],
    }),
  }),
});

export const {
  useAddSaleMutation,
  useGetSalesQuery,
  useDeleteSaleMutation,
  useGetSingleSaleQuery,
} = saleApi;
