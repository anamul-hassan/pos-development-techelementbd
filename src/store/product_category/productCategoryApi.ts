import { apiSlice } from "../root_api/apiSlice";

const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PRODUCT CATEGORY
    addProductCategory: builder.mutation({
      query: (data) => ({
        url: "/product-category/create-productcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),

    // GET ALL PRODUCT CATEGORIES
    getAllProductCategories: builder.query({
      query: () => ({
        url: "/product-category/get-category",
      }),
      providesTags: ["product-category"],
    }),

    //  GET CATEGORY BY SEARCH
    getProductBySearch: builder.query({
      query: (search) => ({
        url: `/product-category/get-category?search=${search}`,
      }),
      providesTags: ["product-category"],
    }),

    // GET SINGLE CATEGORY BY ID
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/product-category/get-category/${id}`,
      }),
      providesTags: ["product-category"],
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-category/update-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),

    // DELETE CATEGORY
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product-category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-category"],
    }),
  }),
});

export const {
  useAddProductCategoryMutation,
  useGetAllProductCategoriesQuery,
  useGetProductBySearchQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productCategoryApi;
