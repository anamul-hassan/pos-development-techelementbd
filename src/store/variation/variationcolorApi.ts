import { apiSlice } from "../root_api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADD VARIATION COLOR
    addVariationColor: builder.mutation({
      query: (data) => ({
        url: "/color/create-color",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    //GET ALL VARIATION COLOR
    getVariationColor: builder.query({
      query: () => ({
        url: "/color/get-color-all",
      }),
      providesTags: ["variation"],
    }),

    // GET SINGLE VARIATION COLOR
    getSingleVariationColor: builder.query({
      query: (id) => ({
        url: `/color/get-color-by-id/${id}`,
      }),
      providesTags: ["variation"],
    }),

    // UPDATE VARIATION COLOR
    updateVariationColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/update-color/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["variation"],
    }),

    // DELETE VARIATION COLOR
    deleteVariationColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete-color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["variation"],
    }),
  }),
});

export const {
  useAddVariationColorMutation,
  useGetVariationColorQuery,
  useGetSingleVariationColorQuery,
  useDeleteVariationColorMutation,
  useUpdateVariationColorMutation,
} = userApi;
