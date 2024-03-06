import { apiSlice } from "../root_api/apiSlice";

const contactsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD CONTACT
    addContacts: builder.mutation({
      query: (data) => ({
        url: "/auth/create-user",
        method: "POST",
        body: data,
      }),
    }),
    //GET ALL CONTACTS
    getContacts: builder.query({
      query: () => ({
        url: "/customer/get-customer-all",
      }),
      providesTags: ["user"],
    }),
    // GET CONTACTS BY ID
    getSingleContact: builder.query({
      query: (id) => ({
        url: `/usr-api/usersapid/${id}`,
      }),
      providesTags: ["user"],
    }),

    // UPDATE CONTACT
    updateContact: builder.mutation({
      query: ({ id, updateUser }) => {
        return {
          url: `/usr-api/usersapid/${id}`,
          method: "PUT",
          body: { ...updateUser },
        };
      },
      invalidatesTags: ["user"],
    }),

    // DELETE CONTACT
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/use/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useGetSingleContactQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
