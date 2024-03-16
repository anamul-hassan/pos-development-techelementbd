import { apiSlice } from "../root_api/apiSlice";

const variationSizeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADD VARIATION SIZE
    addVariationSize: builder.mutation({
      query: (data) => ({
        url: "/size/create-size",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    //GET ALL VARIATION SIZE
    getVariationSize: builder.query({
      query: (data) => ({
        url: `/size/get-size-all?search=${data?.search || ""}`,
      }),
      providesTags: ["variation"],
    }),

    // GET SINGLE VARIATION SIZE
    getSingleVariationSize: builder.query({
      query: (id) => ({
        url: `/size/get-size-by-id/${id}`,
      }),
      providesTags: ["variation"],
    }),

    // UPDATE VARIATION SIZE
    updateVariationSize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/size/update-size/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // DELETE VARIATION SIZE
    deleteVariationSize: builder.mutation({
      query: (id) => ({
        url: `/size/delete-size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["variation"],
    }),
  }),
});

export const {
  useAddVariationSizeMutation,
  useGetVariationSizeQuery,
  useGetSingleVariationSizeQuery,
  useUpdateVariationSizeMutation,
  useDeleteVariationSizeMutation,
} = variationSizeApi;
