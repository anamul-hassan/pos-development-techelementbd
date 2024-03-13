import { apiSlice } from "../root_api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PRODUCT
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    // GET ALL PRODUCT
    getProducts: builder.query({
      query: (data) => ({
        url: `/product/get-products?page=${data?.page}&size=${data?.size}`,
      }),
      providesTags: ["product"],
    }),
    // GET SINGLE PRODUCT
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product-by-id/${id}`,
      }),
      providesTags: ["product"],
    }),
    // SEARCH PRODUCT
    searchProduct: builder.query({
      query: (search) => ({
        url: `/product/get-products?search=${search}`,
      }),
      providesTags: ["product"],
    }),
    // SEARCH SINGLE PRODUCT
    searchSingleProduct: builder.query({
      query: (search) => ({
        url: `/product/get-product-single?search=${search}`,
      }),
      providesTags: ["product"],
    }),
    // UPDATE PRODUCT
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update-product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    // DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useSearchProductQuery,
  useSearchSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
