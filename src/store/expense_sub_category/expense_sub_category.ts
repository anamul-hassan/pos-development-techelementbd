import { apiSlice } from "../root_api/apiSlice";

const expenseSubCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  ADD CATEGORY
    addExpenseSubCategory: builder.mutation({
      query: (data) => ({
        url: "/expense-subcategory/create-expense-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense-sub-category"],
    }),

    // GET ALL CATEGORY
    getAllExpenseSubCategory: builder.query({
      query: () => ({
        url: "/expense-subcategory/get-expense-subcategory-all",
      }),
      providesTags: ["expense-sub-category"],
    }),

    // GET ALL CATEGORY
    getSingleExpenseSubCategory: builder.query({
      query: (id) => ({
        url: `/expense-subcategory/get-expense-subcategory-by-id/${id}`,
      }),
      providesTags: ["expense-sub-category"],
    }),

    // UPDATE CATEGORY
    updateExpenseSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expense-subcategory/update-expense-subcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expense-sub-category"],
    }),

    // DELETE CATEGORY
    deleteExpenseSubCategory: builder.mutation({
      query: (id) => ({
        url: `/expense-subcategory/delete-expense-subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense-sub-category"],
    }),
  }),
});

export const {
  useAddExpenseSubCategoryMutation,
  useGetAllExpenseSubCategoryQuery,
  useGetSingleExpenseSubCategoryQuery,
  useUpdateExpenseSubCategoryMutation,
  useDeleteExpenseSubCategoryMutation,
} = expenseSubCategoryApi;
