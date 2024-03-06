import { apiSlice } from "../root_api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADD ALL USER
    addUser: builder.mutation({
      query: (data) => ({
        url: "/auth/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    //GET ALL USERS
    getUser: builder.query({
      query: () => ({
        url: "/user/get-user-all",
      }),
      providesTags: ["user"],
    }),

    // GET SINGLE USER
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/get-user-by-id/${id}`,
      }),
      providesTags: ["user"],
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
