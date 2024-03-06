import { apiSlice } from "../root_api/apiSlice";

const PosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  ADD POINT OF SELL
    addPOS: builder.mutation({
      query: (data) => ({
        url: "/sell/create-sell",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pos"],
    }),
    //  GET ALL POINT OF SELL
    getAllPOS: builder.query({
      query: () => ({
        url: "/sell/get-sell-all",
      }),
      providesTags: ["pos"],
    }),

    // GET SINGLE POINT OF SELL
    getSinglePOS: builder.query({
      query: (id) => ({
        url: `/sell/get-sell-by-id/${id}`,
      }),
      providesTags: ["pos"],
    }),

    // DELETE POINT OF SELL
    deletePOS: builder.mutation({
      query: (id) => ({
        url: `/sell/delete-sell/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pos"],
    }),
  }),
});

export const {
  useAddPOSMutation,
  useGetAllPOSQuery,
  useGetSinglePOSQuery,
  useDeletePOSMutation,
} = PosApi;
