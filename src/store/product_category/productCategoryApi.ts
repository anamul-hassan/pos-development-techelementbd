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
    getProductCategories: builder.query({
      query: ({ search, page, size }) => ({
        url: `/product-category/get-category?search=${search}&page=${page}&size=${size}`,
      }),
      providesTags: ["product-category"],
    }),

    // GET SINGLE PRODUCT CATEGORY
    getSingleProductCategory: builder.query({
      query: (id) => ({
        url: `/product-category/get-category/${id}`,
      }),
      providesTags: ["product-category"],
    }),

    // UPDATE PRODUCT CATEGORY
    updateProductCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product-category/update-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product-category"],
    }),

    // DELETE PRODUCT CATEGORY
    deleteProductCategory: builder.mutation({
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
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
  useGetSingleProductCategoryQuery,
  useUpdateProductCategoryMutation,
} = productCategoryApi;
