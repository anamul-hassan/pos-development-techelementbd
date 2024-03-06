import { apiSlice } from "../root_api/apiSlice";

const investingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD INVESTING
    addInvesting: builder.mutation({
      query: (data) => ({
        url: "/investing/create-investing",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["investing"],
    }),
    // GET ALL INVESTING
    getAllInvesting: builder.query({
      query: () => ({
        url: "/investing/get-investings",
      }),
      providesTags: ["investing"],
    }),
    // GET SINGLE INVESTING
    getSingleInvesting: builder.query({
      query: (id) => ({
        url: `/investing/update-investing/${id}`,
      }),
      providesTags: ["investing"],
    }),
    // UPDATE INVESTING
    updateInvesting: builder.mutation({
      query: ({ id, data }) => ({
        url: `/investing/update-investing/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["investing"],
    }),
    // DELETE INVESTING
    deleteInvesting: builder.mutation({
      query: (id) => ({
        url: `/investing/delete-investing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["investing"],
    }),
  }),
});

export const {
  useAddInvestingMutation,
  useGetAllInvestingQuery,
  useGetSingleInvestingQuery,
  useDeleteInvestingMutation,
  useUpdateInvestingMutation,
} = investingApi;
