import { undefinedSize } from "../branch/branchApi";
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
    getExpenses: builder.query({
      query: (data) => ({
        url: `/expense/get-expense-all?search=${data?.search || ""}&size=${
          data?.size || undefinedSize
        }&page=${data?.page || 1}`,
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
  }),
});

export const {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
