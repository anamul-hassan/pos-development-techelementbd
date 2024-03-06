import { apiSlice } from "../root_api/apiSlice";

const loginUser = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN USER
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login-user/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginUser;
