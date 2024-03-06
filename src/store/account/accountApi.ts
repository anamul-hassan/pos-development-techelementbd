import { apiSlice } from "../root_api/apiSlice";

const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD ACCOUNT
    addAccount: builder.mutation({
      query: (data) => ({
        url: "/account/create-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["account"],
    }),
    // GET ALL ACCOUNTS
    getAccounts: builder.query({
      query: (type) => ({
        url: `/account/get-accounts?type=${type}`,
      }),
      providesTags: ["account"],
    }),
    // GET SINGLE ACCOUNT
    getSingleAccount: builder.query({
      query: (id) => ({
        url: `/account/update-account/${id}`,
      }),
      providesTags: ["account"],
    }),
    // UPDATE ACCOUNT
    updateAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/account/update-account/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["account"],
    }),
    // DELETE ACCOUNT
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/account/delete-account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["account"],
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountsQuery,
  useGetSingleAccountQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} = accountApi;
