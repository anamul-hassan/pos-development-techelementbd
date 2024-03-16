import { undefinedSize } from "../branch/branchApi";
import { apiSlice } from "../root_api/apiSlice";

const expenseCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD EXPENSE CATEGORY
    addExpenseCategory: builder.mutation({
      query: (data) => ({
        url: "/expense-category/create-expense-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    // GET ALL CATEGORIES
    getAllExpenseCategory: builder.query({
      query: (data) => ({
        url: `/expense-category/get-expense-category-all?search=${
          data?.search || ""
        }&page=${data?.page || 1}&size=${
          data?.size || undefinedSize
        }&sortOrder=${data?.sort || "asc"} `,
      }),
      providesTags: ["expense-category"],
    }),

    // GET SINGLE CATEGORY
    getSingleExpenseCategory: builder.query({
      query: (id) => ({
        url: `/expense-category/get-expense-category-by-id/${id}`,
      }),
      providesTags: ["expense-category"],
    }),

    // UPDATE CATEGORY
    updateExpenseCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expense-category/update-expense-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    // DELETE CATEGORY
    deleteExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `/expense-category/delete-expense-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense-category"],
    }),
  }),
});

export const {
  useAddExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
  useGetSingleExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = expenseCategoryApi;
