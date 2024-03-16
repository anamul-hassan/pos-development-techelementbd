import { apiSlice } from "../root_api/apiSlice";

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ADD BRAND
    addBrand: builder.mutation({
      query: (data) => ({
        url: "/brand/create-brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    //GET ALL BRAND
    getBrands: builder.query({
      query: (data) => ({
        url: `/brand/get-brand?search=${data?.search || ""}`,
      }),
      providesTags: ["brand"],
    }),

    //  GET BRAND BY ID
    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brand/get-brand-by-id/${id}`,
      }),
      providesTags: ["brand"],
    }),

    // UPDATE BRAND
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    // DELETE BRAND
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useGetSingleBrandQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandApi;
