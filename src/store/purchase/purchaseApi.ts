import { undefinedSize } from "../branch/branchApi";
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
      query: (data) => ({
        url: `/purchase/get-purchase-all?search=${data?.search || ""}&page=${
          data?.page || 1
        }&size=${data?.size || undefinedSize}&sortOrder=${data?.sort || "asc"}`,
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
  useSearchSinglePurchaseQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
