import { apiSlice } from "../root_api/apiSlice";

const expenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD EXPENSE
    addExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/create-expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
    // GET EXPENSE
    getExpense: builder.query({
      query: () => ({
        url: `/expense/get-expense-all/`,
      }),
      providesTags: ["expense"],
    }),
    // GET SINGLE EXPENSE
    getSingleExpense: builder.query({
      query: (id) => ({
        url: `/expense/get-expense-by-id/${id}`,
      }),
      providesTags: ["expense"],
    }),
    // SEARCH EXPENSE
    searchExpense: builder.query({
      query: (search) => ({
        url: `/expense/get-expense-all?search=${search}`,
      }),
      providesTags: ["expense"],
    }),
    // UPDATE EXPENSE
    updateExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expense/update-expense/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
    // DELETE EXPENSE
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/delete-expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
    // GET SUB-CATEGORY EXPENSES
    getSubCategoryExpenses: builder.query({
      query: () => ({
        url: "/expense-subcategory/get-expense-subcategory-all",
      }),
      providesTags: ["expense"],
    }),
    // GET EXPENSE CATEGORIES
    getCategoryExpenses: builder.query({
      query: () => ({
        url: "/expense-category/get-expense-category-all",
      }),
      providesTags: ["expense"],
    }),
  }),
});

export const {
  useAddExpenseMutation,
  useGetExpenseQuery,
  useGetSingleExpenseQuery,
  useSearchExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoryExpensesQuery,
  useGetSubCategoryExpensesQuery,
} = expenseApi;
