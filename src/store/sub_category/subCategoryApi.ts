import { apiSlice } from "../root_api/apiSlice";

const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD SUB CATEGORY
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sub-category"],
    }),
    // GET SUB CATEGORY
    getSubCategory: builder.query({
      query: () => ({
        url: "/subcategory/get-subcategory/",
      }),
      providesTags: ["sub-category"],
    }),
    // GET SINGLE SUB CATEGORY
    getSingleSubCategory: builder.query({
      query: (id) => ({
        url: `/subcategory/get-subcategory/${id}`,
      }),
      providesTags: ["sub-category"],
    }),
    // SEARCH SUB CATEGORY
    searchSubcategory: builder.query({
      query: (search) => ({
        url: `/subcategory/get-subcategory?search=${search}`,
      }),
      providesTags: ["sub-category"],
    }),
    // UPDATE SUB CATEGORY
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategory/update-subcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["sub-category"],
    }),
    // DELETE SUB CATEGORY
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/delete-subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sub-category"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetSingleSubCategoryQuery,
  useSearchSubcategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
