import { undefinedSize } from "../branch/branchApi";
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
      invalidatesTags: ["sale"],
    }),
    //  GET ALL SALES
    getSales: builder.query({
      query: (data) => ({
        url: `/sell/get-sell-all?search=${data?.search || ""}&page=${
          data?.page || 1
        }&size=${data?.size || undefinedSize}`,
        method: "GET",
      }),
      providesTags: ["sale"],
    }),

    // GET SINGLE SALE
    getSingleSale: builder.query({
      query: (id) => ({
        url: `/sell/get-sell-by-id/${id}`,
        method: "GET",
      }),

      providesTags: ["sale"],
    }),

    // DELETE SALE
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sell/delete-sell/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sale"],
    }),
  }),
});

export const {
  useAddSaleMutation,
  useGetSalesQuery,
  useDeleteSaleMutation,
  useGetSingleSaleQuery,
} = saleApi;
