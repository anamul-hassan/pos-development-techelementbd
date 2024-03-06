import { apiSlice } from "../root_api/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD ALL CUSTOMER
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/create-customer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),

    // GET ALL CUSTOMERS
    getCustomers: builder.query({
      query: () => ({
        url: "/customer/get-customer-all",
      }),
      providesTags: ["customer"],
    }),

    // GET SINGLE CUSTOMER BY ID
    getSingleCustomer: builder.query({
      query: (id) => ({
        url: `/customer/get-customer-by-id/${id}`,
      }),
      providesTags: ["customer"],
    }),
    // GET SELL AND PURCHASE CUSTOMER BY ID
    getSellPurchaseCustomerById: builder.query({
      query: (id) => ({
        url: `/purchase/get-purchase-by-supplierid/${id}`,
      }),
      providesTags: ["customer"],
    }),

    // UPDATE CUSTOMER
    updateCustomer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/customer/update-customer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),

    // DELETE CUSTOMER
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/delete-customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),

    // SEARCH CUSTOMER
    searchCustomer: builder.query({
      query: (search) => ({
        url: `/customer/get-customer-all?search=${search}`,
      }),
      providesTags: ["customer"],
    }),

    // SEARCH SINGLE CUSTOMER
    searchSingleCustomer: builder.query({
      query: (search) => ({
        url: `/customer/get-customer-single?search=${search}`,
      }),
      providesTags: ["customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetSingleCustomerQuery,
  useGetSellPurchaseCustomerByIdQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useSearchCustomerQuery,
  useSearchSingleCustomerQuery,
} = customerApi;
