import { apiSlice } from "../root_api/apiSlice";

const unitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD UNIT
    addUnit: builder.mutation({
      query: (data) => ({
        url: "/unit/create-unit/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unit"],
    }),
    // GET ALL UNITS
    getUnits: builder.query({
      query: () => ({
        url: "/unit/get-unit/",
      }),
      providesTags: ["unit"],
    }),
    // GET SINGLE UNIT
    getSingleUnit: builder.query({
      query: (id) => ({
        url: `/unit/get-unit/${id}`,
      }),
      providesTags: ["unit"],
    }),
    // SEARCH UNIT
    searchUnit: builder.query({
      query: (search) => ({
        url: `/unit/get-unit?search=${search}`,
      }),
      providesTags: ["unit"],
    }),
    // UPDATE UNIT
    updateUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/unit/update-unit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["unit"],
    }),
    // DELETE UNIT
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/delete-unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["unit"],
    }),
  }),
});

export const {
  useAddUnitMutation,
  useGetUnitsQuery,
  useGetSingleUnitQuery,
  useSearchUnitQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
