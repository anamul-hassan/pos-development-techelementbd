import { apiSlice } from "../root_api/apiSlice";

const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PURCHASE
    addPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase/create-purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["purchase"],
    }),
    // GET ALL PURCHASE
    getPurchases: builder.query({
      query: () => ({
        url: "/purchase/get-purchase-all",
      }),
      providesTags: ["purchase"],
    }),
    // GET SINGLE PURCHASE
    getSinglePurchase: builder.query({
      query: (id) => ({
        url: `/purchase/get-purchase-by-id/${id}`,
      }),
      providesTags: ["purchase"],
    }),
    // SEARCH PURCHASE
    searchPurchase: builder.query({
      query: (search) => ({
        url: `/purchase/get-purchase-all?search=${search}`,
      }),
      providesTags: ["purchase"],
    }),
    // SEARCH SINGLE PURCHASE
    searchSinglePurchase: builder.query({
      query: (search) => ({
        url: `/purchase/get-purchase-single?search=${search}`,
      }),
      providesTags: ["purchase"],
    }),

    // UPDATE PURCHASE
    updatePurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase/update-purchase/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["purchase"],
    }),
    // DELETE PURCHASE
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchase/delete-purchase/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddPurchaseMutation,
  useGetPurchasesQuery,
  useGetSinglePurchaseQuery,
  useSearchPurchaseQuery,
  useSearchSinglePurchaseQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
