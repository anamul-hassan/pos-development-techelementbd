import { apiSlice } from "../root_api/apiSlice";

const productSubCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PRODUCT SUB CATEGORY
    addProductSubCategory: builder.mutation({
      query: (data) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-sub-category"],
    }),
    // GET PRODUCT SUB CATEGORIES
    getProductSubCategories: builder.query({
      query: ({ search, page, size }) => ({
        url: `/subcategory/get-subcategory?search=${search}&page=${page}&size=${size}`,
      }),
      providesTags: ["product-sub-category"],
    }),
    // GET PRODUCT SINGLE SUB CATEGORY
    getSingleProductSubCategory: builder.query({
      query: (id) => ({
        url: `/subcategory/get-subcategory/${id}`,
      }),
      providesTags: ["product-sub-category"],
    }),

    // UPDATE PRODUCT SUB CATEGORY
    updateProductSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategory/update-subcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-sub-category"],
    }),
    // DELETE PRODUCT SUB CATEGORY
    deleteProductSubCategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-sub-category"],
    }),
  }),
});

export const {
  useAddProductSubCategoryMutation,
  useDeleteProductSubCategoryMutation,
  useGetProductSubCategoriesQuery,
  useGetSingleProductSubCategoryQuery,
  useUpdateProductSubCategoryMutation,
} = productSubCategoryApi;
