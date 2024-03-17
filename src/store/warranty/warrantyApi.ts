import { apiSlice } from "../root_api/apiSlice";

const warrantyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD WARRANTY
    addWarranty: builder.mutation({
      query: (data) => ({
        url: "/warranty/create-warranty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["warranty"],
    }),
    // GET ALL WARRANTIES
    getWarranties: builder.query({
      query: (data) => ({
        url: `/warranty/get-warranty-all?search=${data?.search || ""}`,
      }),
      providesTags: ["warranty"],
    }),
    // GET SINGLE WARRANTY
    getSingleWarranty: builder.query({
      query: (id) => ({
        url: `/warranty/get-warranty-by-id/${id}`,
      }),
      providesTags: ["warranty"],
    }),
    // UPDATE WARRANTY
    updateWarranty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/warranty/update-warranty/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["warranty"],
    }),
    // DELETE WARRANTY
    deleteWarranty: builder.mutation({
      query: (id) => ({
        url: `/warranty/delete-warranty/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["warranty"],
    }),
  }),
});

export const {
  useAddWarrantyMutation,
  useGetWarrantiesQuery,
  useGetSingleWarrantyQuery,
  useUpdateWarrantyMutation,
  useDeleteWarrantyMutation,
} = warrantyApi;
