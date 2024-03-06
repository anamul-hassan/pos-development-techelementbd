import { apiSlice } from "../root_api/apiSlice";

const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADD SUPPLIER
    addSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplier/create-supplier",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["supplier"],
    }),

    //GET ALL SUPPLIERS
    getSuppliers: builder.query({
      query: () => ({
        url: "/supplier/get-supplier-all",
      }),
      providesTags: ["supplier"],
    }),

    // GET SINGLE SUPPLIERS
    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `/supplier/get-supplier-by-id/${id}`,
      }),
      providesTags: ["supplier"],
    }),
    // GET PURCHASE BY SUPPLIER
    getPurchaseBySupplier: builder.query({
      query: (id) => ({
        url: `/purchase/get-purchase-by-supplierid/${id}`,
      }),
      providesTags: ["supplier"],
    }),

    // UPDATE SUPPLIER
    updateSupplier: builder.mutation({
      query: ({ id, data }) => ({
        url: `/supplier/update-supplier/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["supplier"],
    }),

    // DELETE SUPPLIER
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/supplier/delete-supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["supplier"],
    }),
    // SEARCH SUPPLIER
    searchSupplier: builder.query({
      query: (search) => ({
        url: `/supplier/get-supplier-all?search=${search}`,
      }),
      providesTags: ["supplier"],
    }),
  }),
});

export const {
  useAddSupplierMutation,
  useDeleteSupplierMutation,
  useGetPurchaseBySupplierQuery,
  useGetSingleSupplierQuery,
  useGetSuppliersQuery,
  useSearchSupplierQuery,
  useUpdateSupplierMutation,
} = supplierApi;
