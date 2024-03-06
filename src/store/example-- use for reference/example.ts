// import { apiSlice } from "../root_api/apiSlice";

// const exampleApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     //
//     createUser: builder.mutation({
//       query: (data: any) => ({
//         url: "/user/create-user",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     getUser: builder.query({
//       query: () => ({
//         url: "/user/create-user",
//       }),
//     }),
//     getUserById: builder.query({
//       query: (id: string) => ({
//         url: `/user/get-user-by-id/${id}`,
//       }),
//     }),
//     updateUser: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/user/update-user/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//     }),
//     deleteUser: builder.mutation({
//       query: (id: string) => ({
//         url: `/user/delete-user/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateUserMutation,
//   useDeleteUserMutation,
//   useGetUserByIdQuery,
//   useGetUserQuery,
//   useUpdateUserMutation,
// } = exampleApi;
