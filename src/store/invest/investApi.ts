import { apiSlice } from "../root_api/apiSlice";

const investApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD INVEST
    addInvest: builder.mutation({
      query: (data) => ({
        url: "/invest/create-invest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invest"],
    }),
    // GET ALL INVEST
    getInvests: builder.query({
      query: () => ({
        url: "/invest/get-invests",
      }),
      providesTags: ["invest"],
    }),
    // GET SINGLE INVEST
    getSingleInvest: builder.query({
      query: (id) => ({
        url: `/invest/get-invest/${id}`,
      }),
      providesTags: ["invest"],
    }),
    // UPDATE INVEST
    updateInvest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/invest/update-invest/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["invest"],
    }),
    // DELETE INVEST
    deleteInvest: builder.mutation({
      query: (id) => ({
        url: `/invest/delete-invest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invest"],
    }),
  }),
});

export const {
  useAddInvestMutation,
  useGetInvestsQuery,
  useGetSingleInvestQuery,
  useDeleteInvestMutation,
  useUpdateInvestMutation,
} = investApi;
