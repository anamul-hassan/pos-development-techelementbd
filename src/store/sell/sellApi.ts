import { apiSlice } from "../root_api/apiSlice";

const sellApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD SELL
    addSell: builder.mutation({
      query: (data) => ({
        url: "/sell/create-sell",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sell"],
    }),

    // GET ALL SELL
    getSell: builder.query({
      query: () => ({
        url: "/sell/get-sell-all",
      }),
      providesTags: ["sell"],
    }),

    // GET SINGLE SELL
    getSingleSell: builder.query({
      query: (id) => ({
        url: `/sell/get-sell-by-id/${id}`,
      }),
      providesTags: ["sell"],
    }),

    // UPDATE SELL
    updateSell: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sell/update-sell/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sell"],
    }),

    // DELETE SELL
    deleteSell: builder.mutation({
      query: (id) => ({
        url: `/sell/delete-sell/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sell"],
    }),

    // SEARCH SELL
    searchSell: builder.query({
      query: (search) => ({
        url: `/sell/get-sell-all?search=${search}`,
      }),
      providesTags: ["sell"],
    }),
  }),
});

export const {
  useAddSellMutation,
  useDeleteSellMutation,
  useGetSingleSellQuery,
  useGetSellQuery,
  useSearchSellQuery,
  useUpdateSellMutation,
} = sellApi;
