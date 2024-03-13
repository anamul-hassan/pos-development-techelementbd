import { apiSlice } from "../root_api/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD CUSTOMER
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/create-customer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer"],
    }),
    // GET ALL CUSTOMER DATA
    getCustomers: builder.query({
      query: ({ search, page, size }) => ({
        url: `/customer/get-customer-all?search=${search}&page=${page}&size=${size}`,
        method: "GET",
      }),

      providesTags: ["customer"],
    }),

    // GET SINGLE CUSTOMER BY ID
    getSingleCustomer: builder.query({
      query: (id) => ({
        url: `/customer/get-customer-by-id/${id}`,
        method: "GET",
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
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useGetSingleCustomerQuery,
  useGetSellPurchaseCustomerByIdQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
